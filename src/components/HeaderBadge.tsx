import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { TurkishFont } from "../load-font";
import { currentTheme } from "../theme";

interface HeaderBadgeProps {
  title: string;
}

export const HeaderBadge: React.FC<HeaderBadgeProps> = ({ title }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enterSpring = spring({
    frame,
    fps,
    config: {
      damping: 12,
      mass: 0.6,
      stiffness: 110,
    },
  });

  const translateY = interpolate(enterSpring, [0, 1], [-80, 0]);
  const opacity = interpolate(enterSpring, [0, 1], [0, 1]);

  return (
    <div
      style={{
        position: "absolute",
        top: "90px",
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transform: `translateY(${translateY}px)`,
        opacity,
        zIndex: 40,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "14px 34px",
          backgroundColor: currentTheme.colors.pureWhite,
          border: currentTheme.styles.border, // 4px solid #171717
          borderRadius: "14px",
          boxShadow: currentTheme.styles.shadowMedium, // 5px 5px 0px #171717
        }}
      >
        <span style={{ fontSize: "26px" }}>🏛️</span>
        <span
          style={{
            fontFamily: TurkishFont,
            fontWeight: 900,
            fontSize: "24px",
            letterSpacing: "0.08em",
            color: currentTheme.colors.inkBlack,
          }}
        >
          {title.toLocaleUpperCase("tr-TR")}
        </span>
      </div>
    </div>
  );
};
