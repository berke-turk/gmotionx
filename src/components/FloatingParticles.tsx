import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";

interface Particle {
  x: number;
  baseY: number;
  size: number;
  speed: number;
  opacity: number;
  color: string;
}

// Deterministik parçacık listesi
const PARTICLES: Particle[] = Array.from({ length: 30 }, (_, i) => {
  const colors = ["#FF5A36", "#DFFF00", "#171717", "#FF5A36"];
  return {
    x: (i * 37) % 1080,
    baseY: (i * 61) % 1920,
    size: 4 + (i % 4) * 3,
    speed: 0.6 + (i % 3) * 0.4,
    opacity: 0.25 + (i % 4) * 0.15,
    color: colors[i % colors.length],
  };
});

export const FloatingParticles: React.FC = () => {
  const frame = useCurrentFrame();
  const { height } = useVideoConfig();

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 10,
        overflow: "hidden",
      }}
    >
      {PARTICLES.map((p, idx) => {
        // Yukarı doğru süzülme ve yana salınım
        const currentY = (p.baseY - frame * p.speed * 2) % (height + 100);
        const yPos = currentY < -50 ? currentY + height + 100 : currentY;
        const driftX = Math.sin((frame + idx * 20) / 30) * 25;

        const pulseOpacity = interpolate(
          Math.sin((frame + idx * 10) / 25),
          [-1, 1],
          [p.opacity * 0.4, p.opacity]
        );

        return (
          <div
            key={idx}
            style={{
              position: "absolute",
              left: `${p.x + driftX}px`,
              top: `${yPos}px`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              borderRadius: "50%",
              backgroundColor: p.color,
              opacity: pulseOpacity,
              boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
              filter: "blur(0.5px)",
            }}
          />
        );
      })}
    </div>
  );
};
