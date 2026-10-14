import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
  Img,
} from "remotion";
import { SvgLogoMotion } from "../cinematic/SvgLogoMotion";
import { MobileDeviceMockup } from "../cinematic/MobileDeviceMockup";

export interface BentoFeatureCard {
  title: string;
  value: string;
  subtitle?: string;
  icon?: string;
  badge?: string;
  highlight?: boolean;
}

export interface AppPromoGenreProps {
  /**
   * Product / App Name (e.g. "PulseAI", "Linear", "Raycast", "Acme")
   */
  appName?: string;
  /**
   * Category or release badge (e.g. "SAAS PRODUCT LAUNCH · 2026", "VERSION 3.0 RELEASE")
   */
  badge?: string;
  /**
   * Main punchy hook headline (Line 1)
   */
  headlineMain?: string;
  /**
   * Secondary hook headline (Line 2, highlighted)
   */
  headlineSub?: string;
  /**
   * Brand accent color (default: #6366F1 - Modern Indigo, or #38BDF8 - Electric Cyan)
   */
  brandColor?: string;
  /**
   * Secondary accent color (e.g. #10B981 emerald or #EC4899 magenta)
   */
  accentColor?: string;
  /**
   * Optional custom screenshot image URL or path.
   * If omitted, an ultra-crisp procedural dark-mode Linear/Raycast UI dashboard is rendered.
   */
  screenshotUrl?: string;
  /**
   * Optional custom logo SVG paths or single path string for the intro/header.
   */
  logoSvgPaths?: string | string[];
  /**
   * Device frame type: "browser" (macOS window), "mobile" (phone), or "bento" (multi-tile)
   */
  frameMode?: "browser" | "mobile" | "bento";
  /**
   * Bento cards for feature highlights
   */
  bentoCards?: BentoFeatureCard[];
  /**
   * Dynamic CTA or action button text (e.g. "Deploy to Edge", "Analyze Pipeline", "Generate")
   */
  actionButtonText?: string;
  /**
   * Post-click success status text (e.g. "✓ Production Live", "✓ 100% Optimized")
   */
  actionSuccessText?: string;
  /**
   * Closing metric or verdict at the bottom
   */
  bottomVerdict?: string;
  /**
   * Whether to display an animated SVG cursor simulating real user interaction
   */
  showCursorInteraction?: boolean;
}

/**
 * AppPromoGenre:
 * 2025/2026+ Linear, Raycast, Vercel & Apple tarzı yüksek dönüşümlü
 * SaaS & Mobil Uygulama Tanıtım / Reklam Kanal Mimarisi.
 * 
 * Özellikler:
 * 1. 2.5D Havada Duran Eğimli Cihaz / Pencere Maketi (3D Isometric Floating Mockup).
 * 2. Gerçekçi Vektör İmleç & Tıklama Animasyonu (Animated Cursor + Click Pulse Ripple).
 * 3. Kullanıcı Görseli Desteği (`screenshotUrl`) veya Otomatik Prosedürel Dark-Mode Dashboard.
 * 4. Odak Karartmalı Bento Grid Kartları (Focal Dimming ile aktif özellik vurgusu).
 * 5. Marka Rengine Duyarlı Dinamik Radyal Arka Işık (Ambient Backlight Cone).
 * 6. Opsiyonel Entegre `SvgLogoMotion` Logo İntrosu.
 */
