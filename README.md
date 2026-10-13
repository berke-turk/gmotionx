# ⚡ AutoReel Engine

> **Açık Kaynaklı, Modüler ve Prompt Odaklı Programatik Video Üretim Motoru**  
> Remotion ve Yapay Zeka (LLM + TTS) altyapısı üzerine inşa edilmiş; sosyal medya (Reels, Shorts, TikTok) için uçtan uca otomatik video üreten, tamamen genişletilebilir ve özelleştirilebilir bir video fabrikası.

---

## 💡 Temel Felsefe: "Prompt & Markdown Odaklı Mimari"

Bu proje tek bir tasarıma veya tek bir formata bağlı **değildir**. 

Sistem; kurgu kurallarını, senaryo şablonlarını ve görsel tasarım dillerini **Markdown (`.md`) dosyaları** üzerinden öğrenir ve yönetir. Bu sayede:
* **Farklı Nişler İçin Ayrı Promptlar:** Tarih, teknoloji, felsefe, ekonomi veya mizah için ayrı `.md` rehberleri ekleyip yapay zekayı bu kurallara göre yönlendirebilirsiniz.
* **Genişletilebilir Tasarım Sistemleri:** Dilediğiniz görsel kimliği (Neo-Brutalism, Minimalist Dark, Cyberpunk, 3D Motion, Gazete/Kolaj vb.) ayrı bir stil dosyası veya tema olarak sisteme ekleyebilirsiniz.
* **Açık Kaynak Katkısı:** Topluluk ve geliştiriciler yeni animasyon bileşenleri, infografikler veya senaryo promptları ekleyerek ekosistemi kolayca büyütebilir.

---

## 🌟 Çekirdek Yetenekler

### 1. 🧠 Modüler Kurgu ve Prompt Sistemi
* Videoların metin yapısı, kanca (hook) formülleri ve sahne akışı doğrudan Markdown dokümanlarından ([`PROMPT_SYSTEM.md`](PROMPT_SYSTEM.md)) beslenir.
* Kendi promptlarınızı veya alt stillerinizi yeni `.md` dosyaları olarak projeye dahil edebilir, AI modelinizi bu kurallara göre eğitebilirsiniz.

### 2. 🎨 Tak-Çıkar Görsel Temalar & Animasyonlar
* Renk paletleri, çerçeve kalınlıkları, gölge stilleri ve tipografi kuralları koddan bağımsız olarak yapılandırılabilir ([`src/theme.ts`](src/theme.ts)).
* Proje içinde örnek olarak **Neo-Brutalism** teması ve infografik kartları yer alır; ancak tek satırla dilediğiniz başka bir tasarım şablonuna geçebilirsiniz.
* Görsel hiyerarşi kuralları sayesinde metin kalabalığı oluşmaz; üst alanda infografikler ve animasyonlar yer alırken, alt alanda kinetik altyazı odak noktası olur.

### 3. 🎙️ Semantik Altyazı & Ses Senkronizasyonu
* **Nefes ve Duraklama Koruması:** Cümle bitişleri (`. ! ?`) ve konuşmacının soluklandığı sessizlik anları algılanır; sonraki cümlenin kelimeleri ekrana asla vaktinden önce gelmez.
* **Türkçe ve Çok Dilli Uyum:** Tüm özel karakterler (`İ, Ğ, Ş, Ç, Ö, Ü`) kayıpsız ve yüksek tipografik kalitede işlenir.

### 4. 🔍 Otomatik Kalite Denetimi (Self-Audit)
* Render almadan önce videonun kilit anlarından otomatik kareler yakalanır (`npm run audit`).
* Çakışma, okunabilirlik ve kontrast denetimi yapılarak hatasız çıktılar güvenceye alınır.

### 5. 📂 Esnek Girdi ve Veri Entegrasyonu
* [`files/`](files/) klasörüne atılan herhangi bir ham metin (`.txt`, `.md`), hazır ses veya görsel dosyası otomatik olarak işlenir.
* İstenirse **Apify** gibi harici veri kazıyıcılarla trend konular internetten toplanarak videoya dönüştürülebilir.

---

## 📁 Proje Mimarisi

