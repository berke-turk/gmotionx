import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Box, Lock, Laptop, Server, Cloud, Check, FileCode2, Package, Settings2 } from "lucide-react";
import { TurkishFont } from "../../load-font";
import { currentTheme } from "../../theme";
import { MaskingTape } from "../MaskingTape";

export interface CargoMetaphorSceneProps {
  badge?: string;
  title?: string;
}

export const CargoMetaphorScene: React.FC<CargoMetaphorSceneProps> = ({
  badge = "TEMEL MANTIK",
  title = "STANDART KARGO KONTEYNERİ",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const isPaper = currentTheme.id === "paper-explainer";
  const isGlass = currentTheme.id === "glassmorphism";

  // Spring animasyonları
  const containerSpring = spring({
    frame,
    fps,
    config: { damping: 12, mass: 0.6, stiffness: 130 },
  });

  const chip1Spring = spring({
    frame: Math.max(0, frame - 8),
    fps,
    config: { damping: 10, mass: 0.4, stiffness: 160 },
  });

  const chip2Spring = spring({
    frame: Math.max(0, frame - 15),
    fps,
    config: { damping: 10, mass: 0.4, stiffness: 160 },
  });

  const chip3Spring = spring({
    frame: Math.max(0, frame - 22),
    fps,
    config: { damping: 10, mass: 0.4, stiffness: 160 },
  });

  const lockSpring = spring({
    frame: Math.max(0, frame - 30),
    fps,
    config: { damping: 12, mass: 0.5, stiffness: 180 },
  });

  const containerScale = interpolate(containerSpring, [0, 1], [0.85, 1]);
  const lockScale = interpolate(lockSpring, [0, 1], [0, 1]);

  return (
    <div
      style={{
        position: "absolute",
        top: "190px",
        left: "35px",
        right: "35px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "24px",
        zIndex: 35,
      }}
    >
      {/* 1. BÜYÜK VURUCU BAŞLIK & ROZET */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "12px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            backgroundColor: currentTheme.colors.accentSecondary,
            color: "#FFFFFF",
            fontFamily: TurkishFont,
            fontSize: "18px",
            fontWeight: 900,
            letterSpacing: "0.14em",
            padding: "8px 24px",
            borderRadius: "8px",
            border: currentTheme.styles.border,
            boxShadow: currentTheme.styles.boxShadowSmall,
            transform: isPaper ? "rotate(-1deg)" : "none",
          }}
        >
          🚢 {badge}
        </div>

        <div
          style={{
            fontFamily: TurkishFont,
            fontSize: "44px",
            fontWeight: 900,
            color: currentTheme.colors.textPrimary,
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            textShadow: isGlass ? "0 0 30px rgba(0, 242, 254, 0.4)" : "none",
          }}
        >
          {title}
        </div>
      </div>

      {/* 2. DEVASA DOCKER KARGO KONTEYNERİ (Göz Hizası ve Dolgun) */}
      <div
        style={{
          width: "100%",
          backgroundColor: isGlass
            ? "rgba(10, 25, 45, 0.88)"
            : isPaper
            ? "#FFFFFF"
            : "#1E293B",
          border: isGlass ? "2.5px solid #00F2FE" : currentTheme.styles.borderThick,
          borderRadius: "24px",
          padding: "36px 26px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "26px",
          transform: `scale(${containerScale})`,
          boxShadow: isGlass
            ? "0 25px 60px rgba(0, 242, 254, 0.28)"
            : currentTheme.styles.boxShadow,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {isPaper && <MaskingTape width={220} height={42} top={-21} rotate={1} />}

        {/* Konteyner Çelik Nervür Çizgileri */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 48px, rgba(0, 242, 254, 0.06) 48px, rgba(0, 242, 254, 0.06) 56px)`,
            pointerEvents: "none",
          }}
        />

        {/* Konteyner Başlık Şeridi & Docker Mühürü */}
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: isGlass ? "2px solid rgba(0, 242, 254, 0.3)" : currentTheme.styles.border,
            paddingBottom: "18px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <Box size={38} color={currentTheme.colors.accentPrimary} />
            <span
              style={{
                fontFamily: TurkishFont,
                fontSize: "26px",
                fontWeight: 900,
                color: currentTheme.colors.textPrimary,
                letterSpacing: "0.02em",
              }}
            >
              DOCKER STANDART PAKETİ
            </span>
          </div>

          {/* Kilit Rozeti */}
          <div
            style={{
              backgroundColor: currentTheme.colors.accentPrimary,
              color: "#0A0D14",
              borderRadius: "10px",
              padding: "8px 16px",
              fontFamily: TurkishFont,
              fontSize: "16px",
              fontWeight: 900,
              display: "flex",
              alignItems: "center",
              gap: "6px",
              transform: `scale(${lockScale})`,
              boxShadow: "0 0 20px rgba(0, 242, 254, 0.6)",
            }}
          >
            <Lock size={18} /> %100 İZOLE
          </div>
        </div>

        {/* Konteyner İçine Giren 3 Büyük Vektörel Modül */}
        <div style={{ display: "flex", width: "100%", gap: "14px" }}>
          <div
            style={{
              flex: 1,
              backgroundColor: "rgba(0, 242, 254, 0.14)",
              border: `2px solid ${currentTheme.colors.accentPrimary}`,
              borderRadius: "16px",
              padding: "24px 12px",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
              transform: `scale(${interpolate(chip1Spring, [0, 1], [0.7, 1])})`,
            }}
          >
            <FileCode2 size={44} color={currentTheme.colors.accentPrimary} />
            <span style={{ fontFamily: TurkishFont, fontSize: "20px", fontWeight: 900, color: currentTheme.colors.textPrimary }}>
              1. Kod
            </span>
            <span style={{ fontSize: "15px", color: currentTheme.colors.textSecondary, fontWeight: 700 }}>
              App.js / Python
            </span>
          </div>

          <div
            style={{
              flex: 1,
              backgroundColor: "rgba(157, 78, 221, 0.18)",
              border: "2px solid #9D4EDD",
              borderRadius: "16px",
              padding: "24px 12px",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
              transform: `scale(${interpolate(chip2Spring, [0, 1], [0.7, 1])})`,
            }}
          >
            <Package size={44} color="#C084FC" />
            <span style={{ fontFamily: TurkishFont, fontSize: "20px", fontWeight: 900, color: currentTheme.colors.textPrimary }}>
              2. Kütüphane
            </span>
            <span style={{ fontSize: "15px", color: currentTheme.colors.textSecondary, fontWeight: 700 }}>
              Node Modules
            </span>
          </div>

          <div
            style={{
              flex: 1,
              backgroundColor: "rgba(16, 185, 129, 0.16)",
              border: "2px solid #10B981",
              borderRadius: "16px",
              padding: "24px 12px",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
              transform: `scale(${interpolate(chip3Spring, [0, 1], [0.7, 1])})`,
            }}
          >
            <Settings2 size={44} color="#34D399" />
            <span style={{ fontFamily: TurkishFont, fontSize: "20px", fontWeight: 900, color: currentTheme.colors.textPrimary }}>
              3. Ayarlar
            </span>
            <span style={{ fontSize: "15px", color: currentTheme.colors.textSecondary, fontWeight: 700 }}>
              Ortam & Portlar
            </span>
          </div>
        </div>
      </div>

      {/* 3. TAŞINABİLİRLİK HEDEFLERİ (Büyük ve Net) */}
      <div style={{ display: "flex", width: "100%", gap: "16px" }}>
        <div
          style={{
            flex: 1,
            backgroundColor: isPaper ? "#FFFFFF" : currentTheme.colors.cardBackground,
            border: currentTheme.styles.border,
            borderRadius: "16px",
            padding: "20px 10px",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
            boxShadow: currentTheme.styles.boxShadowSmall,
          }}
        >
          <Laptop size={34} color={currentTheme.colors.accentPrimary} />
          <span style={{ fontFamily: TurkishFont, fontSize: "17px", fontWeight: 900, color: currentTheme.colors.textPrimary }}>
            Kişisel Mac
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: "4px", color: "#10B981", fontSize: "14px", fontWeight: 800 }}>
            <Check size={18} /> Uyumlu
          </div>
        </div>

        <div
          style={{
            flex: 1,
            backgroundColor: isPaper ? "#FFFFFF" : currentTheme.colors.cardBackground,
            border: currentTheme.styles.border,
            borderRadius: "16px",
            padding: "20px 10px",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
            boxShadow: currentTheme.styles.boxShadowSmall,
          }}
        >
          <Server size={34} color={currentTheme.colors.accentPrimary} />
          <span style={{ fontFamily: TurkishFont, fontSize: "17px", fontWeight: 900, color: currentTheme.colors.textPrimary }}>
            Linux Sunucu
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: "4px", color: "#10B981", fontSize: "14px", fontWeight: 800 }}>
            <Check size={18} /> Uyumlu
          </div>
        </div>

        <div
          style={{
            flex: 1,
            backgroundColor: isPaper ? "#FFFFFF" : currentTheme.colors.cardBackground,
            border: currentTheme.styles.border,
            borderRadius: "16px",
            padding: "20px 10px",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
            boxShadow: currentTheme.styles.boxShadowSmall,
          }}
        >
          <Cloud size={34} color={currentTheme.colors.accentPrimary} />
          <span style={{ fontFamily: TurkishFont, fontSize: "17px", fontWeight: 900, color: currentTheme.colors.textPrimary }}>
            AWS / Bulut
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: "4px", color: "#10B981", fontSize: "14px", fontWeight: 800 }}>
            <Check size={18} /> Uyumlu
          </div>
        </div>
      </div>
    </div>
  );
};
