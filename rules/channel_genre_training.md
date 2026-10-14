# 🎬 VIRAL CHANNEL GENRE ARCHITECTURES & MOTION TRAINING GUIDE
> **Bu belge, Remotion projesinin kalıcı hafızasıdır.** 
> Yeni bir sohbet başlatıldığında bile Antigravity AI, bu mimarileri sıfırdan öğrenmek zorunda kalmadan doğrudan tanır ve kullanıcı bir konu verdiğinde otomatik olarak ilgili kanal mimarisine göre 10M izlenmeli, üst düzey dikey video üretir.

---

## 💎 TEMEL FELSEFE & UX KURALI: "ASLA ŞABLON YOK, HER ZAMAN KONUYA ÖZEL MİMARİ"

1. **Jenerik Podcast / Şablon Tuzağına Düşme:**
   - Ekrana sabit bir ses dalgası kutusu veya her konuda aynı görünen bir kart şablonu koymak KESİNLİKLE YASAKTIR.
   - Instagram Reels ve TikTok'ta milyonlarca izlenen kanalların sırrı, **her konunun kendi görsel dünyasını sıfırdan kurmasıdır**.

2. **Tek Sabit Unsur: Üst Süre İlerleme Çubuğu (`ProgressBar`):**
   - Ekranın en tepesindeki ince ilerleme çubuğu haricinde TÜM EKRAN, ELEMANLAR VE ALTYAZILAR DİNAMİKTİR.
   - **Anlatım Metni (Kinetik Altyazılar):**
     * Konumu sabit bir alt kutu değildir; sahneye ve konseptin kurgusuna göre;
       - `bottom` (Klasik alt güvenli bölge: `top: 1140px - 1180px`, alt platform UI'ından uzakta)
       - `center` (Ekranın tam ortası: kanca soruları, manifestolar veya mic-drop anlarında devasa boyutta)
       - `below_hero` (Ortadaki kahraman görsel veya 3D modelin hemen altında: `top: 820px - 980px`)
       - `top` (Üstte başlığın hemen altında: `top: 230px`)
     * Tipografi, renkler ve kapsül stili de doğrudan seçilen 9 kanal dünyasına adapte olur.

3. **Göz Ergonomisi & Focal Dimming (Bilişsel Yük Azaltma):**
   - **Focal Dimming:** Altyazı satırındaki konuşulmayan kelimeler `%42` opaklığa ve `0.96` ölçeğe çekilir. Konuşulan aktif kelime ise `%100` opaklık, yaylanma (`1.14x`) ve neon ışıltıyla öne fırlar. Bu sayede izleyicinin beyni yorulmaz, göz konuşmayı akıcı biçimde takip eder.
   - **Mobil Güvenli Alanlar (Safe Zones - 1080x1920):**
     * Üst 220px: Instagram/TikTok arama ve profil çubuğu güvenliği.
     * Alt 450px: Kullanıcı adı, açıklama metni ve ses bandı güvenliği. Kilit kartlar ve veriler `bottom: 280px` veya üzerinde tutulur.
     * Sağ 115px: Beğeni, yorum, kaydetme butonları güvenliği. Altyazı konteyneri `left: "45px"`, `right: "115px"` ile asla sağ butonların altına girmez.

4. **Görsel Sahne Özgürlüğü:**
   - Ekranda sabit hiçbir podcast bileşeni olamaz. Arka plan dokusu, ışıklandırma, metaforlar ve tipografi aşağıdaki 9 büyük kanal mimarisinden biri tarafından yönetilir.

---

## 🏛️ 7 BÜYÜK VİRAL KANAL MİMARİSİ (APIFY ARAŞTIRMASI İLE EĞİTİLMİŞ)

### 1. 🏎️ OTOMOTİV & MEKATRONİK MİMARİSİ (`bilgilitampon` Tarzı)
- **Kanal Referansı:** `@bilgilitampon`
- **Görsel İmza:** 
  - Pure Black derin zemin (`#050505`).
  - Aracın veya yedek parçanın altında gerçekçi parlak zemin yansıması (`linear-gradient(to bottom, transparent, rgba(56, 189, 248, 0.05))`).
  - 2 satırlı net Grotesk başlık (Örn: *"Makam arabası, / sınırda şanzıman."*).
  - Canlı titreyen Tork / Devir Göstergesi (`Gauge` ibresi, `%98` doluluk barı).
  - Mekatronik basınç kaçağı ve arıza damgası (`DQ200 KURU KAVRAMA`, kırmızı uyarı rozeti).
- **Renk Paleti:** Pure Void Black (`#050505`), Mekatronik Cyan (`#38BDF8`), Uyarı Sarısı (`#F59E0B`), Arıza Kırmızısı (`#EF4444`).
- **Hangi Konularda Kullanılır:** Otomobil motorları, şanzıman zaafları, makine mühendisliği, mekanik sınırlar, donanım arızaları.
- **Remotion Bileşeni:** `src/components/genres/AutomotiveEngineeringGenre.tsx` (`channelGenre: "automotive"`).

---

### 2. 📜 İSLAMİ & MANEVİ DÜŞÜNCE MİMARİSİ (`islamvemantik` Tarzı)
- **Kanal Referansı:** `@islamvemantik`
- **Görsel İmza:**
  - Vintage çizgili parşömen kâğıdı dokusu (`#F5EEDB`).
  - Kobalt mavisi / gece mavisi asil Arapça/Osmanlıca hat sanatı (`#1B3B6F`).
  - Anahtar kelimenin etrafında sonradan elle çizilmiş gibi animasyonla dolan **kırmızı mürekkep dairesi** (`#C81D25`).
  - Nur / Varlık kapısına açılan parıltılı vektör kemer (`#D4AF37`).
  - Asil klasik Serif Türkçe meal ve felsefi tefekkür notu.
- **Renk Paleti:** Antik Parşömen (`#F5EEDB`), Hat Kobaltı (`#1B3B6F`), Elle Çizim Kırmızısı (`#C81D25`), Kutsal Altın (`#D4AF37`).
- **Hangi Konularda Kullanılır:** Kur'an tefsiri, felsefe, tasavvuf, ahlak, kadim medeniyetler, manevi derinlik.
- **Remotion Bileşeni:** `src/components/genres/IslamicSpiritualGenre.tsx` (`channelGenre: "islamic"`).

---

### 3. ⚖️ HUKUK & CEZA DAVASI REKONSTRÜKSİYONU (`hukukharitasi` Tarzı)
- **Kanal Referansı:** `@hukukharitasi`
- **Görsel İmza:**
  - Teknik milimetrik kareli adli defter kâğıdı (`#F8F9FA`).
  - Resmî dosya numarası ve adalet terazisi damgası (`DOSYA N° 005 | TCK UYGULAMASI`).
  - İtalik altın sarısı vurgulu editoryal gazete manşeti (`"Ateşin yoksa, saatin de mi yok?"`).
  - Kare kutu içinde olay anı canlandırması (şüpheli, mağdur ve olay mahalli vektörü).
  - TCK madde hükmü kartı (`TCK MD. 81/1 · KASTEN ÖLDÜRME / AĞIRLAŞTIRILMIŞ MÜEBBET`).
- **Renk Paleti:** Adli Kâğıt (`#F8F9FA`), Resmî Mavi (`#0B2545`), Adalet Sarısı (`#C5A059`), Suç Kırmızısı (`#DC2626`).
- **Hangi Konularda Kullanılır:** Meşru müdafaa, ceza hukuku, mahkeme kararları, suç davaları, anayasal haklar, etik açmazlar.
- **Remotion Bileşeni:** `src/components/genres/LegalCaseStudyGenre.tsx` (`channelGenre: "legal"`).

---

### 4. 📐 GÖRSEL MATEMATİK & GEOMETRİK İSPAT (`mathgine.official` Tarzı)
- **Kanal Referansı:** `@mathgine.official`
- **Görsel İmza:**
  - Kozmik derin lacivert ızgara zemin (`#030712`).
  - Neon parlayan degrade bölüm rozeti (`VISUAL MATH · #004`).
  - Devasa kışkırtıcı soru başlığı (*"why does 0.999... = 1?"*).
  - **Animasyonlu parça parça dolan kesikli ispat çubuğu** (`border: 3px dashed #00F2FE`, kademeli doluş).
  - Sayı doğrusu ve adım adım formül açılımı.
- **Renk Paleti:** Kozmik Gece (`#030712`), Elektrik Cyan (`#00F2FE`), Asit Lime (`#DFFF00`), Kar Beyazı (`#FFFFFF`).
- **Hangi Konularda Kullanılır:** Matematik paradoksları, mantık bilmeceleri, geometri ispatları, algoritma mantığı, fraktallar.
- **Remotion Bileşeni:** `src/components/genres/VisualMathGenre.tsx` (`channelGenre: "math"`).

---

### 5. 🔊 AKUSTİK, SES & FREKANS BİLİMİ (`thel.ab67` Tarzı)
- **Kanal Referansı:** `@thel.ab67`
- **Görsel İmza:**
  - Saf obsidyen siyah void (`#030303`).
  - **Dairesel Polar Osiloskop Dalgaları:** Merkezden dışarıya yayılan altın kehribar harmonik halkalar (`#FFB703`).
  - Frekans spektrumu cetveli (0 Hz - 20.000 Hz logaritmik çizelge).
  - Piyano oktav klavyesi ve akor oranı (`10 : 12 : 15`).
  - Titreşen canlı Hertz göstergesi (`432 Hz / 20 Hz`).
- **Renk Paleti:** Obsidyen Siyah (`#030303`), Rezonans Kehribarı (`#FFB703`), Vurgu Kırmızısı (`#E63946`), Akustik Beyaz (`#FFFFFF`).
- **Hangi Konularda Kullanılır:** Ses dalgaları, müzik teorisi, frekansın beyne etkisi, akustik rezonans, gürültü önleme, fısıltı fiziği.
- **Remotion Bileşeni:** `src/components/genres/AcousticSoundGenre.tsx` (`channelGenre: "sound"`).

---

### 6. 🧠 BİLİŞSEL PSİKOLOJİ & DAVRANIŞ BİLİMİ (`neden.io` Tarzı)
- **Kanal Referansı:** `@neden.io`
- **Görsel İmza:**
  - Sıcak fildişi / mat açık krem zemin (`#F4EFEA`).
  - **Dev Ultra-Condensed 2 Satırlı Başlık:**
    - 1. Satır: Mat Siyah (`#111111`) — Örn: *"İLK DİNLEYİŞTE"*
    - 2. Satır: Neon Turuncu (`#FF5500`) — Örn: *"BEĞENMEDİN Mİ?"*
  - **3D Soft Claymation Karakter:** Yumuşak radyal gölgeli, sevimli düşünen figür (elinde telefon/kitap).
  - Havada asılı açılı kinetik kelimeler (*"TRA" [turuncu + ses dalgaları]*, *"LA", "LA" [siyah]*).
  - Dinamik artan sayaç hapı (`DİNLEYİŞ ×10` - x1'den x10'a fırlayan canlı sayaç).
- **Renk Paleti:** Sıcak Fildişi (`#F4EFEA`), Derin Kömür (`#111111`), Neon Turuncu (`#FF5500`), Kil Gölgesi (`#C9C2B8`).
- **Hangi Konularda Kullanılır:** Psikolojik yanılgılar, alışkanlıklar, dopamin döngüsü, hafıza teknikleri, zihin tuzakları.
- **Remotion Bileşeni:** `src/components/genres/BehavioralPsychologyGenre.tsx` (`channelGenre: "psychology"`).

---

### 7. 🎬 SİNEMA DİLİ & KADRAJ VİZÖRÜ (`schole444` Tarzı)
- **Kanal Referansı:** `@schole444`
- **Görsel İmza:**
  - Sıcak keten / sanatsal kâğıt zemin (`#F5F2EB`).
  - Üst minimalist ders künyesi (`SİNEMA DİLİ / DERS 01` ve sağda kalın `44` geri sayımı).
  - Temiz Helvetica başlık (*"44 saniyede kadraj."*).
  - **Kamera Vizörü Kutusu:** 4 köşede belirgin `┌ ┐ └ ┘` vizör köşebentleri.
  - Sağ üstte yanıp sönen `REC` kırmızı kayıt noktası (`🔴`).
  - 1/3 Kuralı (Rule of Thirds) ince kadraj ızgarası ve altın oran figürü.
  - Vizörün altında **segmentli ilerleme çubuğu** (dersin adımları, aktif adım parlak kırmızı `#E63946`).
- **Renk Paleti:** Sanatsal Keten (`#F5F2EB`), Sinema Siyahı (`#111111`), Kayıt Kırmızısı (`#E63946`), Arşiv Grisi (`#8C877E`).
- **Hangi Konularda Kullanılır:** Sinematografi, yönetmenlik hileleri, görsel anlatı, fotoğrafçılık, renk teorisi, kurgu sanatı.
- **Remotion Bileşeni:** `src/components/genres/CinemaViewfinderGenre.tsx` (`channelGenre: "cinema"`).

### 8. 🌍 JEOPOLİTİK HARİTA & BÖLGE STRATEJİSİ (`Johnny Harris & Vox` Tarzı)
- **Referans:** Johnny Harris, Vox Borders, RealLifeLore
- **Görsel İmza:**
  - 3D izometrik eğimli harita düzlemi (`rotateX: 26deg`, `rotateZ: -8deg`).
  - Topografik kontur eğrileri ve neon kara parçası sınırları (`#38BDF8`).
  - **Animasyonlu kavisli ticaret / uçuş rotası** (`strokeDasharray: 1000` Bézier arc).
  - Yanıp sönen radar hedef pini ve konsantrik dalgalar (`#EF4444`).
  - Askerî telemetri HUD künyesi (GPS Koordinatı, Stratejik Boğaz genişliği ve hacim rozeti).
- **Renk Paleti:** Taktik Gece Laciverti (`#080D1A`), Radar Cyan (`#38BDF8`), Uyarı Kehribarı (`#F59E0B`), Hedef Kırmızısı (`#EF4444`).
- **Hangi Konularda Kullanılır:** Boğazlar, jeopolitik krizler, petrol yolları, savaş tarihi, sınır anlaşmazlıkları, küresel ticaret.
- **Remotion Bileşeni:** `src/components/genres/GeopoliticalMapGenre.tsx` (`channelGenre: "geopolitics"`).

---

### 9. 📈 MAKROEKONOMİ, FİNANS & PİYASA ŞOKU (`Bloomberg & Wall Street` Tarzı)
- **Referans:** Bloomberg Quicktake, Wall Street Journal Explainers, Humphrey Yang
- **Görsel İmza:**
  - Derin finans terminali ızgarası (`#080E1A`).
  - **Canlı Mum Grafik (Candlesticks):** Yeşil boğa (`#10B981`) ve kırmızı ayı (`#EF4444`) gövdeleri ve fitilleri.
  - Mumların üzerinden süzülen katlanarak artan büyüme/enflasyon eğrisi.
  - Dinamik yüzde sayacı (`+%68.4 ENFLASYON ŞOKU`).
  - Çift kutu reel kayıp vs alım gücü mukayesesi.
- **Renk Paleti:** Terminal Gece (`#080E1A`), Boğa Yeşili (`#10B981`), Ayı Kırmızısı (`#EF4444`), Ticker Cyan (`#38BDF8`).
- **Hangi Konularda Kullanılır:** Enflasyon, faiz kararları, alım gücü erimesi, borsa çöküşleri, kripto, makroekonomi.
- **Remotion Bileşeni:** `src/components/genres/FinancialMarketGenre.tsx` (`channelGenre: "finance"`).

---

### 10. 🌌 KOZMİK BİLİM & EVRENSEL ÖLÇEK (`Kurzgesagt – In a Nutshell` Tarzı)
- **Referans:** Kurzgesagt – In a Nutshell
- **Görsel İmza:**
  - Canlı derin neon kozmik degrade zemin (`radial-gradient(ellipse at 50% 35%, #1F104F 0%, #080517 75%, #03020A 100%)`).
  - **Squash & Stretch Kuantum/Atomik Küre:** Nefes alan organik yaylanma (`scaleX / scaleY` formül deformasyonu).
  - Canlı pembe, cyan ve sarı kesikli yörünge elipsleri ve dönen elektronlar.
  - Sol tarafta dikey **Kozmik Ölçek Cetveli** (`10^-15m` atom altından `10^26m` gözlemlenebilir evrene seyahat).
  - Canlı renk kontrastı: Neon Mor (`#7C3AED`), Hyper Pink (`#EC4899`), Elektrik Cyan (`#06B6D4`), Lazer Sarısı (`#FDE047`).
- **Hangi Konularda Kullanılır:** Kara delikler, evrenin sonu, entropi, virüsler, hücre biyolojisi, atom altı parçacıklar, derin uzay.
- **Remotion Bileşeni:** `src/components/genres/KurzgesagtCosmicGenre.tsx` (`channelGenre: "kurzgesagt"`).

---

### 11. ⬛ MİNİMAL BRUTALİST DÜŞÜNCE & SİSTEMLER (`Dan Koe & Yan Graphics` Tarzı)
- **Referans:** Dan Koe, Yan Graphics, Visual Thinking
- **Görsel İmza:**
  - Derin obsidyen monokrom void (`#0A0A0A`), ince nokta matrisi (dot matrix) koordinatları.
  - **3 Aşamalı Kavramsal Düğüm Akışı (Node Flow):**
    - `01. HAM GİRDİ` (Veri gürültüsü)
    - `02. MENTAL FİLTRE` (Asit sarısı `#DFFF00` çerçeve ve şimşek rozeti)
    - `03. DERİN ODAK` (Tek hamle)
  - Trim paths ile konuşma temposunda aşağı doğru dolan bağlantı çizgileri.
  - Negatif alan ustalığı ve keskin minimalist editoryal monokrom bloklar.
- **Renk Paleti:** Obsidyen Siyah (`#0A0A0A`), Koyu Grafit (`#171717`), Asit Sarısı (`#DFFF00`), Kar Beyazı (`#FFFFFF`).
- **Hangi Konularda Kullanılır:** Odaklanma, disiplin, alışkanlık tasarımı, üretkenlik sistemleri, zihinsel modeller, erteleme çözümleri.
- **Remotion Bileşeni:** `src/components/genres/MinimalBrutalistThinkingGenre.tsx` (`channelGenre: "brutalist_thinking"`).

---

### 12. 📐 TEKNİK CAD BLUEPRINT & DONANIM X-RAY (`Ayhan Tarakcı & Engineering Explainers` Tarzı)
- **Referans:** Ayhan Tarakcı, Branch Education, Technical CAD Animations
- **Görsel İmza:**
  - Derin kobalt mavi CAD Blueprint zemin (`#021626`).
  - 10mm teknik milimetrik ızgara ve 4 köşede `+` hizalama imleri.
  - **Patlatılmış Montaj (Exploded Assembly) ve X-Ray Kesit Çizimi:** Ayrılan parçalar, şaft ve rulman grupları.
  - Teknik ölçülendirme okları (`440 mm`, `Ø 100 mm` leader line).
  - Şartname kartları (`TOLERANS: ±0.01 mm`, `GRADE 5 TITANIUM`, `12.000 RPM Dinamik Balans`).
- **Renk Paleti:** CAD Kobaltı (`#021626`), CAD Cyan (`#00F2FE`), Mühendislik Mavisi (`#0284C7`), Teknik Beyaz (`#FFFFFF`).
- **Hangi Konularda Kullanılır:** Donanım mimarisi, yarı iletkenler/çipler, motor mekaniği, havacılık, türbinler, CNC hassasiyeti, tersine mühendislik.
- **Remotion Bileşeni:** `src/components/genres/TechnicalBlueprintGenre.tsx` (`channelGenre: "blueprint"`).

---

### 13. 🚀 SAAS & APP PROMO COMMERCIAL (`Linear`, `Raycast`, `Apple` Tarzı)
- **Referans:** Linear.app, Raycast, Vercel, Apple Keynote App Showcases
- **Görsel İmza:**
  - Derin obsidyen siber zemin (`#07090E`), hafif mimari ızgara (`60px 60px`).
  - **2.5D İzometrik Havada Duran Pencere Maketi:** `rotateX(4deg)`, `rotateY(-2deg)` ve organik süzülme (`sin(frame * 0.06)`).
  - macOS tarzı sol üst pencereler (kırmızı/sarı/yeşil), URL omnibox (`app.[name].io`) ve `⌘K` rozeti.
  - **Gerçekçi Vektör İmleç:** Dışarıdan CTA butonuna süzülen, buton üstünde mikro-duraksayan, `scale(0.82)` ile tıklayan ve etrafa yeşil dalga (`ripple`) yayan interaktif fare.
  - Canlı buton durumu: Tıklama sonrası *"Deploy Pipeline"* ➔ *"✓ Production Live"*.
  - Kullanıcı ekran görüntüsü desteği (`screenshotUrl`) veya otomatik ultra-şık koyu mod dashboard mockup'ı.
  - Odak karartmalı Bento Grid kartları (`10x Hız`, `0.04 ms`, `+%340`).
  - Marka rengine duyarlı dinamik radyal ışık kubbesi (`${brandColor}40`).
- **Renk Paleti:** Obsidyen Void (`#07090E`), Modern Indigo (`#6366F1`), Elektrik Cyan (`#38BDF8`), Başarı Zümrütü (`#10B981`).
- **Hangi Konularda Kullanılır:** Mobil uygulama lansmanları, SaaS ürün tanıtımları, yazılım güncellemeleri, AI araçları, girişim tanıtımları.
- **Remotion Bileşeni:** `src/components/genres/AppPromoGenre.tsx` (`channelGenre: "app_promo"`).

---

### 14. ✨ 2025+ SVG LOGO MOTION DESIGN INTRO (Trim Paths & Specular Shimmer)
- **Referans:** Apple, Linear, Nike, After Effects 2025/2026 Logo Reveals
- **Görsel İmza:**
  - `@remotion/paths` `evolvePath` ile yaylanan dinamik trim paths çizimi.
  - Çift katmanlı kontur: İçte keskin çekirdek kontur, arkada difüze neon bloom konturu (`blur(6px)`).
  - Çizim `%70`e ulaştığında alttan yukarıya pürüzsüzce dolan sıvı dolgu (liquid wash).
  - Çizim tamamlandığında logonun üzerinden hızla geçen 45° speküler ışık taraması (shimmer sweep).
  - Logo formuna kavuştuğunda merkezden dışarıya yayılan şok dalgası halkası (`lockup shockwave`).
  - Harf aralığı genişleyen (`letter-spacing: 0.1em -> 0.28em`) kinetik marka tipografisi.
- **Renk Paleti:** Markanın özgün vektör renkleri ve yüksek lümenli ışık aurası.
- **Hangi Konularda Kullanılır:** Video girişleri, logo reveal jenerikleri, kurumsal marka kapanışları.
- **Remotion Bileşeni:** `src/components/cinematic/SvgLogoMotion.tsx` (`channelGenre: "logo_intro"`).

---

## ⚡ YÖNLENDİRİCİ: `ChannelGenreOrchestrator.tsx`

Tüm bu mimariler `src/components/genres/ChannelGenreOrchestrator.tsx` üzerinden tek elden yönetilir.
Bir senaryo JSON'unda:
```json
{
  "channelGenre": "kurzgesagt",
  "scenes": [...]
}
```
yazıldığında, Remotion o konunun gerektirdiği tüm sahneyi otomatik olarak ilgili görsel kimlikle render eder.

---

## 🤖 YENİ BİR SOHBETTE KULLANICI KONU VERDİĞİNDE YAPILACAKLAR:

1. **Konuyu Analiz Et:** Konunun özünü aşağıdaki 14 mimariden en uygun olanıyla eşleştir:
   - Araba/Motor/Mekanik/Donanım -> `automotive` (bilgilitampon: Black void, tork/devir ibresi, mekatronik arıza damgası)
   - Din/Tefekkür/Felsefe/Maneviyat -> `islamic` (islamvemantik: Parşömen, kobalt hat, kırmızı fırça dairesi)
   - Hukuk/Dava/Ceza/Suç Rekonstrüksiyonu -> `legal` (hukukharitasi: Milimetrik adli defter, TCK kartı, dosya no)
   - Matematik/Geometri/Algoritma/Mantık -> `math` (mathgine.official: Kozmik ızgara, kesikli ispat çubuğu)
   - Ses/Frekans/Müzik/Akustik Rezonans -> `sound` (thel.ab67: Obsidyen void, polar osiloskop, piyano frekans cetveli)
   - Psikoloji/Davranış/Zihin/Alışkanlık -> `psychology` (neden.io: Sıcak fildişi, siyah+turuncu başlık, 3D karakter, sayaç)
   - Sinema/Kamera/Sanat/Görsel Kadraj -> `cinema` (schole444: Keten vizör köşebentleri, REC noktası, 1/3 kuralı)
   - Jeopolitik/Savaş/Ticaret Boğazları/Harita -> `geopolitics` (Johnny Harris & Vox: 3D izometrik harita, kavisli rota, radar pin)
   - Makroekonomi/Enflasyon/Borsa/Para -> `finance` (Bloomberg & Wall Street: Terminal, mum grafikler, reel kayıp kutuları)
   - Kozmik Bilim/Kara Delik/Biyoloji/Entropi -> `kurzgesagt` (Kurzgesagt: Saturated neons, squash & stretch atom, scale meter)
   - Sistem Düşüncesi/Odak/Disiplin/Zihin Modeli -> `brutalist_thinking` (Dan Koe & Yan Graphics: Obsidian void, 3-node systems, acid lime)
   - İleri Donanım/Çip/Mühendislik/CAD/Blueprint -> `blueprint` (Ayhan Tarakcı: Cobalt CAD grid, exploded assemblies, leader dimensions)
   - SaaS / Web / Mobil Uygulama Reklamı -> `app_promo` (Linear & Apple: 2.5D yüzen pencere, interaktif SVG imleç tıklaması, bento grid)
   - SVG Logo Reveal / Marka İntrosu -> `logo_intro` (Trim paths evolvePath, sıvı dolgu, 45° speküler shimmer, şok dalgası)
   - Kuantum Fiziği/Atom Altı -> `quantum` (Cinematic 3D Particle & Morphing)
   - Yazılım/SaaS/Sunucu -> `tech` (Terminal & Arch Stack)

2. **Görsel Dikkat ve Göz Takibi Yönetimi (`VisualAttentionDirector`):**
   - **`AttentionPulsePing`:** Sahneye girildiğinde ilk 0.5 saniyede foveal bakışı hedef noktaya kilitler.
   - **`AttentionHighlighter`:** Kilit terim veya istatistiğin altına yaylanan fosforlu çizgi çeker.
   - **`AttentionVignette`:** Kenarları hafifçe karartıp gözün merkez odak alanından kaçmasını engeller.

3. **Otomatik Senaryo ve Ses:**
   - `node scripts/generate_script.mjs "Konu Adı"` komutunu çalıştır (veya JSON üret).
   - `node sub.mjs` ile altyazı ve ses dosyasını (`public/voice.mp3`) senkronize et.
   - Doğrudan videoyu render et veya önizlemesini test et (`npx remotion still ReelVideo out/preview.png --frame=60`).
