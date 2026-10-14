import React from "react";
import { useCurrentFrame } from "remotion";
import { TurkishFont } from "../../load-font";

export interface SoundGenreProps {
  hookTop?: string;
  hookBottom?: string;
  categoryTrack?: string;
  activeChord?: string;
  chordRatio?: string;
  frequencyHz?: number;
}

/**
 * AcousticSoundGenre (thel.ab67 tarzı):
 * Polar dairesel osiloskop dalgaları, frekans spektrumu cetveli,
 * piyano tuşları, vurucu kırmızı/siyah hap başlık ve ritimden notaya geçiş fiziği.
 */
export const AcousticSoundGenre: React.FC<SoundGenreProps> = ({
  hookTop = "WHEN DOES A BEAT",
  hookBottom = "BECOME A NOTE?",
  categoryTrack = "BEAT — NOTE — CHORD — SONG",
  activeChord = "Am",
  chordRatio = "10 : 12 : 15",
  frequencyHz = 20,
}) => {
  const frame = useCurrentFrame();

  // Polar dalga şekilleri
  const wavePoints = 48;
  const radius = 140;

  const cyanWave = Array.from({ length: wavePoints }).map((_, i) => {
    const angle = (i / wavePoints) * Math.PI * 2;
    const offset = Math.sin(frame * 0.2 + i * 0.8) * 16;
    const r = radius + offset;
    return `${250 + Math.cos(angle) * r},${250 + Math.sin(angle) * r}`;
  }).join(" ");

  const magentaWave = Array.from({ length: wavePoints }).map((_, i) => {
    const angle = (i / wavePoints) * Math.PI * 2;
    const offset = Math.cos(frame * 0.25 + i * 1.2) * 22;
    const r = radius * 0.8 + offset;
    return `${250 + Math.cos(angle) * r},${250 + Math.sin(angle) * r}`;
  }).join(" ");

  const goldWave = Array.from({ length: wavePoints }).map((_, i) => {
    const angle = (i / wavePoints) * Math.PI * 2;
    const offset = Math.sin(frame * 0.3 + i * 1.5) * 12;
    const r = radius * 0.55 + offset;
    return `${250 + Math.cos(angle) * r},${250 + Math.sin(angle) * r}`;
  }).join(" ");

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        background: "radial-gradient(circle at center, #1E1233 0%, #0D0717 80%, #05020A 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* 1. ÜST İKİLİ HAP BAŞLIK (thel.ab67 Kancası) */}
      <div
        style={{
          position: "absolute",
          top: "160px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
          zIndex: 20,
        }}
      >
        <div
          style={{
            backgroundColor: "#FF3366", // Coral Red
            color: "#FFFFFF",
            fontFamily: TurkishFont,
            fontSize: "26px",
            fontWeight: 900,
            padding: "6px 24px",
            borderRadius: "8px",
            letterSpacing: "1px",
            boxShadow: "0 0 25px rgba(255, 51, 102, 0.5)",
          }}
        >
          {hookTop}
        </div>

        <div
          style={{
            backgroundColor: "#0D0717",
            color: "#FFFFFF",
            border: "2px solid rgba(255, 255, 255, 0.2)",
            fontFamily: TurkishFont,
            fontSize: "24px",
            fontWeight: 900,
            padding: "5px 22px",
            borderRadius: "8px",
            letterSpacing: "1px",
          }}
        >
          {hookBottom}
        </div>

        {/* Kategori Yolu */}
        <span
          style={{
            fontFamily: TurkishFont,
            fontSize: "14px",
            fontWeight: 800,
            color: "#E2E8F0",
            letterSpacing: "3px",
            marginTop: "6px",
          }}
        >
          {categoryTrack}
        </span>
      </div>

      {/* 2. AKTİF NOTA VE FREKANS ORANI */}
      <div
        style={{
          position: "absolute",
          top: "320px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "2px",
          zIndex: 20,
        }}
      >
        <span
          style={{
            fontFamily: TurkishFont,
            fontSize: "58px",
            fontWeight: 900,
            color: "#FFFFFF",
            lineHeight: 1,
            textShadow: "0 0 25px #00F2FE",
          }}
        >
          {activeChord}
        </span>
        <span
          style={{
            fontFamily: TurkishFont,
            fontSize: "16px",
            fontWeight: 800,
            color: "#F472B6",
            letterSpacing: "2px",
          }}
        >
          {chordRatio}
        </span>
      </div>

      {/* 3. MERKEZ POLAR OSİLOSKOP (Eşmerkezli Dalga Halkaları) */}
      <div
        style={{
          position: "absolute",
          top: "400px",
          width: "500px",
          height: "500px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 15,
        }}
      >
        <svg viewBox="0 0 500 500" style={{ width: "100%", height: "100%", overflow: "visible" }}>
          {/* Dış Referans Çemberi */}
          <circle cx="250" cy="250" r="160" fill="none" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1.5" />
          <circle cx="250" cy="90" r="6" fill="#FDE047" />
          <circle cx="410" cy="250" r="6" fill="#FDE047" />
          <circle cx="250" cy="410" r="6" fill="#FDE047" />
          <circle cx="90" cy="250" r="6" fill="#FDE047" />

          {/* Dış Cyan Dalga */}
          <polygon points={cyanWave} fill="none" stroke="#00F2FE" strokeWidth="3" filter="drop-shadow(0 0 12px #00F2FE)" />

          {/* Orta Magenta Dalga */}
          <polygon points={magentaWave} fill="none" stroke="#FF007A" strokeWidth="3.5" filter="drop-shadow(0 0 14px #FF007A)" />

          {/* İç Gold Dalga */}
          <polygon points={goldWave} fill="none" stroke="#FDE047" strokeWidth="3" filter="drop-shadow(0 0 10px #FDE047)" />

          {/* Merkez Parlak Çekirdek */}
          <circle cx="250" cy="250" r="22" fill="#FFFFFF" filter="drop-shadow(0 0 20px #FF3366)" />
        </svg>
      </div>

      {/* 4. ALT FREKANS CETVELİ & PİYANO TUŞLARI (1Hz - 1000Hz) */}
      <div
        style={{
          position: "absolute",
          top: "920px",
          width: "820px",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          zIndex: 20,
        }}
      >
        {/* RHYTHM vs PITCH Başlıkları */}
        <div style={{ display: "flex", justifyContent: "space-between", padding: "0 20px" }}>
          <span style={{ fontFamily: TurkishFont, fontSize: "14px", fontWeight: 900, color: "#FB923C" }}>
            ▼ RİTİM (RHYTHM)
          </span>
          <span style={{ fontFamily: TurkishFont, fontSize: "14px", fontWeight: 900, color: "#38BDF8" }}>
            ▼ NOTA / PERDE (PITCH)
          </span>
        </div>

        {/* Piyano Tuşları Şeridi */}
        <div
          style={{
            width: "100%",
            height: "44px",
            backgroundColor: "#FFFFFF",
            borderRadius: "6px",
            display: "flex",
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 0 25px rgba(0,0,0,0.8)",
          }}
        >
          {Array.from({ length: 28 }).map((_, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                borderRight: "1px solid #CBD5E1",
                height: "100%",
                backgroundColor: i % 3 === 0 ? "#FF007A" : (i % 5 === 0 ? "#00F2FE" : "#FFFFFF"),
              }}
            />
          ))}
        </div>

        {/* Frekans Sayı Doğrusu */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontFamily: TurkishFont,
            fontSize: "12px",
            fontWeight: 800,
            color: "#94A3B8",
            padding: "0 10px",
          }}
        >
          <span>1 Hz</span>
          <span>5 Hz</span>
          <span style={{ color: "#FDE047", fontWeight: 900 }}>20 Hz (Dönüm Noktası)</span>
          <span>100 Hz</span>
          <span>500 Hz</span>
          <span>1000 Hz</span>
        </div>
      </div>
    </div>
  );
};
