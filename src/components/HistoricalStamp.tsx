import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { TurkishFont } from "../load-font";
import { currentTheme } from "../theme";

interface HistoricalStampProps {
  text: string;
  subtext?: string;
  bgColor?: string;
}

export const HistoricalStamp: React.FC<HistoricalStampProps> = ({
  text,
  subtext = "TARİHİ BELGE",
  bgColor = currentTheme.colors.signalOrange, // %5 Signal Orange #FF5A36
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Damganın yukarıdan sertçe çarpma (slam) animasyonu
  const slamSpring = spring({
    frame: Math.max(0, frame - 10),
    fps,
    config: {
      damping: 10,
      mass: 0.8,
      stiffness: 150,
    },
  });

  const scale = interpolate(slamSpring, [0, 1], [2.8, 1]);
  const opacity = interpolate(slamSpring, [0, 1], [0, 1]);
  const rotate = interpolate(slamSpring, [0, 1], [-35, -10]);

  return (
    <div
      style={{
        position: "absolute",
        right: "55px",
        top: "170px",
        transform: `rotate(${rotate}deg) scale(${scale})`,
        opacity,
        zIndex: 42,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          border: "4px solid #171717",
          borderRadius: "14px",
          padding: "10px 24px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: bgColor,
          boxShadow: currentTheme.styles.shadowMedium, // 5px 5px 0px #171717
        }}
      >
        <span
          style={{
            fontFamily: TurkishFont,
            fontSize: "14px",
            fontWeight: 900,
            color: currentTheme.colors.pureWhite,
            letterSpacing: "0.15em",
          }}
        >
          {subtext.toLocaleUpperCase("tr-TR")}
        </span>
        <span
          style={{
            fontFamily: TurkishFont,
            fontSize: "26px",
            fontWeight: 900,
            color: currentTheme.colors.pureWhite,
            letterSpacing: "0.08em",
          }}
        >
          {text.toLocaleUpperCase("tr-TR")}
        </span>
      </div>
    </div>
  );
};
