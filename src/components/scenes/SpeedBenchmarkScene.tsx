import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Gauge, Rocket } from "lucide-react";
import { TurkishFont } from "../../load-font";
import { currentTheme } from "../../theme";
import { MaskingTape } from "../MaskingTape";

export interface SpeedBenchmarkSceneProps {
  badge?: string;
  title?: string;
  metricValue?: string;
  metricLabel?: string;
}

export const SpeedBenchmarkScene: React.FC<SpeedBenchmarkSceneProps> = ({
  badge = "PERFORMANS FARKI",
  title = "SANİYELER İÇİNDE BAŞLATMA",
  metricLabel = "Konteyner Ayağa Kalkma Süresi",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const isPaper = currentTheme.id === "paper-explainer";
  const isGlass = currentTheme.id === "glassmorphism";

  // Animasyon spring'leri
  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 12, mass: 0.6, stiffness: 130 },
  });

  const enterScale = interpolate(enterSpring, [0, 1], [0.9, 1]);

  const chartDrawProgress = interpolate(frame, [8, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Geri sayım / Hız sayacı (120 sn'den 0.5 sn'ye hızla düşen sayaç)
  const countdownNumber = interpolate(frame, [0, 32], [120, 0.5], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const formattedTime = countdownNumber.toFixed(1);

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
        transform: `scale(${enterScale})`,
      }}
    >
      {/* 1. ÜST BAŞLIK & ROZET */}
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
            transform: isPaper ? "rotate(1.5deg)" : "none",
          }}
        >
          ⚡ {badge}
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

      {/* 2. DİJİTAL HIZ GÖSTERGESİ & DEV SAYAÇ KARTI */}
      <div
        style={{
          width: "100%",
          backgroundColor: isGlass
            ? "rgba(10, 25, 45, 0.9)"
            : isPaper
            ? "#FFFFFF"
            : currentTheme.colors.cardBackground,
          border: isGlass ? "2.5px solid #00F2FE" : currentTheme.styles.borderThick,
          borderRadius: "24px",
          padding: "36px 26px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "24px",
          boxShadow: isGlass
            ? "0 25px 60px rgba(0, 242, 254, 0.3)"
            : currentTheme.styles.boxShadow,
          position: "relative",
        }}
      >
        {isPaper && <MaskingTape width={220} height={42} top={-21} rotate={-1.5} />}

        {/* Canlı Kronometre Sayacı (Devasa Font) */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: "12px",
            lineHeight: 1,
          }}
        >
          <span
            style={{
              fontFamily: TurkishFont,
              fontSize: "105px",
              fontWeight: 900,
              color: currentTheme.colors.accentPrimary,
              letterSpacing: "-0.04em",
              textShadow: isGlass ? "0 0 45px rgba(0, 242, 254, 0.7)" : "none",
            }}
          >
            {formattedTime}
          </span>
          <span
            style={{
              fontFamily: TurkishFont,
              fontSize: "44px",
              fontWeight: 900,
              color: currentTheme.colors.textPrimary,
            }}
          >
            sn
          </span>
        </div>

        <div
          style={{
            fontFamily: TurkishFont,
            fontSize: "20px",
            fontWeight: 800,
            color: currentTheme.colors.textSecondary,
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <Gauge size={26} color={currentTheme.colors.accentPrimary} /> {metricLabel}
        </div>

        {/* 3. MİNİMALİST KOORDİNAT GRAFİĞİ (Genişletilmiş ve Yüksek) */}
        <div
          style={{
            width: "100%",
            height: "190px",
            position: "relative",
            borderLeft: `3px solid ${isPaper ? "#18181B" : "rgba(255, 255, 255, 0.4)"}`,
            borderBottom: `3px solid ${isPaper ? "#18181B" : "rgba(255, 255, 255, 0.4)"}`,
            marginTop: "12px",
            display: "flex",
            alignItems: "flex-end",
            padding: "0 12px 6px",
          }}
        >
          {/* SVG Dinamik Yükselen Eğri */}
          <svg
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible" }}
            viewBox="0 0 400 190"
          >
            {/* VM Yavaş Düz Çizgisi */}
            <path
              d="M 10 175 Q 200 170 390 165"
              fill="none"
              stroke="#64748B"
              strokeWidth="3.5"
              strokeDasharray="6 6"
            />
            {/* Docker Roket Hız Eğrisi */}
            <path
              d="M 10 175 Q 110 160 390 20"
              fill="none"
              stroke={currentTheme.colors.accentPrimary}
              strokeWidth="6"
              strokeDasharray="600"
              strokeDashoffset={`${(1 - chartDrawProgress) * 600}`}
            />
            {/* Zirve Noktası */}
            {chartDrawProgress > 0.85 && (
              <circle cx="390" cy="20" r="10" fill={currentTheme.colors.accentSecondary} />
            )}
          </svg>

          {/* Eksen Etiketleri */}
          <div
            style={{
              position: "absolute",
              bottom: "-32px",
              left: "4px",
              fontSize: "15px",
              fontFamily: "monospace",
              color: currentTheme.colors.textSecondary,
              fontWeight: 700,
            }}
          >
            VM (120 sn)
          </div>
          <div
            style={{
              position: "absolute",
              bottom: "-32px",
              right: "4px",
              fontSize: "16px",
              fontFamily: "monospace",
              color: currentTheme.colors.accentPrimary,
              fontWeight: 900,
            }}
          >
            DOCKER (0.5 sn) ⚡
          </div>
        </div>
      </div>

      {/* 4. PERFORMANS ÇARPANI (Dev Roket Rozeti) */}
      <div
        style={{
          backgroundColor: isPaper ? "#FEF08A" : currentTheme.colors.accentPrimary,
          border: currentTheme.styles.border,
          borderRadius: "16px",
          padding: "16px 36px",
          display: "flex",
          alignItems: "center",
          gap: "14px",
          color: "#0A0D14",
          boxShadow: isGlass ? "0 0 35px rgba(0, 242, 254, 0.6)" : currentTheme.styles.boxShadowSmall,
        }}
      >
        <Rocket size={32} color="#0A0D14" />
        <span style={{ fontFamily: TurkishFont, fontSize: "22px", fontWeight: 900, letterSpacing: "0.02em" }}>
          240 KAT DAHA HIZLI BAŞLATMA
        </span>
      </div>
    </div>
  );
};
