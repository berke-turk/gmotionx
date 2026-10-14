import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { TurkishFont } from "../../load-font";
import { currentTheme } from "../../theme";

export interface KineticTitleProps {
  text: string;
  highlightWord?: string;
  badge?: string;
  fontSize?: number;
  align?: "center" | "left" | "right";
  delay?: number;
  styleMode?: "punch" | "stagger" | "cascade" | "cinematic";
  color?: string;
}

/**
 * KineticTitle: Konuşma ve ritimle eşzamanlı vuran kinetik tipografi motoru.
 * Kelimeleri veya harfleri yaylanarak (spring physics), açısal ivmeyle
 * ve renk parıltısıyla sahneye çarptırır.
 */
export const KineticTitle: React.FC<KineticTitleProps> = ({
  text,
  highlightWord,
  badge,
  fontSize = 46,
  align = "center",
  delay = 0,
  styleMode = "punch",
  color,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const words = text.split(" ");

  // Rozet animasyonu
  const badgeSpring = spring({
    frame: Math.max(0, frame - delay),
    fps,
    config: { damping: 12, mass: 0.5, stiffness: 140 },
  });
  const badgeScale = interpolate(badgeSpring, [0, 1], [0.7, 1]);
  const badgeOpacity = interpolate(badgeSpring, [0, 1], [0, 1]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: align === "center" ? "center" : align === "left" ? "flex-start" : "flex-end",
        gap: "12px",
        width: "100%",
        textAlign: align,
      }}
    >
      {badge && (
        <div
          style={{
            transform: `scale(${badgeScale})`,
            opacity: badgeOpacity,
            backgroundColor: currentTheme.colors.accentSecondary || "#FF5A36",
            color: "#FFFFFF",
            fontFamily: TurkishFont,
            fontSize: "14px",
            fontWeight: 900,
            padding: "5px 16px",
            borderRadius: "6px",
            letterSpacing: "1px",
            boxShadow: currentTheme.styles.boxShadowSmall,
            textTransform: "uppercase",
          }}
        >
          {badge}
        </div>
      )}

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: align === "center" ? "center" : align === "left" ? "flex-start" : "flex-end",
          gap: "8px 12px",
          maxWidth: "920px",
        }}
      >
        {words.map((word, i) => {
          // Her kelime için kademeli yaylanma (Staggered spring)
          const wordDelay = delay + (styleMode === "stagger" || styleMode === "cascade" ? i * 3 : 0);
          const wordSpring = spring({
            frame: Math.max(0, frame - wordDelay),
            fps,
            config: { damping: 11, mass: 0.45, stiffness: 160 },
          });

          // Punch modu için ölçek sıçraması (1.4 -> 1.0)
          const scale = interpolate(wordSpring, [0, 0.7, 1], [0.4, 1.15, 1]);
          const translateY = interpolate(wordSpring, [0, 1], [30, 0]);
          const opacity = interpolate(wordSpring, [0, 0.5, 1], [0, 0.8, 1]);
          const rotate = interpolate(wordSpring, [0, 1], [(i % 2 === 0 ? -4 : 4), 0]);

          const cleanWord = word.replace(/[^a-zA-Z0-9çğıöşüÇĞİÖŞÜ]/g, "").toUpperCase();
          const isHighlighted = highlightWord && cleanWord.includes(highlightWord.toUpperCase());

          const textColor = isHighlighted
            ? currentTheme.colors.accentPrimary || "#DFFF00"
            : color || currentTheme.colors.textPrimary || "#171717";

          return (
            <span
              key={`${word}-${i}`}
              style={{
                display: "inline-block",
                fontFamily: TurkishFont,
                fontSize: `${fontSize}px`,
                fontWeight: 900,
                lineHeight: 1.15,
                letterSpacing: "-0.5px",
                color: textColor,
                transform: `translateY(${translateY}px) scale(${scale}) rotate(${rotate}deg)`,
                opacity,
                transformOrigin: "center center",
                textShadow: isHighlighted
                  ? `0 0 20px ${currentTheme.colors.accentPrimary}88, 0 4px 8px rgba(0,0,0,0.3)`
                  : "none",
                backgroundColor: isHighlighted ? `${currentTheme.colors.inkBlack || "#171717"}DD` : "transparent",
                padding: isHighlighted ? "2px 10px" : "0px",
                borderRadius: isHighlighted ? "8px" : "0px",
                border: isHighlighted ? `2px solid ${currentTheme.colors.accentPrimary}` : "none",
              }}
            >
              {word}
            </span>
          );
        })}
      </div>
    </div>
  );
};
