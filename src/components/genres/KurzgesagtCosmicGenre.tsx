import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { TurkishFont } from "../../load-font";
import { Sparkles, Orbit } from "lucide-react";

export interface KurzgesagtCosmicGenreProps {
  scaleTag?: string;
  headlineMain?: string;
  headlineSub?: string;
  metricValue?: string;
  metricLabel?: string;
  scaleLevel?: string;
  atomicDetail?: string;
  closingVerdict?: string;
}

/**
 * KurzgesagtCosmicGenre (Kurzgesagt – In a Nutshell Tarzı):
 * Canlı neon kozmik degrade zemin (#07061A -> #1B103F), yumuşatılmış yuvarlak vektör geometrisi,
 * squash & stretch yaylanmasıyla nefes alan kuantum/atomik küre, yörünge elipsleri,
 * 10^-15m atomik ölçekten 10^26m gözlemlenebilir evrene uzanan ölçek cetveli.
 */
export const KurzgesagtCosmicGenre: React.FC<KurzgesagtCosmicGenreProps> = ({
  scaleTag = "KOZMİK ÖLÇEK · KUANTUM ÇEKİRDEĞİ",
  headlineMain = "Evrenin en soğuk yeri,",
  headlineSub = "bir atomun içi olabilir.",
  metricValue = "10⁻¹⁵ Metre",
  metricLabel = "ATOM ÇEKİRDEĞİ BOYUTU",
  scaleLevel = "SUB-ATOMİK ÖLÇEK",
  atomicDetail = "Proton ve nötronların dansı",
  closingVerdict = "Maddeye yaklaştıkça, katı dünya bir olasılık dalgasına dönüşür.",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Giriş yaylanması (Snappy velocity curves)
  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 13, mass: 0.7, stiffness: 120 },
  });

  const contentOpacity = interpolate(enterSpring, [0, 1], [0, 1]);
  const contentScale = interpolate(enterSpring, [0, 1], [0.92, 1]);

  // Squash & Stretch nefes alma animasyonu
  const breath = Math.sin(frame * 0.08) * 0.05;
  const coreScaleX = 1 + breath;
  const coreScaleY = 1 - breath * 0.8;

  // Elektron yörünge dönüşleri
  const orbit1Rot = (frame * 1.5) % 360;
  const orbit2Rot = (-frame * 1.8) % 360;
  const orbit3Rot = (frame * 1.2 + 45) % 360;

  // Renk Paleti (Kurzgesagt Saturated Vibrant Neons)
  const neonViolet = "#7C3AED";
  const neonPink = "#EC4899";
  const neonCyan = "#06B6D4";
  const neonYellow = "#FDE047";

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        background: "radial-gradient(ellipse at 50% 35%, #1F104F 0%, #080517 75%, #03020A 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* 1. KOZMİK YILDIZ TOZLARI (LOOPED PARTICLES) */}
      {[
        { x: 120, y: 220, r: 3, c: neonCyan, o: 0.7 },
        { x: 920, y: 310, r: 4, c: neonPink, o: 0.8 },
        { x: 200, y: 780, r: 2.5, c: neonYellow, o: 0.6 },
        { x: 860, y: 840, r: 3.5, c: neonViolet, o: 0.9 },
        { x: 160, y: 1350, r: 3, c: neonCyan, o: 0.5 },
        { x: 900, y: 1420, r: 4, c: neonYellow, o: 0.7 },
      ].map((star, i) => {
        const twinkle = Math.sin(frame * 0.1 + i) * 0.3;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${star.x}px`,
              top: `${star.y}px`,
              width: `${star.r * 2}px`,
              height: `${star.r * 2}px`,
              borderRadius: "50%",
              backgroundColor: star.c,
              opacity: Math.max(0.1, star.o + twinkle),
              boxShadow: `0 0 12px ${star.c}`,
            }}
          />
        );
      })}

      {/* 2. ÜST ÖLÇEK ROZETİ */}
      <div
        style={{
          position: "absolute",
          top: "140px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          backgroundColor: "rgba(124, 58, 237, 0.25)",
          border: `1.5px solid ${neonViolet}`,
          borderRadius: "999px",
          padding: "8px 20px",
          opacity: contentOpacity,
          boxShadow: `0 0 20px rgba(124, 58, 237, 0.4)`,
          zIndex: 25,
        }}
      >
        <Sparkles size={16} color={neonYellow} />
        <span
          style={{
            fontFamily: TurkishFont,
            fontSize: "13px",
            fontWeight: 900,
            color: "#FFFFFF",
            letterSpacing: "1.5px",
          }}
        >
          {scaleTag}
        </span>
      </div>

      {/* 3. MANŞET BAŞLIK (KURZGESAGT YUVARLATILMIŞ GROTESK) */}
      <div
        style={{
          position: "absolute",
          top: "205px",
          width: "88%",
          textAlign: "center",
          opacity: contentOpacity,
          transform: `scale(${contentScale})`,
          zIndex: 25,
        }}
      >
        <h1
          style={{
            fontFamily: TurkishFont,
            fontSize: "48px",
            fontWeight: 900,
            color: "#FFFFFF",
            letterSpacing: "-1px",
            margin: 0,
            lineHeight: 1.1,
          }}
        >
          {headlineMain}
        </h1>
        <h2
          style={{
            fontFamily: TurkishFont,
            fontSize: "44px",
            fontWeight: 900,
            color: neonCyan,
            letterSpacing: "-0.8px",
            margin: 0,
            lineHeight: 1.1,
            textShadow: `0 0 25px rgba(6, 182, 212, 0.5)`,
          }}
        >
          {headlineSub}
        </h2>
      </div>

      {/* 4. KAHRAMAN KOZMİK KÜRE & YÖRÜNGE ELİPSLERİ (HERO ATOM / PLANET) */}
      <div
        style={{
          position: "absolute",
          top: "330px",
          width: "560px",
          height: "560px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 15,
        }}
      >
        {/* Yörünge 1 (Cyan) */}
        <div
          style={{
            position: "absolute",
            width: "520px",
            height: "220px",
            borderRadius: "50%",
            border: `2px dashed rgba(6, 182, 212, 0.45)`,
            transform: `rotate(${orbit1Rot}deg)`,
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "-8px",
              left: "50%",
              width: "18px",
              height: "18px",
              borderRadius: "50%",
              backgroundColor: neonCyan,
              boxShadow: `0 0 16px ${neonCyan}`,
            }}
          />
        </div>

        {/* Yörünge 2 (Pink) */}
        <div
          style={{
            position: "absolute",
            width: "480px",
            height: "200px",
            borderRadius: "50%",
            border: `2px dashed rgba(236, 72, 153, 0.45)`,
            transform: `rotate(${orbit2Rot}deg)`,
          }}
        >
          <div
            style={{
              position: "absolute",
              bottom: "-8px",
              left: "40%",
              width: "16px",
              height: "16px",
              borderRadius: "50%",
              backgroundColor: neonPink,
              boxShadow: `0 0 16px ${neonPink}`,
            }}
          />
        </div>

        {/* Yörünge 3 (Yellow) */}
        <div
          style={{
            position: "absolute",
            width: "540px",
            height: "210px",
            borderRadius: "50%",
            border: `2px dashed rgba(253, 224, 71, 0.35)`,
            transform: `rotate(${orbit3Rot}deg)`,
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "30%",
              right: "-8px",
              width: "14px",
              height: "14px",
              borderRadius: "50%",
              backgroundColor: neonYellow,
              boxShadow: `0 0 16px ${neonYellow}`,
            }}
          />
        </div>

        {/* Merkez Kuantum Çekirdeği (Squash & Stretch) */}
        <div
          style={{
            width: "190px",
            height: "190px",
            borderRadius: "50%",
            background: `radial-gradient(circle at 35% 35%, #F472B6 0%, #7C3AED 55%, #1E1B4B 100%)`,
            boxShadow: `
              0 0 60px rgba(236, 72, 153, 0.6),
              0 0 120px rgba(124, 58, 237, 0.4)
            `,
            transform: `scale(${coreScaleX}, ${coreScaleY})`,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          }}
        >
          <Orbit size={48} color="#FFFFFF" style={{ opacity: 0.85 }} />
        </div>
      </div>

      {/* 5. KOZMİK ÖLÇEK CETVELİ (SOL KENAR) */}
      <div
        style={{
          position: "absolute",
          left: "40px",
          top: "430px",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          opacity: contentOpacity,
          zIndex: 20,
        }}
      >
        <span style={{ fontFamily: TurkishFont, fontSize: "10px", fontWeight: 800, color: "#94A3B8" }}>
          ÖLÇEK
        </span>
        <div style={{ width: "3px", height: "140px", backgroundColor: "rgba(255,255,255,0.15)", position: "relative" }}>
          <div
            style={{
              position: "absolute",
              top: `${interpolate(frame, [0, 60], [10, 80], { extrapolateRight: "clamp" })}%`,
              left: "-4px",
              width: "11px",
              height: "11px",
              borderRadius: "50%",
              backgroundColor: neonYellow,
              boxShadow: `0 0 10px ${neonYellow}`,
            }}
          />
        </div>
        <span style={{ fontFamily: TurkishFont, fontSize: "11px", fontWeight: 900, color: neonYellow }}>
          10⁻¹⁵m
        </span>
      </div>

      {/* 6. ALT BİLGİ KARTLARI (Mobile Safe Zone: bottom 280px) */}
      <div
        style={{
          position: "absolute",
          bottom: "280px",
          width: "88%",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          opacity: contentOpacity,
          zIndex: 25,
        }}
      >
        <div style={{ display: "flex", gap: "14px" }}>
          {/* Sol Rozet */}
          <div
            style={{
              flex: 1,
              backgroundColor: "rgba(23, 15, 46, 0.85)",
              border: `1.5px solid ${neonViolet}`,
              borderRadius: "18px",
              padding: "16px 20px",
              display: "flex",
              flexDirection: "column",
              gap: "4px",
              backdropFilter: "blur(12px)",
            }}
          >
            <span style={{ fontFamily: TurkishFont, fontSize: "11px", fontWeight: 800, color: "#A78BFA" }}>
              {metricLabel}
            </span>
            <span style={{ fontFamily: TurkishFont, fontSize: "24px", fontWeight: 900, color: "#FFFFFF" }}>
              {metricValue}
            </span>
          </div>

          {/* Sağ Rozet */}
          <div
            style={{
              flex: 1,
              backgroundColor: "rgba(23, 15, 46, 0.85)",
              border: `1.5px solid ${neonCyan}`,
              borderRadius: "18px",
              padding: "16px 20px",
              display: "flex",
              flexDirection: "column",
              gap: "4px",
              backdropFilter: "blur(12px)",
            }}
          >
            <span style={{ fontFamily: TurkishFont, fontSize: "11px", fontWeight: 800, color: "#67E8F9" }}>
              {scaleLevel}
            </span>
            <span style={{ fontFamily: TurkishFont, fontSize: "15px", fontWeight: 800, color: "#E0E7FF" }}>
              {atomicDetail}
            </span>
          </div>
        </div>

        {/* Hüküm Notu */}
        <div
          style={{
            backgroundColor: "rgba(10, 6, 24, 0.85)",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            borderRadius: "14px",
            padding: "12px 18px",
            textAlign: "center",
          }}
        >
          <span style={{ fontFamily: TurkishFont, fontSize: "13px", fontWeight: 700, color: "#CBD5E1" }}>
            {closingVerdict}
          </span>
        </div>
      </div>
    </div>
  );
};
