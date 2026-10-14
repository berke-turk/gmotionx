import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { TurkishFont } from "../../load-font";
import { Navigation, Compass, Radio } from "lucide-react";

export interface GeopoliticalMapGenreProps {
  regionTag?: string;
  coordinateText?: string;
  headlineMain?: string;
  headlineSub?: string;
  chokePointName?: string;
  statisticBadge?: string;
  statisticValue?: string;
  strategicNote?: string;
}

/**
 * GeopoliticalMapGenre (Johnny Harris / Vox / RealLifeLore tarzı):
 * 3D izometrik eğimli harita düzlemi (rotateX, rotateZ), topografik yükseklik halkaları,
 * animasyonlu kavisli ticaret/uçuş rotası (Bézier arc), yanıp sönen radar hedef pini,
 * askerî & jeopolitik telemetri HUD künyesi.
 */
export const GeopoliticalMapGenre: React.FC<GeopoliticalMapGenreProps> = ({
  regionTag = "JEOPOLİTİK STRATEJİ · HÜRMÜZ BOĞAZI",
  coordinateText = "26.5667° N, 56.2500° E",
  headlineMain = "DÜNYA PETROLÜNÜN %20'Sİ",
  headlineSub = "TEK BİR KILCAL DAMARDA.",
  chokePointName = "HÜRMÜZ DARBOĞAZI",
  statisticBadge = "GÜNLÜK TİCARET HACMİ",
  statisticValue = "21 Milyon Varil",
  strategicNote = "Boğaz kapandığı anda küresel enerji piyasası çöker.",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 1. Giriş yaylanması & Harita eğim açısı
  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.8, stiffness: 100 },
  });

  const mapScale = interpolate(enterSpring, [0, 1], [0.85, 1]);
  const mapRotateX = interpolate(enterSpring, [0, 1], [15, 26]);
  const mapRotateZ = interpolate(enterSpring, [0, 1], [0, -8]);
  const hudOpacity = interpolate(enterSpring, [0, 1], [0, 1]);

  // Canlı uçuş / ticaret rotası ilerlemesi (0 -> 1000 dashoffset)
  const routeProgress = interpolate(frame, [15, 80], [1000, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Radar ping dalgaları
  const radarWave1 = (frame * 1.8) % 60;
  const radarWave2 = ((frame * 1.8) + 30) % 60;

  // Kamera mikro kayması
  const cameraDriftX = Math.sin(frame * 0.04) * 10;
  const cameraDriftY = Math.cos(frame * 0.05) * 6;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        backgroundColor: "#080D1A", // Derin jeopolitik gece laciverti
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* Harita arka plan ızgarası */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            radial-gradient(circle at 50% 40%, rgba(20, 45, 85, 0.4) 0%, transparent 70%),
            linear-gradient(rgba(56, 189, 248, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(56, 189, 248, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: "100% 100%, 48px 48px, 48px 48px",
          opacity: 0.7,
        }}
      />

      {/* 1. ÜST ASKERÎ TELEMETRİ KÜNYESİ (HUD) */}
      <div
        style={{
          position: "absolute",
          top: "140px",
          width: "88%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          opacity: hudOpacity,
          zIndex: 25,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Radio size={16} color="#38BDF8" className="animate-pulse" />
          <span
            style={{
              fontFamily: TurkishFont,
              fontSize: "13px",
              fontWeight: 800,
              letterSpacing: "2px",
              color: "#38BDF8",
              textTransform: "uppercase",
            }}
          >
            {regionTag}
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <Compass size={14} color="#94A3B8" />
          <span
            style={{
              fontFamily: "monospace",
              fontSize: "12px",
              color: "#94A3B8",
              letterSpacing: "1px",
            }}
          >
            {coordinateText}
          </span>
        </div>
      </div>

      {/* 2. DEV BAŞLIK (Vox & Johnny Harris Gazetecilik İmzası) */}
      <div
        style={{
          position: "absolute",
          top: "185px",
          width: "88%",
          display: "flex",
          flexDirection: "column",
          gap: "4px",
          opacity: hudOpacity,
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
            color: "#F59E0B", // Jeopolitik uyarı kehribarı
            letterSpacing: "-1.2px",
            margin: 0,
            lineHeight: 1.05,
          }}
        >
          {headlineSub}
        </h2>
      </div>

      {/* 3. 3D İZOMETRİK HARİTA SAHNESİ */}
      <div
        style={{
          position: "absolute",
          top: "320px",
          width: "900px",
          height: "640px",
          perspective: "1200px",
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
            transform: `scale(${mapScale}) rotateX(${mapRotateX}deg) rotateZ(${mapRotateZ}deg) translate(${cameraDriftX}px, ${cameraDriftY}px)`,
            transformStyle: "preserve-3d",
            borderRadius: "24px",
            border: "1.5px solid rgba(56, 189, 248, 0.25)",
            backgroundColor: "rgba(11, 23, 48, 0.75)",
            boxShadow: "0 25px 60px rgba(0, 0, 0, 0.7), inset 0 0 50px rgba(56, 189, 248, 0.08)",
            overflow: "hidden",
          }}
        >
          {/* Topografik Harita Vektör Çizimi */}
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 900 640"
            fill="none"
            style={{ position: "absolute", inset: 0 }}
          >
            {/* Topografik Kontur Eğrileri */}
            <path
              d="M 50 180 C 180 120, 260 220, 420 160 C 580 100, 720 180, 850 120"
              stroke="rgba(56, 189, 248, 0.15)"
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M 80 260 C 220 200, 310 310, 460 240 C 620 180, 760 270, 880 210"
              stroke="rgba(56, 189, 248, 0.2)"
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M 30 380 C 190 320, 280 430, 450 360 C 620 300, 740 400, 870 330"
              stroke="rgba(56, 189, 248, 0.18)"
              strokeWidth="2"
              fill="none"
            />

            {/* Kara Kütlesi 1 (İran / Kuzey Kıyısı) */}
            <path
              d="M 120 100 Q 280 60, 450 120 T 780 80 L 880 0 L 0 0 L 0 160 Z"
              fill="rgba(30, 58, 95, 0.5)"
              stroke="#38BDF8"
              strokeWidth="2"
            />

            {/* Kara Kütlesi 2 (Umman / Arap Yarımadası Kıstacı) */}
            <path
              d="M 160 560 Q 340 460, 480 520 T 820 480 L 900 640 L 0 640 Z"
              fill="rgba(30, 58, 95, 0.5)"
              stroke="#38BDF8"
              strokeWidth="2"
            />

            {/* Dar Boğaz Koridoru (Kırmızı Kritik Çatışma Hattı) */}
            <path
              d="M 340 280 L 520 320"
              stroke="#EF4444"
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray="8 8"
            />

            {/* Animasyonlu Kavisli Ticaret / Tanker Rotası */}
            <path
              id="tradeArc"
              d="M 120 380 Q 420 180, 760 360"
              stroke="#F59E0B"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="1000"
              strokeDashoffset={routeProgress}
              fill="none"
            />

            {/* Rotanın ucundaki hareketli yön ikonu */}
            <g transform="translate(430, 265)">
              <circle cx="0" cy="0" r="14" fill="#F59E0B" />
              <Navigation size={16} color="#080D1A" style={{ transform: "rotate(45deg) translate(-8px, -8px)" }} />
            </g>

            {/* Stratejik Darboğaz Merkez Radarı (Pulsing Radar Pin) */}
            <g transform="translate(450, 310)">
              {/* Dalga 1 */}
              <circle
                cx="0"
                cy="0"
                r={radarWave1}
                stroke="#EF4444"
                strokeWidth="2"
                fill="none"
                opacity={1 - radarWave1 / 60}
              />
              {/* Dalga 2 */}
              <circle
                cx="0"
                cy="0"
                r={radarWave2}
                stroke="#EF4444"
                strokeWidth="2"
                fill="none"
                opacity={1 - radarWave2 / 60}
              />
              {/* Merkez Kırmızı Hedef Noktası */}
              <circle cx="0" cy="0" r="9" fill="#EF4444" />
              <circle cx="0" cy="0" r="3" fill="#FFFFFF" />
            </g>
          </svg>

          {/* Harita İçi Stratejik Bilgi Kartı */}
          <div
            style={{
              position: "absolute",
              left: "40px",
              bottom: "40px",
              backgroundColor: "rgba(8, 13, 26, 0.88)",
              border: "1.5px solid rgba(56, 189, 248, 0.4)",
              backdropFilter: "blur(12px)",
              borderRadius: "14px",
              padding: "16px 22px",
              display: "flex",
              flexDirection: "column",
              gap: "4px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.6)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#EF4444" }} />
              <span style={{ fontFamily: TurkishFont, fontSize: "14px", fontWeight: 900, color: "#FFFFFF" }}>
                {chokePointName}
              </span>
            </div>
            <div style={{ fontFamily: TurkishFont, fontSize: "12px", color: "#94A3B8" }}>
              Genişlik: En dar yerinde yalnızca 39 km
            </div>
          </div>
        </div>
      </div>

      {/* 4. ALT STRATEJİK İSTATİSTİK ROZETİ & HÜKÜM (Mobile Safe Zone: bottom 280px) */}
      <div
        style={{
          position: "absolute",
          bottom: "280px",
          width: "88%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "rgba(15, 23, 42, 0.9)",
          border: "1.5px solid rgba(245, 158, 11, 0.35)",
          borderRadius: "18px",
          padding: "18px 24px",
          backdropFilter: "blur(16px)",
          boxShadow: "0 12px 36px rgba(0,0,0,0.4)",
          opacity: hudOpacity,
          zIndex: 25,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          <span style={{ fontFamily: TurkishFont, fontSize: "12px", fontWeight: 800, color: "#94A3B8", letterSpacing: "1px" }}>
            {statisticBadge}
          </span>
          <span style={{ fontFamily: TurkishFont, fontSize: "28px", fontWeight: 900, color: "#F59E0B" }}>
            {statisticValue}
          </span>
        </div>

        <div style={{ maxWidth: "55%", textAlign: "right" }}>
          <span style={{ fontFamily: TurkishFont, fontSize: "14px", fontWeight: 700, color: "#E2E8F0", lineHeight: 1.3 }}>
            {strategicNote}
          </span>
        </div>
      </div>
    </div>
  );
};
