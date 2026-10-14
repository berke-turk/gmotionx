import asyncio
import json
import os
import sys
import re
import base64
import urllib.request
import urllib.error
import edge_tts

if sys.stdout.encoding != 'utf-8':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

# 🔑 .env Dosyasını Yükle (Harici kütüphane gerektirmeyen dahili parser)
def load_env():
    env_path = os.path.join(os.path.dirname(__file__), "..", ".env")
    if os.path.exists(env_path):
        try:
            with open(env_path, "r", encoding="utf-8") as f:
                for line in f:
                    line = line.strip()
                    if line and not line.startswith("#") and "=" in line:
                        k, v = line.split("=", 1)
                        k = k.strip()
                        v = v.strip().strip('"').strip("'")
                        if k and not os.environ.get(k):
                            os.environ[k] = v
        except Exception:
            pass

load_env()

# 📁 Ses Kataloğunu Yükle
VOICES_FILE = os.path.join(os.path.dirname(__file__), "..", "config", "voices.json")
CATALOG = []

if os.path.exists(VOICES_FILE):
    try:
        with open(VOICES_FILE, "r", encoding="utf-8") as f:
            CATALOG = json.load(f)
    except Exception as e:
        print(f"[!] voices.json okunamadi: {e}")

if not CATALOG:
    CATALOG = [
        {"id": "ava", "name": "Ava", "provider": "edge-tts", "voiceKey": "en-US-AvaMultilingualNeural", "gender": "female", "rate": "+5%", "pitch": "+0Hz"},
        {"id": "emel", "name": "Emel", "provider": "edge-tts", "voiceKey": "tr-TR-EmelNeural", "gender": "female", "rate": "+6%", "pitch": "+0Hz"},
        {"id": "ahmet", "name": "Ahmet", "provider": "edge-tts", "voiceKey": "tr-TR-AhmetNeural", "gender": "male", "rate": "+4%", "pitch": "+0Hz"},
    ]

def find_voice(query: str):
    q = query.lower().strip()
    for v in CATALOG:
        if v["id"].lower() == q or v["name"].lower() == q:
            return v
    if q == "female":
        return next((v for v in CATALOG if v["id"] == "ava"), CATALOG[0])
    if q == "male":
        return next((v for v in CATALOG if v["id"] == "ahmet"), CATALOG[0])
    for v in CATALOG:
        if v.get("voiceKey", "").lower() == q:
            return v
    return CATALOG[0]

# --- 1. Edge-TTS Motoru (Ücretsiz & Dahili) ---
async def generate_edge_tts(text: str, output_audio: str, voice_info: dict):
    voice_key = voice_info.get("voiceKey", "en-US-AvaMultilingualNeural")
    rate = voice_info.get("rate", "+5%")
    pitch = voice_info.get("pitch", "+0Hz")
    
    communicate = edge_tts.Communicate(text, voice_key, rate=rate, pitch=pitch)
    sentences = []
    
    with open(output_audio, "wb") as audio_file:
        async for chunk in communicate.stream():
            if chunk["type"] == "audio":
                audio_file.write(chunk["data"])
            elif chunk["type"] == "SentenceBoundary":
                offset_sec = chunk["offset"] / 10_000_000.0
                duration_sec = chunk["duration"] / 10_000_000.0
                sentence_text = chunk["text"].strip()
                if sentence_text:
                    sentences.append({
                        "text": sentence_text,
                        "start": offset_sec,
                        "end": offset_sec + duration_sec,
                        "duration": duration_sec
                    })
    return sentences

