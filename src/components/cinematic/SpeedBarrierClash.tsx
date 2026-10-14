import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { TurkishFont } from "../../load-font";
import { Zap, AlertTriangle, Infinity as InfinityIcon } from "lucide-react";

/**
 * SpeedBarrierClash:
 * Einstein'ın "Işıktan daha hızlı bir şey olamaz" kuralı ile Kuantum Dolanıklığın
 * anlık etkileşimi arasındaki kozmik paradoksu görselleştirir.
 */
export const SpeedBarrierClash: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 13, mass: 0.7, stiffness: 100 },
  });
  const scale = interpolate(enterSpring, [0, 1], [0.8, 1]);
  const opacity = interpolate(enterSpring, [0, 1], [0, 1]);

  // Klasik sinyalin ilerleyişi (yavaş, gecikmeli)
  const classicalProgress = interpolate(frame % 70, [0, 70], [0, 1]);

  // Kuantum anlık sıçraması (tünelleme / teleportasyon)
  const quantumPulse = Math.sin(frame * 0.25);
  const barrierShake = Math.sin(frame * 0.4) * 4;

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "920px",
        height: "440px",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transform: `scale(${scale})`,
        opacity,
      }}
    >
      {/* 1. MERKEZ IŞIK HIZI BARİYERİ (Vertical Speed of Light Laser Wall) */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          bottom: "20px",
          width: "8px",
          backgroundColor: "#FF5A36",
          boxShadow: "0 0 25px #FF5A36, 0 0 50px rgba(255,90,54,0.6)",
          borderRadius: "4px",
          transform: `translateX(${barrierShake}px)`,
          zIndex: 15,
        }}
      >
        {/* Bariyer Rozeti */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%) rotate(-90deg)",
            backgroundColor: "#171717",
            border: "2px solid #FF5A36",
            borderRadius: "6px",
            padding: "4px 14px",
            fontFamily: TurkishFont,
            fontSize: "12px",
            fontWeight: 900,
            color: "#FF5A36",
            whiteSpace: "nowrap",
            boxShadow: "0 0 20px rgba(255,90,54,0.5)",
          }}
        >
          ⚡ c = 300.000 KM/SN SINIRI
        </div>
      </div>

      {/* 2. SOL TARAF: KLASİK FİZİK (Gecikmeli Sinyal) */}
      <div
        style={{
          position: "absolute",
          left: "40px",
          width: "380px",
          height: "360px",
          backgroundColor: "rgba(255, 255, 255, 0.04)",
          border: "2px dashed rgba(255, 255, 255, 0.2)",
          borderRadius: "20px",
          padding: "24px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <AlertTriangle color="#FF5A36" size={24} />
          <span style={{ fontFamily: TurkishFont, fontSize: "16px", fontWeight: 900, color: "#FFFFFF" }}>
            KLASİK FİZİK
          </span>
        </div>

        {/* İlerleyen Klasik Işık Sinyali */}
        <div style={{ position: "relative", height: "60px", display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: "100%",
              height: "4px",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              borderRadius: "2px",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: `${(classicalProgress * 80)}%`,
              width: "28px",
              height: "28px",
              borderRadius: "50%",
              backgroundColor: "#FF5A36",
              boxShadow: "0 0 15px #FF5A36",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#FFFFFF" }} />
          </div>
        </div>

        <div>
          <div style={{ fontFamily: TurkishFont, fontSize: "13px", color: "rgba(255, 255, 255, 0.6)", fontWeight: 700 }}>
            İletişim Hızı:
          </div>
          <div style={{ fontFamily: TurkishFont, fontSize: "24px", fontWeight: 900, color: "#FF5A36" }}>
            IŞIK HIZI SINIRLI
          </div>
          <div style={{ fontFamily: TurkishFont, fontSize: "11px", color: "#94A3B8", marginTop: "2px" }}>
            Mesafe arttıkça gecikme büyür
          </div>
        </div>
      </div>

      {/* 3. SAĞ TARAF: KUANTUM DOLANIKLIK (Anlık Kırılma) */}
      <div
        style={{
          position: "absolute",
          right: "40px",
          width: "380px",
          height: "360px",
          backgroundColor: "rgba(0, 242, 254, 0.08)",
          border: "2.5px solid #00F2FE",
          borderRadius: "20px",
          padding: "24px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          boxShadow: "0 0 40px rgba(0, 242, 254, 0.25)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Zap color="#00F2FE" size={26} />
          <span style={{ fontFamily: TurkishFont, fontSize: "16px", fontWeight: 900, color: "#00F2FE" }}>
            KUANTUM DOLANIKLIK
          </span>
        </div>

        {/* Anlık Kuantum Tünellemesi */}
        <div
          style={{
            height: "80px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <div
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              border: "2px solid rgba(0,242,254,0.4)",
              position: "absolute",
              transform: `scale(${1 + quantumPulse * 0.15})`,
              boxShadow: "0 0 30px rgba(0,242,254,0.3)",
            }}
          />
          <InfinityIcon size={56} color="#00F2FE" style={{ filter: "drop-shadow(0 0 16px #00F2FE)" }} />
        </div>

        <div>
          <div style={{ fontFamily: TurkishFont, fontSize: "13px", color: "rgba(0, 242, 254, 0.8)", fontWeight: 700 }}>
            İletişim Hızı:
          </div>
          <div style={{ fontFamily: TurkishFont, fontSize: "28px", fontWeight: 900, color: "#DFFF00" }}>
            0.00 sn (ANLIK)
          </div>
          <div style={{ fontFamily: TurkishFont, fontSize: "11px", color: "#E2E8F0", marginTop: "2px" }}>
            Mesafe engeli tamamen yok olur
          </div>
        </div>
      </div>
    </div>
  );
};
