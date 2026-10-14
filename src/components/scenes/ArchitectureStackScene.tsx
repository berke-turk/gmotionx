import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Box, Cpu, HardDrive, Zap, XCircle, CheckCircle2 } from "lucide-react";
import { TurkishFont } from "../../load-font";
import { currentTheme } from "../../theme";
import { MaskingTape } from "../MaskingTape";

export interface ArchitectureStackSceneProps {
  badge?: string;
  title?: string;
}

export const ArchitectureStackScene: React.FC<ArchitectureStackSceneProps> = ({
  badge = "MİMARİ DEVRİMİ",
  title = "SANAL MAKİNE vs DOCKER",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const isPaper = currentTheme.id === "paper-explainer";
  const isGlass = currentTheme.id === "glassmorphism";

  // Animasyon spring'leri
  const headerSpring = spring({
    frame,
    fps,
    config: { damping: 12, mass: 0.5, stiffness: 140 },
  });

  const vmDropSpring = spring({
    frame: Math.max(0, frame - 8),
    fps,
    config: { damping: 14, mass: 1.2, stiffness: 90 },
  });

  const dockerPopSpring = spring({
    frame: Math.max(0, frame - 18),
    fps,
    config: { damping: 10, mass: 0.4, stiffness: 180 },
  });

  const headerY = interpolate(headerSpring, [0, 1], [-30, 0]);
  const vmY = interpolate(vmDropSpring, [0, 1], [-60, 0]);
  const dockerScale = interpolate(dockerPopSpring, [0, 1], [0.85, 1]);

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
      {/* 1. ÜST BAŞLIK & ROZET */}
      <div
        style={{
          transform: `translateY(${headerY}px)`,
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
            transform: isPaper ? "rotate(1.2deg)" : "none",
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

      {/* 2. MİMARİ MUKAYESE SÜTUNLARI (Devasa Yığın) */}
      <div style={{ display: "flex", width: "100%", gap: "18px", alignItems: "stretch" }}>
        {/* SOL: SANAL MAKİNE (VM) */}
        <div
          style={{
            flex: 1,
            backgroundColor: isPaper ? "#FFFFFF" : currentTheme.colors.cardBackground,
            border: isPaper ? "2px solid #E4DEC8" : "1.5px solid rgba(255, 255, 255, 0.15)",
            borderRadius: "20px",
            padding: "24px 16px",
            display: "flex",
            flexDirection: "column",
            gap: "14px",
            boxShadow: currentTheme.styles.boxShadowSmall,
            transform: `translateY(${vmY}px)`,
            position: "relative",
          }}
        >
          {isPaper && <MaskingTape width={160} height={38} top={-19} rotate={-2} />}

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontFamily: TurkishFont, fontSize: "20px", fontWeight: 900, color: currentTheme.colors.textPrimary }}>
              Sanal Makine
            </span>
            <XCircle size={24} color="#EF4444" />
          </div>

          {/* VM Katmanları */}
          <div
            style={{
              backgroundColor: "rgba(239, 68, 68, 0.14)",
              border: "1.5px solid #EF4444",
              borderRadius: "10px",
              padding: "14px",
              textAlign: "center",
              fontFamily: TurkishFont,
              fontSize: "16px",
              fontWeight: 800,
              color: currentTheme.colors.textPrimary,
            }}
          >
            Uygulama (App)
          </div>

          {/* DEVASE GUEST OS BLOK */}
          <div
            style={{
              backgroundColor: "rgba(100, 116, 139, 0.25)",
              border: "2px dashed #64748B",
              borderRadius: "14px",
              padding: "40px 12px",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <HardDrive size={36} color="#94A3B8" />
            <span style={{ fontFamily: TurkishFont, fontSize: "21px", fontWeight: 900, color: currentTheme.colors.textPrimary }}>
              GUEST OS (10 GB)
            </span>
            <span style={{ fontSize: "14px", color: currentTheme.colors.textSecondary, fontWeight: 700 }}>
              Gereksiz Ağırlık & Hantal
            </span>
          </div>

          <div
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.08)",
              borderRadius: "8px",
              padding: "12px",
              textAlign: "center",
              fontSize: "15px",
              fontWeight: 800,
              color: currentTheme.colors.textSecondary,
            }}
          >
            Hypervisor • Ana Donanım
          </div>
        </div>

        {/* SAĞ: DOCKER KONTEYNER */}
        <div
          style={{
            flex: 1,
            backgroundColor: isGlass
              ? "rgba(0, 242, 254, 0.08)"
              : isPaper
              ? "#F0FDF4"
              : "rgba(16, 185, 129, 0.08)",
            border: `2.5px solid ${currentTheme.colors.accentPrimary}`,
            borderRadius: "20px",
            padding: "24px 16px",
            display: "flex",
            flexDirection: "column",
            gap: "14px",
            boxShadow: isGlass
              ? "0 0 35px rgba(0, 242, 254, 0.25)"
              : currentTheme.styles.boxShadow,
            transform: `scale(${dockerScale})`,
            position: "relative",
          }}
        >
          {isPaper && <MaskingTape width={170} height={38} top={-19} rotate={1.5} />}

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontFamily: TurkishFont, fontSize: "20px", fontWeight: 900, color: currentTheme.colors.accentPrimary }}>
              Docker Engine
            </span>
            <CheckCircle2 size={24} color="#10B981" />
          </div>

          {/* Docker Mikro Konteyner Blokları (Lego Blokları) */}
          <div style={{ display: "flex", gap: "8px" }}>
            <div
              style={{
                flex: 1,
                backgroundColor: currentTheme.colors.accentPrimary,
                borderRadius: "10px",
                padding: "14px 6px",
                textAlign: "center",
                fontFamily: TurkishFont,
                fontSize: "15px",
                fontWeight: 900,
                color: "#0A0D14",
              }}
            >
              <Box size={22} style={{ margin: "0 auto 4px" }} />
              App 1 (50MB)
            </div>
            <div
              style={{
                flex: 1,
                backgroundColor: currentTheme.colors.accentSecondary,
                borderRadius: "10px",
                padding: "14px 6px",
                textAlign: "center",
                fontFamily: TurkishFont,
                fontSize: "15px",
                fontWeight: 900,
                color: "#FFFFFF",
              }}
            >
              <Box size={22} style={{ margin: "0 auto 4px" }} />
              App 2 (50MB)
            </div>
          </div>

          {/* DOCKER ENGINE KATMANI */}
          <div
            style={{
              backgroundColor: "rgba(0, 242, 254, 0.18)",
              border: `2px solid ${currentTheme.colors.accentPrimary}`,
              borderRadius: "14px",
              padding: "28px 12px",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Zap size={34} color={currentTheme.colors.accentPrimary} />
            <span style={{ fontFamily: TurkishFont, fontSize: "19px", fontWeight: 900, color: currentTheme.colors.textPrimary }}>
              ÇEKİRDEK PAYLAŞIMI
            </span>
            <span style={{ fontSize: "14px", color: currentTheme.colors.accentPrimary, fontWeight: 800 }}>
              Sıfır Ekstra İşletim Sistemi
            </span>
          </div>

          <div
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.08)",
              borderRadius: "8px",
              padding: "12px",
              textAlign: "center",
              fontSize: "15px",
              fontWeight: 800,
              color: currentTheme.colors.textSecondary,
            }}
          >
            Doğrudan Ana Donanım (Host)
          </div>
        </div>
      </div>

      {/* 3. ALTI VURGULAYAN BÜYÜK METRİK ŞERİDİ */}
      <div
        style={{
          width: "100%",
          backgroundColor: isPaper ? "#FEF08A" : currentTheme.colors.cardBackground,
          border: currentTheme.styles.border,
          borderRadius: "16px",
          padding: "18px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: currentTheme.styles.boxShadowSmall,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <Cpu size={32} color={isPaper ? "#18181B" : currentTheme.colors.accentPrimary} />
          <span style={{ fontFamily: TurkishFont, fontSize: "19px", fontWeight: 900, color: isPaper ? "#18181B" : currentTheme.colors.textPrimary }}>
            Ram ve Disk Tüketimi
          </span>
        </div>
        <div
          style={{
            fontFamily: TurkishFont,
            fontSize: "22px",
            fontWeight: 900,
            color: isPaper ? "#B45309" : currentTheme.colors.accentPrimary,
            letterSpacing: "0.02em",
          }}
        >
          %90 DAHA HAFİF ⚡
        </div>
      </div>
    </div>
  );
};
