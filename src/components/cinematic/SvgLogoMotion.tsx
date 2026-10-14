import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from "remotion";
import { evolvePath } from "@remotion/paths";

export interface SvgLogoMotionProps {
  /**
   * SVG Path(s) to animate. Can be a single path string or an array of path 'd' strings.
   * If omitted, a sleek modern geometric hexagonal prism logo is rendered as default.
   */
  paths?: string | string[];
  /**
   * Raw SVG viewBox. Defaults to "0 0 100 100".
   */
  viewBox?: string;
  /**
   * Primary brand stroke color (default: #38BDF8 cyan or #6366F1 indigo).
   */
  strokeColor?: string;
  /**
   * Fill color that washes in after the trim path draws (default: brand gradient / semi-solid).
   */
  fillColor?: string;
  /**
   * Stroke width in SVG coordinates (default: 3.5).
   */
  strokeWidth?: number;
  /**
   * Brand name displayed beneath the logo.
   */
  brandName?: string;
  /**
   * Brand tagline or category badge.
   */
  tagline?: string;
  /**
   * Accent color for glow and lighting effects (default: same as strokeColor).
   */
  accentGlowColor?: string;
  /**
   * Total reveal duration in frames for the logo drawing phase (default: 45 frames).
   */
  drawDurationFrames?: number;
  /**
   * Size of the logo container in pixels (default: 240).
   */
  size?: number;
  /**
   * Optional custom SVG JSX element or children.
   */
  children?: React.ReactNode;
}

// Default sleek modern brand geometric mark (Linear / Raycast inspired)
const DEFAULT_BRAND_PATHS = [
  // Outer geometric hexagon
  "M 50 10 L 85 30 L 85 70 L 50 90 L 15 70 L 15 30 Z",
  // Inner dynamic chevron / core shard
  "M 50 30 L 70 50 L 50 70 L 30 50 Z",
];

/**
 * SvgLogoMotion:
 * 2025/2026+ Motion Design Standartlarında Programatik SVG Logo İntro Bileşeni.
 * 
 * Özellikler:
 * 1. Trim Path Animasyonu: `@remotion/paths` evolvePath ile kademeli, yaylanan çizim.
 * 2. Çift Katmanlı Neon Aura: Keskin çekirdek kontur + arkada difüze parıldayan bloom kontur.
 * 3. Sıvı Dolgu (Liquid Wash): Çizgi tamamlandığında alttan yukarıya pürüzsüz dolgu geçişi.
 * 4. 45° Speküler Işık Taraması (Shimmer Light Sweep): Metalik/cam parlama dalgası.
 * 5. 3D Perspektif & Elastik Yaylanma (Spring Scale & Tilt): Fizik tabanlı yumuşak oturuş.
 * 6. Şok Dalgası (Lockup Shockwave): Logo birleştiğinde dışarı doğru yayılan halka.
 * 7. Kinetik Tipografi: Harf aralığı genişleyen marka ismi ve mikro-etiket.
 */
