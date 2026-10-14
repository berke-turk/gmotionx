import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { TurkishFont } from "../../load-font";
import { Scale, Clock } from "lucide-react";

export interface LegalGenreProps {
  caseNumber?: string;
  categoryTag?: string;
  quoteNormal?: string;
  quoteHighlight?: string;
  legalVerdictTag?: string;
  crimeCode?: string;
}

/**
 * LegalCaseStudyGenre (hukukharitasi tarzı):
 * Milimetrik kareli defter kâğıdı, dosya numarası ve adli terazi rozeti,
 * editoryal gazete manşeti (italik altın vurgu), çerçeveli karakter canlandırması
 * ve TCK madde hükmü kartı.
 */
export const LegalCaseStudyGenre: React.FC<LegalGenreProps> = ({
  caseNumber = "DOSYA N° 005",
  categoryTag = "DİZİDEKİ HUKUK · SIFIR BİR",
  quoteNormal = '"Ateşin yoksa,',
  quoteHighlight = 'saatin de mi yok?"',
  legalVerdictTag = "TCK Md. 148: NİTELİKLİ YAĞMA",
  crimeCode = "10 - 15 YIL HAPİS CEZASI",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Çerçeve yaylanması
  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 13, mass: 0.6, stiffness: 120 },
  });
  const frameScale = interpolate(enterSpring, [0, 1], [0.92, 1]);
  const frameOpacity = interpolate(enterSpring, [0, 1], [0, 1]);

  // Zaman çizgisi noktası ilerlemesi
  const timelineDot = (frame % 60) / 60;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        backgroundColor: "#F2EFE9", // Milimetrik sıcak kâğıt
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* 1. MİLİMETRİK KARELİ DEFTER DESENİ */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: "linear-gradient(rgba(180, 160, 140, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(180, 160, 140, 0.15) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          pointerEvents: "none",
        }}
      />

      {/* 2. ÜST ADLİ DOSYA BANNER'I */}
      <div
        style={{
          position: "absolute",
          top: "160px",
          left: "60px",
          right: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          zIndex: 20,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              backgroundColor: "#5A1A24", // Bordo
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Scale size={20} color="#FFFFFF" />
          </div>
          <span style={{ fontFamily: TurkishFont, fontSize: "14px", fontWeight: 900, color: "#5A1A24", letterSpacing: "1px" }}>
            HUKUK HARİTASI
          </span>
        </div>

        <span style={{ fontFamily: TurkishFont, fontSize: "14px", fontWeight: 800, color: "#B8860B", letterSpacing: "1px" }}>
          {caseNumber}
        </span>
      </div>

      {/* 3. ADLİ ZAMAN ÇİZGİSİ (Timeline Axis with Dots) */}
      <div
        style={{
          position: "absolute",
          top: "215px",
          left: "60px",
          right: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          zIndex: 20,
        }}
      >
        <div style={{ position: "relative", width: "100%", height: "2px", backgroundColor: "#D1C7B7" }}>
          <div
            style={{
              position: "absolute",
              left: `${timelineDot * 95}%`,
              top: "-5px",
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              backgroundColor: "#B8860B",
              boxShadow: "0 0 8px #B8860B",
            }}
          />
        </div>
      </div>

      {/* 4. EDİTORYAL MANŞET BAŞLIĞI */}
      <div
        style={{
          position: "absolute",
          top: "240px",
          left: "60px",
          right: "60px",
          display: "flex",
          flexDirection: "column",
          gap: "6px",
          zIndex: 20,
        }}
      >
        <span style={{ fontFamily: TurkishFont, fontSize: "13px", fontWeight: 900, color: "#8C2A38", letterSpacing: "1.5px" }}>
          {categoryTag}
        </span>

        <h1
          style={{
            fontFamily: "'Georgia', serif",
            fontSize: "46px",
            fontWeight: 900,
            color: "#5A1A24",
            lineHeight: 1.15,
            margin: 0,
          }}
        >
          {quoteNormal}{" "}
          <span style={{ fontStyle: "italic", color: "#B8860B", fontWeight: 700 }}>
            {quoteHighlight}
          </span>
        </h1>
      </div>

      {/* 5. ÇERÇEVELİ VEKTÖR SAHNE CANLANDIRMASI (Tuğla Kemer & Karakterler) */}
      <div
        style={{
          position: "absolute",
          top: "430px",
          width: "820px",
          height: "440px",
          backgroundColor: "#FDFCF9",
          border: "4px solid #5A1A24",
          borderRadius: "24px",
          boxShadow: "10px 10px 0px rgba(90, 26, 36, 0.15)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          transform: `scale(${frameScale})`,
          opacity: frameOpacity,
          zIndex: 15,
          overflow: "hidden",
        }}
      >
        <svg viewBox="0 0 800 420" style={{ width: "100%", height: "100%" }}>
          {/* Tuğla Kemer Kapı */}
          <path d="M 150,420 L 150,220 C 150,80 650,80 650,220 L 650,420 Z" fill="#E8DEC8" stroke="#5A1A24" strokeWidth="4" />
          <path d="M 200,420 L 200,240 C 200,130 600,130 600,240 L 600,420 Z" fill="#F4EFE6" stroke="#5A1A24" strokeWidth="3" />

          {/* Karakter 1 (Sol Saldırgan) */}
          <circle cx="280" cy="230" r="42" fill="#FFFFFF" stroke="#5A1A24" strokeWidth="3.5" />
          <path d="M 240,360 L 320,360 L 310,272 L 250,272 Z" fill="#6B4226" stroke="#5A1A24" strokeWidth="3" />
          <circle cx="268" cy="225" r="4" fill="#5A1A24" />
          <circle cx="292" cy="225" r="4" fill="#5A1A24" />
          <line x1="272" y1="245" x2="288" y2="245" stroke="#5A1A24" strokeWidth="3" />

          {/* Karakter 2 (Orta Lider) */}
          <circle cx="400" cy="220" r="46" fill="#FFFFFF" stroke="#5A1A24" strokeWidth="3.5" />
          <path d="M 350,360 L 450,360 L 440,266 L 360,266 Z" fill="#1C1917" stroke="#5A1A24" strokeWidth="3" />
          <circle cx="386" cy="215" r="4" fill="#5A1A24" />
          <circle cx="414" cy="215" r="4" fill="#5A1A24" />
          <path d="M 390,235 Q 400,245 410,235" fill="none" stroke="#5A1A24" strokeWidth="3" />

          {/* Karakter 3 (Sağdaki Mağdur - Kolunda Saat ve Çanta) */}
          <circle cx="530" cy="230" r="42" fill="#FFFFFF" stroke="#5A1A24" strokeWidth="3.5" />
          <path d="M 490,360 L 570,360 L 560,272 L 500,272 Z" fill="#3B536B" stroke="#5A1A24" strokeWidth="3" />
          <circle cx="518" cy="225" r="4" fill="#5A1A24" />
          <circle cx="542" cy="225" r="4" fill="#5A1A24" />
          <line x1="522" y1="245" x2="538" y2="245" stroke="#5A1A24" strokeWidth="3" />

          {/* Çanta ve Saat Vurgusu */}
          <rect x="460" y="295" width="45" height="32" rx="4" fill="#6E3B20" stroke="#5A1A24" strokeWidth="2.5" />
          <circle cx="575" cy="310" r="14" fill="#B8860B" stroke="#5A1A24" strokeWidth="2.5" />
          <circle cx="575" cy="310" r="6" fill="#FFFFFF" />
        </svg>
      </div>

      {/* 6. ALT TCK KANUN HÜKMÜ KARTI */}
      <div
        style={{
          position: "absolute",
          top: "895px",
          backgroundColor: "#5A1A24",
          border: "2px solid #B8860B",
          borderRadius: "14px",
          padding: "16px 36px",
          display: "flex",
          alignItems: "center",
          gap: "20px",
          boxShadow: "6px 6px 0px rgba(0,0,0,0.15)",
          zIndex: 20,
        }}
      >
        <Clock size={28} color="#B8860B" />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontFamily: TurkishFont, fontSize: "14px", fontWeight: 900, color: "#B8860B" }}>
            {legalVerdictTag}
          </span>
          <span style={{ fontFamily: TurkishFont, fontSize: "20px", fontWeight: 900, color: "#FFFFFF" }}>
            {crimeCode}
          </span>
        </div>
      </div>
    </div>
  );
};
