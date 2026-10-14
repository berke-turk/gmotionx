import React from "react";
import { AutomotiveEngineeringGenre } from "./AutomotiveEngineeringGenre";
import { IslamicSpiritualGenre } from "./IslamicSpiritualGenre";
import { LegalCaseStudyGenre } from "./LegalCaseStudyGenre";
import { VisualMathGenre } from "./VisualMathGenre";
import { AcousticSoundGenre } from "./AcousticSoundGenre";
import { BehavioralPsychologyGenre } from "./BehavioralPsychologyGenre";
import { CinemaViewfinderGenre } from "./CinemaViewfinderGenre";
import { GeopoliticalMapGenre } from "./GeopoliticalMapGenre";
import { FinancialMarketGenre } from "./FinancialMarketGenre";
import { KurzgesagtCosmicGenre } from "./KurzgesagtCosmicGenre";
import { MinimalBrutalistThinkingGenre } from "./MinimalBrutalistThinkingGenre";
import { TechnicalBlueprintGenre } from "./TechnicalBlueprintGenre";

export type ChannelGenreType =
  | "automotive"
  | "islamic"
  | "legal"
  | "math"
  | "sound"
  | "psychology"
  | "cinema"
  | "geopolitics"
  | "map"
  | "finance"
  | "market"
  | "kurzgesagt"
  | "cosmic"
  | "universe"
  | "brutalist_thinking"
  | "dan_koe"
  | "concept"
  | "blueprint"
  | "cad"
  | "hardware"
  | "quantum"
  | "tech"
  | string;

export interface ChannelGenreOrchestratorProps {
  genre?: ChannelGenreType;
  badge?: string;
  title?: string;
  highlightWord?: string;
  leftTitle?: string;
  leftDesc?: string;
  rightTitle?: string;
  rightDesc?: string;
  metricValue?: string;
  metricLabel?: string;
  verdictText?: string;
  // Özel ek alanlar
  genreProps?: Record<string, any>;
}

/**
 * ChannelGenreOrchestrator:
 * Instagram/TikTok'taki 7 büyük viral kanal mimarisini Remotion içerisinde dinamik olarak
 * yöneten ana yönlendirici. Gelen konuya veya senaryoya göre ilgili görsel dünyayı
 * (Otomotiv, İslami Hat, Hukuk Dosyası, Matematik İspatı, Akustik Ses, Psikoloji/3D Karakter, Sinema Vizörü)
 * otomatik olarak ayağa kaldırır.
 */