```text
├── files/                 # Kaynak girdi alanı (Geçici metinler, notlar, sesler)
├── src/
│   ├── components/        # Modüler hareketli grafik bileşenleri
│   │   ├── VisualIllustration.tsx  # İnfografikler, ikili karşılaştırmalar, şemalar
│   │   ├── KineticCaptions.tsx     # Cümle duyarlı dinamik altyazı motoru
│   │   ├── AudioVisualizer.tsx     # Canlı ritmik frekans dalgası
│   │   ├── HistoricalStamp.tsx     # Yaylanmalı arşiv/onay mühürleri
│   │   ├── FloatingParticles.tsx   # Sinematik derinlik parçacıkları
│   │   ├── HeaderBadge.tsx         # Kategori başlık rozeti
│   │   └── ProgressBar.tsx         # Tepe izleme çubuğu
│   ├── theme.ts           # 🎨 Değiştirilebilir renk ve görsel stil yapılandırması
│   ├── utils/chunking.ts  # Cümle ve duraklama senkronizasyon algoritması
│   └── ReelComposition.tsx# 1080x1920 dikey kompozisyon yapısı
├── scripts/
│   ├── generate_audio.py  # Nöral TTS ve kelime zamanlaması çıkarıcı
│   ├── audit_frames.mjs   # Kalite denetim kareleri render scripti
│   ├── pipeline.mjs       # Uçtan uca tek komut video üretim hattı
│   └── apify_research.mjs # Veri ve trend kazıma entegrasyonu
├── PROMPT_SYSTEM.md       # 📖 Temel prompt sistematiği ve kurgu kuralları
└── ARCHITECTURE.md        # 🏛️ Uçtan uca sistem mimarisi
```

---

## 🚀 Kurulum

### 1. Gereksinimler
- **Node.js:** v18+ 
- **Python:** 3.10+ (Doğal ses motoru için)

### 2. Bağımlılıkları Kurun
```bash
# Node paketlerini kur
npm install

# Doğal ses motorunu kur
pip install edge-tts
```

### 3. Çevre Değişkenleri
Trend kazıma veya harici API'ler için `.env.example` dosyasını kopyalayın:
```bash
cp .env.example .env
```

---

## 🛠️ Temel Komutlar

```bash
# files/ altındaki girdiden uçtan uca video üret
npm run generate

# Remotion Studio'yu tarayıcıda canlı aç ve düzenle
npm run dev

# Videonun kilit anlarını (frame) incelemek için test kareleri al
npm run audit

# Nihai 1080x1920 MP4 videoyu render al
npm run render
```

---

## 🧩 Kendi Tarzını ve Tasarımını Nasıl Eğitirsin?

1. **Yeni Bir Prompt / Senaryo Kuralı Eklemek:**  
   [`PROMPT_SYSTEM.md`](PROMPT_SYSTEM.md) dosyasını referans alarak yeni bir Markdown dosyası oluşturabilir (örn: `prompts/finance_reels.md`), kendi nişinize özel giriş kancaları ve anlatım kalıpları tanımlayabilirsiniz.

2. **Yeni Bir Görsel Stil Tanımlamak:**  
   [`src/theme.ts`](src/theme.ts) içerisine kendi renk paletinizi, çerçeve kalınlıklarınızı ve gölge kurallarınızı ekleyip `currentTheme` olarak atayın.

3. **Yeni Bir Animasyon / Görsel Çizmek:**  
   [`src/components/VisualIllustration.tsx`](src/components/VisualIllustration.tsx) içerisine yeni bir bileşen tipi ekleyerek kendi grafiklerinizi, ikonlarınızı veya hareketli tablolarınızı ekleyin.

---

## 🤝 Katkıda Bulunun (Open Source)

Bu proje topluluğun geliştirmesine tamamen açıktır!
- Yeni tasarım dilleri ve tema varyasyonları,
- Yeni hareketli grafik bileşenleri ve görselleştirmeler,
- Farklı diller ve nişler için optimize edilmiş `.md` prompt şablonları,
için Pull Request (PR) açabilir veya tartışmalara katılabilirsiniz.

---

## 📄 Lisans
Açık kaynak olarak paylaşılmaktadır. Remotion altyapısı hakkında ticari lisans gereksinimleri için [Remotion License](https://remotion.dev/license) sayfasını inceleyebilirsiniz.
