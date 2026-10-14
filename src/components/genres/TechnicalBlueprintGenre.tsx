import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { TurkishFont } from "../../load-font";
import { Cpu, Disc } from "lucide-react";

export interface TechnicalBlueprintGenreProps {
  blueprintTag?: string;
  headlineMain?: string;
  headlineSub?: string;
  componentName?: string;
  toleranceSpec?: string;
  materialSpec?: string;
  assemblyNote?: string;
  closingVerdict?: string;
}

/**
 * TechnicalBlueprintGenre (Ayhan Tarakcı / Mühendislik / CAD Blueprint Tarzı):
 * Derin kobalt mavi CAD zemin (#021B2B), 10mm teknik ızgara ve "+" hizalama imleri,
 * patlatılmış montaj (exploded view) ve X-Ray kesit çizgileri, ölçülendirme okları (Ø 42mm),
 * telemetri ve endüstriyel teknik künye.
 */
export const TechnicalBlueprintGenre: React.FC<TechnicalBlueprintGenreProps> = ({
  blueprintTag = "CAD BLUEPRINT · DETAY ŞARTNAMESİ N° 84",
  headlineMain = "Sıradan bir parça değil,",
  headlineSub = "0.01 mm toleranslı mühendislik.",
  componentName = "TİTANYUM ROTOR MİLİ",
  toleranceSpec = "TOLERANS: ±0.01 mm",
  materialSpec = "MALZEME: GRADE 5 TITANIUM",
  assemblyNote = "12.000 RPM Dinamik Balans",
  closingVerdict = "Mühendislikte mükemmellik eklenecek bir şey kalmadığında değil, çıkarılacak fazlalık olmadığında başlar.",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Giriş yaylanması
  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.7, stiffness: 120 },
  });

  const opacity = interpolate(enterSpring, [0, 1], [0, 1]);
  const explodedOffset = interpolate(frame, [0, 60], [0, 30], { extrapolateRight: "clamp" });

  const cadCyan = "#00F2FE";
  const cadBlue = "#0284C7";

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        backgroundColor: "#021626", // Derin CAD Blueprint mavisi
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* 1. CAD TEKNİK KARELİ BLUEPRINT IZGARASI */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(0, 242, 254, 0.12) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 242, 254, 0.12) 1px, transparent 1px),
            linear-gradient(rgba(0, 242, 254, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 242, 254, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px, 80px 80px, 16px 16px, 16px 16px",
          opacity: 0.8,
        }}
      />

      {/* Dört Köşe "+" Hizalama İmleri */}
      <span style={{ position: "absolute", top: "30px", left: "30px", color: cadCyan, fontFamily: "monospace", fontSize: "16px" }}>+</span>
      <span style={{ position: "absolute", top: "30px", right: "30px", color: cadCyan, fontFamily: "monospace", fontSize: "16px" }}>+</span>
      <span style={{ position: "absolute", bottom: "30px", left: "30px", color: cadCyan, fontFamily: "monospace", fontSize: "16px" }}>+</span>
      <span style={{ position: "absolute", bottom: "30px", right: "30px", color: cadCyan, fontFamily: "monospace", fontSize: "16px" }}>+</span>

      {/* 2. ÜST TEKNİK KÜNYE (CAD HEADER) */}
      <div
        style={{
          position: "absolute",
          top: "140px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          backgroundColor: "rgba(2, 132, 199, 0.18)",
          border: `1.5px solid ${cadCyan}`,
          borderRadius: "4px",
          padding: "6px 16px",
          opacity,
          zIndex: 25,
        }}
      >
        <Cpu size={16} color={cadCyan} />
        <span
          style={{
            fontFamily: "monospace, -apple-system, sans-serif",
            fontSize: "12px",
            fontWeight: 800,
            color: cadCyan,
            letterSpacing: "1.2px",
          }}
        >
          {blueprintTag}
        </span>
      </div>

      {/* 3. MANŞET BAŞLIK */}
      <div
        style={{
          position: "absolute",
          top: "205px",
          width: "88%",
          textAlign: "center",
          opacity,
          zIndex: 25,
        }}
      >
        <h1
          style={{
            fontFamily: TurkishFont,
            fontSize: "46px",
            fontWeight: 900,
            color: "#FFFFFF",
            letterSpacing: "-1px",
            margin: 0,
            lineHeight: 1.1,
          }}
        >
          {headlineMain}
        </h1>
        <h2
          style={{
            fontFamily: TurkishFont,
            fontSize: "42px",
            fontWeight: 900,
            color: cadCyan,
            letterSpacing: "-0.8px",
            margin: 0,
            lineHeight: 1.1,
            textShadow: `0 0 20px rgba(0, 242, 254, 0.4)`,
          }}
        >
          {headlineSub}
        </h2>
      </div>

      {/* 4. PATLATILMIŞ MONTAJ & X-RAY KESİT (EXPLODED VIEW CAD DRAWING) */}
      <div
        style={{
          position: "absolute",
          top: "330px",
          width: "860px",
          height: "460px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 15,
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
            backgroundColor: "rgba(2, 22, 38, 0.8)",
            border: `1.5px solid rgba(0, 242, 254, 0.4)`,
            borderRadius: "12px",
            boxShadow: `0 0 40px rgba(0, 242, 254, 0.1)`,
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* SVG Teknik Kesit Çizimi */}
          <svg width="760" height="380" viewBox="0 0 760 380" fill="none">
            {/* Merkez Şaft (Gövde) */}
            <rect x="260" y="160" width="240" height="60" stroke={cadCyan} strokeWidth="2" strokeDasharray="4 4" fill="rgba(0, 242, 254, 0.05)" />
            
            {/* Sol Flanş (Exploded Sol) */}
            <g transform={`translate(${-explodedOffset}, 0)`}>
              <rect x="180" y="130" width="70" height="120" rx="4" stroke="#FFFFFF" strokeWidth="2.5" fill="rgba(2, 132, 199, 0.2)" />
              <line x1="215" y1="110" x2="215" y2="270" stroke={cadCyan} strokeWidth="1" strokeDasharray="2 2" />
            </g>

            {/* Sağ Rulman Grubu (Exploded Sağ) */}
            <g transform={`translate(${explodedOffset}, 0)`}>
              <circle cx="560" cy="190" r="50" stroke={cadCyan} strokeWidth="2.5" fill="rgba(0, 242, 254, 0.1)" />
              <circle cx="560" cy="190" r="30" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="4 4" />
              <circle cx="560" cy="190" r="12" fill={cadCyan} />
            </g>

            {/* Ölçülendirme Çizgileri ve Leader Arrow */}
            <line x1="160" y1="90" x2="600" y2="90" stroke="#94A3B8" strokeWidth="1.5" />
            <line x1="160" y1="80" x2="160" y2="100" stroke="#94A3B8" strokeWidth="1.5" />
            <line x1="600" y1="80" x2="600" y2="100" stroke="#94A3B8" strokeWidth="1.5" />
            <text x="350" y="82" fill="#E2E8F0" fontSize="14" fontFamily="monospace" fontWeight="900">440 mm</text>

            <line x1="620" y1="140" x2="680" y2="100" stroke={cadCyan} strokeWidth="1.5" />
            <text x="690" y="104" fill={cadCyan} fontSize="13" fontFamily="monospace" fontWeight="900">Ø 100 mm</text>
          </svg>

          {/* Sol Alt Parça Künyesi */}
          <div
            style={{
              position: "absolute",
              left: "20px",
              bottom: "20px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Disc size={18} color={cadCyan} />
            <span style={{ fontFamily: "monospace", fontSize: "12px", fontWeight: 800, color: "#94A3B8" }}>
              {componentName}
            </span>
          </div>
        </div>
      </div>

      {/* 5. ALT ŞARTNAME KARTLARI (Mobile Safe Zone: bottom 280px) */}
      <div
        style={{
          position: "absolute",
          bottom: "280px",
          width: "88%",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          opacity,
          zIndex: 25,
        }}
      >
        <div style={{ display: "flex", gap: "14px" }}>
          <div
            style={{
              flex: 1,
              backgroundColor: "rgba(2, 22, 38, 0.9)",
              border: `1.5px solid ${cadBlue}`,
              borderRadius: "14px",
              padding: "16px 20px",
              display: "flex",
              flexDirection: "column",
              gap: "4px",
            }}
          >
            <span style={{ fontFamily: "monospace", fontSize: "11px", fontWeight: 800, color: cadCyan }}>
              {toleranceSpec}
            </span>
            <span style={{ fontFamily: TurkishFont, fontSize: "16px", fontWeight: 900, color: "#FFFFFF" }}>
              {materialSpec}
            </span>
          </div>

          <div
            style={{
              flex: 1,
              backgroundColor: "rgba(2, 22, 38, 0.9)",
              border: `1.5px solid rgba(0, 242, 254, 0.35)`,
              borderRadius: "14px",
              padding: "16px 20px",
              display: "flex",
              flexDirection: "column",
              gap: "4px",
            }}
          >
            <span style={{ fontFamily: "monospace", fontSize: "11px", fontWeight: 800, color: "#94A3B8" }}>
              DİNAMİK ŞART
            </span>
            <span style={{ fontFamily: TurkishFont, fontSize: "18px", fontWeight: 900, color: cadCyan }}>
              {assemblyNote}
            </span>
          </div>
        </div>

        <div
          style={{
            backgroundColor: "rgba(2, 18, 32, 0.9)",
            border: "1px solid rgba(0, 242, 254, 0.2)",
            borderRadius: "12px",
            padding: "12px 18px",
            textAlign: "center",
          }}
        >
          <span style={{ fontFamily: TurkishFont, fontSize: "13px", fontWeight: 700, color: "#CBD5E1" }}>
            {closingVerdict}
          </span>
        </div>
      </div>
    </div>
  );
};
