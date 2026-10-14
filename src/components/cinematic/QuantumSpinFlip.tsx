import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { TurkishFont } from "../../load-font";
import { ArrowUp, ArrowDown } from "lucide-react";

/**
 * QuantumSpinFlip:
 * Kuantum dolanıklığın en somut kuralını gösterir:
 * Biri yukarı dönerse (|↑⟩), diğeri mesafeden bağımsız aynı anda aşağı (|↓⟩) döner.
 */
export const QuantumSpinFlip: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Her 45 karede bir periyodik spin tersine dönme hareketi
  const cycle = Math.floor(frame / 45);
  const cycleProgress = (frame % 45) / 45;

  const flipSpring = spring({
    frame: frame % 45,
    fps,
    config: { damping: 11, mass: 0.5, stiffness: 140 },
  });

  const isFlipped = cycle % 2 === 1;

  // Parçacık A dönüşü (0 -> 180 derece)
  const angleA = interpolate(flipSpring, [0, 1], [isFlipped ? 180 : 0, isFlipped ? 0 : 180]);
  const angleB = -angleA; // Birebir zıt kutup (Antiparallel spin)

  // Şok dalgası halkaları
  const shockwave = interpolate(cycleProgress, [0, 0.8], [1, 2.5]);
  const shockOpacity = interpolate(cycleProgress, [0, 0.8], [0.8, 0]);

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "920px",
        height: "450px",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      {/* 1. PARÇACIK 1 */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "16px",
          position: "relative",
        }}
      >
        {/* Şok dalgası */}
        <div
          style={{
            position: "absolute",
            top: "10px",
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            border: "2px solid #00F2FE",
            transform: `scale(${shockwave})`,
            opacity: shockOpacity,
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            width: "140px",
            height: "140px",
            borderRadius: "50%",
            background: "radial-gradient(circle at 35% 35%, #FFFFFF 0%, #00F2FE 45%, #0A192F 95%)",
            boxShadow: "0 0 40px #00F2FE, 0 0 80px rgba(0,242,254,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: `rotate(${angleA}deg)`,
            transition: "none",
          }}
        >
          <ArrowUp size={64} color="#FFFFFF" strokeWidth={3.5} />
        </div>

        <div
          style={{
            backgroundColor: "#0A0D14",
            border: "2px solid #00F2FE",
            borderRadius: "8px",
            padding: "6px 16px",
            fontFamily: TurkishFont,
            fontSize: "16px",
            fontWeight: 900,
            color: "#00F2FE",
            boxShadow: "0 0 20px rgba(0,242,254,0.3)",
          }}
        >
          {isFlipped ? "SPIN: AŞAĞI |↓⟩" : "SPIN: YUKARI |↑⟩"}
        </div>
      </div>

      {/* 2. MERKEZ EŞZAMANLI BAĞLANTI HATTI */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <div
          style={{
            fontFamily: TurkishFont,
            fontSize: "14px",
            fontWeight: 900,
            color: "#DFFF00",
            backgroundColor: "#171717",
            border: "2px solid #DFFF00",
            borderRadius: "6px",
            padding: "4px 14px",
            letterSpacing: "1px",
            boxShadow: "0 0 20px rgba(223,255,0,0.4)",
          }}
        >
          %100 ANLIK EŞZAMANLILIK
        </div>
        <div
          style={{
            width: "180px",
            height: "4px",
            background: "linear-gradient(90deg, #00F2FE, #DFFF00, #FF007A)",
            boxShadow: "0 0 15px #DFFF00",
            borderRadius: "2px",
          }}
        />
        <div style={{ fontFamily: TurkishFont, fontSize: "11px", color: "#94A3B8", fontWeight: 700 }}>
          GECİKME = 0.000 ms
        </div>
      </div>

      {/* 3. PARÇACIK 2 */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "16px",
          position: "relative",
        }}
      >
        {/* Şok dalgası */}
        <div
          style={{
            position: "absolute",
            top: "10px",
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            border: "2px solid #FF007A",
            transform: `scale(${shockwave})`,
            opacity: shockOpacity,
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            width: "140px",
            height: "140px",
            borderRadius: "50%",
            background: "radial-gradient(circle at 35% 35%, #FFFFFF 0%, #FF007A 45%, #2B0515 95%)",
            boxShadow: "0 0 40px #FF007A, 0 0 80px rgba(255,0,122,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: `rotate(${angleB}deg)`,
            transition: "none",
          }}
        >
          <ArrowDown size={64} color="#FFFFFF" strokeWidth={3.5} />
        </div>

        <div
          style={{
            backgroundColor: "#0A0D14",
            border: "2px solid #FF007A",
            borderRadius: "8px",
            padding: "6px 16px",
            fontFamily: TurkishFont,
            fontSize: "16px",
            fontWeight: 900,
            color: "#FF007A",
            boxShadow: "0 0 20px rgba(255,0,122,0.3)",
          }}
        >
          {isFlipped ? "SPIN: YUKARI |↑⟩" : "SPIN: AŞAĞI |↓⟩"}
        </div>
      </div>
    </div>
  );
};
