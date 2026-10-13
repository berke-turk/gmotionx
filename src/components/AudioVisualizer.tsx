import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { currentTheme } from "../theme";

export const AudioVisualizer: React.FC = () => {
  const frame = useCurrentFrame();
  const barCount = 26;

  return (
    <div
      style={{
        position: "absolute",
        top: "970px",
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

        return (
          <div
            key={i}
            style={{
              width: "10px",
              height: `${height}px`,
              borderRadius: "4px",
              backgroundColor: isHighlight 
                ? currentTheme.colors.signalOrange 
                : currentTheme.colors.inkBlack,
              border: "2px solid #171717",
              boxShadow: "2px 2px 0px #171717",
            }}
          />
        );
      })}
    </div>
  );
};
