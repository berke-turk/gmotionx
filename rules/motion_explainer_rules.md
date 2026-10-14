# 🎬 AUTOREEL: KREATİF DİREKTÖR & MOTION GRAPHICS KURAL SETİ

Bu kural seti, projeyi kim açarsa açsın (sen veya projeyi paylaştığın bir arkadaşın) Antigravity AI asistanının **her zaman** ve **her konuda** eksiksiz uygulayacağı değişmez prodüksiyon prensipleridir.

---

### 1. 🎯 GÖRSEL TASARIM & BASİTLİK KURALI (HERO OBJECT ODAKLI)
* **Asla karmaşık, minik veya kalabalık masaüstü bileşenleri yapma.** Bir sosyal medya kullanıcısı telefonu tek eliyle kaydırırken görseli ilk 0.5 saniyede anlamalıdır.
* **Merkez Sahne Kuralı:** Görsel illüstrasyon ekranın tavanına sıkışamaz. Ekranın tam göz hizasında (`top: 190px` ile `1000px` arasında) devasa ve dolgun bir ana kahraman (Hero Object) olarak konumlandırılır.
* **Mobil Ölçeklendirme:**
  * İkonlar en az **36px - 48px** olmalı.
  * Başlıklar en az **40px - 52px** olmalı.
  * Kart içi metinler en az **18px - 22px** olmalı.
  * Altyazılar `top: 1160px` seviyesinde büyük ve okunaklı olmalı.

---

### 2. ⚡ ÇİZİMLER ARASI ETKİLEŞİM & HAREKET KURALI
* Statik, hareketsiz yan yana kutular **YASAKTIR**.
* Çizimler birbiriyle fiziksel etkileşime girmelidir:
  * Parçalar yaylanarak ana konteynerin içine girmeli (`spring physics`).
  * Kilitler veya onay damgaları mühürlenmeli.
  * Hatalı ve eski bahanelerin üstünden **gerçek zamanlı kırmızı çizgi (`strikethrough`)** geçmeli.
  * Hedef cihazlara veya sunuculara ışın yolları / bağlantı hatları yayılmalı.
  * Sayı sayaçları canlı geri saymalı, grafik eğrileri fırlayarak hedefe kilitlenmeli.

---

### 3. 🔊 SES EFEKTLERİ (SFX) VE İŞİTSEL MİMARİ
* Görsel geçişler ve animasyon kırılma anları işitsel efektlerle desteklenmelidir:
  * Yaylanarak ekrana girişlerde: `Whoosh / Swish`
  * Modüller konteynere oturduğunda: `Pop / Snap`
  * Güvenlik kilidi kapandığında: `Lock Click`
  * Hata ve çöküş anında: `Glitch / Warning Buzzer`
  * Otoriter hüküm ve damga slamming anında: `Heavy Stamp Thud`
  * Dijital sayaçlarda: `Quick Ticker / Chime`

---

### 4. 🗣️ ÇİFT HATLI DİNAMİK FONETİK SİSTEMİ (DUAL-TRACK PHONETICS)
* **Kural:** Yabancı ve teknik terimler (Örn: *Docker, Python, API, Cache, Linux, Node.js, Kubernetes* vb.) Türkçe ses motoru tarafından literal okunamaz (*"dokker"* denilemez).
* **Konuya Özel Otomatik Güncelleme:**
  * Her yeni video konusunda AI, metindeki yabancı sözcükleri tespit eder ve `config/pronunciations.json` sözlüğüne doğal Türkçe okunuşlarını kaydeder (*"dakır", "paytın", "ey pi ay"*).
  * **Seslendirme Motoru (TTS):** Fonetik metni okur (`"dakır"`).
  * **Ekranda ve Altyazıda:** Orijinal teknik yazım (`"DOCKER"`) korunur! Asla ekrana "dakır" yazılmaz.

---

### 5. 🔍 APİFY İNTERNET VE GÖRSEL ANLATIM TEKNİĞİ ARAŞTIRMASI
* **Her zaman önce kullanıcıya sor:** *"Bu konu için Apify ile internet ve görsel trend araştırması yapılsın mı?"*
* **Kullanıcı izin verirse:**
  * Yalnızca kuru bilgi/istatistik arama.
  * **Özellikle şu sorunun cevabını araştır:** *"Dünyadaki en iyi viral yaratıcılar ve explainer kanalları (Vox, Kurzgesagt, Veritasium vb.) bu kavramı zihinlerde canlandırmak için hangi görsel metaforu, benzetmeyi ve çizim tekniğini kullanıyor?"*
  * Bulunan metaforu sahnelere doğrudan uygula.