# --- 2. Google Gemini 2.0 Audio Motoru ---
def generate_gemini_audio(text: str, output_audio: str, voice_info: dict):
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        raise ValueError(
            "❌ GEMINI_API_KEY bulunamadı! Lütfen .env dosyanıza 'GEMINI_API_KEY=...' ekleyin "
            "veya 'npm run create' ekranında Edge-TTS seslerini seçin."
        )
    
    voice_name = voice_info.get("voiceKey", "Puck")
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={api_key}"
    
    payload = {
        "contents": [
            {
                "parts": [
                    {"text": f"Lütfen aşağıdaki metni doğal, akıcı ve etkileyici bir Türkçe ile seslendir:\n\n{text}"}
                ]
            }
        ],
        "generationConfig": {
            "responseModalities": ["AUDIO"],
            "speechConfig": {
                "voiceConfig": {
                    "prebuiltVoiceConfig": {
                        "voiceName": voice_name
                    }
                }
            }
        }
    }
    
    req = urllib.request.Request(
        url,
        data=json.dumps(payload).encode("utf-8"),
        headers={"Content-Type": "application/json"}
    )
    
    with urllib.request.urlopen(req) as response:
        res_data = json.loads(response.read().decode("utf-8"))
        
    parts = res_data.get("candidates", [{}])[0].get("content", {}).get("parts", [])
    inline_audio = next((p["inlineData"] for p in parts if "inlineData" in p), None)
    
    if not inline_audio or "data" not in inline_audio:
        raise RuntimeError("Gemini'den ses verisi alınamadı.")
    
    audio_bytes = base64.b64decode(inline_audio["data"])
    with open(output_audio, "wb") as f:
        f.write(audio_bytes)
        
    print(f"[OK] Gemini ({voice_name}) sesi oluşturuldu: {len(audio_bytes)} bayt")

# --- 3. OpenAI / ChatGPT TTS Motoru ---
def generate_openai_audio(text: str, output_audio: str, voice_info: dict):
    api_key = os.environ.get("OPENAI_API_KEY")
    if not api_key:
        raise ValueError(
            "❌ OPENAI_API_KEY bulunamadı! Lütfen .env dosyanıza 'OPENAI_API_KEY=...' ekleyin "
            "veya ücretsiz Edge-TTS seslerini seçin."
        )
    
    voice_name = voice_info.get("voiceKey", "alloy")
    url = "https://api.openai.com/v1/audio/speech"
    
    payload = {
        "model": "tts-1",
        "input": text,
        "voice": voice_name
    }
    
    req = urllib.request.Request(
        url,
        data=json.dumps(payload).encode("utf-8"),
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json"
        }
    )
    
    with urllib.request.urlopen(req) as response:
        audio_bytes = response.read()
        
    with open(output_audio, "wb") as f:
        f.write(audio_bytes)
        
    print(f"[OK] OpenAI ({voice_name}) sesi oluşturuldu: {len(audio_bytes)} bayt")

