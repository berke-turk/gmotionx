import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { TurkishFont } from "../../load-font";

export interface CinemaViewfinderGenreProps {
  courseTag?: string;
  chapterNumber?: string;
  headline?: string;
  subjectTitle?: string;
  lensSpec?: string;
  ruleLabel?: string;
}

/**
 * CinemaViewfinderGenre (schole444 tarzı):
 * Sıcak keten/krem zemin (#F5F2EB), minimalist üst ders künyesi (SİNEMA DİLİ / DERS 01 | 44),
 * Köşe vizör imleri olan (┌ ┐ └ ┘) ve yanıp sönen REC kırmızı noktalı 16:9 kamera vizörü,
 * 1/3 kuralı kadraj kılavuzları, geometrik minimalist sinematografik figür
 * ve vizör altı segmentli (kırmızı vurgulu) ders ilerleme çubuğu.
 */
export const CinemaViewfinderGenre: React.FC<CinemaViewfinderGenreProps> = ({
  courseTag = "SİNEMA DİLİ / DERS 01",
  chapterNumber = "44",
  headline = "44 saniyede kadraj.",
  subjectTitle = "ALTIN ORAN VE BAKIŞ BOŞLUĞU",
  lensSpec = "35mm  f/1.8  1/50s  ISO 200",
  ruleLabel = "RULE OF THIRDS",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Giriş yaylanması
  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 15, mass: 0.8, stiffness: 110 },
  });

  const contentOpacity = interpolate(enterSpring, [0, 1], [0, 1]);
  const contentY = interpolate(enterSpring, [0, 1], [30, 0]);

  // Yanıp sönen REC kırmızı kayıt noktası (her 30 framede bir blink)
  const isRecActive = Math.floor(frame / 20) % 2 === 0;

  // Kamera vizörünün hafif mikro nefes alması (sinematik el kamerası hissi)
  const driftY = Math.sin(frame * 0.06) * 3;
  const driftRotate = Math.sin(frame * 0.05) * 0.4;

  // Segmentli ilerleme çubuğu animasyonu (zamanla bir segmentten diğerine geçer)
  const activeSegmentIndex = Math.min(6, Math.floor((frame / 45) % 7));

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        backgroundColor: "#F5F2EB",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* 1. ÜST KÜNYE SATIRI (schole444 İmzası) */}
      <div
        style={{
          position: "absolute",
          top: "145px",
          width: "88%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          opacity: contentOpacity,
          zIndex: 20,
        }}
      >
        <span
          style={{
            fontFamily: TurkishFont,
            fontSize: "15px",
            fontWeight: 800,
            letterSpacing: "2.5px",
            color: "#8C877E",
            textTransform: "uppercase",
          }}
        >
          {courseTag}
        </span>
        <span
          style={{
            fontFamily: TurkishFont,
            fontSize: "32px",
            fontWeight: 900,
            color: "#111111",
            letterSpacing: "-0.5px",
          }}
        >
          {chapterNumber}
        </span>
      </div>

      {/* 2. ANA BAŞLIK */}
      <div
        style={{
          position: "absolute",
          top: "195px",
          width: "88%",
          transform: `translateY(${contentY}px)`,
          opacity: contentOpacity,
          zIndex: 20,
        }}
      >
        <h1
          style={{
            fontFamily: TurkishFont,
            fontSize: "56px",
            fontWeight: 900,
            color: "#111111",
            letterSpacing: "-1.8px",
            margin: 0,
            lineHeight: 1.05,
          }}
        >
          {headline}
        </h1>
      </div>

      {/* 3. VİZÖR KADRAJI & KAMERA REKONSTRÜKSİYONU */}
      <div
        style={{
          position: "absolute",
          top: "310px",
          width: "92%",
          height: "560px",
          transform: `translateY(${contentY + driftY}px) rotate(${driftRotate}deg)`,
          opacity: contentOpacity,
          zIndex: 15,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Vizör Kutusu */}
        <div
          style={{
            width: "100%",
            height: "500px",
            position: "relative",
            backgroundColor: "#FAF9F5",
            border: "2px solid #111111",
            overflow: "hidden",
            boxShadow: "0 12px 36px rgba(0,0,0,0.04)",
          }}
        >
          {/* 4 KÖŞE VİZÖR TİKLERİ (┌ ┐ └ ┘) */}
          {/* Sol Üst */}
          <div
            style={{
              position: "absolute",
              top: "12px",
              left: "12px",
              width: "28px",
              height: "28px",
              borderTop: "3.5px solid #111111",
              borderLeft: "3.5px solid #111111",
              zIndex: 10,
            }}
          />
          {/* Sağ Üst */}
          <div
            style={{
              position: "absolute",
              top: "12px",
              right: "12px",
              width: "28px",
              height: "28px",
              borderTop: "3.5px solid #111111",
              borderRight: "3.5px solid #111111",
              zIndex: 10,
            }}
          />
          {/* Sol Alt */}
          <div
            style={{
              position: "absolute",
              bottom: "12px",
              left: "12px",
              width: "28px",
              height: "28px",
              borderBottom: "3.5px solid #111111",
              borderLeft: "3.5px solid #111111",
              zIndex: 10,
            }}
          />
          {/* Sağ Alt */}
          <div
            style={{
              position: "absolute",
              bottom: "12px",
              right: "12px",
              width: "28px",
              height: "28px",
              borderBottom: "3.5px solid #111111",
              borderRight: "3.5px solid #111111",
              zIndex: 10,
            }}
          />

          {/* SAĞ ÜST REC + KIRMIZI NOKTA */}
          <div
            style={{
              position: "absolute",
              top: "18px",
              right: "46px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              zIndex: 12,
            }}
          >
            <span
              style={{
                fontFamily: TurkishFont,
                fontSize: "14px",
                fontWeight: 900,
                color: "#111111",
                letterSpacing: "1px",
              }}
            >
              REC
            </span>
            <div
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                backgroundColor: isRecActive ? "#E63946" : "transparent",
                transition: "background-color 0.1s ease",
              }}
            />
          </div>

          {/* 1/3 KURALI (RULE OF THIRDS) KILAVUZ ÇİZGİLERİ */}
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: "33.33%",
              width: "1px",
              backgroundColor: "rgba(0,0,0,0.08)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: "66.66%",
              width: "1px",
              backgroundColor: "rgba(0,0,0,0.08)",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: "33.33%",
              height: "1px",
              backgroundColor: "rgba(0,0,0,0.08)",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: "66.66%",
              height: "1px",
              backgroundColor: "rgba(0,0,0,0.08)",
            }}
          />

          {/* VİZÖR İÇİ Vektör Çizimi (Perspektif Işık Konisi ve Minimalist Figür) */}
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 1000 500"
            style={{ position: "absolute", top: 0, left: 0 }}
          >
            {/* Sol Alttan Gelen Işık / Perspektif Gölge Üçgeni */}
            <polygon points="0,350 240,480 0,480" fill="#E8E5DD" opacity="0.8" />

            {/* Zemin Ufuk Çizgisi */}
            <line x1="0" y1="480" x2="1000" y2="480" stroke="#111111" strokeWidth="2.5" />

            {/* Kadrajdaki Ana Figür (Altın Oran Dikey Ekseninde x=500) */}
            <g transform="translate(500, 310)">
              {/* Kafa */}
              <circle
                cx="0"
                cy="-180"
                r="30"
                fill="#FAF9F5"
                stroke="#111111"
                strokeWidth="5"
              />
              {/* Yüz Hatları (Düşünen ifade) */}
              <circle cx="-10" cy="-182" r="3" fill="#111111" />
              <circle cx="10" cy="-182" r="3" fill="#111111" />
              <line x1="-12" y1="-170" x2="12" y2="-170" stroke="#111111" strokeWidth="3" />

              {/* Gövde */}
              <line x1="0" y1="-150" x2="0" y2="10" stroke="#111111" strokeWidth="6" />

              {/* Sol Kol (Aşağıda çanta tutan) */}
              <path
                d="M 0 -130 L -45 -70 L -40 20"
                stroke="#111111"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
              <rect x="-52" y="10" width="22" height="30" fill="#111111" rx="2" />

              {/* Sağ Kol (Uzatılmış ve kırmızı anahtar/nesne tutan) */}
              <path
                d="M 0 -130 L 45 -70 L 90 -20"
                stroke="#111111"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
              {/* Kırmızı Vurgu Anahtar / Odak Nesnesi */}
              <circle
                cx="100"
                cy="-18"
                r="6"
                stroke="#E63946"
                strokeWidth="3.5"
                fill="none"
              />
              <line
                x1="106"
                y1="-18"
                x2="122"
                y2="-18"
                stroke="#E63946"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              <line
                x1="116"
                y1="-18"
                x2="116"
                y2="-13"
                stroke="#E63946"
                strokeWidth="3"
                strokeLinecap="round"
              />

              {/* Sol Bacak */}
              <line
                x1="-10"
                y1="10"
                x2="-20"
                y2="170"
                stroke="#111111"
                strokeWidth="6"
                strokeLinecap="round"
              />
              {/* Sağ Bacak */}
              <line
                x1="10"
                y1="10"
                x2="22"
                y2="170"
                stroke="#111111"
                strokeWidth="6"
                strokeLinecap="round"
              />
            </g>
          </svg>

          {/* Sol Alt Telemetri Bilgisi */}
          <div
            style={{
              position: "absolute",
              bottom: "16px",
              left: "48px",
              display: "flex",
              alignItems: "center",
              gap: "14px",
              fontFamily: TurkishFont,
              fontSize: "13px",
              fontWeight: 800,
              color: "#88847D",
              letterSpacing: "1px",
            }}
          >
            <span>{lensSpec}</span>
            <span style={{ color: "#E63946" }}>•</span>
            <span>{ruleLabel}</span>
          </div>
        </div>

        {/* 4. VİZÖR ALTI SEGMENTLİ İLERLEME ÇUBUĞU (schole444 İmzası) */}
        <div
          style={{
            width: "100%",
            marginTop: "16px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          {Array.from({ length: 7 }).map((_, i) => {
            let segBg = "#E2DED6"; // gelecek segmentler
            if (i < activeSegmentIndex) segBg = "#111111"; // tamamlanan
            else if (i === activeSegmentIndex) segBg = "#E63946"; // aktif kırmızı

            return (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: "5px",
                  borderRadius: "2px",
                  backgroundColor: segBg,
                  transition: "background-color 0.2s ease",
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
