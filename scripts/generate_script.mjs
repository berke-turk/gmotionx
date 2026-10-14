import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const API_KEY = process.env.GEMINI_API_KEY;

export async function generateScriptForTopic(topic, isCinematic = true) {
  console.log(`\n🎬 [SİNEMATİK DİREKTÖR] '${topic}' için konuya özel viral kanal mimarisi senaryosu üretiliyor...`);

  if (!API_KEY) {
    console.log("ℹ️ GEMINI_API_KEY bulunamadı, 7 Kanal Mimarisi kural motoru devreye giriyor...");
    return generateFallbackScript(topic);
  }

  const systemPrompt = `
Rol: Vox, Kurzgesagt, Apple Keynote ve Instagram'ın 10M+ izlenen viral kanallarının (bilgilitampon, islamvemantik, hukukharitasi, mathgine, thel.ab67, neden.io, schole444) Baş Kreatif Yönetmeni olarak görev yapıyorsun.

Girdi Konusu: "${topic}"

GÖREV & KURALLAR:
1. KONUYA ÖZEL KANAL MİMARİSİ SEÇİMİ ("channelGenre"):
   - Gelen konuyu en iyi temsil eden görsel dünyaya karar ver:
     * "automotive": Otomotiv, motor, şanzıman, makine arızaları (Pure black void, tork ibresi, mekatronik damgası).
     * "islamic": Din, Kur'an, tefekkür, felsefe, maneviyat (Vintage parşömen, hat sanatı, elle çizilen kırmızı odak halkası).
     * "legal": Hukuk, ceza davası, TCK maddesi, meşru müdafaa (Milimetrik kâğıt, dosya no, editoryal manşet, suç hükmü).
     * "math": Matematik, geometri, mantık ispatları (Kozmik lacivert ızgara, dev soru, animasyonlu kesikli ispat çubuğu).
     * "sound": Ses, frekans, akustik, müzik teorisi (Obsidyen void, polar osiloskop halkaları, canlı Hz, piyano akoru).
     * "psychology": Bilişsel psikoloji, alışkanlıklar, zihin tuzakları (Fildişi zemin, dev condensed 2 satır başlık, 3D clay figür, artan sayaç hapı).
     * "cinema": Sinema dili, kadraj, yönetmenlik hileleri (Keten zemin, köşe vizör tikleri, REC blink, segmentli bar).
     * "app_promo": SaaS, mobil ve web uygulama lansmanları, Linear & Apple tarzı (2.5D yüzen pencere, interaktif SVG imleç tıklaması, bento grid odak karartması).
     * "logo_intro": 2025+ SVG Logo Motion Design (Trim paths evolvePath, çift katmanlı neon bloom, sıvı dolgu, 45° speküler shimmer, kilitlenme şok dalgası).
     * "quantum": Kuantum fiziği, atom altı evren (Kozmik parçacık çarpışması, 3D spin).
     * "tech": Yazılım, sunucu, teknoloji mimarisi (Terminal hook, Container stack).

2. KESİN METİN KURALLARI:
   - İLK 1-2 SANİYE: Konuya özel somut bir çelişki, ezber bozan bir soru veya bilişsel kanca ile başla ("Hiç merak ettin mi?", "Neden böyle olduğunu sanıyorsun?"). Düz tanıtım KESİNLİKLE YASAKTIR.
   - RİTİM & SÜRE: Cümleler 5-8 kelimelik vurucu parçalar olmalı. Toplam süre: 40-50 saniye (80-110 kelime).
   - KAPANIŞ (MIC-DROP): Asla "sen ne düşünüyorsun?" deme. Konuyu mühürleyen otoriter, felsefi tek bir cümleyle bitir.

3. FLUID CAMERA & KINETIC TYPOGRAPHY:
   - "cameraMove": zoom (1.05 - 1.2), panX, panY, rotateZ, rotateX, rotateY, enableMicroDrift: true.
   - "highlightWord": Başlıkta patlayarak vurgulanacak sözcük.
   - "pronunciations": Yabancı/teknik sözcüklerin Türkçe fonetik okunuşları.

4. DİNAMİK ALTYAZI & ANLATIM METNİ YERLEŞİMİ ("captionConfig"):
   - Yalnızca en üstteki ince süre çubuğu sabittir. Anlatım metni (altyazı) her sahnede konseptin gerektirdiği yere serbestçe yerleşir.
   - "captionConfig": {
       "position": "bottom" (alt güvenli alan) | "center" (tam ekran ortası - mic-drop & manifesto anları) | "below_hero" (kahraman görselin hemen altı) | "top" (üstte),
       "styleVariant": "automotive" | "islamic" | "legal" | "math" | "sound" | "psychology" | "cinema" | "quantum",
       "fontSize": "48px" veya "56px"
     }

ÇIKTI: SADECE GEÇERLİ JSON DÖNDÜR, ASLA MARKDOWN VEYA AÇIKLAMA METNİ EKLEME:
{
  "channelGenre": "psychology",
  "category": "Kategori Başlığı",
  "title": "Ana Başlık",
  "scriptText": "Seslendirilecek tam Türkçe metin...",
  "pronunciations": {
    "terim": "okunus"
  },
  "captionConfig": {
    "position": "bottom",
    "styleVariant": "psychology"
  },
  "scenes": [
    {
      "startSec": 0,
      "endSec": 5.0,
      "type": "cinematic_explainer",
      "badge": "ROZET BAŞLIĞI",
      "title": "VURUCU BAŞLIK",
      "highlightWord": "SÖZCÜK",
      "captionConfig": {
        "position": "bottom"
      },
      "metricLabel": "METRİK ADI",
      "metricValue": "DEĞER",
      "cameraMove": {
        "zoom": 1.12,
        "panY": -10,
        "rotateZ": 1.5,
        "rotateX": 15,
        "rotateY": -10,
        "enableMicroDrift": true
      }
    }
  ]
}
`;

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;
    const payload = {
      contents: [
        {
          parts: [
            { text: `${systemPrompt}\n\nKULLANICI KONUSU: ${topic}` }
          ]
        }
      ],
      generationConfig: {
        responseMimeType: "application/json"
      }
    };

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    let text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      console.warn("⚠️ Gemini API geçerli yanıt dönmedi, kural motoruna yönlendiriliyor...");
      return generateFallbackScript(topic);
    }

    text = text.replace(/```json/g, "").replace(/```/g, "").trim();
    const parsed = JSON.parse(text);

    saveScript(parsed);
    return parsed;
  } catch (err) {
    console.error("❌ Gemini API çağrısında hata:", err.message);
    console.log("ℹ️ Kural motoru devreye girdi...");
    return generateFallbackScript(topic);
  }
}

