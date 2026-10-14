import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { TurkishFont } from "../../load-font";

export interface IslamicGenreProps {
  surahTitle?: string;
  arabicScript?: string;
  highlightArabicWord?: string;
  mainVerdictTurkish?: string;
  surahReference?: string;
}

/**
 * IslamicSpiritualGenre (islamvemantik tarzı):
 * Vintage çizgili parşömen kâğıdı, kobalt mavisi hat sanatı,
 * elle çizilmiş kırmızı vurgu dairesi, ışığa açılan kapı vektörü ve asil serif tipografi.
 */
export const IslamicSpiritualGenre: React.FC<IslamicGenreProps> = ({
  surahTitle = "FURKÂN · 70",
  arabicScript = "فَأُولَٰئِكَ يُبَدِّلُ اللَّهُ سَيِّئَاتِهِمْ حَسَنَاتٍ",
  highlightArabicWord = "يُبَدِّلُ",
  mainVerdictTurkish = "GÜNAHI İYİLİĞE ÇEVİRİR",
  surahReference = "Furkan 68-70",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Kapı açılma animasyonu (Perspective door swing)
  const doorSpring = spring({
    frame: Math.max(0, frame - 15),
    fps,
    config: { damping: 14, mass: 0.8, stiffness: 70 },
  });
  const doorAngle = interpolate(doorSpring, [0, 1], [0, -68]); // Derece olarak kapı açılışı
  const lightOpacity = interpolate(doorSpring, [0, 1], [0.2, 0.9]);

  // Kırmızı dairenin elle çizilme efekti (Circle drawing spring)
  const circleSpring = spring({
    frame: Math.max(0, frame - 28),
    fps,
    config: { damping: 12, mass: 0.5, stiffness: 120 },
  });
  const circleDash = interpolate(circleSpring, [0, 1], [300, 0]);

  // Yıldızların belirmesi (İyilik simgesi)
  const starSpring = spring({
    frame: Math.max(0, frame - 35),
    fps,
    config: { damping: 10, mass: 0.4, stiffness: 150 },
  });
  const starScale = interpolate(starSpring, [0, 1], [0, 1]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        backgroundColor: "#F7F4EB", // Vintage sıcak parşömen
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* 1. DEFTER ÇİZGİLERİ (Vintage Lined Paper) */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: "repeating-linear-gradient(transparent, transparent 38px, rgba(148, 163, 184, 0.22) 39px, rgba(148, 163, 184, 0.22) 40px)",
          pointerEvents: "none",
        }}
      />

      {/* 2. ÜST SURE BAŞLIĞI (Tracked Serif) */}
      <div
        style={{
          position: "absolute",
          top: "160px",
          display: "flex",
          alignItems: "center",
          gap: "16px",
          zIndex: 20,
        }}
      >
        <div style={{ width: "60px", height: "1px", backgroundColor: "#64748B" }} />
        <span
          style={{
            fontFamily: TurkishFont,
            fontSize: "18px",
            fontWeight: 800,
            color: "#475569",
            letterSpacing: "4px",
            textTransform: "uppercase",
          }}
        >
          {surahTitle}
        </span>
        <div style={{ width: "60px", height: "1px", backgroundColor: "#64748B" }} />
      </div>

      {/* 3. ARAPÇA HAT METNİ & ELLE ÇİZİLEN KIRMIZI VURGU DAİRESİ */}
      <div
        style={{
          position: "absolute",
          top: "230px",
          left: "40px",
          right: "40px",
          textAlign: "center",
          zIndex: 20,
        }}
      >
        <div
          style={{
            fontFamily: "'Traditional Arabic', 'Amiri', 'Georgia', serif",
            fontSize: "48px",
            fontWeight: 700,
            color: "#1E3A8A", // Derin Kobalt Mavisi
            lineHeight: 1.6,
            direction: "rtl",
            position: "relative",
            display: "inline-block",
            padding: "0 20px",
          }}
        >
          {arabicScript}

          {/* Vurgu Kelimesinin Üzerine Çizilen Kırmızı Halka */}
          <svg
            style={{
              position: "absolute",
              top: "5px",
              right: "40%",
              width: "110px",
              height: "90px",
              overflow: "visible",
              pointerEvents: "none",
            }}
          >
            <ellipse
              cx="55"
              cy="45"
              rx="46"
              ry="38"
              fill="none"
              stroke="#DC2626"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeDasharray="300"
              strokeDashoffset={circleDash}
              transform="rotate(-6 55 45)"
            />
          </svg>
        </div>
      </div>

      {/* 4. MERKEZ VEKTÖREL İLLÜSTRASYON: IŞIĞA AÇILAN KAPI */}
      <div
        style={{
          position: "absolute",
          top: "430px",
          width: "400px",
          height: "360px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 15,
        }}
      >
        <svg viewBox="0 0 400 360" style={{ width: "100%", height: "100%", overflow: "visible" }}>
          {/* Perspektif Zemin Çizgileri */}
          <line x1="50" y1="280" x2="160" y2="230" stroke="#94A3B8" strokeWidth="1.5" strokeOpacity="0.7" />
          <line x1="100" y1="280" x2="175" y2="230" stroke="#94A3B8" strokeWidth="1.5" strokeOpacity="0.7" />
          <line x1="200" y1="280" x2="200" y2="230" stroke="#94A3B8" strokeWidth="1.5" strokeOpacity="0.7" />
          <line x1="300" y1="280" x2="225" y2="230" stroke="#94A3B8" strokeWidth="1.5" strokeOpacity="0.7" />
          <line x1="350" y1="280" x2="240" y2="230" stroke="#94A3B8" strokeWidth="1.5" strokeOpacity="0.7" />
          <line x1="80" y1="230" x2="320" y2="230" stroke="#334155" strokeWidth="2" />

          {/* Kapı Arkasından Sızan İlahi Işık Huzmesi */}
          <radialGradient id="divineLight" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FDE047" stopOpacity={lightOpacity} />
            <stop offset="60%" stopColor="#FEF08A" stopOpacity={lightOpacity * 0.4} />
            <stop offset="100%" stopColor="#F7F4EB" stopOpacity="0" />
          </radialGradient>
          <ellipse cx="200" cy="150" rx="90" ry="110" fill="url(#divineLight)" />

          {/* Kapı Kasası */}
          <rect x="155" y="80" width="90" height="150" fill="none" stroke="#1E293B" strokeWidth="3" />

          {/* 3D Açılan Kapı Kanadı */}
          <g style={{ transformOrigin: "155px 80px", transform: `rotateY(${doorAngle}deg)` }}>
            <rect x="155" y="80" width="90" height="150" fill="#F7F4EB" stroke="#1E3A8A" strokeWidth="3" />
            <circle cx="235" cy="155" r="4" fill="#1E3A8A" />
          </g>

          {/* Soldaki Kötülükler (Kırmızı Çarpılar) */}
          <text x="75" y="210" fill="#DC2626" fontSize="28" fontWeight="bold">✕</text>
          <text x="105" y="195" fill="#DC2626" fontSize="32" fontWeight="bold">✕</text>
          <text x="135" y="215" fill="#DC2626" fontSize="26" fontWeight="bold">✕</text>

          {/* Sağdaki İyilikler (Yıldızlara Dönüşüm) */}
          <g style={{ transform: `scale(${starScale})`, transformOrigin: "290px 200px" }}>
            <text x="260" y="215" fill="#1E3A8A" fontSize="30">★</text>
            <text x="290" y="200" fill="#1E3A8A" fontSize="36">★</text>
            <text x="325" y="215" fill="#1E3A8A" fontSize="28">★</text>
          </g>
        </svg>
      </div>

      {/* 5. ALT BÜYÜK SERİF HÜKÜM & REFERANS ROZETİ */}
      <div
        style={{
          position: "absolute",
          top: "840px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "12px",
          zIndex: 20,
        }}
      >
        <h2
          style={{
            fontFamily: "'Georgia', 'Times New Roman', serif",
            fontSize: "44px",
            fontWeight: 900,
            color: "#1E3A8A",
            textAlign: "center",
            letterSpacing: "1px",
            margin: 0,
            maxWidth: "880px",
          }}
        >
          {mainVerdictTurkish}
        </h2>

        <div
          style={{
            border: "1.5px solid #1E3A8A",
            borderRadius: "6px",
            padding: "4px 18px",
            fontFamily: "'Georgia', serif",
            fontSize: "14px",
            fontStyle: "italic",
            color: "#1E3A8A",
            backgroundColor: "rgba(30, 58, 138, 0.05)",
          }}
        >
          {surahReference}
        </div>
      </div>
    </div>
  );
};
