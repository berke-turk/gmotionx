import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { currentTheme } from "../theme";

export const ProgressBar: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const progress = Math.min(1, Math.max(0, frame / durationInFrames));

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "14px",
        backgroundColor: currentTheme.colors.background,
        borderBottom: `3px solid ${currentTheme.colors.inkBlack}`,
        zIndex: 50,
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${progress * 100}%`,
          backgroundColor: currentTheme.colors.signalOrange, // Signal Orange #FF5A36
          borderRight: `3px solid ${currentTheme.colors.inkBlack}`,
        }}
      />
    </div>
  );
};