export const SvgLogoMotion: React.FC<SvgLogoMotionProps> = ({
  paths,
  viewBox = "0 0 100 100",
  strokeColor = "#38BDF8",
  fillColor = "rgba(56, 189, 248, 0.15)",
  strokeWidth = 3.5,
  brandName,
  tagline,
  accentGlowColor = "#38BDF8",
  drawDurationFrames = 45,
  size = 240,
  children,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Normalize paths
  const pathList: string[] = React.useMemo(() => {
    if (!paths) return DEFAULT_BRAND_PATHS;
    if (typeof paths === "string") return [paths];
    return paths;
  }, [paths]);

  // 1. Spring scale and entrance
  const entranceSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 90, mass: 0.9 },
  });

  const scale = interpolate(entranceSpring, [0, 1], [0.75, 1]);
  const containerOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Micro 3D tilt that settles smoothly
  const tiltX = interpolate(frame, [0, 30, 60], [14, -4, 0], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const tiltY = interpolate(frame, [0, 35, 70], [-18, 5, 0], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // 2. Trim path draw progress (0 -> 1)
  const drawProgress = interpolate(frame, [5, drawDurationFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.bezier(0.16, 1, 0.3, 1)),
  });

  // 3. Liquid fill reveal starts when stroke reaches 70%
  const fillStartFrame = Math.round(drawDurationFrames * 0.7);
  const fillOpacity = interpolate(
    frame,
    [fillStartFrame, fillStartFrame + 25],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.quad),
    }
  );

  // 4. Specular Shimmer / Light Sweep (Sweeps across from -150% to 250% after draw finishes)
  const shimmerStartFrame = drawDurationFrames + 5;
  const shimmerProgress = interpolate(
    frame,
    [shimmerStartFrame, shimmerStartFrame + 30],
    [-150, 250],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.inOut(Easing.cubic),
    }
  );
  const showShimmer = frame >= shimmerStartFrame && frame <= shimmerStartFrame + 35;

  // 5. Lockup Shockwave Ring
  const lockupFrame = drawDurationFrames;
  const shockwaveScale = interpolate(
    frame,
    [lockupFrame, lockupFrame + 25],
    [0.7, 1.8],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    }
  );
  const shockwaveOpacity = interpolate(
    frame,
    [lockupFrame, lockupFrame + 25],
    [0.8, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // 6. Kinetic Brand Typography Slide-up
  const typoSpring = spring({
    frame: Math.max(0, frame - (drawDurationFrames - 10)),
    fps,
    config: { damping: 15, stiffness: 100 },
  });
  const typoY = interpolate(typoSpring, [0, 1], [30, 0]);
  const typoOpacity = interpolate(typoSpring, [0, 1], [0, 1]);
  const trackingExpand = interpolate(typoSpring, [0, 1], [0.1, 0.28]); // em tracking

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: containerOpacity,
        transform: `perspective(1000px) scale(${scale}) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
        transformStyle: "preserve-3d",
        position: "relative",
      }}
    >
      {/* Dynamic Ambient Breathing Aura Backlight */}
      <div
        style={{
          position: "absolute",
          width: size * 1.6,
          height: size * 1.6,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${accentGlowColor}33 0%, ${accentGlowColor}00 70%)`,
          filter: "blur(40px)",
          pointerEvents: "none",
          transform: `scale(${1 + Math.sin(frame * 0.08) * 0.06})`,
        }}
      />

      {/* Shockwave Lockup Ring */}
      {frame >= lockupFrame && shockwaveOpacity > 0.01 && (
        <div
          style={{
            position: "absolute",
            width: size,
            height: size,
            borderRadius: "50%",
            border: `2px solid ${accentGlowColor}`,
            boxShadow: `0 0 25px ${accentGlowColor}`,
            transform: `scale(${shockwaveScale})`,
            opacity: shockwaveOpacity,
            pointerEvents: "none",
          }}
        />
      )}

      {/* Main SVG Logo Canvas with Shimmer Clip */}
      <div
        style={{
          width: size,
          height: size,
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          width={size}
          height={size}
          viewBox={viewBox}
          style={{
            overflow: "visible",
            filter: `drop-shadow(0 0 16px ${accentGlowColor}66)`,
          }}
        >
          <defs>
            {/* Gradient definition for fill */}
            <linearGradient id="logoMotionFillGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={strokeColor} stopOpacity="0.4" />
              <stop offset="100%" stopColor={accentGlowColor} stopOpacity="0.08" />
            </linearGradient>
            {/* Shimmer gradient */}
            <linearGradient id="logoShimmerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
              <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Children or Custom Injected Elements */}
          {children}

          {/* Render Path Layers */}
          {pathList.map((pathD, idx) => {
            // Calculate individual path evolution with slight stagger
            const pathProgress = interpolate(
              drawProgress,
              [idx * 0.15, Math.min(1, 0.7 + idx * 0.15)],
              [0, 1],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }
            );

            let evolution = {
              strokeDasharray: "1000 1000",
              strokeDashoffset: 1000 * (1 - pathProgress),
            };

            try {
              evolution = evolvePath(pathProgress, pathD);
            } catch {
              // Fallback for non-standard path syntax
              evolution = {
                strokeDasharray: "800 800",
                strokeDashoffset: 800 * (1 - pathProgress),
              };
            }

            return (
              <g key={`logo-path-group-${idx}`}>
                {/* 1. Liquid Fill Reveal */}
                <path
                  d={pathD}
                  fill="url(#logoMotionFillGrad)"
                  opacity={fillOpacity}
                  stroke="none"
                />

                {/* 2. Outer Diffuse Glow Bloom Stroke */}
                <path
                  d={pathD}
                  fill="none"
                  stroke={accentGlowColor}
                  strokeWidth={strokeWidth * 2.6}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity={0.35 * pathProgress}
                  strokeDasharray={evolution.strokeDasharray}
                  strokeDashoffset={evolution.strokeDashoffset}
                  style={{ filter: "blur(6px)" }}
                />

                {/* 3. Crisp Core Foreground Stroke */}
                <path
                  d={pathD}
                  fill="none"
                  stroke={strokeColor}
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray={evolution.strokeDasharray}
                  strokeDashoffset={evolution.strokeDashoffset}
                />
              </g>
            );
          })}
        </svg>

        {/* 4. Specular Shimmer Light Sweep Overlay */}
        {showShimmer && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              overflow: "hidden",
              borderRadius: "20px",
              mixBlendMode: "screen",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "-50%",
                left: `${shimmerProgress}%`,
                width: "60px",
                height: "200%",
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.85) 50%, transparent 100%)",
                transform: "rotate(30deg)",
                filter: "blur(4px)",
              }}
            />
          </div>
        )}
      </div>

      {/* Brand Typography & Tagline */}
      {(brandName || tagline) && (
        <div
          style={{
            marginTop: "24px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            transform: `translateY(${typoY}px)`,
            opacity: typoOpacity,
            textAlign: "center",
          }}
        >
          {brandName && (
            <div
              style={{
                fontFamily: "system-ui, -apple-system, sans-serif",
                fontSize: "36px",
                fontWeight: 900,
                letterSpacing: `${trackingExpand}em`,
                color: "#FFFFFF",
                textTransform: "uppercase",
                textShadow: `0 0 20px ${accentGlowColor}88`,
                lineHeight: 1.1,
              }}
            >
              {brandName}
            </div>
          )}

          {tagline && (
            <div
              style={{
                marginTop: "8px",
                fontFamily: "system-ui, -apple-system, sans-serif",
                fontSize: "16px",
                fontWeight: 600,
                letterSpacing: "0.08em",
                color: "rgba(255, 255, 255, 0.65)",
                textTransform: "uppercase",
                background: "rgba(255, 255, 255, 0.06)",
                padding: "4px 14px",
                borderRadius: "999px",
                border: "1px solid rgba(255, 255, 255, 0.12)",
              }}
            >
              {tagline}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
