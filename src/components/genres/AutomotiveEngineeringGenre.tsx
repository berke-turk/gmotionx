import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { TurkishFont } from "../../load-font";
import { Gauge, ShieldAlert } from "lucide-react";

export interface AutomotiveGenreProps {
  headlineMain?: string;
  headlineSub?: string;
  badge?: string;
  warningLabel?: string;
  warningSub?: string;
  torkValue?: string;
  rpmValue?: string;
}

/**
 * AutomotiveEngineeringGenre (bilgilitampon tarzı):
 * Pure Black void zemin, araç/parça altı gerçekçi yansıma,
 * 2 satırlı net Grotesk başlık, tork/devir göstergesi ve mekatronik uyarı damgası.
 */
export const AutomotiveEngineeringGenre: React.FC<AutomotiveGenreProps> = ({
  headlineMain = "Makam arabası,",
  headlineSub = "sınırda şanzıman.",
  badge = "1.4 TSI & 1.6 TDI DSG",
  warningLabel = "DQ200 KURU KAVRAMA",
  warningSub = "Mekatronik akümülatör gövdesi zaafı",
  torkValue = "250 Nm",
  rpmValue = "4.200 RPM",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Giriş yaylanması
  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.7, stiffness: 110 },
  });
  const carScale = interpolate(enterSpring, [0, 1], [0.88, 1]);
  const carY = interpolate(enterSpring, [0, 1], [40, 0]);
  const titleOpacity = interpolate(enterSpring, [0, 1], [0, 1]);

  // Canlı tork ibresi dalgalanması
  const needlePulse = Math.sin(frame * 0.12) * 8;
  const torkBarWidth = interpolate(Math.sin(frame * 0.08), [-1, 1], [70, 95]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        backgroundColor: "#050505",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* 1. ÜST ŞIK 2 SATIRLI BAŞLIK (bilgilitampon imzası) */}
      <div
        style={{
          position: "absolute",
          top: "180px",
          left: "60px",
          right: "60px",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          opacity: titleOpacity,
          zIndex: 20,
        }}
      >
        <h1
          style={{
            fontFamily: TurkishFont,
            fontSize: "58px",
            fontWeight: 900,
            color: "#FFFFFF",
            lineHeight: 1.08,
            letterSpacing: "-1.5px",
            margin: 0,
          }}
        >
          {headlineMain}
        </h1>
        <h2
          style={{
            fontFamily: TurkishFont,
            fontSize: "52px",
            fontWeight: 800,
            color: "#6B7280",
            lineHeight: 1.08,
            letterSpacing: "-1px",
            margin: 0,
          }}
        >
          {headlineSub}
        </h2>
      </div>

      {/* 2. MERKEZ HERO: KESİLMİŞ ARAÇ & GERÇEKÇİ ZEMİN YANSIMASI */}
      <div
        style={{
          position: "absolute",
          top: "400px",
          width: "960px",
          height: "560px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          transform: `translateY(${carY}px) scale(${carScale})`,
          zIndex: 15,
        }}
      >
        {/* Vektörel Araba Silueti / Şeması */}
        <div
          style={{
            width: "820px",
            height: "380px",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Araba Gövde Grafiği */}
          <svg viewBox="0 0 800 360" style={{ width: "100%", height: "100%", filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.9))" }}>
            <defs>
              <linearGradient id="carBody" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1E293B" />
                <stop offset="50%" stopColor="#0F172A" />
                <stop offset="100%" stopColor="#020617" />
              </linearGradient>
              <linearGradient id="glassGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#0284C7" stopOpacity="0.1" />
              </linearGradient>
            </defs>

            {/* Aerodinamik Gövde */}
            <path
              d="M 60,250 C 70,220 120,210 180,210 L 260,170 C 310,130 450,120 540,150 L 640,190 C 710,200 760,220 770,250 L 760,280 L 60,280 Z"
              fill="url(#carBody)"
              stroke="#475569"
              strokeWidth="3"
            />
            {/* Camlar */}
            <path
              d="M 270,170 L 360,135 L 520,135 L 610,185 C 500,180 380,180 270,170 Z"
              fill="url(#glassGrad)"
              stroke="#38BDF8"
              strokeWidth="2"
            />
            {/* Ön / Arka Farlar */}
            <polygon points="730,225 765,230 760,248 725,240" fill="#38BDF8" filter="drop-shadow(0 0 10px #38BDF8)" />
            <polygon points="75,230 60,235 65,248 85,245" fill="#EF4444" filter="drop-shadow(0 0 10px #EF4444)" />
            {/* Tekerlekler */}
            <circle cx="210" cy="275" r="54" fill="#090D16" stroke="#64748B" strokeWidth="8" />
            <circle cx="210" cy="275" r="26" fill="#1E293B" stroke="#94A3B8" strokeWidth="4" />
            <circle cx="620" cy="275" r="54" fill="#090D16" stroke="#64748B" strokeWidth="8" />
            <circle cx="620" cy="275" r="26" fill="#1E293B" stroke="#94A3B8" strokeWidth="4" />
          </svg>

          {/* Zemin Yansıması (Glossy Floor Reflection) */}
          <div
            style={{
              position: "absolute",
              bottom: "-45px",
              width: "740px",
              height: "60px",
              background: "radial-gradient(ellipse at center, rgba(56,189,248,0.2) 0%, rgba(15,23,42,0.6) 40%, transparent 80%)",
              filter: "blur(14px)",
            }}
          />
        </div>

        {/* 3. TEKNİK TORK & MEKATRONİK UYARI PANELİ */}
        <div
          style={{
            width: "860px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          {/* Sol: Tork Sınırı Göstergesi */}
          <div
            style={{
              backgroundColor: "#0B0F19",
              border: "1.5px solid #1E293B",
              borderRadius: "16px",
              padding: "18px 22px",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Gauge size={20} color="#38BDF8" style={{ transform: `rotate(${needlePulse}deg)` }} />
                <span style={{ fontFamily: TurkishFont, fontSize: "13px", fontWeight: 900, color: "#94A3B8" }}>
                  TORK SINIRI
                </span>
              </div>
              <span style={{ fontFamily: TurkishFont, fontSize: "18px", fontWeight: 900, color: "#EF4444" }}>
                {torkValue} (MAX)
              </span>
            </div>

            {/* İlerleme Çubuğu */}
            <div style={{ width: "100%", height: "8px", backgroundColor: "#1E293B", borderRadius: "4px", overflow: "hidden" }}>
              <div
                style={{
                  width: `${torkBarWidth}%`,
                  height: "100%",
                  background: "linear-gradient(90deg, #38BDF8, #F59E0B, #EF4444)",
                  borderRadius: "4px",
                }}
              />
            </div>
            <div style={{ fontFamily: TurkishFont, fontSize: "11px", color: "#64748B", fontWeight: 700 }}>
              Kuru kavrama tolerans limiti: %98 dolu
            </div>
          </div>

          {/* Sağ: Mekatronik Zaaf Rozeti */}
          <div
            style={{
              backgroundColor: "rgba(239, 68, 68, 0.08)",
              border: "1.5px solid rgba(239, 68, 68, 0.4)",
              borderRadius: "16px",
              padding: "18px 22px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "4px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <ShieldAlert size={20} color="#EF4444" />
              <span style={{ fontFamily: TurkishFont, fontSize: "14px", fontWeight: 900, color: "#EF4444" }}>
                {warningLabel}
              </span>
            </div>
            <div style={{ fontFamily: TurkishFont, fontSize: "12px", color: "#CBD5E1", fontWeight: 700 }}>
              {warningSub}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
