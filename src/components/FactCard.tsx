import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { TurkishFont } from "../load-font";
import { currentTheme } from "../theme";

interface FactCardProps {
  badge: string;
  title: string;
  description: string;
  source?: string;
  badgeBg?: string;
  icon?: string;
}

export const FactCard: React.FC<FactCardProps> = ({
  badge,
  title,
  description,
  source,
  badgeBg = currentTheme.colors.acidYellow, // Varsayılan: Acid Yellow
  icon = "📌",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Neo-brutalist yaylanarak giriş
  const scaleSpring = spring({
    frame,
    fps,
    config: {
      damping: 12,
      mass: 0.5,
      stiffness: 140,
    },
  });

  const scale = interpolate(scaleSpring, [0, 1], [0.85, 1]);
  const opacity = interpolate(scaleSpring, [0, 1], [0, 1]);
  const translateY = interpolate(scaleSpring, [0, 1], [40, 0]);

  return (
    <div
      style={{
        position: "absolute",
        top: "190px",
        left: "50px",
        right: "50px",
        transform: `translateY(${translateY}px) scale(${scale})`,
        opacity,
        zIndex: 35,
      }}
    >
      <div
        style={{
          position: "relative",
          backgroundColor: currentTheme.colors.pureWhite, // Pure White kart zemini
          border: currentTheme.styles.borderThick,       // 6px solid #171717
          borderRadius: currentTheme.styles.borderRadius, // 18px
          padding: "44px 42px",
          boxShadow: currentTheme.styles.shadowHard,      // 8px 8px 0px #171717 (Neo-brutalism sert gölge)
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        {/* Üst Kategori Etiketi */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              backgroundColor: badgeBg,
              border: "3px solid #171717",
              borderRadius: "10px",
              padding: "8px 22px",
              boxShadow: currentTheme.styles.shadowSmall, // 3px 3px 0px #171717
            }}
          >
            <span style={{ fontSize: "22px" }}>{icon}</span>
            <span
              style={{
                fontFamily: TurkishFont,
                color: currentTheme.colors.inkBlack,
                fontSize: "19px",
                fontWeight: 900,
                letterSpacing: "0.06em",
              }}
            >
              {badge.toLocaleUpperCase("tr-TR")}
            </span>
          </div>
        </div>

        {/* Başlık */}
        <div
          style={{
            fontFamily: TurkishFont,
            fontSize: "42px",
            fontWeight: 900,
            color: currentTheme.colors.inkBlack,
            lineHeight: 1.2,
            letterSpacing: "-0.01em",
          }}
        >
          {title}
        </div>

        {/* Açıklama / Belge Metni */}
        <div
          style={{
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontSize: "27px",
            fontWeight: 600,
            color: currentTheme.colors.inkBlack,
            lineHeight: 1.45,
          }}
        >
          {description}
        </div>

        {/* Kaynak */}
        {source && (
          <div
            style={{
              marginTop: "8px",
              padding: "14px 20px",
              backgroundColor: currentTheme.colors.background, // Warm Cream
              border: "2px solid #171717",
              borderRadius: "10px",
              boxShadow: "2px 2px 0px #171717",
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontSize: "19px",
              fontWeight: 700,
              color: currentTheme.colors.inkBlack,
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span>📜</span>
            <span>Kaynak: {source}</span>
          </div>
        )}
      </div>
    </div>
  );
};
