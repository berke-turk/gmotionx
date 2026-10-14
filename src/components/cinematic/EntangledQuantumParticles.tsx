import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { TurkishFont } from "../../load-font";
import { ArrowUp, ArrowDown } from "lucide-react";

export interface EntangledParticlesProps {
  orbitRadius?: number;
  orbitSpeed?: number;
  entanglementIntensity?: number;
}

/**
 * EntangledQuantumParticles:
 * İki kuantum parçacığının (Spin-Up ve Spin-Down) uzayda birbirinin etrafında
 * 3D eliptik yörüngede dönüşünü ve aralarındaki anlık kuantum lazer bağını canlandırır.
 */
export const EntangledQuantumParticles: React.FC<EntangledParticlesProps> = ({
  orbitRadius = 180,
  orbitSpeed = 0.05,
  entanglementIntensity = 1,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Giriş yaylanması
  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 12, mass: 0.6, stiffness: 120 },
  });
  const enterScale = interpolate(enterSpring, [0, 1], [0.3, 1]);
  const enterOpacity = interpolate(enterSpring, [0, 1], [0, 1]);

  // Yörünge açıları (3D Eliptik hareket)
  const angle = frame * orbitSpeed;
  const x1 = Math.cos(angle) * orbitRadius;
  const y1 = Math.sin(angle) * (orbitRadius * 0.45);
  const z1 = Math.sin(angle) * 80;

  const x2 = -x1;
  const y2 = -y1;
  const z2 = -z1;

  // Derinlik ölçekleri (Z-axis scale)
  const scale1 = interpolate(z1, [-80, 80], [0.82, 1.18]);
  const scale2 = interpolate(z2, [-80, 80], [0.82, 1.18]);

  // Kuantum bağı nabzı (Quantum wave pulsation)
  const pulse = Math.abs(Math.sin(frame * 0.15)) * entanglementIntensity;
  const beamWidth = interpolate(pulse, [0, 1], [3, 8]);
  const beamGlow = interpolate(pulse, [0, 1], [10, 30]);

  // Ekran koordinatları (SVG için merkez 250, 250)
  const svgCenterX = 250;
  const svgCenterY = 250;
  const p1X = svgCenterX + x1;
  const p1Y = svgCenterY + y1;
  const p2X = svgCenterX + x2;
  const p2Y = svgCenterY + y2;

  // Dalgalı kuantum lazer yolu (Wavy quantum laser path)
  const midX = (p1X + p2X) / 2;
  const midY = (p1Y + p2Y) / 2 + Math.sin(frame * 0.3) * 22;
  const quantumPath = `M ${p1X} ${p1Y} Q ${midX} ${midY} ${p2X} ${p2Y}`;

  return (
    <div
      style={{
        width: "500px",
        height: "500px",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transform: `scale(${enterScale})`,
        opacity: enterOpacity,
        perspective: "1000px",
      }}
    >
      {/* 1. DİNAMİK KUANTUM LAZER BAĞI (SVG Quantum Wave) */}
      <svg
        viewBox="0 0 500 500"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          overflow: "visible",
        }}
      >
        <defs>
          <linearGradient id="entangleBeam" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00F2FE" />
            <stop offset="50%" stopColor="#DFFF00" />
            <stop offset="100%" stopColor="#FF007A" />
          </linearGradient>
          <filter id="laserGlow">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Arka plan geniş ışıma */}
        <path
          d={quantumPath}
          fill="none"
          stroke="url(#entangleBeam)"
          strokeWidth={beamWidth + 10}
          strokeOpacity={0.35}
          filter="url(#laserGlow)"
        />

        {/* Ana keskin lazer çizgisi */}
        <path
          d={quantumPath}
          fill="none"
          stroke="url(#entangleBeam)"
          strokeWidth={beamWidth}
          strokeLinecap="round"
          style={{
            filter: `drop-shadow(0 0 ${beamGlow}px #00F2FE)`,
          }}
        />

        {/* Merkez Kuantum Düğümü (Entanglement Core) */}
        <circle
          cx={midX}
          cy={midY}
          r={6 + pulse * 4}
          fill="#FFFFFF"
          style={{
            filter: "drop-shadow(0 0 16px #DFFF00)",
          }}
        />
      </svg>

      {/* 2. PARÇACIK A: Spin-Up (Cyan / Mavi) */}
      <div
        style={{
          position: "absolute",
          transform: `translate3d(${x1}px, ${y1}px, ${z1}px) scale(${scale1})`,
          zIndex: z1 > 0 ? 30 : 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
        }}
      >
        {/* Parçacık Küresi */}
        <div
          style={{
            width: "84px",
            height: "84px",
            borderRadius: "50%",
            background: "radial-gradient(circle at 30% 30%, #FFFFFF 0%, #00F2FE 45%, #05445E 90%)",
            boxShadow: "0 0 35px #00F2FE, 0 0 70px rgba(0,242,254,0.4), inset 0 0 15px rgba(255,255,255,0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          {/* Spin Vektör Oku */}
          <ArrowUp size={36} color="#FFFFFF" strokeWidth={3.5} />

          {/* Dönen Kuantum Yörünge Halkası */}
          <div
            style={{
              position: "absolute",
              width: "110px",
              height: "110px",
              borderRadius: "50%",
              border: "2px dashed #00F2FE",
              transform: `rotate(${frame * 3}deg)`,
              opacity: 0.7,
            }}
          />
        </div>

        {/* Telemetri Etiketi */}
        <div
          style={{
            backgroundColor: "rgba(0, 242, 254, 0.2)",
            border: "1.5px solid #00F2FE",
            borderRadius: "6px",
            padding: "3px 10px",
            fontFamily: TurkishFont,
            fontSize: "12px",
            fontWeight: 900,
            color: "#00F2FE",
            letterSpacing: "0.5px",
            backdropFilter: "blur(10px)",
            textShadow: "0 0 10px #00F2FE",
          }}
        >
          |↑⟩ SPIN UP
        </div>
      </div>

      {/* 3. PARÇACIK B: Spin-Down (Magenta / Pembe) */}
      <div
        style={{
          position: "absolute",
          transform: `translate3d(${x2}px, ${y2}px, ${z2}px) scale(${scale2})`,
          zIndex: z2 > 0 ? 30 : 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
        }}
      >
        {/* Parçacık Küresi */}
        <div
          style={{
            width: "84px",
            height: "84px",
            borderRadius: "50%",
            background: "radial-gradient(circle at 30% 30%, #FFFFFF 0%, #FF007A 45%, #59022B 90%)",
            boxShadow: "0 0 35px #FF007A, 0 0 70px rgba(255,0,122,0.4), inset 0 0 15px rgba(255,255,255,0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          {/* Spin Vektör Oku */}
          <ArrowDown size={36} color="#FFFFFF" strokeWidth={3.5} />

          {/* Dönen Kuantum Yörünge Halkası */}
          <div
            style={{
              position: "absolute",
              width: "110px",
              height: "110px",
              borderRadius: "50%",
              border: "2px dashed #FF007A",
              transform: `rotate(${-frame * 3}deg)`,
              opacity: 0.7,
            }}
          />
        </div>

        {/* Telemetri Etiketi */}
        <div
          style={{
            backgroundColor: "rgba(255, 0, 122, 0.2)",
            border: "1.5px solid #FF007A",
            borderRadius: "6px",
            padding: "3px 10px",
            fontFamily: TurkishFont,
            fontSize: "12px",
            fontWeight: 900,
            color: "#FF007A",
            letterSpacing: "0.5px",
            backdropFilter: "blur(10px)",
            textShadow: "0 0 10px #FF007A",
          }}
        >
          |↓⟩ SPIN DOWN
        </div>
      </div>
    </div>
  );
};