export const AppPromoGenre: React.FC<AppPromoGenreProps> = ({
  appName = "FlowState",
  badge = "SAAS PRODUCT LAUNCH · 2026",
  headlineMain = "Eski yöntemleri unutun,",
  headlineSub = "tek tıkla otonom akış.",
  brandColor = "#6366F1",
  accentColor = "#38BDF8",
  screenshotUrl,
  logoSvgPaths,
  frameMode = "browser",
  bentoCards = [
    { title: "HIZLANMA", value: "10x", subtitle: "Daha hızlı dağıtım", highlight: true },
    { title: "GECİKME", value: "0.04 ms", subtitle: "Küresel edge" },
    { title: "VERİMLİLİK", value: "+340%", subtitle: "Dönüşüm artışı" },
  ],
  actionButtonText = "Deploy Pipeline",
  actionSuccessText = "✓ Production Live",
  bottomVerdict = "Karmaşık süreçleri 3 saniyede otomatikleştirin.",
  showCursorInteraction = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 1. Entrance spring physics
  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 85 },
  });

  const headerOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });
  const headerY = interpolate(enterSpring, [0, 1], [-25, 0]);

  // 2. 3D Device Tilt & Floating dynamics
  const floatY = Math.sin(frame * 0.06) * 12;
  const tiltX = interpolate(frame, [0, 35, 90], [16, 6, 4], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  }) + Math.sin(frame * 0.04) * 1.5;

  const tiltY = interpolate(frame, [0, 40, 90], [-14, -4, -2], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  }) + Math.cos(frame * 0.05) * 1.5;

  const deviceScale = interpolate(enterSpring, [0, 1], [0.82, 1]);

  // 3. Simulated Cursor Trajectory & Click
  // Cursor starts from outside (frame 20), glides to CTA button (frame 48), clicks (frame 54)
  const cursorMoveProgress = interpolate(frame, [20, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.25, 1, 0.5, 1),
  });

  const cursorX = interpolate(cursorMoveProgress, [0, 1], [520, 785]);
  const cursorY = interpolate(cursorMoveProgress, [0, 1], [360, 36]);

  const isClicked = frame >= 54;
  const clickSpring = spring({
    frame: Math.max(0, frame - 54),
    fps,
    config: { damping: 12, stiffness: 200 },
  });
  const cursorScale = interpolate(
    frame,
    [52, 54, 58],
    [1, 0.82, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Click pulse wave
  const rippleScale = interpolate(frame, [54, 75], [0.5, 2.8], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });
  const rippleOpacity = interpolate(frame, [54, 75], [0.8, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Dynamic state toggle for CTA button
  const buttonBg = isClicked
    ? "linear-gradient(135deg, #10B981, #059669)"
    : `linear-gradient(135deg, ${brandColor}, #4338CA)`;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: "#07090E",
        overflow: "hidden",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      {/* Background Architectural Grid Pattern */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          opacity: 0.6,
        }}
      />

      {/* Dynamic Ambient Backlight Cone */}
      <div
        style={{
          position: "absolute",
          top: "420px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "800px",
          height: "650px",
          background: `radial-gradient(circle, ${brandColor}40 0%, ${accentColor}18 45%, transparent 75%)`,
          filter: "blur(75px)",
          pointerEvents: "none",
        }}
      />

      {/* HEADER SECTION (Safe Zone: Top 230px) */}
      <div
        style={{
          position: "absolute",
          top: "230px",
          left: "55px",
          right: "115px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          opacity: headerOpacity,
          transform: `translateY(${headerY}px)`,
          zIndex: 10,
        }}
      >
        {/* Release Pill Badge */}
        <div
          style={{
            alignSelf: "flex-start",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            backgroundColor: "rgba(255, 255, 255, 0.06)",
            border: `1px solid ${brandColor}55`,
            backdropFilter: "blur(12px)",
            padding: "6px 16px",
            borderRadius: "999px",
            boxShadow: `0 0 20px ${brandColor}22`,
          }}
        >
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              backgroundColor: brandColor,
              boxShadow: `0 0 10px ${brandColor}`,
            }}
          />
          <span
            style={{
              fontSize: "14px",
              fontWeight: 800,
              letterSpacing: "0.14em",
              color: "#E2E8F0",
              textTransform: "uppercase",
            }}
          >
            {badge}
          </span>
        </div>

        {/* 2-Line Punchy Hero Headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <div
            style={{
              fontSize: "46px",
              fontWeight: 900,
              color: "#FFFFFF",
              letterSpacing: "-0.03em",
              lineHeight: 1.12,
            }}
          >
            {headlineMain}
          </div>
          <div
            style={{
              fontSize: "48px",
              fontWeight: 900,
              letterSpacing: "-0.03em",
              lineHeight: 1.12,
              background: `linear-gradient(90deg, ${accentColor}, ${brandColor})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {headlineSub}
          </div>
        </div>
      </div>

      {/* 2.5D ISOMETRIC FLOATING HERO DEVICE (Center Eye Horizon) */}
      <div
        style={{
          position: "absolute",
          top: "410px",
          left: "50px",
          right: "95px",
          height: "560px",
          perspective: "1300px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 5,
        }}
      >
        {frameMode === "mobile" ? (
          <MobileDeviceMockup
            screenshotUrl={screenshotUrl}
            appName={appName}
            brandColor={brandColor}
            accentColor={accentColor}
            scale={0.76}
            tiltX={tiltX}
            tiltY={tiltY}
            showTouchInteraction={showCursorInteraction}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              transform: `scale(${deviceScale}) translateY(${floatY}px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
            transformStyle: "preserve-3d",
            transition: "transform 0.1s ease-out",
            borderRadius: "28px",
            border: "1px solid rgba(255, 255, 255, 0.14)",
            background: "linear-gradient(165deg, rgba(23, 26, 35, 0.95), rgba(12, 14, 20, 0.98))",
            backdropFilter: "blur(24px)",
            boxShadow: `
              0 30px 80px rgba(0, 0, 0, 0.8),
              0 0 50px ${brandColor}22,
              inset 0 1px 0 rgba(255, 255, 255, 0.15)
            `,
            overflow: "hidden",
            position: "relative",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* macOS Style Window Title Bar */}
          <div
            style={{
              height: "46px",
              borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 18px",
              backgroundColor: "rgba(255, 255, 255, 0.03)",
            }}
          >
            {/* Window Traffic Dots */}
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <div style={{ width: "11px", height: "11px", borderRadius: "50%", backgroundColor: "#EF4444" }} />
              <div style={{ width: "11px", height: "11px", borderRadius: "50%", backgroundColor: "#F59E0B" }} />
              <div style={{ width: "11px", height: "11px", borderRadius: "50%", backgroundColor: "#10B981" }} />
            </div>

            {/* Omnibox / Search Pill */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                backgroundColor: "rgba(0, 0, 0, 0.35)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                padding: "4px 16px",
                borderRadius: "8px",
                fontSize: "12px",
                fontWeight: 600,
                color: "rgba(255, 255, 255, 0.5)",
              }}
            >
              <span style={{ color: accentColor }}>app.{appName.toLowerCase()}.io</span>
              <span style={{ fontSize: "10px", backgroundColor: "rgba(255,255,255,0.1)", padding: "2px 6px", borderRadius: "4px" }}>⌘K</span>
            </div>

            {/* Status indicator */}
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <div style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#10B981" }} />
              <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.6)", fontWeight: 600 }}>v3.2 Edge</span>
            </div>
          </div>

          {/* Device Interior Canvas */}
          <div
            style={{
              flex: 1,
              position: "relative",
              overflow: "hidden",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            {screenshotUrl ? (
              // User Provided Screenshot Image
              <div style={{ width: "100%", height: "100%", position: "relative", borderRadius: "16px", overflow: "hidden" }}>
                <Img
                  src={screenshotUrl}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
            ) : (
              // Procedural Linear / Raycast Style Interactive UI Mockup
              <>
                {/* Top Telemetry Row */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div
                      style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "10px",
                        backgroundColor: `${brandColor}25`,
                        border: `1px solid ${brandColor}66`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#FFFFFF",
                        fontWeight: 900,
                        fontSize: "18px",
                        overflow: "hidden",
                      }}
                    >
                      {logoSvgPaths ? (
                        <SvgLogoMotion
                          paths={logoSvgPaths}
                          size={30}
                          strokeWidth={2}
                          strokeColor={accentColor}
                          accentGlowColor={brandColor}
                          drawDurationFrames={30}
                        />
                      ) : (
                        "⚡"
                      )}
                    </div>
                    <div>
                      <div style={{ fontSize: "16px", fontWeight: 800, color: "#FFFFFF" }}>{appName} Core Engine</div>
                      <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)" }}>Real-time telemetry stream</div>
                    </div>
                  </div>

                  {/* Dynamic Action CTA Button (Target for cursor) */}
                  <div
                    style={{
                      padding: "10px 22px",
                      borderRadius: "10px",
                      background: buttonBg,
                      color: "#FFFFFF",
                      fontWeight: 800,
                      fontSize: "13px",
                      letterSpacing: "0.04em",
                      boxShadow: isClicked ? "0 0 25px rgba(16, 185, 129, 0.6)" : `0 0 25px ${brandColor}55`,
                      transform: isClicked ? `scale(${1 + clickSpring * 0.05})` : "scale(1)",
                      transition: "background 0.2s ease",
                      position: "relative",
                    }}
                  >
                    {isClicked ? actionSuccessText : actionButtonText}

                    {/* Ripple on Click */}
                    {isClicked && (
                      <div
                        style={{
                          position: "absolute",
                          inset: "-6px",
                          borderRadius: "14px",
                          border: "2px solid #10B981",
                          transform: `scale(${rippleScale})`,
                          opacity: rippleOpacity,
                          pointerEvents: "none",
                        }}
                      />
                    )}
                  </div>
                </div>

                {/* Simulated Live Analytics Curve / Waves */}
                <div
                  style={{
                    flex: 1,
                    backgroundColor: "rgba(0, 0, 0, 0.45)",
                    borderRadius: "16px",
                    border: "1px solid rgba(255, 255, 255, 0.06)",
                    padding: "16px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div>
                      <div style={{ fontSize: "11px", fontWeight: 700, color: "rgba(255,255,255,0.4)" }}>GLOBAL THROUGHPUT</div>
                      <div style={{ fontSize: "28px", fontWeight: 900, color: "#FFFFFF", letterSpacing: "-0.02em" }}>
                        {isClicked ? "94,820 req/s" : "41,200 req/s"}
                      </div>
                    </div>
                    <div
                      style={{
                        padding: "4px 10px",
                        height: "fit-content",
                        borderRadius: "6px",
                        backgroundColor: isClicked ? "rgba(16, 185, 129, 0.2)" : "rgba(56, 189, 248, 0.15)",
                        color: isClicked ? "#10B981" : "#38BDF8",
                        fontSize: "11px",
                        fontWeight: 800,
                      }}
                    >
                      {isClicked ? "+130% PEAK" : "STABLE"}
                    </div>
                  </div>

                  {/* SVG Wave Graph */}
                  <svg width="100%" height="90" viewBox="0 0 400 90" style={{ overflow: "visible" }}>
                    <defs>
                      <linearGradient id="waveGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={isClicked ? "#10B981" : brandColor} stopOpacity="0.4" />
                        <stop offset="100%" stopColor={isClicked ? "#10B981" : brandColor} stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <path
                      d={
                        isClicked
                          ? "M 0 70 Q 60 20 120 45 T 240 15 T 320 30 T 400 10 L 400 90 L 0 90 Z"
                          : "M 0 65 Q 60 50 120 55 T 240 40 T 320 50 T 400 35 L 400 90 L 0 90 Z"
                      }
                      fill="url(#waveGrad)"
                    />
                    <path
                      d={
                        isClicked
                          ? "M 0 70 Q 60 20 120 45 T 240 15 T 320 30 T 400 10"
                          : "M 0 65 Q 60 50 120 55 T 240 40 T 320 50 T 400 35"
                      }
                      fill="none"
                      stroke={isClicked ? "#10B981" : brandColor}
                      strokeWidth="3"
                    />
                  </svg>
                </div>

                {/* Bento Mini Badges Row inside UI */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px" }}>
                  {bentoCards.map((card, idx) => {
                    const isFocal = card.highlight || (isClicked && idx === 0);
                    return (
                      <div
                        key={`mock-card-${idx}`}
                        style={{
                          backgroundColor: isFocal ? "rgba(99, 102, 241, 0.18)" : "rgba(255, 255, 255, 0.03)",
                          border: isFocal ? `1px solid ${brandColor}88` : "1px solid rgba(255, 255, 255, 0.06)",
                          borderRadius: "12px",
                          padding: "10px 12px",
                          display: "flex",
                          flexDirection: "column",
                          gap: "2px",
                        }}
                      >
                        <span style={{ fontSize: "10px", fontWeight: 700, color: "rgba(255,255,255,0.4)" }}>{card.title}</span>
                        <span style={{ fontSize: "18px", fontWeight: 900, color: isFocal ? "#FFFFFF" : "#CBD5E1" }}>{card.value}</span>
                        <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.45)" }}>{card.subtitle}</span>
                      </div>
                    );
                  })}
                </div>
              </>
            )}

            {/* SIMULATED ANIMATED SVG CURSOR */}
            {showCursorInteraction && frame >= 20 && (
              <div
                style={{
                  position: "absolute",
                  left: `${cursorX}px`,
                  top: `${cursorY}px`,
                  transform: `scale(${cursorScale}) translate(-4px, -4px)`,
                  pointerEvents: "none",
                  zIndex: 50,
                  filter: "drop-shadow(0 4px 10px rgba(0,0,0,0.6))",
                }}
              >
                {/* Crisp macOS / Linear Style Pointer Cursor */}
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M 3 3 L 10.5 21 L 13.8 13.8 L 21 10.5 Z"
                    fill="#FFFFFF"
                    stroke="#000000"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            )}
          </div>
        </div>
      )}
      </div>

      {/* BOTTOM BENTO HIGHLIGHT CARDS & PUNCHLINE (Safe Zone: Above Bottom 450px) */}
      <div
        style={{
          position: "absolute",
          top: "995px",
          left: "55px",
          right: "115px",
          display: "flex",
          flexDirection: "column",
          gap: "14px",
          zIndex: 10,
        }}
      >
        {/* Punchline Verdict Banner */}
        <div
          style={{
            backgroundColor: "rgba(15, 18, 26, 0.85)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(16px)",
            borderRadius: "16px",
            padding: "16px 20px",
            display: "flex",
            alignItems: "center",
            gap: "14px",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
          }}
        >
          <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: brandColor,
              boxShadow: `0 0 12px ${brandColor}`,
            }}
          />
          <div
            style={{
              fontSize: "17px",
              fontWeight: 700,
              color: "#E2E8F0",
              letterSpacing: "-0.01em",
              lineHeight: 1.35,
            }}
          >
            {bottomVerdict}
          </div>
        </div>
      </div>
    </div>
  );
};
