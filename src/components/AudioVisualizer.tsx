import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { currentTheme } from "../theme";

export const AudioVisualizer: React.FC = () => {
  const frame = useCurrentFrame();
  const barCount = 26;

  const isGlass = currentTheme.id === "glassmorphism";
  const isPaper = currentTheme.id === "paper-explainer";

  return (
    <div
      style={{
        position: "absolute",
        top: "1050px",
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "8px",
        zIndex: 25,
      }}
    >
      {Array.from({ length: barCount }).map((_, i) => {
        const wave1 = Math.sin((frame * 0.35) + i * 0.65);
        const wave2 = Math.cos((frame * 0.22) + i * 0.4);
        const combined = Math.abs(wave1 * 0.6 + wave2 * 0.4);
        
        const height = interpolate(combined, [0, 1], [10, 52]);
        const isHighlight = i % 5 === 0;

        const barColor = isHighlight
          ? currentTheme.colors.accentSecondary
          : (isGlass ? "rgba(0, 242, 254, 0.6)" : currentTheme.colors.textPrimary);

        return (
          <div
            key={i}
            style={{
              width: "10px",
              height: `${height}px`,
              borderRadius: isGlass ? "10px" : (isPaper ? "2px" : "4px"),
              backgroundColor: barColor,
              border: isGlass ? "none" : (isPaper ? "none" : currentTheme.styles.border),
              boxShadow: isGlass 
                ? (isHighlight ? "0 0 14px rgba(157, 78, 221, 0.8)" : "0 0 10px rgba(0, 242, 254, 0.5)") 
                : (isPaper ? "none" : currentTheme.styles.boxShadowSmall),
            }}
          />
        );
      })}
    </div>
  );
};
