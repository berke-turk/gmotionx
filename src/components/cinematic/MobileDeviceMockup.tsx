import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
  Img,
} from "remotion";

export interface MobileDeviceMockupProps {
  /**
   * Optional custom mobile screenshot URL / file path.
   */
  screenshotUrl?: string;
  /**
   * App name displayed in header / notifications.
   */
  appName?: string;
  /**
   * Brand accent color (default: #38BDF8 cyan or #6366F1 indigo).
   */
  brandColor?: string;
  /**
   * Secondary accent color (e.g. #10B981 emerald or #F59E0B amber).
   */
  accentColor?: string;
  /**
   * App archetype: "fintech" (banking/crypto), "ai_builder" (Lovio style), or "productivity" (Trackly style).
   */
  archetype?: "fintech" | "ai_builder" | "productivity";
  /**
   * Metric title (e.g. "NET WORTH", "ACTIVE PIPELINES", "USERS")
   */
  metricLabel?: string;
  /**
   * Main metric value (e.g. "$14,850.00", "99.9% Uptime", "+340%")
   */
  metricValue?: string;
  /**
   * Scale multiplier for the entire mockup (default: 1.0).
   */
  scale?: number;
  /**
   * Dynamic tilt on X and Y axes.
   */
  tiltX?: number;
  tiltY?: number;
  /**
   * Whether to trigger simulated tap and ripple.
   */
  showTouchInteraction?: boolean;
}

/**
 * MobileDeviceMockup:
 * Burnwe, ConverseBank ve Apple Keynote standartlarında iPhone 16 Pro Titanium Mockup.
 * 
 * Özellikler:
 * 1. Dinamik Ada (Dynamic Island) ve Durum Çubuğu (09:41, 5G, Pil).
 * 2. 2.5D İzometrik Havada Süzülme ve Titanyum Çerçeve Işıltısı.
 * 3. Kullanıcı Ekran Görüntüsü Desteği veya Prosedürel FinTech / AI Arayüzü.
 * 4. 3D Dönen Sanal Ödeme Kartı (Embossed Chip & Holografik Degrade).
 * 5. Canlı Bakiye Sayaç Rulosu ve İnteraktif Dokunma / Haptik Titreşim Dalgası.
 */