function generateFallbackScript(topic) {
  const t = topic.toLowerCase();

  // 1. OTOMOTİV & MEKATRONİK
  if (t.includes("araba") || t.includes("motor") || t.includes("şanzıman") || t.includes("dsg") || t.includes("tork") || t.includes("mekatronik") || t.includes("araç") || t.includes("passat") || t.includes("tsi") || t.includes("tdi")) {
    const scriptData = {
      channelGenre: "automotive",
      category: "OTOMOTİV MÜHENDİSLİĞİ",
      title: "DSG MEKATRONİK ZAAFI",
      scriptText: "Makam arabası konforunda hızlanan çift kavramalı şanzımanlar, neden bir anda yolda bırakır? Çoğu sürücü sorunun dişlilerde olduğunu sanır. Oysa asıl zaaf, mekatronik gövdesindeki yüksek basınç akümülatörüdür. 60 barlık hidrolik basınç, incecik alüminyum yuvasını zamanla çatlatır ve sistem basınç tutamaz hale gelir. Mekatronik pes ettiğinde, en güçlü motor bile çaresizce boşa döner.",
      pronunciations: {
        "dsg": "de se ge",
        "tsi": "te se ı",
        "tdi": "te de ı",
        "dq200": "de ku iki yüz"
      },
      scenes: [
        {
          startSec: 0,
          endSec: 999,
          type: "automotive",
          badge: "MEKATRONİK MÜHENDİSLİK",
          title: "Makam arabası, sınırda şanzıman.",
          leftTitle: "DQ200 Kuru Kavrama",
          leftDesc: "Mekatronik akümülatör gövdesi zaafı",
          metricValue: "250 Nm",
          verdictText: "YÜKSEK BASINÇ KAÇAĞI"
        }
      ]
    };
    saveScript(scriptData);
    return scriptData;
  }

  // 2. İSLAMİ & MANEVİ
  if (t.includes("islam") || t.includes("kuran") || t.includes("sure") || t.includes("ayet") || t.includes("dua") || t.includes("tasavvuf") || t.includes("din") || t.includes("allah") || t.includes("furkan") || t.includes("tefekkür")) {
    const scriptData = {
      channelGenre: "islamic",
      category: "İSLAM VE MANEVİ DERİNLİK",
      title: "GÜNAHI İYİLİĞE ÇEVİREN SIR",
      scriptText: "İnsan geçmişindeki hatalardan kaçabileceğini mi sanır? Kur'an-ı Kerim'in Furkan Suresi 70. ayetinde sarsıcı bir müjde yer alır: 'Allah onların kötülüklerini iyiliklere çevirir.' Peki bir günah nasıl sevaba dönüşebilir? Pişmanlıkla atılan samimi bir adım, geçmişin tüm karanlığını ibret dolu bir aydınlığa tebdil eder. Kusurunu itiraf eden ruh, hiç hata yapmamış kibirli bir nefisten katbekat daha olgundur.",
      pronunciations: {
        "furkan": "furkân"
      },
      scenes: [
        {
          startSec: 0,
          endSec: 999,
          type: "islamic",
          badge: "FURKÂN · 70",
          title: "GÜNAHI İYİLİĞE ÇEVİRİR",
          highlightWord: "İyiliğe Çevirir",
          verdictText: "Furkan 68-70"
        }
      ]
    };
    saveScript(scriptData);
    return scriptData;
  }

  // 3. HUKUK & CEZA DAVASI
  if (t.includes("hukuk") || t.includes("ceza") || t.includes("tck") || t.includes("dava") || t.includes("meşru") || t.includes("müdafaa") || t.includes("hakim") || t.includes("savcı") || t.includes("suç") || t.includes("mahkeme") || t.includes("adalet")) {
    const scriptData = {
      channelGenre: "legal",
      category: "HUKUK HARİTASI · CEZA HUKUKU",
      title: "MEŞRU MÜDAFAANIN İNCE SINIRI",
      scriptText: "Biri sana sokakta aniden yaklaşıp 'Ateşin yoksa saatin de mi yok?' dediğinde kendini nasıl savunursun? Meşru müdafaa, sınırsız bir şiddet hakkı değildir. TCK Madde 25 uyarınca savunmanın saldırıyla 'orantılı' olması zorunludur. Kaçma imkânı varken veya saldırgan etkisiz hale geldikten sonra eyleme devam etmek, savunmayı kasten adam öldürme suçuna dönüştürür. Kanun öfkeyi değil, zarureti korur.",
      pronunciations: {
        "tck": "te ce ke"
      },
      scenes: [
        {
          startSec: 0,
          endSec: 999,
          type: "legal",
          badge: "DOSYA N° 005",
          title: "Ateşin yoksa, saatin de mi yok?",
          highlightWord: "saatin de mi yok?",
          leftTitle: "DİZİDEKİ HUKUK · SIFIR BİR",
          metricValue: "AĞIRLAŞTIRILMIŞ MÜEBBET",
          verdictText: "TCK MD. 81/1 · KASTEN ÖLDÜRME"
        }
      ]
    };
    saveScript(scriptData);
    return scriptData;
  }

  // 4. GÖRSEL MATEMATİK & İSPAT
  if (t.includes("matematik") || t.includes("geometri") || t.includes("ispat") || t.includes("sayı") || t.includes("denklem") || t.includes("üçgen") || t.includes("kare") || t.includes("alan") || t.includes("pi") || t.includes("sonsuz")) {
    const scriptData = {
      channelGenre: "math",
      category: "GÖRSEL MATEMATİK & İSPAT",
      title: "0.999... NEDEN 1'E EŞİTTİR?",
      scriptText: "Sonsuza kadar giden 0.999... sayısının tam olarak 1 ettiğini söylesem inanır mısın? Çoğu insan aralarında sonsuz küçük bir boşluk olduğunu düşünür. Oysa 1 bölü 3 sayısı 0.333... olarak sonsuza uzanır. Her iki tarafı 3 ile çarptığında sol taraf 1, sağ taraf ise 0.999... olur. Matematikte aralarında başka bir gerçek sayı bulunmayan iki değer, tek ve aynı noktadır.",
      pronunciations: {},
      scenes: [
        {
          startSec: 0,
          endSec: 999,
          type: "math",
          badge: "VISUAL MATH · #004",
          leftTitle: "why does",
          title: "0.999... = 1?",
          metricValue: "1.000"
        }
      ]
    };
    saveScript(scriptData);
    return scriptData;
  }

  // 5. AKUSTİK, SES & FREKANS
  if (t.includes("ses") || t.includes("frekans") || t.includes("hertz") || t.includes("hz") || t.includes("akustik") || t.includes("müzik") || t.includes("akor") || t.includes("kulak") || t.includes("nota") || t.includes("432")) {
    const scriptData = {
      channelGenre: "sound",
      category: "REZONANS AKUSTİĞİ",
      title: "RİTİM NE ZAMAN NOTAYA DÖNÜŞÜR?",
      scriptText: "Bir davul vuruşunu saniyede kaç kez hızlandırırsan artık bir ritim değil, bir nota duymaya başlarsın? İnsan beyni saniyede 20 vuruşun altını ayrı darbeler olarak algılar. Ancak frekans 20 Hertz sınırını aştığı anda, aralıklar birbirine erir ve derin bir bas sesine dönüşür. Ritim ve nota aslında aynı fiziksel olgudur; farkı belirleyen tek şey zamansal hızdır.",
      pronunciations: {
        "hertz": "hörts",
        "hz": "herz"
      },
      scenes: [
        {
          startSec: 0,
          endSec: 999,
          type: "sound",
          badge: "BEAT — NOTE — CHORD — SONG",
          leftTitle: "WHEN DOES A BEAT",
          title: "BECOME A NOTE?",
          highlightWord: "Am",
          metricValue: "20",
          verdictText: "10 : 12 : 15"
        }
      ]
    };
    saveScript(scriptData);
    return scriptData;
  }

  // 6. BİLİŞSEL PSİKOLOJİ & DAVRANIŞ
  if (t.includes("psikoloji") || t.includes("zihin") || t.includes("beyin") || t.includes("alışkanlık") || t.includes("dopamin") || t.includes("algı") || t.includes("beğen") || t.includes("davranış") || t.includes("şarkı") || t.includes("dikkat")) {
    const scriptData = {
      channelGenre: "psychology",
      category: "BİLİŞSEL PSİKOLOJİ",
      title: "İLK DİNLEYİŞTE BEĞENMEDİN Mİ?",
      scriptText: "Bir şarkıyı ilk duyduğunda nefret edip, onuncu dinleyişte neden bağımlısı olursun? Psikolojide buna 'Mere-Exposure' yani Salt Maruz Kalma Etkisi denir. Beyin yeni ve karmaşık uyaranları ilk başta tehdit olarak algılar. Ancak tekrarlandıkça zihinsel işleme kolaylaşır ve tanıdıklık hissi hazza dönüşür. Zevklerimiz sandığımız kadar özgür değil; beynimiz sadece tanıdığı kalıpları sevmeye programlıdır.",
      pronunciations: {
        "mere-exposure": "miyr ekspojır"
      },
      scenes: [
        {
          startSec: 0,
          endSec: 999,
          type: "psychology",
          badge: "MERE-EXPOSURE ETKİSİ",
          title: "İLK DİNLEYİŞTE? BEĞENMEDİN Mİ?",
          highlightWord: "TRA",
          metricLabel: "DİNLEYİŞ",
          metricValue: "10"
        }
      ]
    };
    saveScript(scriptData);
    return scriptData;
  }

  // 7. SİNEMA DİLİ & KADRAJ
  if (t.includes("sinema") || t.includes("kadraj") || t.includes("kamera") || t.includes("film") || t.includes("yönetmen") || t.includes("vizör") || t.includes("kadrajlama") || t.includes("açı") || t.includes("lens")) {
    const scriptData = {
      channelGenre: "cinema",
      category: "SİNEMA DİLİ / DERS 01",
      title: "44 SANİYEDE KADRAJ",
      scriptText: "Bir sinema filmini amatör bir videodan ayıran şey pahalı kameralar değil, kadraj içindeki bakış boşluğudur. Karakteri ekranın tam ortasına koyarsan gerilim söner. Onu 1 bölü 3 çizgisine yerleştirip baktığı yöne boşluk bıraktığında, izleyicinin bilinçaltında hikâye başlar. Kadraj sadece bir pencere değil; seyircinin dikkatini yönettiğin görünmez bir silahtır.",
      pronunciations: {},
      scenes: [
        {
          startSec: 0,
          endSec: 999,
          type: "cinema",
          badge: "SİNEMA DİLİ / DERS 01",
          title: "44 saniyede kadraj.",
          metricValue: "44",
          leftTitle: "ALTIN ORAN VE BAKIŞ BOŞLUĞU",
          verdictText: "RULE OF THIRDS"
        }
      ]
    };
    saveScript(scriptData);
    return scriptData;
  }

  // 8. JEOPOLİTİK HARİTA & BÖLGE STRATEJİSİ (Johnny Harris & Vox Tarzı)
  if (t.includes("jeopolitik") || t.includes("harita") || t.includes("boğaz") || t.includes("hürmüz") || t.includes("savaş") || t.includes("tarih") || t.includes("coğrafya") || t.includes("ülke") || t.includes("sınır") || t.includes("petrol") || t.includes("strateji")) {
    const scriptData = {
      channelGenre: "geopolitics",
      category: "JEOPOLİTİK & STRATEJİK DERİNLİK",
      title: "HÜRMÜZ'ÜN KÜRESEL KİLİDİ",
      scriptText: "Haritada küçücük bir çizgi gibi görünen Hürmüz Boğazı, neden dünya ekonomisinin şah damarıdır? Küresel petrol ticaretinin beşte biri, yalnızca otuz dokuz kilometre genişliğindeki bu geçitten akar. Birkaç donanma botunun bu boğazı kapatması, petrol fiyatlarını bir gecede ikiye katlayıp fabrikaları durdurabilir. Coğrafya kader değildir; coğrafya küresel güç oyununun ta kendisidir.",
      pronunciations: {
        "hürmüz": "hür müz",
        "jeopolitik": "je o po li tik"
      },
      scenes: [
        {
          startSec: 0,
          endSec: 999,
          type: "geopolitics",
          badge: "JEOPOLİTİK STRATEJİ · HÜRMÜZ",
          title: "DÜNYA PETROLÜNÜN %20'Sİ, TEK BİR DAMARDA.",
          highlightWord: "HÜRMÜZ DARBOĞAZI",
          metricValue: "21 Milyon Varil",
          metricLabel: "26.5667° N, 56.2500° E",
          verdictText: "Bu geçit tıkandığı anda küresel tedarik zinciri felç olur."
        }
      ]
    };
    saveScript(scriptData);
    return scriptData;
  }

  // 9. MAKROEKONOMİ & ENFLASYON ŞOKU (Bloomberg / Wall Street Tarzı)
  if (t.includes("enflasyon") || t.includes("para") || t.includes("ekonomi") || t.includes("finans") || t.includes("borsa") || t.includes("faiz") || t.includes("dolar") || t.includes("maaş") || t.includes("alım gücü") || t.includes("kripto") || t.includes("bitcoin") || t.includes("zengin")) {
    const scriptData = {
      channelGenre: "finance",
      category: "MAKROEKONOMİ & ENFLASYON",
      title: "ALIM GÜCÜN NASIL ERİYOR?",
      scriptText: "Maaşına yüzde elli zam geldiğinde gerçekten zenginleştiğini mi sanıyorsun? Enflasyon, cebindeki parayı çalmadan değerini eriten görünmez bir vergidir. Rakamlar büyürken, aynı parayla alabildiğin market sepeti her ay küçülür. Sorun kazandığın paranın miktarı değil; o paranın arkasındaki gerçek satın alma gücüdür. Büyüyen rakamlar zenginlik değil, illüzyondur.",
      pronunciations: {
        "enflasyon": "enflas yon",
        "fed": "fed"
      },
      scenes: [
        {
          startSec: 0,
          endSec: 999,
          type: "finance",
          badge: "MAKROEKONOMİ & ENFLASYON ŞOKU",
          title: "Maaşın artıyor ama, alım gücün buharlaşıyor.",
          metricValue: "+%68.4",
          metricLabel: "KÜMÜLATİF ŞOK",
          leftTitle: "AYLIK REEL KAYIP",
          leftDesc: "-%14.2",
          rightTitle: "ALIM GÜCÜ PARİTESİ",
          rightDesc: "1/3 ORANINDA",
          verdictText: "Rakamlar büyürken, satın alabildiğin sepet küçülüyor."
        }
      ]
    };
    saveScript(scriptData);
    return scriptData;
  }

  // 10. KOZMİK BİLİM, ENTROPİ & EVRENSEL ÖLÇEK (Kurzgesagt – In a Nutshell Tarzı)
  if (t.includes("kara delik") || t.includes("entropi") || t.includes("evren") || t.includes("yıldız") || t.includes("biyoloji") || t.includes("virüs") || t.includes("hücre") || t.includes("galaksi") || t.includes("kurzgesagt") || t.includes("büyük patlama")) {
    const scriptData = {
      channelGenre: "kurzgesagt",
      category: "KOZMİK BİLİM & EVREN",
      title: "EVRENİN EN TEHLİKELİ NOKTASI",
      scriptText: "Bir kara deliğin olay ufkuna yaklaştığında, zamanın senin için yavaşladığını ama dışarıdaki evrenin milyarlarca yıllık ömrünün saniyeler içinde akıp gittiğini biliyor muydun? Kütleçekim o kadar acımasızdır ki ışık bile kaçamaz. Merkeze doğru çekildikçe atomların bir spagetti gibi uzar. Kara delikler birer canavar değil; evrenin fizik kurallarını sıfırladığı en saf kozmik laboratuvarlardır.",
      pronunciations: {
        "entropi": "entropi",
        "singularity": "singülariti"
      },
      scenes: [
        {
          startSec: 0,
          endSec: 999,
          type: "kurzgesagt",
          badge: "KOZMİK ÖLÇEK · KARA DELİK",
          title: "Işığın bile kaçamadığı sınır, olay ufku.",
          metricValue: "10⁻³⁵ Metre",
          metricLabel: "PLANCK UZUNLUĞU",
          scaleLevel: "TEKİLLİK SINIRI",
          atomicDetail: "Zaman ve uzayın büküldüğü nokta",
          verdictText: "Kara delik bir son değil; evrenin fizik kurallarını sıfırladığı yerdir."
        }
      ]
    };
    saveScript(scriptData);
    return scriptData;
  }

  // 11. MİNİMAL BRUTALİST DÜŞÜNCE & SİSTEMLER (Dan Koe / Yan Graphics Tarzı)
  if (t.includes("odak") || t.includes("disiplin") || t.includes("üretkenlik") || t.includes("dan koe") || t.includes("sistem düşüncesi") || t.includes("başarı") || t.includes("mental") || t.includes("ertelemek") || t.includes("motivasyon")) {
    const scriptData = {
      channelGenre: "brutalist_thinking",
      category: "SİSTEM DÜŞÜNCESİ & ZİHİN",
      title: "NEDEN ODAKLANAMIYORSUN?",
      scriptText: "Sorunun motivasyon eksikliği olduğunu sanıyorsun; oysa asıl problem net bir filtrenin olmaması. Her gün zihnine akan binlerce veri parçası, hedefini bulanıklaştırıyor. Başarı daha fazla şey yapmak değil; amaca hizmet etmeyen her şeyi acımasızca eleyebilme sanatıdır. Neyi yok sayacağını bildiğin an, odaklanmak bir mücadele olmaktan çıkar.",
      pronunciations: {
        "framework": "freymvörk",
        "input": "input"
      },
      scenes: [
        {
          startSec: 0,
          endSec: 999,
          type: "brutalist_thinking",
          badge: "SİSTEM DÜŞÜNCESİ · ÇERÇEVE",
          title: "Sorun odaklanamamak değil, net bir filtrenin olmaması.",
          node1Title: "01. VERİ GÜRÜLTÜSÜ",
          node1Desc: "Günde 34 GB rastgele bilgi akışı",
          node2Title: "02. MENTAL FİLTRE",
          node2Desc: "Gereksiz olanı acımasızca ele",
          node3Title: "03. DERİN ODAK",
          node3Desc: "Tek bir yüksek etkili hamle",
          verdictText: "Netlik bir duygu değil; neyi yok sayacağını bilme kararıdır."
        }
      ]
    };
    saveScript(scriptData);
    return scriptData;
  }

  // 12. TEKNİK BLUEPRINT, CAD & DONANIM X-RAY (Ayhan Tarakcı & Engineering Tarzı)
  if (t.includes("mühendislik") || t.includes("donanım") || t.includes("çip") || t.includes("yarı iletken") || t.includes("rotor") || t.includes("türbin") || t.includes("blueprint") || t.includes("cad") || t.includes("işlemci") || t.includes("silikon")) {
    const scriptData = {
      channelGenre: "blueprint",
      category: "TEKNİK MİMARİ & BLUEPRINT",
      title: "MÜKEMMEL MÜHENDİSLİK NASIL ÇALIŞIR?",
      scriptText: "Gözünle göremediğin bir mikronluk hata, saatte yüz bin devir dönen bir türbini saniyeler içinde parçalayabilir. Bu yüzden ileri mühendislik şansa yer bırakmaz. Titanyum alaşımlar, sıfır toleranslı CNC kesimler ve dinamik balans testleri; modern medeniyet tam olarak bu milimetrik disiplin üzerinde yükselir. Detaylar önemsiz değildir; sistemin ta kendisidir.",
      pronunciations: {
        "cnc": "si en si",
        "tolerance": "tolerans"
      },
      scenes: [
        {
          startSec: 0,
          endSec: 999,
          type: "blueprint",
          badge: "CAD BLUEPRINT · DETAY ŞARTNAMESİ",
          title: "Sıradan bir parça değil, 0.01 mm toleranslı mühendislik.",
          componentName: "TİTANYUM ROTOR MİLİ",
          toleranceSpec: "TOLERANS: ±0.01 mm",
          materialSpec: "MALZEME: GRADE 5 TITANIUM",
          assemblyNote: "12.000 RPM Dinamik Balans",
          verdictText: "Mühendislikte mükemmellik eklenecek bir şey kalmadığında değil, çıkarılacak fazlalık kalmadığında başlar."
        }
      ]
    };
    saveScript(scriptData);
    return scriptData;
  }

  // 13. KUANTUM FİZİĞİ & EVREN (Varsayılan Kuantum)
  if (t.includes("kuantum") || t.includes("dolanıklık") || t.includes("fizik") || t.includes("einstein") || t.includes("atom")) {
    const scriptData = {
      channelGenre: "quantum",
      category: "KUANTUM FİZİĞİ",
      title: "KUANTUM DOLANIKLIĞI",
      scriptText: "Evrenin bir ucundaki bir parçacığa dokunduğunda, ışık yılı ötedeki ikizinin anında tepki verdiğini söylesem? Einstein bile buna 'mesafeden kaynaklanan korkunç etki' demişti; peki bu imkânsız bağ nasıl çalışıyor? Klasik fizik dünyayı ayrı nesneler olarak görür. Oysa kuantum düzeyinde iki parçacık dolanık hale geldiğinde, aralarındaki mesafe anlamını tamamen yitirir. Biri yukarı dönerse, diğeri aynı anda aşağı döner. Sinyal yok, gecikme yok; evren adeta tek bir parça gibi tepki verir. Mesafe bir illüzyondur; gerçeklik sandığımızdan çok daha derinden birbirine bağlıdır.",
      pronunciations: {
        "einstein": "aynştayn",
        "quantum": "kuantum"
      },
      scenes: [
        {
          startSec: 0,
          endSec: 6.0,
          type: "cinematic_explainer",
          layout: "entangled_orbit",
          badge: "KOZMİK PARADOKS",
          title: "IŞIKTAN DAHA MI HIZLI?",
          highlightWord: "HIZLI",
          cameraMove: { zoom: 1.15, panY: -10, rotateZ: 1.8, rotateX: 15, rotateY: -10, enableMicroDrift: true },
          metricLabel: "ETKİLEŞİM GECİKMESİ",
          metricValue: "0.00 sn"
        },
        {
          startSec: 6.0,
          endSec: 16.0,
          type: "cinematic_explainer",
          layout: "barrier_clash",
          badge: "EINSTEIN ÇIKMAZI",
          title: "KORKUNÇ UZAKTAN ETKİ",
          highlightWord: "KORKUNÇ",
          cameraMove: { zoom: 1.08, panX: -8, rotateZ: -1.2, rotateX: 18, rotateY: 12, enableMicroDrift: true }
        },
        {
          startSec: 16.0,
          endSec: 999,
          type: "cinematic_explainer",
          layout: "monolithic_verdict",
          badge: "OTORİTER HÜKÜM",
          title: "MESAFE BİR İLLÜZYONDUR",
          highlightWord: "İLLÜZYONDUR",
          cameraMove: { zoom: 1.06, panY: 0, rotateZ: 0, rotateX: 10, rotateY: 0, enableMicroDrift: true },
          verdictText: "Gerçeklik sandığımızdan çok daha derinden birbirine bağlıdır."
        }
      ]
    };
    saveScript(scriptData);
    return scriptData;
  }

  // 13. SAAS & APP PROMO REKLAMI (Linear & Apple Tarzı)
  if (
    t.includes("app") ||
    t.includes("uygulama") ||
    t.includes("saas") ||
    t.includes("yazılım") ||
    t.includes("tanıtım") ||
    t.includes("reklam") ||
    t.includes("product") ||
    t.includes("lansman")
  ) {
    const scriptData = {
      channelGenre: "app_promo",
      category: "SAAS & APP LAUNCH",
      title: "GELECEĞİN İŞ AKIŞI",
      scriptText: "Eski, hantal ve karmaşık yöntemlerle vakit kaybetmeyi bırakın. Modern ekipler artık tek bir tıkla tüm iş akışlarını otomatikleştiriyor. Sıfır gecikme, küresel dağıtım ve anında canlıya alma gücü. Hız bir ayrıcalık değil; geleceğin tek çalışma standardıdır.",
      pronunciations: {
        "saas": "sas",
        "pipeline": "payplayn",
        "deploy": "diploy"
      },
      scenes: [
        {
          startSec: 0,
          endSec: 999,
          type: "app_promo",
          badge: "SAAS PRODUCT LAUNCH · 2026",
          title: "Eski yöntemleri unutun, tek tıkla otonom akış.",
          leftTitle: "tek tıkla otonom akış.",
          rightTitle: "Deploy Pipeline",
          verdictText: "Karmaşık süreçleri 3 saniyede otomatikleştirin."
        }
      ]
    };
    saveScript(scriptData);
    return scriptData;
  }

  // 14. SVG LOGO MOTION DESIGN INTRO
  if (
    t.includes("logo") ||
    t.includes("intro") ||
    t.includes("reveal") ||
    t.includes("jenerik") ||
    t.includes("marka")
  ) {
    const scriptData = {
      channelGenre: "logo_intro",
      category: "BRAND MOTION REVEAL",
      title: "FLOWSTATE",
      scriptText: "Güçlü bir marka, karmaşık süslerde değil; saf, keskin ve tavizsiz bir formun içinde kendini var eder.",
      pronunciations: {},
      scenes: [
        {
          startSec: 0,
          endSec: 999,
          type: "logo_intro",
          badge: "BRAND IDENTITY",
          title: "FLOWSTATE",
          verdictText: "THE FUTURE OF CRAFT"
        }
      ]
    };
    saveScript(scriptData);
    return scriptData;
  }

  // 15. DİĞER HER KONU İÇİN DİNAMİK SİNEMATİK GENEL MOTOR
  const cleanTitle = topic.slice(0, 36).toUpperCase();
  const firstWord = cleanTitle.split(" ")[0] || "GERÇEK";

  const scriptData = {
    channelGenre: "tech",
    category: "BİLİM & DERİN ANALİZ",
    title: cleanTitle,
    scriptText: `${topic} konusunun arkasında yatan büyük gerçeği hiç merak ettin mi? Çoğu insan bu sistemi tamamen yüzeysel anlıyor. Oysa perdenin arkasındaki mekanizma, bilinen tüm ezberleri altüst edecek kadar kusursuz işler. Yüzeysel bakış aldatır; gerçek, kanıtlanmış temellerle kendini mühürler.`,
    pronunciations: {},
    scenes: [
      {
        startSec: 0,
        endSec: 5,
        type: "cinematic_explainer",
        badge: "BÜYÜK SORU",
        title: `${cleanTitle} HAKKINDA BİLMEDİKLERİN`,
        highlightWord: firstWord,
        morphFrom: "circle",
        morphTo: "hexagon",
        show3D: true,
        cameraMove: { zoom: 1.12, panY: -12, rotateZ: 1.8, rotateX: 18, rotateY: -10, enableMicroDrift: true },
        metricLabel: "BİLİNİRLİK ORANI",
        metricValue: "%10 DOĞRU"
      },
      {
        startSec: 5,
        endSec: 18,
        type: "cinematic_explainer",
        badge: "MEKANİZMA ÇÖZÜMLEMESİ",
        title: "YÜZEYSEL ALGI vs KANITLANMIŞ GERÇEK",
        highlightWord: "GERÇEK",
        morphFrom: "hexagon",
        morphTo: "star",
        show3D: true,
        cameraMove: { zoom: 1.08, panX: -10, rotateZ: -1.2, rotateX: 24, rotateY: 16, enableMicroDrift: true },
        leftTitle: "❌ Yaygın Yanılgı",
        leftDesc: "Kulaktan dolma varsayımlar",
        rightTitle: "✅ Kanıtlanmış Sistem",
        rightDesc: "İşleyen asıl mekanizma"
      },
      {
        startSec: 18,
        endSec: 999,
        type: "cinematic_explainer",
        badge: "MİC-DROP SENTEZ",
        title: "ÖZÜNÜ ANLAMAK",
        highlightWord: "ÖZÜNÜ",
        morphFrom: "star",
        morphTo: "shield",
        show3D: true,
        cameraMove: { zoom: 1.06, panY: 0, rotateZ: 0, rotateX: 10, rotateY: 0, enableMicroDrift: true },
        verdictText: "Gerçek, gürültülü söylentilerde değil; sessizce işleyen prensiplerde saklıdır."
      }
    ]
  };

  saveScript(scriptData);
  return scriptData;
}

function saveScript(data) {
  const outPath = path.join(process.cwd(), "public", "video_script.json");
  fs.writeFileSync(outPath, JSON.stringify(data, null, 2), "utf-8");
  console.log(`✅ [SİNEMATİK DİREKTÖR] Senaryo ve görsel sahneler kaydedildi: public/video_script.json`);

  if (data.pronunciations && typeof data.pronunciations === "object") {
    const pPath = path.join(process.cwd(), "config", "pronunciations.json");
    let currentDict = {};
    if (fs.existsSync(pPath)) {
      try {
        currentDict = JSON.parse(fs.readFileSync(pPath, "utf-8"));
      } catch (e) {}
    }
    const updated = { ...currentDict, ...data.pronunciations };
    fs.writeFileSync(pPath, JSON.stringify(updated, null, 2), "utf-8");
    console.log(`✅ [FONETİK] Terimler sözlüğe mühürlendi: ${Object.keys(data.pronunciations).join(", ")}`);
  }
}

// CLI doğrudan çalıştırılırsa
const args = process.argv.slice(2);
if (args.length > 0) {
  generateScriptForTopic(args.join(" "));
}
