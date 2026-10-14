import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

/**
 * 1. MARKER & UNDERLINE HIGHLIGHTER
 * Metinlerin veya kilit istatistiklerin altını fosforlu kalem gibi dinamik çizer.
 * Gözü doğrudan vurgulanmak istenen semantik kelimeye kilitler.
 */
interface AttentionHighlighterProps {
  color?: string;
  delayFrames?: number;
  width?: number | string;
  height?: number;
  strokeWidth?: number;
  variant?: "marker" | "underline" | "brush";
  style?: React.CSSProperties;
}

export const AttentionHighlighter: React.FC<AttentionHighlighterProps> = ({
  color = "#FACC15",
  delayFrames = 8,
  width = "100%",
  height = 14,
  strokeWidth = 6,
  variant = "marker",
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const activeFrame = Math.max(0, frame - delayFrames);
  const sweepSpring = spring({
    frame: activeFrame,
    fps,
    config: {
      damping: 14,
      mass: 0.4,
      stiffness: 140,
    },
  });

  const progress = interpolate(sweepSpring, [0, 1], [0, 100]);
  const opacity = interpolate(sweepSpring, [0, 0.1, 1], [0, 0.9, 0.85]);

  if (variant === "marker") {
    return (
      <div
        style={{
          position: "absolute",
          left: 0,
          bottom: "4px",
          width,
          height: `${height}px`,
          backgroundColor: color,
          opacity,
          transform: `scaleX(${progress / 100})`,
          transformOrigin: "left center",
          borderRadius: "4px",
          mixBlendMode: "multiply",
          pointerEvents: "none",
          zIndex: 1,
          ...style,
        }}
      />
    );
  }

  // Dinamik SVG Fırça Darbesi (Handcrafted organic underline)
  return (
    <svg
      style={{
        position: "absolute",
        left: 0,
        bottom: "-6px",
        width,
        height: `${height + 8}px`,
        overflow: "visible",
        pointerEvents: "none",
        zIndex: 1,
        ...style,
      }}
      viewBox="0 0 300 24"
      preserveAspectRatio="none"
    >
      <path
        d="M 5 16 Q 80 8 160 14 T 295 12"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray="320"
        strokeDashoffset={interpolate(sweepSpring, [0, 1], [320, 0])}
        style={{
          filter: `drop-shadow(0 2px 8px ${color}66)`,
        }}
      />
    </svg>
  );
};

/**
 * 2. ATTENTION PULSE PING (Sonar Radar Göz Çekici)
 * Sahneye ilk girildiğinde izleyicinin foveal görüşünü hedef noktaya yönlendirir.
 * "Eye Movement Test" gereğince gözün nereye bakacağını 0.3 saniyede öğretir.
 */
interface AttentionPulsePingProps {
  x: number | string;
  y: number | string;
  color?: string;
  delayFrames?: number;
  size?: number;
}

export const AttentionPulsePing: React.FC<AttentionPulsePingProps> = ({
  x,
  y,
  color = "#38BDF8",
  delayFrames = 0,
  size = 120,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const relFrame = Math.max(0, frame - delayFrames);
  if (relFrame > 45) return null; // Ping görevini ilk 1.5 saniyede tamamlar ve kaybolur

  const pingSpring = spring({
    frame: relFrame,
    fps,
    config: {
      damping: 12,
      mass: 0.5,
      stiffness: 90,
    },
  });

  const scale1 = interpolate(pingSpring, [0, 1], [0.2, 1.8]);
  const opacity1 = interpolate(pingSpring, [0, 0.3, 1], [0.9, 0.7, 0]);

  const scale2 = interpolate(pingSpring, [0, 1], [0.1, 1.2]);
  const opacity2 = interpolate(pingSpring, [0, 0.4, 1], [1, 0.8, 0]);

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: "translate(-50%, -50%)",
        width: `${size}px`,
        height: `${size}px`,
        pointerEvents: "none",
        zIndex: 60,
      }}
    >
      {/* Halka 1 (Dış) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          border: `2.5px solid ${color}`,
          transform: `scale(${scale1})`,
          opacity: opacity1,
          boxShadow: `0 0 20px ${color}`,
        }}
      />
      {/* Halka 2 (İç) */}
      <div
        style={{
          position: "absolute",
          inset: "15%",
          borderRadius: "50%",
          border: `2px solid ${color}`,
          transform: `scale(${scale2})`,
          opacity: opacity2,
        }}
      />
      {/* Merkez Işıma Noktası */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "12px",
          height: "12px",
          borderRadius: "50%",
          backgroundColor: color,
          boxShadow: `0 0 15px ${color}`,
          opacity: opacity2,
        }}
      />
    </div>
  );
};

/**
 * 3. ATTENTION VIGNETTE (Periferik Karartma)
 * Ekranın kenarlarındaki dikkat dağıtıcı unsurları hafifçe karartıp
 * izleyicinin bakışlarını merkez %60'lık odak çemberinde tutar.
 */
interface AttentionVignetteProps {
  intensity?: number; // 0.15 to 0.75
  color?: string;
}

export const AttentionVignette: React.FC<AttentionVignetteProps> = ({
  intensity = 0.35,
  color = "#000000",
}) => {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 40,
        background: `radial-gradient(ellipse at center, transparent 45%, ${color} 100%)`,
        opacity: intensity,
      }}
    />
  );
};