---

### 6. 🎨 5 TASARIM MİMARİSİ (DESIGN SYSTEMS)
Seçilen tema sabit bir kutu şablonu değil, görsel tasarım kurallarıdır:
1. **Neo-Brutalism:** Warm Cream zemin, 4px sert siyah çerçeveler, 8px sert gölgeler, Acid Yellow vurgular.
2. **Glassmorphism & Motion:** Derin siber koyu zemin, neon cyan & purple hareketli ışık küreleri, buzlu cam (`backdropFilter: blur`).
3. **Swiss / International Typographic:** Modernist ızgara, katı asimetri, İsviçre Kırmızısı (`#E30613`), keskin köşeler.
4. **Organic / Warm Minimalism:** Terracotta, Sage Green ve kum tonları, yumuşak kavisler, doğal akış.
5. **Paper & Cutout Explainer:** Milimetrik kareli defter kâğıdı, kırmızı dikey marjin çizgisi, koli bandı (`MaskingTape`), sarı fosforlu kalem, stop-motion hafif kâğıt titremesi.

---

### 7. 🎥 SİNEMATİK DİREKTÖR, KİNETİK TİPOGRAFİ, MORFOLOJİ & 3D KURALI
* **Fluid Camera Moves:** Sahne asla ölü ve sabit kalamaz. `FluidCamera` ile sürekli yumuşak dolly-in (1.0 -> 1.15), pan, 3D tilt ve organik mikro-titreme (`enableMicroDrift`) uygulanır.
* **Kinetic Typography:** Başlıklar ve vurgu kelimeleri yaylanarak (`spring`), açısal ivmeyle ve patlayan ölçekle (`scale: 1.4 -> 1.0`) sahneye çarpar. Anahtar kelime neon/acid ışıkla parlar.
* **Morphing Shapes:** Konunun ana soyut mantığı `@remotion/paths` ile bir görsel metafordan diğerine pürüzsüzce dönüşür (Örn: `circle` -> `hexagon`, `square` -> `chip`, `star` -> `shield`).
* **Gerektiği Yerde 3D Uzamsallık:** Mimari, katmanlar veya derin mekanizmalar anlatılırken `Scene3DContainer` ile izometrik 3D uzay, `translateZ` derinliği ve dinamik ışıklandırma kullanılır.
* **Her Zaman Konuya Özel:** Asla jenerik kalıp kutu kullanılmaz; metafor ve 3D tasarım bizzat konunun özünden türetilir (`CINEMATIC_PROMPT_SYSTEM.md`).

---

### 8. 🏛️ 9 BÜYÜK VİRAL KANAL MİMARİSİ (GENRE ARCHITECTURES)
Kullanıcı herhangi bir konu verdiğinde, video sabit bir kalıba sokulmaz; doğrudan konuya ait olan kanal mimarisine aktarılır (`d:/apps/remotion/rules/channel_genre_training.md`):
1. **`automotive` (bilgilitampon):** Pure black void, zemin yansıması, tork/devir göstergesi, mekatronik uyarı damgası.
2. **`islamic` (islamvemantik):** Vintage parşömen, kobalt mavisi hat sanatı, kırmızı elle çizilen odak halkası, nur kapısı.
3. **`legal` (hukukharitasi):** Milimetrik adli kâğıt, dosya no, altın manşet, kare olay rekonstrüksiyonu, TCK madde hükmü.
4. **`math` (mathgine.official):** Kozmik lacivert ızgara, dev soru, animasyonlu kesikli ispat çubuğu, sayı doğrusu.
5. **`sound` (thel.ab67):** Obsidyen void, polar osiloskop halkaları, frekans spektrumu, piyano akor oranı, canlı Hz.
6. **`psychology` (neden.io):** Fildişi zemin, ultra-condensed 2 satırlı başlık, 3D soft clay figür, uçuşan kelimeler, artan sayaç hapı.
7. **`cinema` (schole444):** Keten zemin, ders künyesi, vizör köşebentleri `┌ ┐ └ ┘`, yanıp sönen `REC`, segmentli ilerleme çubuğu.
8. **`geopolitics` (Johnny Harris & Vox):** 3D izometrik eğimli harita, kavisli ticaret/uçuş rotası, radar hedef pini, darboğaz telemetrisi.
9. **`finance` (Bloomberg & Wall Street):** Derin finans terminali, canlı mum grafik (candlestick), kümülatif enflasyon eğrisi, reel kayıp mukayesesi.


