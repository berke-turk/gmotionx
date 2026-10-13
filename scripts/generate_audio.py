import asyncio
import json
import os
import sys
import edge_tts

if sys.stdout.encoding != 'utf-8':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

VOICE = "tr-TR-AhmetNeural" # Erkek ve etkileyici ton
RATE = "+10%" # Dinamik tempo

async def generate_speech_with_timestamps(text: str, output_audio: str, output_json: str, voice: str = VOICE):
    print(f"[*] Ses uretiliyor: {voice}...")
    communicate = edge_tts.Communicate(text, voice, rate=RATE)
    
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

    # Cümleleri kelimelere ayırıp orantısal zaman damgası çıkaralım
    all_words = []
    for s in sentences:
        words = s["text"].split()
        if not words:
            continue
        
        # Kelimelerin harf uzunluğuna göre süre paylaştırımı
        char_counts = [max(1, len(w)) for w in words]
        total_chars = sum(char_counts)
        
        current_time = s["start"]
        sentence_dur = s["duration"]
        
        for w, count in zip(words, char_counts):
            w_dur = (count / total_chars) * sentence_dur
            w_start = round(current_time, 3)
            w_end = round(current_time + w_dur, 3)
            all_words.append({
                "text": w,
                "start": w_start,
                "end": w_end
            })
            current_time += w_dur

    with open(output_json, "w", encoding="utf-8") as json_file:
        json.dump(all_words, json_file, ensure_ascii=False, indent=2)

    total_duration = all_words[-1]["end"] if all_words else 0
    print(f"[OK] Ses kaydedildi: {output_audio}")
    print(f"[OK] {len(all_words)} kelime zamanlamasi olusturuldu (Toplam sure: {total_duration:.2f}s): {output_json}")
    return total_duration

if __name__ == "__main__":
    script_text = (
        "En Atatürkçülerin bile yanlış bildiği dev bir tarihi yanılgı var! "
        "Çoğu kişi İnkılapçılığı durmaksızın değişmek sanıyor. "
        "Oysa 1931 resmi belgelerine göre İnkılapçılık: Değişmek değil, "
        "milletin fedakarlıkla kazandığı devrimleri sonuna kadar korumaktır! "
        "Yakup Kadri'nin meşhur 'o zaman donar kalırız çocuk' anısı ise bir şehir efsanesidir. "
        "Atatürk 1935'te kendi el yazısıyla 'Kamâlizm prensipleri' diyerek bunun net bir öğreti olduğunu bizzat yazmıştır. "
        "Peki aklın ve bilimin rehberliği? Bu İnkılapçılık değil, doğrudan Laikliktir! "
        "Çünkü Laiklik; kanun yaparken dogmaları değil, doğrudan hayatı ve bilimi kılavuz almaktır. "
        "Tarih kulaktan dolma anılarla değil, resmi belgelerle okunur. "
        "Sen bu farkı biliyor muydun? ."
    )
    
    os.makedirs("public", exist_ok=True)
    asyncio.run(generate_speech_with_timestamps(script_text, "public/voice.mp3", "public/subtitles.json"))
