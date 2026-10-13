# ⚡ Remotion Auto-Video Factory (Gemini + Apify + Neo-Brutalism)

> **Açık Kaynaklı Otonom Kısa Video (Reels / Shorts / TikTok) Üretim Motoru.**  
> Bir konu veya metin dosyasından yola çıkarak; senaryo yazımı, seslendirme, altyazı senkronizasyonu, hareketli grafikler ve video render işlemlerini uçtan uca otomatize eder.

---

## 🌟 Öne Çıkan Özellikler

- 🧠 **Prompt Odaklı Mimari (`PROMPT_SYSTEM.md`):** Temel kurgu, senaryo ritmi ve prompt mühendisliği kuralları doğrudan Markdown dokümanları üzerinden yönetilir ve geliştirilir.
- 🎨 **Değiştirilebilir Tema Mimarisi (`src/theme.ts`):** 
  - **Varsayılan Aktif Tema:** **Neo-Brutalism** (Warm Cream, Ink Black, Acid Yellow, Signal Orange).
  - Kolayca yeni temalar (Cyberpunk, 3D Motion, Minimalist Dark vb.) eklenebilir.
- 🎯 **Zorunlu Sorun/Paradoks Kancası (0-2 sn):** Her video konuya özel yakıcı bir problem sorusuyla (*"Uçak motoru kapansa bile neden düşmez, hiç merak ettin mi?"*) izleyiciyi kilitler.
- 🎙️ **Kusursuz Türkçe Seslendirme & Semantik Senkron:** 
  - `edge-tts` nöral sesleri ile sıfır maliyetli doğal Türkçe ses.
  - Cümle ve noktalama (`. ! ?`) duyarlı altyazı motoru; duraklamalarda yeni cümlenin erken ekrana gelmesi engellenir.
- 🔍 **Kendi Kendini Denetleme (Self-Audit):** Render öncesi 5 kritik anın karesini yakalayarak font, kontrast ve çakışma kontrolü yapar.
- 🌐 **Apify Veri Entegrasyonu:** Trend konuları veya rakip içerikleri kazıyıp videoya dönüştürme desteği.

---

## 🏗️ Sistem Mimarisi & Klasör Yapısı

```text
├── files/                 # Girdi klasörü (Geçici .txt, .md veya kaynak dosyalar)
├── src/
│   ├── components/        # Modüler hareketli grafik bileşenleri
│   │   ├── VisualIllustration.tsx  # İnfografikler, ikili karşılaştırmalar (❌ vs ✅)
│   │   ├── KineticCaptions.tsx     # Cümle duyarlı kinetik altyazı motoru
│   │   ├── AudioVisualizer.tsx     # Canlı ritmik frekans dalgası (equalizer)
│   │   ├── HistoricalStamp.tsx     # Slam-spring efektli resmi arşiv damgası
│   │   ├── FloatingParticles.tsx   # Derinlik katan süzülen parçacıklar
│   │   ├── HeaderBadge.tsx         # Kategori başlık rozeti
│   │   └── ProgressBar.tsx         # Tepe izleme çubuğu
│   ├── theme.ts           # 🎨 Değiştirilebilir renk ve stil yapılandırması
│   ├── utils/chunking.ts  # Cümle ve nefes aralıklarını koruyan altyazı algoritması
│   └── ReelComposition.tsx# Ana 1080x1920 dikey kompozisyon
├── scripts/
│   ├── generate_audio.py  # TTS ve kelime zamanlaması çıkarıcı
│   ├── audit_frames.mjs   # Kalite denetim kareleri render betiği
│   ├── pipeline.mjs       # Uçtan uca tek komut video üretim betiği
│   └── apify_research.mjs # Apify araştırma entegrasyonu
├── PROMPT_SYSTEM.md       # 📖 Kurgucu ve senaryo prompt sistematiği
└── ARCHITECTURE.md        # 🏛️ Uçtan uca mimari detayları
```

---

## 🚀 Hızlı Başlangıç (Kurulum)

### 1. Gereksinimler
- **Node.js:** v18 veya üzeri
- **Python:** 3.10 veya üzeri (Ses motoru için)

### 2. Bağımlılıkları Yükleyin
```bash
# Node paketlerini yükle
npm install

# Ses motorunu yükle
pip install edge-tts
```

### 3. Çevre Değişkenleri (.env)
Kök dizindeki `.env.example` dosyasını `.env` olarak kopyalayın (Apify araştırması opsiyoneldir):
```bash
cp .env.example .env
```

---

## 🎬 Kullanım & Komutlar

| Komut | Açıklama |
| :--- | :--- |
| `npm run generate` | `files/` altındaki metni okur, sesi üretir ve nihai **MP4** videoyu basar. |
| `npm run dev` | Remotion Studio'yu tarayıcıda açar; canlı olarak kare kare izleyin ve düzenleyin. |
| `npm run audit` | Videonun 5 kilit karesini (`out/audit/`) yakalar; kalite ve senkronu kontrol edin. |
| `npm run render` | Mevcut kompozisyonu doğrudan `out/final_reel.mp4` olarak render alır. |

---

## 🎨 Yeni Tasarım / Tema Nasıl Eklenir?

Sistem tamamen tema dostudur. Yeni bir tasarım eklemek veya değiştirmek için [`src/theme.ts`](file:///d:/apps/remotion/src/theme.ts) dosyasını düzenlemeniz yeterlidir:

```typescript
export const MY_CUSTOM_THEME: ThemeConfig = {
  name: "Cyberpunk",
  colors: {
    background: "#0F172A",
    inkBlack: "#000000",
    acidYellow: "#00F0FF", // Neon Cyan
    signalOrange: "#FF007F", // Neon Pembe
    pureWhite: "#FFFFFF",
  },
  styles: {
    border: "3px solid #00F0FF",
    borderThick: "5px solid #00F0FF",
    shadowHard: "6px 6px 0px #FF007F",
    shadowMedium: "4px 4px 0px #FF007F",
    shadowSmall: "2px 2px 0px #FF007F",
    borderRadius: "8px",
  },
};
```

---

## 🤝 Katkıda Bulunma (Contributing)

Bu repo açık kaynaklıdır! 
- Arkadaşlarınız ve topluluk üyeleri yeni prompt stratejilerini [PROMPT_SYSTEM.md](file:///d:/apps/remotion/PROMPT_SYSTEM.md) üzerinden geliştirebilir.
- Yeni animasyon bileşenleri ekleyebilir veya farklı nişler için görselleştirme kartları tasarlayabilir.
- PR (Pull Request) göndermekten çekinmeyin!

---

## 📄 Lisans
Bu proje açık kaynaklıdır. Remotion ticari lisans kuralları için [Remotion License](https://remotion.dev/license) sayfasını inceleyebilirsiniz.
