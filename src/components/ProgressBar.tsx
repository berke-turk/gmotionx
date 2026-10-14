import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { currentTheme } from "../theme";

export const ProgressBar: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const progress = Math.min(1, Math.max(0, frame / durationInFrames));
  const isGlass = currentTheme.id === "glassmorphism";

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "8px",
        backgroundColor: isGlass ? "rgba(255, 255, 255, 0.08)" : currentTheme.colors.background,
        borderBottom: isGlass ? "none" : currentTheme.styles.border,
        zIndex: 50,
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${progress * 100}%`,
          backgroundColor: currentTheme.colors.accentPrimary,
          boxShadow: isGlass ? "0 0 16px rgba(0, 242, 254, 0.8)" : "none",
        }}
      />
    </div>
  );
};
