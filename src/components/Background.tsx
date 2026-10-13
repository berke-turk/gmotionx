import React from "react";
import { useVideoConfig } from "remotion";
import { currentTheme } from "../theme";

export const Background: React.FC = () => {
  const { height, width } = useVideoConfig();

  return (
    <div
      style={{
        position: "absolute",
        width,
        height,
        backgroundColor: currentTheme.colors.background, // %50 Warm Cream #F4F0E6
        overflow: "hidden",
      }}
    >
      {/* Neo-brutalist Retro Nokta Deseni (Dot Grid) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `radial-gradient(${currentTheme.colors.inkBlack} 1.5px, transparent 1.5px)`,
          backgroundSize: "36px 36px",
          opacity: 0.12,
        }}
      />

      {/* İnce geometrik retro çizgiler */}
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
    </div>
  );
};
