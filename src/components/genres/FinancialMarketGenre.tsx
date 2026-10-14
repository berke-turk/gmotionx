import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { TurkishFont } from "../../load-font";
import { TrendingUp, DollarSign, Activity } from "lucide-react";

export interface FinancialGenreProps {
  marketIndexTag?: string;
  headlineMain?: string;
  headlineSub?: string;
  percentageChange?: string;
  percentageLabel?: string;
  isBullish?: boolean;
  statLeftLabel?: string;
  statLeftValue?: string;
  statRightLabel?: string;
  statRightValue?: string;
  closingVerdict?: string;
}

/**
 * FinancialMarketGenre (Bloomberg / Wall Street / Macroeconomics Tarzı):
 * Derin finans terminali zemin (#080E1A), canlı mum grafik (candlestick chart),
 * katlanarak tırmanan büyüme/enflasyon eğrisi, canlı artan yüzde sayacı (+%248),
 * para birimi veya varlık mukayese kartları.
 */
export const FinancialMarketGenre: React.FC<FinancialGenreProps> = ({
  marketIndexTag = "MAKROEKONOMİ & ENFLASYON ŞOKU",
  headlineMain = "Maaşın artıyor ama,",
  headlineSub = "alım gücün buharlaşıyor.",
  percentageChange = "+%68.4",
  percentageLabel = "KÜMÜLATİF PAHALILIK ENDEKSİ",
  isBullish = false,
  statLeftLabel = "AYLIK REEL KAYIP",
  statLeftValue = "-%14.2",
  statRightLabel = "ALIM GÜCÜ PARİTESİ",
  statRightValue = "1/3 ORANINDA",
  closingVerdict = "Rakamlar büyürken, satın alabildiğin sepet küçülüyor.",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Giriş yaylanması
  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.8, stiffness: 110 },
  });

  const contentOpacity = interpolate(enterSpring, [0, 1], [0, 1]);
  const contentY = interpolate(enterSpring, [0, 1], [30, 0]);

  // Canlı eğri çizim ilerlemesi (0 -> 1000)
  const curveProgress = interpolate(frame, [10, 75], [1000, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Mum çubukları boy dalgalanması
  const candlePulse = Math.sin(frame * 0.1) * 6;

  // Ana renk teması (Ayı/Boğa piyasası)
  const accentColor = isBullish ? "#10B981" : "#EF4444";

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        backgroundColor: "#080E1A",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* Finans terminali ızgara çizgileri */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(148, 163, 184, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(148, 163, 184, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          opacity: 0.6,
        }}
      />

      {/* 1. ÜST PİYASA ŞERİDİ (TICKER) */}
      <div
        style={{
          position: "absolute",
          top: "140px",
          width: "88%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          opacity: contentOpacity,
          zIndex: 25,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Activity size={16} color={accentColor} />
          <span
            style={{
              fontFamily: TurkishFont,
              fontSize: "13px",
              fontWeight: 900,
              letterSpacing: "2px",
              color: accentColor,
              textTransform: "uppercase",
            }}
          >
            {marketIndexTag}
          </span>
        </div>

        <div
          style={{
            backgroundColor: isBullish ? "rgba(16, 185, 129, 0.15)" : "rgba(239, 68, 68, 0.15)",
            border: `1px solid ${accentColor}`,
            padding: "4px 12px",
            borderRadius: "999px",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <TrendingUp size={14} color={accentColor} style={{ transform: isBullish ? "none" : "scaleY(-1)" }} />
          <span style={{ fontFamily: TurkishFont, fontSize: "14px", fontWeight: 900, color: accentColor }}>
            {percentageChange}
          </span>
        </div>
      </div>

      {/* 2. BAŞLIK */}
      <div
        style={{
          position: "absolute",
          top: "185px",
          width: "88%",
          transform: `translateY(${contentY}px)`,
          opacity: contentOpacity,
          zIndex: 25,
        }}
      >
        <h1
          style={{
            fontFamily: TurkishFont,
            fontSize: "48px",
            fontWeight: 900,
            color: "#FFFFFF",
            letterSpacing: "-1.5px",
            margin: 0,
            lineHeight: 1.05,
          }}
        >
          {headlineMain}
        </h1>
        <h2
          style={{
            fontFamily: TurkishFont,
            fontSize: "44px",
            fontWeight: 900,
            color: accentColor,
            letterSpacing: "-1.2px",
            margin: 0,
            lineHeight: 1.05,
          }}
        >
          {headlineSub}
        </h2>
      </div>

      {/* 3. CANLI MUM GRAFİĞİ & EKSEN (CANDLESTICK TERMINAL) */}
      <div
        style={{
          position: "absolute",
          top: "310px",
          width: "900px",
          height: "460px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 15,
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
            backgroundColor: "rgba(15, 23, 42, 0.75)",
            border: "1.5px solid rgba(56, 189, 248, 0.2)",
            borderRadius: "20px",
            boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
            overflow: "hidden",
            padding: "24px",
          }}
        >
          {/* Fiyat / Seviye Yatay Kılavuz Çizgileri */}
          <div style={{ position: "absolute", top: "25%", left: "20px", right: "20px", height: "1px", backgroundColor: "rgba(148, 163, 184, 0.15)" }} />
          <div style={{ position: "absolute", top: "50%", left: "20px", right: "20px", height: "1px", backgroundColor: "rgba(148, 163, 184, 0.15)" }} />
          <div style={{ position: "absolute", top: "75%", left: "20px", right: "20px", height: "1px", backgroundColor: "rgba(148, 163, 184, 0.15)" }} />

          {/* Mum Çubukları (Candlesticks) */}
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              padding: "20px 40px",
              position: "relative",
            }}
          >
            {[
              { type: "green", bodyH: 90, wickH: 150, bottom: 40 },
              { type: "red", bodyH: 70, wickH: 120, bottom: 90 },
              { type: "green", bodyH: 120, wickH: 190, bottom: 80 },
              { type: "green", bodyH: 140, wickH: 220, bottom: 120 },
              { type: "red", bodyH: 160, wickH: 260, bottom: 100 },
              { type: "red", bodyH: 210, wickH: 310, bottom: 60 },
            ].map((candle, idx) => {
              const isGreen = candle.type === "green";
              const cColor = isGreen ? "#10B981" : "#EF4444";
              const currentBodyH = candle.bodyH + (idx === 5 ? candlePulse : 0);

              return (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    position: "relative",
                    bottom: `${candle.bottom}px`,
                  }}
                >
                  {/* İnce Fitil (Wick) */}
                  <div style={{ width: "3px", height: `${candle.wickH}px`, backgroundColor: cColor, position: "absolute", top: "50%", transform: "translateY(-50%)" }} />

                  {/* Kalın Gövde (Body) */}
                  <div
                    style={{
                      width: "38px",
                      height: `${currentBodyH}px`,
                      backgroundColor: cColor,
                      borderRadius: "4px",
                      zIndex: 2,
                      boxShadow: `0 0 20px ${cColor}40`,
                    }}
                  />
                </div>
              );
            })}

            {/* Üzerinden Geçen Dinamik Eğri (SVG Bezier) */}
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 850 400"
              style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
            >
              <defs>
                <linearGradient id="chartGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#10B981" />
                  <stop offset="60%" stopColor="#F59E0B" />
                  <stop offset="100%" stopColor="#EF4444" />
                </linearGradient>
              </defs>

              <path
                d="M 60 300 Q 250 260, 420 180 T 780 80"
                stroke="url(#chartGradient)"
                strokeWidth="5"
                strokeLinecap="round"
                strokeDasharray="1000"
                strokeDashoffset={curveProgress}
                fill="none"
              />
              <circle cx="780" cy="80" r="8" fill="#EF4444" stroke="#FFFFFF" strokeWidth="2.5" />
            </svg>
          </div>

          {/* Sol Üst Mini İndikatör */}
          <div
            style={{
              position: "absolute",
              top: "16px",
              left: "20px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <DollarSign size={16} color="#94A3B8" />
            <span style={{ fontFamily: TurkishFont, fontSize: "12px", fontWeight: 800, color: "#94A3B8" }}>
              {percentageLabel}
            </span>
          </div>
        </div>
      </div>

      {/* 4. ALT ÇİFT KUTU REEL MUKAYESE VE HÜKÜM (Mobile Safe Zone: bottom 280px) */}
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
          <div
            style={{
              flex: 1,
              backgroundColor: "rgba(15, 23, 42, 0.85)",
              border: "1.5px solid rgba(239, 68, 68, 0.3)",
              borderRadius: "16px",
              padding: "16px 20px",
              display: "flex",
              flexDirection: "column",
              gap: "4px",
            }}
          >
            <span style={{ fontFamily: TurkishFont, fontSize: "11px", fontWeight: 800, color: "#94A3B8" }}>
              {statLeftLabel}
            </span>
            <span style={{ fontFamily: TurkishFont, fontSize: "24px", fontWeight: 900, color: "#EF4444" }}>
              {statLeftValue}
            </span>
          </div>

          <div
            style={{
              flex: 1,
              backgroundColor: "rgba(15, 23, 42, 0.85)",
              border: "1.5px solid rgba(56, 189, 248, 0.3)",
              borderRadius: "16px",
              padding: "16px 20px",
              display: "flex",
              flexDirection: "column",
              gap: "4px",
            }}
          >
            <span style={{ fontFamily: TurkishFont, fontSize: "11px", fontWeight: 800, color: "#94A3B8" }}>
              {statRightLabel}
            </span>
            <span style={{ fontFamily: TurkishFont, fontSize: "24px", fontWeight: 900, color: "#38BDF8" }}>
              {statRightValue}
            </span>
          </div>
        </div>

        <div
          style={{
            backgroundColor: "rgba(0,0,0,0.5)",
            border: "1px solid rgba(148, 163, 184, 0.2)",
            borderRadius: "12px",
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
