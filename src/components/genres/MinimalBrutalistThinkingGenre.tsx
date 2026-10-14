import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { TurkishFont } from "../../load-font";
import { CheckCircle2 } from "lucide-react";

export interface MinimalBrutalistGenreProps {
  frameworkTag?: string;
  headlineMain?: string;
  headlineSub?: string;
  node1Title?: string;
  node1Desc?: string;
  node2Title?: string;
  node2Desc?: string;
  node3Title?: string;
  node3Desc?: string;
  coreRuleVerdict?: string;
}

/**
 * MinimalBrutalistThinkingGenre (Dan Koe / Yan Graphics / Visual Thinking Tarzı):
 * Derin siyah monokrom zemin (#0A0A0A), negatif alan ustalığı, tek asit neon sarı vurgusu (#DFFF00),
 * 3 aşamalı kavramsal düğüm akışı (Girdi -> Süzgeç -> Eylem), dinamik oklar ve keskin editoryal kurgu.
 */
export const MinimalBrutalistThinkingGenre: React.FC<MinimalBrutalistGenreProps> = ({
  frameworkTag = "SİSTEM DÜŞÜNCESİ · ÇERÇEVE 01",
  headlineMain = "Sorun odaklanamamak değil,",
  headlineSub = "net bir filtrenin olmaması.",
  node1Title = "01. HAM GİRDİ",
  node1Desc = "Günde 34 GB rastgele veri",
  node2Title = "02. MENTAL FİLTRE",
  node2Desc = "Amaca hizmet etmeyeni ele",
  node3Title = "03. DERİN ODAK",
  node3Desc = "Tek bir hamleye kilitlen",
  coreRuleVerdict = "Netlik bir duygu değil; neyi yok sayacağını bilme kararıdır.",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Giriş yaylanmaları
  const spring1 = spring({ frame, fps, config: { damping: 14, mass: 0.6, stiffness: 140 } });
  const spring2 = spring({ frame: Math.max(0, frame - 12), fps, config: { damping: 14, mass: 0.6, stiffness: 140 } });
  const spring3 = spring({ frame: Math.max(0, frame - 24), fps, config: { damping: 14, mass: 0.6, stiffness: 140 } });

  const lineProgress1 = interpolate(frame, [8, 30], [0, 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const lineProgress2 = interpolate(frame, [20, 42], [0, 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const acidYellow = "#DFFF00";

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        backgroundColor: "#0A0A0A",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* 1. MİNİMALİST IZGARA KOORDİNATLARI (SUBTLE DOT MATRIX) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.08) 1.5px, transparent 1.5px)`,
          backgroundSize: "36px 36px",
          opacity: 0.6,
        }}
      />

      {/* 2. ÜST FRAMEWORK ETİKETİ */}
      <div
        style={{
          position: "absolute",
          top: "140px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          backgroundColor: "#171717",
          border: "1px solid #262626",
          borderRadius: "6px",
          padding: "6px 16px",
          zIndex: 25,
        }}
      >
        <span
          style={{
            fontFamily: "monospace, -apple-system, sans-serif",
            fontSize: "12px",
            fontWeight: 800,
            color: acidYellow,
            letterSpacing: "1px",
          }}
        >
          {frameworkTag}
        </span>
      </div>

      {/* 3. STARK MONOKROM MANŞET */}
      <div
        style={{
          position: "absolute",
          top: "205px",
          width: "88%",
          textAlign: "center",
          zIndex: 25,
        }}
      >
        <h1
          style={{
            fontFamily: TurkishFont,
            fontSize: "46px",
            fontWeight: 900,
            color: "#FFFFFF",
            letterSpacing: "-1.5px",
            margin: 0,
            lineHeight: 1.08,
          }}
        >
          {headlineMain}
        </h1>
        <h2
          style={{
            fontFamily: TurkishFont,
            fontSize: "44px",
            fontWeight: 900,
            color: acidYellow,
            letterSpacing: "-1.2px",
            margin: 0,
            lineHeight: 1.08,
          }}
        >
          {headlineSub}
        </h2>
      </div>

      {/* 4. MERKEZ KAVRAMSAL 3 DÜĞÜM AKIŞI (CONCEPT NODE ARCHITECTURE) */}
      <div
        style={{
          position: "absolute",
          top: "330px",
          width: "880px",
          display: "flex",
          flexDirection: "column",
          gap: "18px",
          zIndex: 15,
        }}
      >
        {/* Düğüm 1 */}
        <div
          style={{
            backgroundColor: "#141414",
            border: "1.5px solid #262626",
            borderRadius: "14px",
            padding: "20px 26px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            transform: `translateY(${interpolate(spring1, [0, 1], [30, 0])}px)`,
            opacity: spring1,
          }}
        >
          <div>
            <div style={{ fontFamily: "monospace, sans-serif", fontSize: "12px", fontWeight: 900, color: "#737373" }}>
              {node1Title}
            </div>
            <div style={{ fontFamily: TurkishFont, fontSize: "22px", fontWeight: 800, color: "#FFFFFF", marginTop: "4px" }}>
              {node1Desc}
            </div>
          </div>
          <div style={{ width: "36px", height: "36px", borderRadius: "50%", backgroundColor: "#262626", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "#A3A3A3", fontSize: "14px", fontWeight: 900 }}>1</span>
          </div>
        </div>

        {/* Bağlantı Oku 1 (Trim Paths Progress) */}
        <div style={{ display: "flex", justifyContent: "center", height: "20px" }}>
          <div style={{ width: "2px", height: `${lineProgress1}%`, backgroundColor: acidYellow }} />
        </div>

        {/* Düğüm 2 (Ana Vurgu Düğümü) */}
        <div
          style={{
            backgroundColor: "#1A1A1A",
            border: `2px solid ${acidYellow}`,
            borderRadius: "14px",
            padding: "20px 26px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            transform: `translateY(${interpolate(spring2, [0, 1], [30, 0])}px)`,
            opacity: spring2,
            boxShadow: `0 0 35px rgba(223, 255, 0, 0.15)`,
          }}
        >
          <div>
            <div style={{ fontFamily: "monospace, sans-serif", fontSize: "12px", fontWeight: 900, color: acidYellow }}>
              {node2Title}
            </div>
            <div style={{ fontFamily: TurkishFont, fontSize: "24px", fontWeight: 900, color: "#FFFFFF", marginTop: "4px" }}>
              {node2Desc}
            </div>
          </div>
          <div style={{ width: "36px", height: "36px", borderRadius: "50%", backgroundColor: acidYellow, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "#0A0A0A", fontSize: "16px", fontWeight: 900 }}>⚡</span>
          </div>
        </div>

        {/* Bağlantı Oku 2 */}
        <div style={{ display: "flex", justifyContent: "center", height: "20px" }}>
          <div style={{ width: "2px", height: `${lineProgress2}%`, backgroundColor: "#525252" }} />
        </div>

        {/* Düğüm 3 */}
        <div
          style={{
            backgroundColor: "#141414",
            border: "1.5px solid #262626",
            borderRadius: "14px",
            padding: "20px 26px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            transform: `translateY(${interpolate(spring3, [0, 1], [30, 0])}px)`,
            opacity: spring3,
          }}
        >
          <div>
            <div style={{ fontFamily: "monospace, sans-serif", fontSize: "12px", fontWeight: 900, color: "#737373" }}>
              {node3Title}
            </div>
            <div style={{ fontFamily: TurkishFont, fontSize: "22px", fontWeight: 800, color: "#FFFFFF", marginTop: "4px" }}>
              {node3Desc}
            </div>
          </div>
          <div style={{ width: "36px", height: "36px", borderRadius: "50%", backgroundColor: "#262626", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <CheckCircle2 size={18} color="#A3A3A3" />
          </div>
        </div>
      </div>

      {/* 5. ALT SONUÇ / PRENSİP KARTI (Mobile Safe Zone: bottom 280px) */}
      <div
        style={{
          position: "absolute",
          bottom: "280px",
          width: "88%",
          backgroundColor: "#171717",
          border: "1px solid #262626",
          borderRadius: "14px",
          padding: "16px 22px",
          textAlign: "center",
          zIndex: 25,
        }}
      >
        <span style={{ fontFamily: TurkishFont, fontSize: "14px", fontWeight: 700, color: "#E5E5E5", lineHeight: 1.35 }}>
          {coreRuleVerdict}
        </span>
      </div>
    </div>
  );
};