# --- Fonetik Sözlük Yükleyici & Çevirici ---
def load_pronunciations():
    p_path = os.path.join(os.path.dirname(__file__), "..", "config", "pronunciations.json")
    if os.path.exists(p_path):
        try:
            with open(p_path, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception as e:
            print(f"[!] pronunciations.json okunamadı: {e}")
    return {}

def apply_pronunciations(text: str, pronunciations: dict):
    if not pronunciations:
        return text
    processed = text
    # Kelime sınırlarına duyarlı, büyük/küçük harf duyarsız değiştirme
    for word, phoneme in pronunciations.items():
        pattern = re.compile(rf'\b{re.escape(word)}\b', re.IGNORECASE)
        processed = pattern.sub(phoneme, processed)
    return processed

# --- Kelime Zamanlaması Çıkarıcı (Orijinal Yazımı Koruyarak) ---
def build_words_from_sentences(sentences, original_text, total_est_duration=None):
    orig_words = original_text.split()
    all_words = []
    word_idx = 0

    if sentences:
        for s in sentences:
            s_spoken_words = s["text"].split()
            s_word_count = len(s_spoken_words)
            s_orig_words = orig_words[word_idx : word_idx + s_word_count]
            word_idx += s_word_count

            # Eğer kelime sayısı eşleşmezse orijinal kelimeleri baz al
            if len(s_orig_words) != s_word_count:
                s_orig_words = s_spoken_words

            char_counts = [max(1, len(w)) for w in s_orig_words]
            total_chars = sum(char_counts) or 1
            current_time = s["start"]
            sentence_dur = s["duration"]

            for w, count in zip(s_orig_words, char_counts):
                w_dur = (count / total_chars) * sentence_dur
                w_start = round(current_time, 3)
                w_end = round(current_time + w_dur, 3)
                all_words.append({
                    "text": w,
                    "start": w_start,
                    "end": w_end
                })
                current_time += w_dur
    else:
        # Cümle zamanlaması yoksa tahmini dağıt
        dur = total_est_duration or max(10.0, len(orig_words) * 0.42)
        char_counts = [max(1, len(w)) for w in orig_words]
        total_chars = sum(char_counts) or 1
        current_time = 0.0
        for w, count in zip(orig_words, char_counts):
            w_dur = (count / total_chars) * dur
            all_words.append({
                "text": w,
                "start": round(current_time, 3),
                "end": round(current_time + w_dur, 3)
            })
            current_time += w_dur

    return all_words

async def generate_audio_pipeline(text: str, output_audio: str, output_json: str, voice_info: dict):
    provider = voice_info.get("provider", "edge-tts")
    voice_name = voice_info.get("name", "Bilinmeyen")
    print(f"[*] Sağlayıcı: {provider.upper()} | Seslendirmen: {voice_name} ({voice_info.get('voiceKey')})")

    # 1. Yabancı / Teknik Terimlerin Türkçe Doğal Fonetik Çevirisi
    pronunciations = load_pronunciations()
    spoken_text = apply_pronunciations(text, pronunciations)
    if spoken_text != text:
        print("[*] Fonetik Kural Devrede: 'Docker' -> 'dakır', 'Python' -> 'paytın' vb. doğal seslendiriliyor.")
        print("    (Not: Altyazılarda ve ekranda orijinal teknik yazım korunacak!)")

    sentences = []
    if provider == "gemini":
        generate_gemini_audio(spoken_text, output_audio, voice_info)
    elif provider == "openai":
        generate_openai_audio(spoken_text, output_audio, voice_info)
    else:
        # Varsayılan ve ücretsiz: Edge-TTS
        sentences = await generate_edge_tts(spoken_text, output_audio, voice_info)

    # 2. Altyazılar için orijinal yazımı ('Docker', 'API') kullanarak senkron üret
    all_words = build_words_from_sentences(sentences, text)

    with open(output_json, "w", encoding="utf-8") as json_file:
        json.dump(all_words, json_file, ensure_ascii=False, indent=2)

    meta_path = os.path.join(os.path.dirname(output_audio), "voice_metadata.json")
    with open(meta_path, "w", encoding="utf-8") as meta_file:
        json.dump(voice_info, meta_file, ensure_ascii=False, indent=2)

    total_duration = all_words[-1]["end"] if all_words else 0
    print(f"[OK] Ses kaydedildi: {output_audio}")
    print(f"[OK] Seslendirmen meta kaydedildi: {meta_path}")
    print(f"[OK] {len(all_words)} kelime zamanlamasi olusturuldu (Sure: {total_duration:.2f}s): {output_json}")
    return total_duration

if __name__ == "__main__":
    voice_arg = sys.argv[1] if len(sys.argv) > 1 else "ava"
    selected_voice_info = find_voice(voice_arg)

    script_text = ""
    # 1. Komut satırından direkt metin verilmişse (2. parametre)
    if len(sys.argv) > 2 and sys.argv[2].strip():
        script_text = sys.argv[2].strip()

    # 2. public/video_script.json dosyasından oku
    script_json_path = os.path.join(os.path.dirname(__file__), "..", "public", "video_script.json")
    if not script_text and os.path.exists(script_json_path):
        try:
            with open(script_json_path, "r", encoding="utf-8") as f:
                s_data = json.load(f)
                script_text = s_data.get("scriptText") or s_data.get("fullScript") or ""
        except Exception as e:
            print(f"[!] video_script.json okunamadı: {e}")

    # 3. Hala yoksa yedek metin
    if not script_text:
        script_text = "Teknoloji dünyasında efsaneler değil, bizzat çalışan kodlar ve sistemler konuşur."

    print(f"[*] Seslendirilecek Metin ({len(script_text)} karakter):\n\"{script_text[:100]}...\"")
    os.makedirs("public", exist_ok=True)
    asyncio.run(generate_audio_pipeline(
        script_text, 
        "public/voice.mp3", 
        "public/subtitles.json", 
        selected_voice_info
    ))
