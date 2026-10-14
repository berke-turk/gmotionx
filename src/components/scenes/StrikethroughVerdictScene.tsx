import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { TurkishFont } from "../../load-font";
import { currentTheme } from "../../theme";
import { MaskingTape } from "../MaskingTape";

export interface StrikethroughVerdictSceneProps {
  badge?: string;
  title?: string;
  verdictText?: string;
}

export const StrikethroughVerdictScene: React.FC<StrikethroughVerdictSceneProps> = ({
  badge = "KESİN GERÇEK",
  verdictText = "Konteyner nereye giderse, kod orada kusursuz çalışır.",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const isPaper = currentTheme.id === "paper-explainer";
  const isGlass = currentTheme.id === "glassmorphism";

  // Çizgi çizilme animasyonu (Strikethrough progress)
  const strikeProgress = interpolate(frame, [10, 24], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const ruleSpring = spring({
    frame: Math.max(0, frame - 24),
    fps,
    config: { damping: 10, mass: 0.5, stiffness: 150 },
  });

  const stampSpring = spring({
    frame: Math.max(0, frame - 38),
    fps,
    config: { damping: 12, mass: 0.6, stiffness: 180 },
  });

  const ruleScale = interpolate(ruleSpring, [0, 1], [0.85, 1]);
  const stampScale = interpolate(stampSpring, [0, 1], [2.2, 1]);
  const stampOpacity = interpolate(stampSpring, [0, 1], [0, 1]);

  return (
    <div
      style={{
        position: "absolute",
        top: "200px",
        left: "35px",
        right: "35px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "32px",
        zIndex: 35,
      }}
    >
      {/* 1. ÜST ROZET */}
      <div
        style={{
          backgroundColor: currentTheme.colors.accentSecondary,
          color: "#FFFFFF",
          fontFamily: TurkishFont,
          fontSize: "18px",
          fontWeight: 900,
          letterSpacing: "0.14em",
          padding: "8px 26px",
          borderRadius: "8px",
          border: currentTheme.styles.border,
          boxShadow: currentTheme.styles.boxShadowSmall,
          transform: isPaper ? "rotate(-1.5deg)" : "none",
        }}
      >
        🏆 {badge}
      </div>

      {/* 2. ÜSTÜ ÇİZİLEN ESKİ BAHANE (Dev Font ve Kalın Kırmızı Çizgi) */}
      <div
        style={{
          position: "relative",
          display: "inline-block",
          padding: "14px 26px",
          backgroundColor: isPaper ? "#FEE2E2" : "rgba(239, 68, 68, 0.15)",
          borderRadius: "14px",
          border: "2px solid rgba(239, 68, 68, 0.4)",
        }}
      >
        <span
          style={{
            fontFamily: TurkishFont,
            fontSize: "36px",
            fontWeight: 900,
            color: isPaper ? "#991B1B" : "#F87171",
            letterSpacing: "0.02em",
            opacity: strikeProgress > 0.8 ? 0.6 : 1,
          }}
        >
          "BENİM MAKİNEMDE ÇALIŞIYORDU"
        </span>

        {/* Dinamik Kırmızı Çizgi (Kocaman Strikethrough) */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "8px",
            right: "8px",
            height: "7px",
            backgroundColor: "#EF4444",
            transform: `translateY(-50%) scaleX(${strikeProgress})`,
            transformOrigin: "left center",
            borderRadius: "4px",
            boxShadow: "0 0 16px rgba(239, 68, 68, 0.9)",
          }}
        />
      </div>

      {/* 3. YENİ KURAL (Editorial Mic-Drop Card - Devasa) */}
      <div
        style={{
          width: "100%",
          backgroundColor: isGlass
            ? "rgba(10, 25, 45, 0.92)"
            : isPaper
            ? "#FFFFFF"
            : currentTheme.colors.cardBackground,
          border: isGlass ? "3px solid #00F2FE" : currentTheme.styles.borderThick,
          borderRadius: "26px",
          padding: "48px 32px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "24px",
          textAlign: "center",
          transform: `scale(${ruleScale})`,
          boxShadow: isGlass
            ? "0 30px 70px rgba(0, 242, 254, 0.35)"
            : currentTheme.styles.boxShadow,
          position: "relative",
        }}
      >
        {isPaper && <MaskingTape width={240} height={42} top={-21} rotate={-1.5} />}

        <div
          style={{
            fontFamily: TurkishFont,
            fontSize: "18px",
            fontWeight: 900,
            color: currentTheme.colors.textSecondary,
            letterSpacing: "0.18em",
          }}
        >
          ARTIK DEĞİŞMEZ TEK BİR KURAL VAR:
        </div>

        <div
          style={{
            fontFamily: TurkishFont,
            fontSize: "38px",
            fontWeight: 900,
            lineHeight: 1.25,
            color: currentTheme.colors.textPrimary,
            letterSpacing: "-0.01em",
            textShadow: isGlass ? "0 0 35px rgba(0, 242, 254, 0.6)" : "none",
          }}
        >
          "{verdictText}"
        </div>

        {/* Döner Kırmızı Onay Damgası (Stamp) */}
        <div
          style={{
            position: "absolute",
            bottom: "-24px",
            right: "24px",
            transform: `scale(${stampScale}) rotate(-9deg)`,
            opacity: stampOpacity,
            border: "4px solid #E11D48",
            color: "#E11D48",
            backgroundColor: isPaper ? "#FFFFFF" : "#0A0D14",
            borderRadius: "12px",
            padding: "8px 22px",
            fontFamily: TurkishFont,
            fontSize: "20px",
            fontWeight: 900,
            letterSpacing: "0.12em",
            boxShadow: "0 6px 20px rgba(225, 29, 72, 0.5)",
          }}
        >
          STANDART ONAYLANDI ✓
        </div>
      </div>
    </div>
  );
};
