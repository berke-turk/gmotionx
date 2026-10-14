import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Terminal, AlertOctagon, Laptop, Server, CheckCircle } from "lucide-react";
import { TurkishFont } from "../../load-font";
import { currentTheme } from "../../theme";
import { MaskingTape } from "../MaskingTape";

export interface TerminalHookSceneProps {
  badge?: string;
  title?: string;
  leftTitle?: string;
  leftDesc?: string;
  rightTitle?: string;
  rightDesc?: string;
}

export const TerminalHookScene: React.FC<TerminalHookSceneProps> = ({
  badge = "YAZILIM ÇIKMAZI",
  title = "BENİM BİLGİSAYARIMDA ÇALIŞIYORDU!",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const isPaper = currentTheme.id === "paper-explainer";
  const isGlass = currentTheme.id === "glassmorphism";

  // Spring animasyonları
  const titleSpring = spring({
    frame,
    fps,
    config: { damping: 12, mass: 0.5, stiffness: 140 },
  });

  const terminalSpring = spring({
    frame: Math.max(0, frame - 6),
    fps,
    config: { damping: 14, mass: 0.7, stiffness: 120 },
  });

  const errorSpring = spring({
    frame: Math.max(0, frame - 32),
    fps,
    config: { damping: 10, mass: 0.4, stiffness: 160 },
  });

  const titleY = interpolate(titleSpring, [0, 1], [-40, 0]);
  const terminalScale = interpolate(terminalSpring, [0, 1], [0.88, 1]);
  const errorScale = interpolate(errorSpring, [0, 1], [0.6, 1]);
  const errorOpacity = interpolate(errorSpring, [0, 1], [0, 1]);

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
      {/* 1. ÜST KANCALI BAŞLIK (Hook Title) */}
      <div
        style={{
          transform: `translateY(${titleY}px)`,
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
            transform: isPaper ? "rotate(-1.5deg)" : "none",
          }}
        >
          ⚠️ {badge}
        </div>

        <div
          style={{
            fontFamily: TurkishFont,
            fontSize: "44px",
            fontWeight: 900,
            lineHeight: 1.1,
            color: currentTheme.colors.textPrimary,
            letterSpacing: "-0.02em",
            maxWidth: "850px",
            textShadow: isGlass ? "0 0 35px rgba(0, 242, 254, 0.45)" : "none",
          }}
        >
          {title}
        </div>
      </div>

      {/* 2. MACOS KOD TERMİNALİ (Büyük ve Görünür) */}
      <div
        style={{
          width: "100%",
          backgroundColor: isGlass
            ? "rgba(10, 15, 28, 0.9)"
            : isPaper
            ? "#FFFFFF"
            : "#1E1E1E",
          backdropFilter: isGlass ? "blur(24px)" : "none",
          WebkitBackdropFilter: isGlass ? "blur(24px)" : "none",
          border: isGlass ? "2.5px solid #00F2FE" : currentTheme.styles.borderThick,
          borderRadius: "24px",
          boxShadow: isGlass
            ? "0 25px 60px rgba(0, 0, 0, 0.7), 0 0 35px rgba(0, 242, 254, 0.2)"
            : currentTheme.styles.boxShadow,
          overflow: "hidden",
          transform: `scale(${terminalScale})`,
          position: "relative",
        }}
      >
        {isPaper && <MaskingTape width={220} height={42} top={-21} rotate={-1.2} />}

        {/* Terminal Üst Barı */}
        <div
          style={{
            height: "52px",
            backgroundColor: isGlass
              ? "rgba(255, 255, 255, 0.08)"
              : isPaper
              ? "#F4F0E6"
              : "#2D2D2D",
            borderBottom: isGlass ? "1.5px solid rgba(255, 255, 255, 0.15)" : currentTheme.styles.border,
            display: "flex",
            alignItems: "center",
            padding: "0 20px",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", gap: "10px" }}>
            <div style={{ width: "16px", height: "16px", borderRadius: "50%", backgroundColor: "#EF4444" }} />
            <div style={{ width: "16px", height: "16px", borderRadius: "50%", backgroundColor: "#FBBF24" }} />
            <div style={{ width: "16px", height: "16px", borderRadius: "50%", backgroundColor: "#10B981" }} />
          </div>
          <div
            style={{
              fontFamily: "monospace",
              fontSize: "16px",
              fontWeight: 700,
              color: currentTheme.colors.textSecondary,
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Terminal size={18} /> dev@local-machine:~ (Node v20.10)
          </div>
          <div style={{ width: "50px" }} />
        </div>

        {/* Terminal İçerik Satırları (Büyük Font) */}
        <div
          style={{
            padding: "28px 24px",
            fontFamily: "monospace",
            fontSize: "20px",
            lineHeight: 1.6,
            color: isPaper ? "#1E293B" : "#F8FAFC",
            display: "flex",
            flexDirection: "column",
            gap: "18px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "22px" }}>
            <span style={{ color: currentTheme.colors.accentPrimary, fontWeight: 900 }}>❯</span>
            <span style={{ fontWeight: 700 }}>npm run start:prod</span>
          </div>

          {/* Yerel Bilgisayarda Yeşil Başarı */}
          <div
            style={{
              backgroundColor: "rgba(16, 185, 129, 0.14)",
              border: "2px solid #10B981",
              borderRadius: "12px",
              padding: "16px 18px",
              display: "flex",
              alignItems: "center",
              gap: "14px",
              color: isPaper ? "#065F46" : "#34D399",
              fontSize: "18px",
              fontWeight: 800,
            }}
          >
            <CheckCircle size={26} color="#10B981" />
            <span>[Geliştirici PC]: localhost:3000 • Kusursuz çalışıyor!</span>
          </div>

          {/* Sunucu Çökme Hatası (Pop-in) */}
          <div
            style={{
              backgroundColor: "rgba(239, 68, 68, 0.18)",
              border: "2.5px solid #EF4444",
              borderRadius: "14px",
              padding: "18px 20px",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              color: isPaper ? "#991B1B" : "#F87171",
              transform: `scale(${errorScale})`,
              opacity: errorOpacity,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "21px", fontWeight: 900 }}>
              <AlertOctagon size={28} color="#EF4444" />
              <span>[Canlı Sunucu]: FATAL ERROR: 500 CRASH</span>
            </div>
            <div style={{ fontSize: "16px", opacity: 0.95, paddingLeft: "38px" }}>
              EnvironmentMismatch: Kütüphane sürümü ve Linux modülleri bulunamadı!
            </div>
          </div>
        </div>
      </div>

      {/* 3. İKİ DÜNYA ARASINDAKİ UÇURUM (Büyük Kartlar) */}
      <div style={{ display: "flex", width: "100%", gap: "18px" }}>
        <div
          style={{
            flex: 1,
            backgroundColor: isPaper ? "#FFFFFF" : currentTheme.colors.cardBackground,
            border: currentTheme.styles.border,
            borderRadius: "16px",
            padding: "18px 20px",
            display: "flex",
            alignItems: "center",
            gap: "14px",
            boxShadow: currentTheme.styles.boxShadowSmall,
          }}
        >
          <Laptop size={38} color={currentTheme.colors.accentPrimary} />
          <div>
            <div style={{ fontFamily: TurkishFont, fontSize: "19px", fontWeight: 900, color: currentTheme.colors.textPrimary }}>
              Mac / Windows
            </div>
            <div style={{ fontSize: "14px", color: currentTheme.colors.textSecondary, fontWeight: 700 }}>
              Yerel ortam
            </div>
          </div>
        </div>

        <div
          style={{
            flex: 1,
            backgroundColor: isPaper ? "#FFFFFF" : currentTheme.colors.cardBackground,
            border: "2.5px solid #EF4444",
            borderRadius: "16px",
            padding: "18px 20px",
            display: "flex",
            alignItems: "center",
            gap: "14px",
            boxShadow: currentTheme.styles.boxShadowSmall,
          }}
        >
          <Server size={38} color="#EF4444" />
          <div>
            <div style={{ fontFamily: TurkishFont, fontSize: "19px", fontWeight: 900, color: "#EF4444" }}>
              Canlı Sunucu
            </div>
            <div style={{ fontSize: "14px", color: currentTheme.colors.textSecondary, fontWeight: 700 }}>
              Çöken dış dünya
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
