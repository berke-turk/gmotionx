import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { currentTheme } from "../theme";

export const Background: React.FC = () => {
  const { height, width } = useVideoConfig();
  const frame = useCurrentFrame();

  const isPaper = currentTheme.id === "paper-explainer";
  const isGlass = currentTheme.id === "glassmorphism";

  // Hafif nefes alma / ambient hareket
  const orbX1 = Math.sin(frame / 60) * 40;
  const orbY1 = Math.cos(frame / 70) * 30;
  const orbX2 = Math.cos(frame / 80) * 50;
  const orbY2 = Math.sin(frame / 65) * 40;

  return (
    <div
      style={{
        position: "absolute",
        width,
        height,
        backgroundColor: currentTheme.colors.background,
        overflow: "hidden",
      }}
    >
      {/* 1. PAPER & CUTOUT EXPLAINER: Milimetrik Kareli Defter Kâğıdı & Kırmızı Marjin */}
      {isPaper && (
        <>
          {/* Kareli defter ızgarası (mavi-gri ince çizgiler) */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `
                linear-gradient(to right, rgba(74, 94, 125, 0.08) 1.5px, transparent 1.5px),
                linear-gradient(to bottom, rgba(74, 94, 125, 0.08) 1.5px, transparent 1.5px)
              `,
              backgroundSize: "32px 32px",
            }}
          />

          {/* Defter kırmızı marjin kılavuz çizgisi (Sol sayfa payı) */}
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: "90px",
              width: "2px",
              backgroundColor: "rgba(239, 68, 68, 0.28)",
            }}
          />

          {/* Hafif organik kâğıt parşömen vinyeti */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              boxShadow: "inset 0 0 120px rgba(180, 160, 130, 0.18)",
              pointerEvents: "none",
            }}
          />
        </>
      )}

      {/* 2. GLASSMORPHISM: Neon Parıltılı Ambient Işık Küreleri (Glowing Orbs) */}
      {isGlass && (
        <>
          {/* Neon Cyan Orb */}
          <div
            style={{
              position: "absolute",
              width: "480px",
              height: "480px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(0, 242, 254, 0.22) 0%, transparent 70%)",
              filter: "blur(60px)",
              top: "15%",
              left: `calc(10% + ${orbX1}px)`,
              transform: `translateY(${orbY1}px)`,
              pointerEvents: "none",
            }}
          />

          {/* Electric Purple Orb */}
          <div
            style={{
              position: "absolute",
              width: "520px",
              height: "520px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(157, 78, 221, 0.24) 0%, transparent 70%)",
              filter: "blur(70px)",
              bottom: "20%",
              right: `calc(5% + ${orbX2}px)`,
              transform: `translateY(${orbY2}px)`,
              pointerEvents: "none",
            }}
          />

          {/* İnce siber ızgara */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `
                linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
              `,
              backgroundSize: "60px 60px",
            }}
          />
        </>
      )}

      {/* 3. NEO-BRUTALISM / SWISS / ORGANIC: Retro Nokta ve Geometrik Izgara */}
      {!isPaper && !isGlass && (
        <>
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `radial-gradient(${currentTheme.colors.inkBlack || "#171717"} 1.5px, transparent 1.5px)`,
              backgroundSize: "36px 36px",
              opacity: 0.12,
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `
                linear-gradient(to right, rgba(23, 23, 23, 0.04) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(23, 23, 23, 0.04) 1px, transparent 1px)
              `,
              backgroundSize: "180px 180px",
            }}
          />
        </>
      )}
    </div>
  );
};
