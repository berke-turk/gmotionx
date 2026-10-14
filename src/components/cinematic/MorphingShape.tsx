import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { interpolatePath, evolvePath } from "@remotion/paths";
import { currentTheme } from "../../theme";

// Örnek standart SVG Path arketipi kütüphanesi (ViewBox 0 0 100 100 bazlı normalize yollar)
export const MORPH_SHAPES: Record<string, string> = {
  // 1. Daire / Odak / Bütünlük
  circle: "M 50, 10 A 40,40 0 1,0 50,90 A 40,40 0 1,0 50,10 Z",
  // 2. Dörtgen / Klasik Yapı / Kutu
  square: "M 15,15 L 85,15 L 85,85 L 15,85 Z",
  // 3. Altıgen / Teknoloji / Hücre / Ağ
  hexagon: "M 50,12 L 85,32 L 85,68 L 50,88 L 15,68 L 15,32 Z",
  // 4. Yıldız / Fikir / Keşif / Enerji
  star: "M 50,10 L 61,35 L 88,38 L 68,56 L 73,83 L 50,70 L 27,83 L 32,56 L 12,38 L 39,35 Z",
  // 5. Damla / Organik / Doğa / Akışkanlık
  drop: "M 50,12 C 50,12 80,50 80,68 C 80,84 66,90 50,90 C 34,90 20,84 20,68 C 20,50 50,12 50,12 Z",
  // 6. Kalkan / Güvenlik / Koruma
  shield: "M 50,12 L 82,24 L 82,56 C 82,75 50,90 50,90 C 50,90 18,75 18,56 L 18,24 Z",
  // 7. Sonsuzluk / Süreklilik / Döngü
  infinity: "M 50,50 C 35,30 15,30 15,50 C 15,70 35,70 50,50 C 65,30 85,30 85,50 C 85,70 65,70 50,50 Z",
  // 8. Çip / İşlemci / Entegre Devre
  chip: "M 25,25 L 75,25 L 75,75 L 25,75 Z",
  // 9. Üçgen / Hiyerarşi / Yön
  triangle: "M 50,15 L 88,80 L 12,80 Z",
};

export interface MorphingShapeProps {
  fromShape?: keyof typeof MORPH_SHAPES | string;
  toShape?: keyof typeof MORPH_SHAPES | string;
  size?: number;
  strokeColor?: string;
  fillColor?: string;
  strokeWidth?: number;
  delay?: number;
  durationInFrames?: number;
  glow?: boolean;
  glowColor?: string;
}

/**
 * MorphingShape: @remotion/paths ile pürüzsüz SVG şekil morfolojisi.
 * İki görsel metafor arasında akıcı, organik bir dönüşüm sağlar.
 */
export const MorphingShape: React.FC<MorphingShapeProps> = ({
  fromShape = "circle",
  toShape = "hexagon",
  size = 280,
  strokeColor,
  fillColor = "none",
  strokeWidth = 5,
  delay = 10,
  durationInFrames = 40,
  glow = true,
  glowColor,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // SVG path çözümü (preset veya direkt SVG path d)
  const path1 = MORPH_SHAPES[fromShape] || fromShape;
  const path2 = MORPH_SHAPES[toShape] || toShape;

  // Morfoloji ilerleme yaylanması (Morph progress spring)
  const morphSpring = spring({
    frame: Math.max(0, frame - delay),
    fps,
    config: { damping: 13, mass: 0.7, stiffness: 85 },
  });

  const progress = Math.min(1, Math.max(0, morphSpring));

  // @remotion/paths ile iki vektör yolu arasında enterpolasyon
  let currentPath = path1;
  try {
    currentPath = interpolatePath(progress, path1, path2);
  } catch {
    // Fallback if paths have incompatible topology
    currentPath = progress < 0.5 ? path1 : path2;
  }

  // Stroke çizilme efekti (Evolve path)
  const drawSpring = spring({
    frame,
    fps,
    config: { damping: 15, mass: 0.5, stiffness: 120 },
  });
  const strokeProgress = interpolate(drawSpring, [0, 1], [0, 1]);
  const evolved = evolvePath(strokeProgress, currentPath);

  // Dinamik ölçek ve nefes alma
  const scale = interpolate(
    Math.sin((frame + delay) * 0.05),
    [-1, 1],
    [0.97, 1.03]
  );
  const rotation = interpolate(progress, [0, 1], [0, 360]) + frame * 0.2;

  const actualStroke = strokeColor || currentTheme.colors.accentPrimary || "#DFFF00";
  const actualGlow = glowColor || actualStroke;

  return (
    <div
      style={{
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <svg
        viewBox="0 0 100 100"
        style={{
          width: "100%",
          height: "100%",
          overflow: "visible",
          transform: `scale(${scale}) rotate(${rotation}deg)`,
          transformOrigin: "center center",
          filter: glow ? `drop-shadow(0 0 16px ${actualGlow}) drop-shadow(0 0 32px ${actualGlow}66)` : "none",
        }}
      >
        <defs>
          <linearGradient id="morphGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={actualStroke} />
            <stop offset="100%" stopColor={currentTheme.colors.accentSecondary || "#FF5A36"} />
          </linearGradient>
        </defs>

        <path
          d={currentPath}
          fill={fillColor}
          stroke="url(#morphGrad)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={evolved.strokeDasharray}
          strokeDashoffset={evolved.strokeDashoffset}
        />
      </svg>
    </div>
  );
};
