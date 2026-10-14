import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { currentTheme } from "../../theme";

export interface CinematicAtmosphereProps {
  showVignette?: boolean;
  showAnamorphicGlow?: boolean;
  showLightRays?: boolean;
}

/**
 * CinematicAtmosphere: Hollywood kalitesinde sinematik ışık, vinyet
 * ve atmosferik anamorfik parıltı katmanı.
 */
export const CinematicAtmosphere: React.FC<CinematicAtmosphereProps> = ({
  showVignette = true,
  showAnamorphicGlow = true,
  showLightRays = true,
}) => {
  const frame = useCurrentFrame();

  // Işık nefes alma döngüsü (breathing light pulse)
  const pulse = interpolate(Math.sin(frame * 0.05), [-1, 1], [0.8, 1.15]);
  const rayRotation = (frame * 0.15) % 360;

  const accentColor = currentTheme.colors.accentPrimary || "#DFFF00";

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 25,
        overflow: "hidden",
      }}
    >
      {/* 1. Anamorfik Yatay Işık Şeridi (Anamorphic Streak) */}
      {showAnamorphicGlow && (
        <div
          style={{
            position: "absolute",
            top: "28%",
            left: "-10%",
            width: "120%",
            height: "160px",
            background: `radial-gradient(ellipse at center, ${accentColor}1A 0%, rgba(255,255,255,0.04) 40%, transparent 75%)`,
            transform: `scaleY(${pulse})`,
            filter: "blur(40px)",
            opacity: 0.65,
          }}
        />
      )}

      {/* 2. Volumetrik Üst Köşe Işık Hüzmesi (Volumetric Ray) */}
      {showLightRays && (
        <div
          style={{
            position: "absolute",
            top: "-150px",
            left: "50%",
            width: "600px",
            height: "900px",
            transform: `translateX(-50%) rotate(${rayRotation * 0.05}deg)`,
            background: `conic-gradient(from 180deg at 50% 0%, transparent 40%, ${accentColor}10 48%, transparent 56%)`,
            filter: "blur(30px)",
            opacity: 0.5,
          }}
        />
      )}

      {/* 3. Sinematik Vinyet (Cinematic Vignette) */}
      {showVignette && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "radial-gradient(circle at center, transparent 45%, rgba(0, 0, 0, 0.45) 100%)",
            mixBlendMode: "multiply",
          }}
        />
      )}
    </div>
  );
};