export const ChannelGenreOrchestrator: React.FC<ChannelGenreOrchestratorProps> = ({
  genre,
  badge,
  title = "",
  highlightWord,
  leftTitle,
  leftDesc,
  rightTitle,
  rightDesc,
  metricValue,
  metricLabel,
  verdictText,
  genreProps = {},
}) => {
  const g = (genre || "").toLowerCase().trim();

  // 1. OTOMOTİV & MEKATRONİK MİMARİSİ (bilgilitampon tarzı)
  if (g === "automotive" || g === "car" || g === "engineering" || g === "motor") {
    const parts = title.includes(",") ? title.split(",") : [title, leftTitle || "DSG & Şanzıman Zaafı"];
    return (
      <AutomotiveEngineeringGenre
        headlineMain={genreProps.headlineMain || parts[0]?.trim() || "Makam arabası,"}
        headlineSub={genreProps.headlineSub || parts[1]?.trim() || "sınırda şanzıman."}
        badge={genreProps.badge || badge || "MEKATRONİK MÜHENDİSLİK"}
        warningLabel={genreProps.warningLabel || verdictText || "YÜKSEK BASINÇ KAÇAĞI"}
        warningSub={genreProps.warningSub || leftDesc || "Akümülatör gövdesi zaafı"}
        torkValue={genreProps.torkValue || metricValue || "250 Nm"}
        rpmValue={genreProps.rpmValue || "4.200 RPM"}
      />
    );
  }

  // 2. İSLAMİ & MANEVİ DÜŞÜNCE MİMARİSİ (islamvemantik tarzı)
  if (g === "islamic" || g === "spiritual" || g === "philosophy" || g === "kuran") {
    return (
      <IslamicSpiritualGenre
        surahTitle={genreProps.surahTitle || badge || "FURKÂN · 70"}
        arabicScript={genreProps.arabicScript || "فَأُولَٰئِكَ يُبَدِّلُ اللَّهُ سَيِّئَاتِهِمْ حَسَنَاتٍ"}
        highlightArabicWord={genreProps.highlightArabicWord || highlightWord || "يُبَدِّلُ"}
        mainVerdictTurkish={genreProps.mainVerdictTurkish || title || "GÜNAHI İYİLİĞE ÇEVİRİR"}
        surahReference={genreProps.surahReference || verdictText || "Furkan 68-70"}
      />
    );
  }

  // 3. HUKUK & CEZA DAVASI REKONSTRÜKSİYONU (hukukharitasi tarzı)
  if (g === "legal" || g === "law" || g === "justice" || g === "case_study") {
    return (
      <LegalCaseStudyGenre
        caseNumber={genreProps.caseNumber || badge || "DOSYA N° 005"}
        categoryTag={genreProps.categoryTag || leftTitle || "DİZİDEKİ HUKUK · SIFIR BİR"}
        quoteNormal={genreProps.quoteNormal || title || '"Ateşin yoksa,'}
        quoteHighlight={genreProps.quoteHighlight || highlightWord || 'saatin de mi yok?"'}
        legalVerdictTag={genreProps.legalVerdictTag || verdictText || "TCK MD. 81/1 · KASTEN ÖLDÜRME"}
        crimeCode={genreProps.crimeCode || metricValue || "AĞIRLAŞTIRILMIŞ MÜEBBET"}
      />
    );
  }

  // 4. GÖRSEL MATEMATİK & İSPAT (mathgine.official tarzı)
  if (g === "math" || g === "geometry" || g === "proof" || g === "algorithm") {
    return (
      <VisualMathGenre
        episodeTag={genreProps.episodeTag || badge || "VISUAL MATH · #004"}
        questionTop={genreProps.questionTop || leftTitle || "why does"}
        equationMain={genreProps.equationMain || title || "0.999... = 1?"}
        fillProgress={genreProps.fillProgress || (metricValue ? parseFloat(metricValue) : undefined)}
      />
    );
  }

  // 5. AKUSTİK, SES & FREKANS (thel.ab67 tarzı)
  if (g === "sound" || g === "acoustic" || g === "frequency" || g === "audio") {
    return (
      <AcousticSoundGenre
        hookTop={genreProps.hookTop || leftTitle || "WHEN DOES A BEAT"}
        hookBottom={genreProps.hookBottom || title || "BECOME A NOTE?"}
        categoryTrack={genreProps.categoryTrack || badge || "BEAT — NOTE — CHORD — SONG"}
        activeChord={genreProps.activeChord || highlightWord || "Am"}
        chordRatio={genreProps.chordRatio || verdictText || "10 : 12 : 15"}
        frequencyHz={genreProps.frequencyHz || (metricValue ? parseInt(metricValue.replace(/\D/g, "")) : 20) || 20}
      />
    );
  }

  // 6. BİLİŞSEL PSİKOLOJİ & DAVRANIŞ BİLİMİ (neden.io tarzı)
  if (g === "psychology" || g === "behavioral" || g === "mind" || g === "habit") {
    const parts = title.includes("?") ? title.split("?") : [title, "GERÇEKTEN BÖYLE Mİ?"];
    return (
      <BehavioralPsychologyGenre
        headlineMain={genreProps.headlineMain || parts[0]?.trim() || "İLK DİNLEYİŞTE"}
        headlineSub={genreProps.headlineSub || (parts[1] ? parts[1].trim() + "?" : "BEĞENMEDİN Mİ?")}
        counterLabel={genreProps.counterLabel || metricLabel || "DİNLEYİŞ"}
        counterMultiplier={genreProps.counterMultiplier || (metricValue ? parseInt(metricValue.replace(/\D/g, "")) : 10) || 10}
        floatingLeftWord={genreProps.floatingLeftWord || highlightWord || "TRA"}
        floatingRightWord1={genreProps.floatingRightWord1 || "LA"}
        floatingRightWord2={genreProps.floatingRightWord2 || "LA"}
        conceptBadge={genreProps.conceptBadge || badge || "BİLİŞSEL PSİKOLOJİ"}
      />
    );
  }

  // 7. SİNEMA DİLİ & KADRAJ VİZÖRÜ (schole444 tarzı)
  if (g === "cinema" || g === "film" || g === "directing" || g === "visual_arts") {
    return (
      <CinemaViewfinderGenre
        courseTag={genreProps.courseTag || badge || "SİNEMA DİLİ / DERS 01"}
        chapterNumber={genreProps.chapterNumber || metricValue || "44"}
        headline={genreProps.headline || title || "44 saniyede kadraj."}
        subjectTitle={genreProps.subjectTitle || leftTitle || "ALTIN ORAN VE BAKIŞ BOŞLUĞU"}
        lensSpec={genreProps.lensSpec || "35mm  f/1.8  1/50s  ISO 200"}
        ruleLabel={genreProps.ruleLabel || verdictText || "RULE OF THIRDS"}
      />
    );
  }

  // 8. JEOPOLİTİK HARİTA & BÖLGE STRATEJİSİ (Johnny Harris & Vox tarzı)
  if (g === "geopolitics" || g === "map" || g === "geography" || g === "history" || g === "war") {
    const parts = title.includes(",") ? title.split(",") : [title, leftTitle || "STRATEJİK DÜĞÜM NOKTASI"];
    return (
      <GeopoliticalMapGenre
        regionTag={genreProps.regionTag || badge || "JEOPOLİTİK ANALİZ"}
        coordinateText={genreProps.coordinateText || metricLabel || "41.0082° N, 28.9784° E"}
        headlineMain={genreProps.headlineMain || parts[0]?.trim() || "DÜNYA PETROLÜNÜN %20'Sİ"}
        headlineSub={genreProps.headlineSub || parts[1]?.trim() || "TEK BİR KILCAL DAMARDA."}
        chokePointName={genreProps.chokePointName || highlightWord || "KRİTİK DARBOĞAZ"}
        statisticBadge={genreProps.statisticBadge || "STRATEJİK HACİM"}
        statisticValue={genreProps.statisticValue || metricValue || "21 Milyon Varil"}
        strategicNote={genreProps.strategicNote || verdictText || "Bu geçit tıkandığı anda küresel tedarik zinciri felç olur."}
      />
    );
  }

  // 9. MAKROEKONOMİ, FİNANS & PİYASA ŞOKU (Bloomberg / Wall Street tarzı)
  if (g === "finance" || g === "economy" || g === "market" || g === "crypto" || g === "money") {
    const parts = title.includes(",") ? title.split(",") : [title, leftTitle || "alım gücün eriyor."];
    return (
      <FinancialMarketGenre
        marketIndexTag={genreProps.marketIndexTag || badge || "MAKROEKONOMİ & ENFLASYON"}
        headlineMain={genreProps.headlineMain || parts[0]?.trim() || "Maaşın artıyor ama,"}
        headlineSub={genreProps.headlineSub || parts[1]?.trim() || "alım gücün buharlaşıyor."}
        percentageChange={genreProps.percentageChange || metricValue || "+%68.4"}
        percentageLabel={genreProps.percentageLabel || metricLabel || "KÜMÜLATİF ŞOK"}
        isBullish={genreProps.isBullish ?? false}
        statLeftLabel={genreProps.statLeftLabel || leftTitle || "AYLIK REEL KAYIP"}
        statLeftValue={genreProps.statLeftValue || leftDesc || "-%14.2"}
        statRightLabel={genreProps.statRightLabel || rightTitle || "ALIM GÜCÜ PARİTESİ"}
        statRightValue={genreProps.statRightValue || rightDesc || "1/3 ORANINDA"}
        closingVerdict={genreProps.closingVerdict || verdictText || "Rakamlar büyürken, satın alabildiğin sepet küçülüyor."}
      />
    );
  }

  // 10. KOZMİK BİLİM & EVRENSEL ÖLÇEK (Kurzgesagt – In a Nutshell tarzı)
  if (g === "kurzgesagt" || g === "cosmic" || g === "universe" || g === "deep_science" || g === "space") {
    const parts = title.includes(",") ? title.split(",") : [title, leftTitle || "bir atomun içi olabilir."];
    return (
      <KurzgesagtCosmicGenre
        scaleTag={genreProps.scaleTag || badge || "KOZMİK ÖLÇEK · ATOMİK DERİNLİK"}
        headlineMain={genreProps.headlineMain || parts[0]?.trim() || "Evrenin en soğuk yeri,"}
        headlineSub={genreProps.headlineSub || parts[1]?.trim() || "bir atomun içi olabilir."}
        metricValue={genreProps.metricValue || metricValue || "10⁻¹⁵ Metre"}
        metricLabel={genreProps.metricLabel || metricLabel || "SUB-ATOMİK ÖLÇEK"}
        scaleLevel={genreProps.scaleLevel || leftTitle || "KUANTUM BOYUTU"}
        atomicDetail={genreProps.atomicDetail || leftDesc || "Proton ve elektronların dansı"}
        closingVerdict={genreProps.closingVerdict || verdictText || "Maddeye yaklaştıkça katı dünya bir olasılık dalgasına dönüşür."}
      />
    );
  }

  // 11. MİNİMAL BRUTALİST DÜŞÜNCE & SİSTEMLER (Dan Koe / Yan Graphics tarzı)
  if (g === "brutalist_thinking" || g === "dan_koe" || g === "concept" || g === "systems" || g === "mind") {
    const parts = title.includes(",") ? title.split(",") : [title, leftTitle || "net bir filtrenin olmaması."];
    return (
      <MinimalBrutalistThinkingGenre
        frameworkTag={genreProps.frameworkTag || badge || "SİSTEM DÜŞÜNCESİ · ÇERÇEVE"}
        headlineMain={genreProps.headlineMain || parts[0]?.trim() || "Sorun odaklanamamak değil,"}
        headlineSub={genreProps.headlineSub || parts[1]?.trim() || "net bir filtrenin olmaması."}
        node1Title={genreProps.node1Title || leftTitle || "01. HAM GİRDİ"}
        node1Desc={genreProps.node1Desc || leftDesc || "Günde 34 GB rastgele veri"}
        node2Title={genreProps.node2Title || "02. MENTAL FİLTRE"}
        node2Desc={genreProps.node2Desc || highlightWord || "Gürültüyü acımasızca ele"}
        node3Title={genreProps.node3Title || rightTitle || "03. DERİN ODAK"}
        node3Desc={genreProps.node3Desc || rightDesc || "Tek bir hamleye kilitlen"}
        coreRuleVerdict={genreProps.coreRuleVerdict || verdictText || "Netlik bir duygu değil; neyi yok sayacağını bilme kararıdır."}
      />
    );
  }

  // 12. TEKNİK BLUEPRINT, CAD & DONANIM X-RAY (Ayhan Tarakcı & Engineering Explainers)
  if (g === "blueprint" || g === "cad" || g === "hardware" || g === "engineering_detail" || g === "xray") {
    const parts = title.includes(",") ? title.split(",") : [title, leftTitle || "0.01 mm toleranslı mühendislik."];
    return (
      <TechnicalBlueprintGenre
        blueprintTag={genreProps.blueprintTag || badge || "CAD BLUEPRINT · DETAY ŞARTNAMESİ"}
        headlineMain={genreProps.headlineMain || parts[0]?.trim() || "Sıradan bir parça değil,"}
        headlineSub={genreProps.headlineSub || parts[1]?.trim() || "0.01 mm toleranslı mühendislik."}
        componentName={genreProps.componentName || highlightWord || "TİTANYUM ROTOR MİLİ"}
        toleranceSpec={genreProps.toleranceSpec || metricLabel || "TOLERANS: ±0.01 mm"}
        materialSpec={genreProps.materialSpec || metricValue || "MALZEME: GRADE 5 TITANIUM"}
        assemblyNote={genreProps.assemblyNote || leftTitle || "12.000 RPM Dinamik Balans"}
        closingVerdict={genreProps.closingVerdict || verdictText || "Mühendislikte mükemmellik eklenecek bir şey kalmadığında değil, çıkarılacak fazlalık olmadığında başlar."}
      />
    );
  }

  return null;
};
