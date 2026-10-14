import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { TurkishFont } from "../../load-font";

export interface MathGenreProps {
  episodeTag?: string;
  questionTop?: string;
  equationMain?: string;
  fillProgress?: number;
}

/**
 * VisualMathGenre (mathgine.official tarzı):
 * Derin lacivert kozmik ızgara, neon parlayan degrade rozet,
 * devasa soru başlığı ("why does 0.999... = 1?"),
 * animasyonlu parça parça dolan kesikli ispat çubuğu ve sayı doğrusu.
 */
export const VisualMathGenre: React.FC<MathGenreProps> = ({
  episodeTag = "VISUAL MATH · #004",
  questionTop = "why does",
  equationMain = "0.999... = 1?",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Kesikli çubuğun parça parça doluşu (0.9, 0.09, 0.009...)
  const fill1 = interpolate(frame, [10, 30], [0, 90], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const fill2 = interpolate(frame, [30, 50], [0, 9], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const fill3 = interpolate(frame, [50, 70], [0, 0.9], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const totalFill = Math.min(100, fill1 + fill2 + fill3);

  // Başlık yaylanması
  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 12, mass: 0.5, stiffness: 140 },
  });
  const titleScale = interpolate(enterSpring, [0, 1], [0.8, 1]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        backgroundColor: "#070B1E", // Derin Matematiksel Lacivert
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* 1. MAVİ KOZMİK KOORDİNAT IZGARASI */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: "linear-gradient(rgba(56, 189, 248, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(56, 189, 248, 0.08) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          pointerEvents: "none",
        }}
      />

      {/* 2. ÜST NEON GRADIENT ROZET */}
      <div
        style={{
          position: "absolute",
          top: "160px",
          border: "2px solid #00F2FE",
          borderRadius: "8px",
          padding: "6px 20px",
          backgroundColor: "rgba(7, 11, 30, 0.8)",
          boxShadow: "0 0 20px rgba(0, 242, 254, 0.4)",
          zIndex: 20,
        }}
      >
        <span
          style={{
            fontFamily: TurkishFont,
            fontSize: "14px",
            fontWeight: 900,
            color: "#FFFFFF",
            letterSpacing: "3px",
          }}
        >
          {episodeTag}
        </span>
      </div>

      {/* 3. DEVASA MANŞET: why does 0.999... = 1? */}
      <div
        style={{
          position: "absolute",
          top: "230px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "4px",
          transform: `scale(${titleScale})`,
          zIndex: 20,
        }}
      >
        <span
          style={{
            fontFamily: TurkishFont,
            fontSize: "42px",
            fontWeight: 800,
            color: "#FFFFFF",
            letterSpacing: "-0.5px",
          }}
        >
          {questionTop}
        </span>

        <h1
          style={{
            fontFamily: TurkishFont,
            fontSize: "64px",
            fontWeight: 900,
            color: "#FFFFFF",
            margin: 0,
            letterSpacing: "-1px",
            textShadow: "0 0 40px rgba(0, 242, 254, 0.8), 0 0 70px rgba(223, 255, 0, 0.4)",
          }}
        >
          {equationMain.replace("?", "")}
          <span style={{ color: "#DFFF00" }}>?</span>
        </h1>
      </div>

      {/* 4. MERKEZ İNTERAKTİF İSPAT ÇUBUĞU (Visual Bar Fill) */}
      <div
        style={{
          position: "absolute",
          top: "460px",
          width: "780px",
          height: "120px",
          border: "3px dashed #00F2FE",
          borderRadius: "16px",
          padding: "8px",
          display: "flex",
          alignItems: "center",
          backgroundColor: "rgba(0, 242, 254, 0.03)",
          boxShadow: "0 0 35px rgba(0, 242, 254, 0.2)",
          zIndex: 15,
        }}
      >
        {/* Dolan İlerleme Bloğu */}
        <div
          style={{
            width: `${totalFill}%`,
            height: "100%",
            background: "linear-gradient(90deg, #00F2FE 0%, #DFFF00 100%)",
            borderRadius: "10px",
            boxShadow: "0 0 25px rgba(223, 255, 0, 0.6)",
            transition: "width 0.1s ease",
          }}
        />

        {/* Doluluk Etiketi */}
        <div
          style={{
            position: "absolute",
            right: "20px",
            fontFamily: TurkishFont,
            fontSize: "24px",
            fontWeight: 900,
            color: totalFill >= 99 ? "#DFFF00" : "#FFFFFF",
            textShadow: "0 0 10px rgba(0,0,0,0.8)",
          }}
        >
          {totalFill >= 99 ? "= 1.0 (TAM)" : `${totalFill.toFixed(2)}`}
        </div>
      </div>

      {/* 5. ALT ADIM ADIM İSPAT ETİKETLERİ */}
      <div
        style={{
          position: "absolute",
          top: "620px",
          width: "780px",
          display: "flex",
          justifyContent: "space-between",
          zIndex: 20,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <span style={{ fontFamily: TurkishFont, fontSize: "20px", fontWeight: 900, color: "#00F2FE" }}>+ 0.9</span>
          <span style={{ fontFamily: TurkishFont, fontSize: "12px", color: "#64748B", fontWeight: 700 }}>1. Adım</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <span style={{ fontFamily: TurkishFont, fontSize: "20px", fontWeight: 900, color: "#38BDF8" }}>+ 0.09</span>
          <span style={{ fontFamily: TurkishFont, fontSize: "12px", color: "#64748B", fontWeight: 700 }}>2. Adım</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <span style={{ fontFamily: TurkishFont, fontSize: "20px", fontWeight: 900, color: "#FACC15" }}>+ 0.009</span>
          <span style={{ fontFamily: TurkishFont, fontSize: "12px", color: "#64748B", fontWeight: 700 }}>3. Adım</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <span style={{ fontFamily: TurkishFont, fontSize: "20px", fontWeight: 900, color: "#DFFF00" }}>Fark → 0</span>
          <span style={{ fontFamily: TurkishFont, fontSize: "12px", color: "#64748B", fontWeight: 700 }}>Sonsuzluk</span>
        </div>
      </div>
    </div>
  );
};