export const MobileDeviceMockup: React.FC<MobileDeviceMockupProps> = ({
  screenshotUrl,
  appName = "ConverseBank",
  brandColor = "#38BDF8",
  accentColor = "#10B981",
  archetype = "fintech",
  metricLabel = "TOPLAM BAKİYE",
  metricValue = "₺148.920,00",
  scale = 1.0,
  tiltX = 6,
  tiltY = -8,
  showTouchInteraction = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Floating physics
  const floatY = Math.sin(frame * 0.05) * 8;

  // Touch tap animation at frame 45
  const isTapped = frame >= 48;
  const tapSpring = spring({
    frame: Math.max(0, frame - 48),
    fps,
    config: { damping: 12, stiffness: 220 },
  });

  const tapRippleScale = interpolate(frame, [48, 70], [0.4, 2.6], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });
  const tapRippleOpacity = interpolate(frame, [48, 70], [0.85, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 3D Card tilt inside fintech mode
  const cardRotateY = Math.sin(frame * 0.04) * 6;
  const cardRotateX = Math.cos(frame * 0.04) * 4;

  return (
    <div
      style={{
        position: "relative",
        width: "360px",
        height: "720px",
        transform: `perspective(1200px) scale(${scale}) translateY(${floatY}px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
        transformStyle: "preserve-3d",
        transition: "transform 0.1s ease-out",
      }}
    >
      {/* Outer Ambient Glow matching Brand Color */}
      <div
        style={{
          position: "absolute",
          inset: "-20px",
          borderRadius: "60px",
          background: `radial-gradient(circle, ${brandColor}33 0%, transparent 70%)`,
          filter: "blur(35px)",
          pointerEvents: "none",
        }}
      />

      {/* Titanium Outer Chassis */}
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "50px",
          border: "5px solid #232730",
          backgroundColor: "#0B0D13",
          boxShadow: `
            0 25px 60px rgba(0, 0, 0, 0.85),
            inset 0 0 0 1px rgba(255, 255, 255, 0.18),
            inset 0 0 20px rgba(0, 0, 0, 0.9)
          `,
          position: "relative",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* TOP STATUS BAR & DYNAMIC ISLAND */}
        <div
          style={{
            height: "46px",
            width: "100%",
            padding: "0 22px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "relative",
            zIndex: 30,
          }}
        >
          {/* Clock */}
          <span style={{ fontSize: "13px", fontWeight: 700, color: "#FFFFFF", letterSpacing: "-0.01em" }}>
            09:41
          </span>

          {/* Dynamic Island Pill */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "10px",
              transform: "translateX(-50%)",
              width: "104px",
              height: "28px",
              borderRadius: "18px",
              backgroundColor: "#000000",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 10px",
            }}
          >
            {/* Camera sensor dot */}
            <div style={{ width: "9px", height: "9px", borderRadius: "50%", backgroundColor: "#151820" }} />
            {/* Status mini beacon */}
            <div
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                backgroundColor: isTapped ? accentColor : brandColor,
                boxShadow: `0 0 6px ${isTapped ? accentColor : brandColor}`,
              }}
            />
          </div>

          {/* Status Icons: 5G & Battery */}
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ fontSize: "11px", fontWeight: 700, color: "rgba(255,255,255,0.7)" }}>5G</span>
            <div
              style={{
                width: "20px",
                height: "10px",
                borderRadius: "3px",
                border: "1px solid rgba(255,255,255,0.7)",
                padding: "1px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <div style={{ width: "75%", height: "100%", backgroundColor: "#FFFFFF", borderRadius: "1px" }} />
            </div>
          </div>
        </div>

        {/* INTERIOR SCREEN CANVAS */}
        <div
          style={{
            flex: 1,
            position: "relative",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {screenshotUrl ? (
            // User Provided Mobile App Screenshot
            <Img
              src={screenshotUrl}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          ) : (
            // Procedural High-Craft Mobile UI (FinTech / Burnwe ConverseBank style)
            <div
              style={{
                flex: 1,
                padding: "14px 18px",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                position: "relative",
              }}
            >
              {/* App Brand Header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div
                    style={{
                      width: "34px",
                      height: "34px",
                      borderRadius: "10px",
                      background: `linear-gradient(135deg, ${brandColor}, #4338CA)`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "16px",
                      fontWeight: 900,
                      color: "#FFFFFF",
                      boxShadow: `0 0 14px ${brandColor}55`,
                    }}
                  >
                    ✦
                  </div>
                  <div>
                    <div style={{ fontSize: "14px", fontWeight: 800, color: "#FFFFFF" }}>{appName}</div>
                    <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)" }}>Premium Digital Account</div>
                  </div>
                </div>

                <div
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.08)",
                    borderRadius: "20px",
                    padding: "4px 10px",
                    fontSize: "11px",
                    fontWeight: 700,
                    color: "#FFFFFF",
                  }}
                >
                  PRO
                </div>
              </div>

              {/* 3D FLOATING PAYMENT CARD (ConverseBank Signature) */}
              <div
                style={{
                  height: "170px",
                  borderRadius: "18px",
                  background: `linear-gradient(135deg, ${brandColor}EE 0%, #1E1B4B 60%, #0F172A 100%)`,
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  boxShadow: `
                    0 15px 35px rgba(0, 0, 0, 0.7),
                    inset 0 1px 0 rgba(255, 255, 255, 0.3)
                  `,
                  transform: `perspective(600px) rotateX(${cardRotateX}deg) rotateY(${cardRotateY}deg)`,
                  padding: "16px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Metallic Card Shimmer */}
                <div
                  style={{
                    position: "absolute",
                    top: "-50%",
                    left: `${(frame * 2.5) % 250}%`,
                    width: "40px",
                    height: "200%",
                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                    transform: "rotate(25deg)",
                  }}
                />

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  {/* Metallic Chip */}
                  <div
                    style={{
                      width: "36px",
                      height: "28px",
                      borderRadius: "6px",
                      backgroundColor: "#F59E0B",
                      border: "1px solid #D97706",
                      boxShadow: "inset 0 1px 2px rgba(255,255,255,0.4)",
                      position: "relative",
                    }}
                  >
                    <div style={{ position: "absolute", inset: "4px", border: "1px solid rgba(0,0,0,0.2)" }} />
                  </div>
                  {/* Contactless Wave */}
                  <span style={{ fontSize: "16px", color: "rgba(255,255,255,0.7)" }}>))))</span>
                </div>

                <div>
                  <div style={{ fontSize: "10px", fontWeight: 700, color: "rgba(255,255,255,0.6)", letterSpacing: "0.08em" }}>
                    {metricLabel}
                  </div>
                  <div style={{ fontSize: "24px", fontWeight: 900, color: "#FFFFFF", letterSpacing: "-0.02em" }}>
                    {metricValue}
                  </div>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "11px", fontWeight: 600, color: "rgba(255,255,255,0.8)", letterSpacing: "0.15em" }}>
                    •••• 8824
                  </span>
                  <span style={{ fontSize: "12px", fontWeight: 900, color: "#FFFFFF", fontStyle: "italic" }}>
                    VISA
                  </span>
                </div>
              </div>

              {/* ACTION BUTTONS (TAP TARGET) */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "8px" }}>
                {[
                  { label: "Gönder", icon: "↗" },
                  { label: "İste", icon: "↙" },
                  { label: "Yatırım", icon: "⚡", active: true },
                  { label: "Kartlar", icon: "💳" },
                ].map((act, i) => {
                  const isActionActive = act.active;
                  return (
                    <div
                      key={`btn-${i}`}
                      style={{
                        backgroundColor: isActionActive
                          ? isTapped
                            ? accentColor
                            : brandColor
                          : "rgba(255, 255, 255, 0.05)",
                        border: isActionActive ? "none" : "1px solid rgba(255, 255, 255, 0.08)",
                        borderRadius: "14px",
                        padding: "10px 4px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "4px",
                        position: "relative",
                        transform: isActionActive && isTapped ? `scale(${1 + tapSpring * 0.08})` : "scale(1)",
                        boxShadow: isActionActive ? `0 0 16px ${brandColor}66` : "none",
                      }}
                    >
                      <span style={{ fontSize: "15px", color: "#FFFFFF", fontWeight: 900 }}>{act.icon}</span>
                      <span style={{ fontSize: "10px", fontWeight: 700, color: "#FFFFFF" }}>{act.label}</span>

                      {/* Touch Ripple on the Target Action */}
                      {isActionActive && isTapped && (
                        <div
                          style={{
                            position: "absolute",
                            inset: "-8px",
                            borderRadius: "18px",
                            border: `2px solid ${accentColor}`,
                            transform: `scale(${tapRippleScale})`,
                            opacity: tapRippleOpacity,
                            pointerEvents: "none",
                          }}
                        />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* RECENT TRANSACTIONS STREAM */}
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <div style={{ fontSize: "11px", fontWeight: 700, color: "rgba(255,255,255,0.4)", textTransform: "uppercase" }}>
                  Son Hareketler
                </div>

                {[
                  { name: "Stripe Global Payout", date: "Bugün, 14:20", amount: "+₺42.500", positive: true },
                  { name: "Apple Services Cloud", date: "Dün, 09:15", amount: "-₺1.240", positive: false },
                  { name: isTapped ? "✓ Anlık Transfer Onaylandı" : "Yatırım Getirisi", date: "Şimdi", amount: "+₺18.400", positive: true },
                ].map((tx, idx) => (
                  <div
                    key={`tx-${idx}`}
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.03)",
                      border: "1px solid rgba(255, 255, 255, 0.06)",
                      borderRadius: "12px",
                      padding: "8px 12px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <div style={{ fontSize: "12px", fontWeight: 700, color: "#FFFFFF" }}>{tx.name}</div>
                      <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.4)" }}>{tx.date}</div>
                    </div>
                    <div
                      style={{
                        fontSize: "12px",
                        fontWeight: 800,
                        color: tx.positive ? accentColor : "rgba(255,255,255,0.7)",
                      }}
                    >
                      {tx.amount}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* BOTTOM HOME INDICATOR BAR */}
        <div
          style={{
            height: "22px",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            zIndex: 30,
          }}
        >
          <div
            style={{
              width: "110px",
              height: "4px",
              borderRadius: "999px",
              backgroundColor: "rgba(255, 255, 255, 0.45)",
            }}
          />
        </div>
      </div>
    </div>
  );
};
