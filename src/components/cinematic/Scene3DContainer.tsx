import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { currentTheme } from "../../theme";

export interface Scene3DProps {
  children?: React.ReactNode;
  rotateX?: number; // Eğim açısı (Pitch)
  rotateY?: number; // Dönüş açısı (Yaw)
  rotateZ?: number; // Roll açısı
  autoSpin?: boolean;
  spinSpeed?: number;
  depth?: number;
  floatAmplitude?: number;
  showIsometricGrid?: boolean;
}

/**
 * Scene3DContainer: Anlatım yerlerinde konunun derinliğini gösteren 3D uzamsal sahne.
 * CSS 3D donanım hızlandırmasıyla izometrik platformlar, 3D dönen küpler,
 * kart katmanları ve uzamsal derinlik efektleri oluşturur.
 */
export const Scene3DContainer: React.FC<Scene3DProps> = ({
  children,
  rotateX = 22,
  rotateY = -28,
  rotateZ = 0,
  autoSpin = true,
  spinSpeed = 0.4,
  depth = 60,
  floatAmplitude = 8,
  showIsometricGrid = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Giriş yaylanması
  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.8, stiffness: 100 },
  });

  const scale = interpolate(enterSpring, [0, 1], [0.75, 1]);
  const opacity = interpolate(enterSpring, [0, 1], [0, 1]);

  // Otomatik yumuşak salınım ve spin
  const continuousSpin = autoSpin ? Math.sin(frame * (spinSpeed * 0.05)) * 14 : 0;
  const floatY = Math.sin(frame * 0.06) * floatAmplitude;
  const currentRotateX = rotateX + Math.cos(frame * 0.04) * 3;
  const currentRotateY = rotateY + continuousSpin;

  const isDark = currentTheme.id === "glassmorphism";

  return (
    <div
      style={{
        width: "100%",
        height: "460px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        perspective: "1100px",
        position: "relative",
      }}
    >
      {/* 3D Transform Uzayı */}
      <div
        style={{
          width: "360px",
          height: "360px",
          position: "relative",
          transformStyle: "preserve-3d",
          transform: `scale(${scale}) translateY(${floatY}px) rotateX(${currentRotateX}deg) rotateY(${currentRotateY}deg) rotateZ(${rotateZ}deg)`,
          opacity,
          willChange: "transform",
        }}
      >
        {/* 1. İzometrik Taban Tablası (Grid Floor / Platform) */}
        {showIsometricGrid && (
          <div
            style={{
              position: "absolute",
              width: "380px",
              height: "380px",
              top: "-10px",
              left: "-10px",
              transform: `translateZ(-${depth}px)`,
              borderRadius: "24px",
              background: isDark
                ? "radial-gradient(circle, rgba(0,242,254,0.15) 0%, rgba(10,13,20,0.6) 80%)"
                : "radial-gradient(circle, rgba(223,255,0,0.25) 0%, rgba(244,240,230,0.8) 80%)",
              border: isDark ? "1.5px solid rgba(0,242,254,0.4)" : "3px solid #171717",
              boxShadow: isDark
                ? "0 20px 60px rgba(0,0,0,0.8), inset 0 0 30px rgba(0,242,254,0.2)"
                : "12px 12px 0px #171717",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* İzometrik ızgara çizgileri */}
            <div
              style={{
                width: "90%",
                height: "90%",
                backgroundImage: isDark
                  ? "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)"
                  : "linear-gradient(rgba(23,23,23,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(23,23,23,0.1) 1px, transparent 1px)",
                backgroundSize: "30px 30px",
                borderRadius: "16px",
              }}
            />
          </div>
        )}

        {/* 2. Çocuk Elementler (3D Yüzen Nesneler) */}
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            transformStyle: "preserve-3d",
            transform: `translateZ(${depth}px)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
