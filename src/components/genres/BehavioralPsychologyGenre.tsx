import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { TurkishFont } from "../../load-font";
import { Brain } from "lucide-react";

export interface BehavioralPsychologyGenreProps {
  headlineMain?: string;
  headlineSub?: string;
  counterLabel?: string;
  counterMultiplier?: number;
  floatingLeftWord?: string;
  floatingRightWord1?: string;
  floatingRightWord2?: string;
  conceptBadge?: string;
}

/**
 * BehavioralPsychologyGenre (neden.io tarzı):
 * Sıcak fildişi zemin (#F4EFEA), ultra-condensed dev 2 satırlı başlık (Siyah + Neon Turuncu #FF5500),
 * 3D hisli sevimli minimalist kil karakter (telefonlu/düşünen figür),
 * Havada asılı açılı kinetik ses/düşünce sözcükleri ("TRA", "LA", "LA"),
 * ve dinamik artan sayaç hapı (DİNLEYİŞ x10 / ALIŞKANLIK x21).
 */
export const BehavioralPsychologyGenre: React.FC<BehavioralPsychologyGenreProps> = ({
  headlineMain = "İLK DİNLEYİŞTE",
  headlineSub = "BEĞENMEDİN Mİ?",
  counterLabel = "DİNLEYİŞ",
  counterMultiplier = 10,
  floatingLeftWord = "TRA",
  floatingRightWord1 = "LA",
  floatingRightWord2 = "LA",
  conceptBadge = "MERE-EXPOSURE ETKİSİ",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 1. Giriş yaylanması
  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.8, stiffness: 120 },
  });

  const titleScale = interpolate(enterSpring, [0, 1], [0.92, 1]);
  const titleY = interpolate(enterSpring, [0, 1], [30, 0]);

  // Karakter nefes alma & mikrodalgalanma
  const charFloatY = Math.sin(frame * 0.08) * 6;
  const phoneTilt = Math.sin(frame * 0.1) * 3;

  // 2. Kinetik kelimelerin yaylanarak patlaması
  const wordLeftSpring = spring({
    frame: frame - 6,
    fps,
    config: { damping: 12, mass: 0.6, stiffness: 180 },
  });
  const wordRight1Spring = spring({
    frame: frame - 12,
    fps,
    config: { damping: 12, mass: 0.6, stiffness: 180 },
  });
  const wordRight2Spring = spring({
    frame: frame - 18,
    fps,
    config: { damping: 12, mass: 0.6, stiffness: 180 },
  });

  // 3. Sayaç animasyonu (x1'den hedefe frame ile tırmanır)
  const currentCount = Math.min(
    counterMultiplier,
    Math.max(1, Math.floor(interpolate(frame, [15, 60], [1, counterMultiplier], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })))
  );

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        backgroundColor: "#F4EFEA",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* İnce psikoloji/bilim minik üst rozeti */}
      {conceptBadge && (
        <div
          style={{
            position: "absolute",
            top: "140px",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            backgroundColor: "rgba(0,0,0,0.06)",
            padding: "6px 14px",
            borderRadius: "999px",
            fontFamily: TurkishFont,
            fontSize: "13px",
            fontWeight: 800,
            letterSpacing: "1.5px",
            color: "#66615B",
            textTransform: "uppercase",
            zIndex: 10,
          }}
        >
          <Brain size={14} color="#FF5500" />
          <span>{conceptBadge}</span>
        </div>
      )}

      {/* 1. ÜST DEV CONDENSED 2 SATIRLI BAŞLIK (neden.io İmzası) */}
      <div
        style={{
          position: "absolute",
          top: "185px",
          width: "92%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          transform: `translateY(${titleY}px) scale(${titleScale})`,
          zIndex: 20,
        }}
      >
        <span
          style={{
            fontFamily: "Impact, 'Arial Black', -apple-system, sans-serif",
            fontSize: "88px",
            lineHeight: 0.95,
            fontWeight: 900,
            color: "#111111",
            textTransform: "uppercase",
            letterSpacing: "-1.5px",
            transform: "scaleY(1.15)", // Ultra-tall condensed hissi
            display: "inline-block",
          }}
        >
          {headlineMain}
        </span>
        <span
          style={{
            fontFamily: "Impact, 'Arial Black', -apple-system, sans-serif",
            fontSize: "88px",
            lineHeight: 0.95,
            fontWeight: 900,
            color: "#FF5500", // Punchy neon orange
            textTransform: "uppercase",
            letterSpacing: "-1.5px",
            transform: "scaleY(1.15)",
            display: "inline-block",
            marginTop: "12px",
          }}
        >
          {headlineSub}
        </span>
      </div>

      {/* 2. ORTA KARAKTER & KİNETİK UÇUŞAN KELİMELER SAHNESİ */}
      <div
        style={{
          position: "absolute",
          top: "430px",
          width: "100%",
          height: "680px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 15,
        }}
      >
        {/* Karakter Zemin Yumuşak Oval Gölgesi */}
        <div
          style={{
            position: "absolute",
            bottom: "60px",
            width: "320px",
            height: "45px",
            borderRadius: "50%",
            backgroundColor: "rgba(0, 0, 0, 0.08)",
            filter: "blur(10px)",
            transform: `scale(${1 - charFloatY * 0.02})`,
          }}
        />

        {/* 3D Soft Claymation Karakter (SVG ile yüksek kalitede gölgelendirilmiş) */}
        <div
          style={{
            transform: `translateY(${charFloatY}px)`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "relative",
          }}
        >
          <svg width="420" height="520" viewBox="0 0 420 520" fill="none">
            <defs>
              {/* Karakter başı yumuşak 3D gölgelendirme gradyanı */}
              <radialGradient id="clayHead" cx="38%" cy="32%" r="68%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="60%" stopColor="#EAE5DE" />
                <stop offset="100%" stopColor="#C9C2B8" />
              </radialGradient>
              {/* Vücut ve bacak gölgelendirmesi */}
              <linearGradient id="clayBody" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F5F0E9" />
                <stop offset="65%" stopColor="#DDD6CB" />
                <stop offset="100%" stopColor="#BDB4A6" />
              </linearGradient>
              {/* Telefon ekran parıltısı */}
              <linearGradient id="phoneScreen" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#2A2A2E" />
                <stop offset="100%" stopColor="#141416" />
              </linearGradient>
            </defs>

            {/* Bacaklar */}
            <path
              d="M175 360 C175 420, 160 450, 165 470 C168 478, 185 480, 200 480 C215 480, 218 470, 212 430 L210 370 Z"
              fill="url(#clayBody)"
            />
            <path
              d="M245 360 C245 420, 260 450, 255 470 C252 478, 235 480, 220 480 C205 480, 202 470, 208 430 L210 370 Z"
              fill="url(#clayBody)"
            />

            {/* Ayakkabılar / Yuvarlak clay ayaklar */}
            <ellipse cx="180" cy="478" rx="28" ry="16" fill="#D5CEC2" />
            <ellipse cx="240" cy="478" rx="28" ry="16" fill="#CDC6B8" />

            {/* Gövde */}
            <ellipse cx="210" cy="330" rx="65" ry="85" fill="url(#clayBody)" />

            {/* Yuvarlak Kafa (Clay ball) */}
            <circle cx="210" cy="180" r="105" fill="url(#clayHead)" />

            {/* Kaşlar (Hafif hüzünlü / meraklı düşünen ifade) */}
            <path
              d="M165 170 Q178 162 190 172"
              stroke="#2B2824"
              strokeWidth="5"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M230 172 Q242 162 255 170"
              stroke="#2B2824"
              strokeWidth="5"
              strokeLinecap="round"
              fill="none"
            />

            {/* Boncuk Gözler */}
            <circle cx="178" cy="182" r="8" fill="#1A1816" />
            <circle cx="242" cy="182" r="8" fill="#1A1816" />
            <circle cx="180" cy="180" r="2.5" fill="#FFFFFF" />
            <circle cx="244" cy="180" r="2.5" fill="#FFFFFF" />

            {/* Minik Ağız */}
            <path
              d="M204 206 Q210 203 216 206"
              stroke="#2B2824"
              strokeWidth="3.5"
              strokeLinecap="round"
              fill="none"
            />

            {/* Kollar & Akıllı Telefon */}
            <g transform={`rotate(${phoneTilt} 210 340)`}>
              {/* Sol Kol */}
              <path
                d="M152 300 C140 330, 160 365, 185 360"
                stroke="url(#clayBody)"
                strokeWidth="32"
                strokeLinecap="round"
                fill="none"
              />
              {/* Sağ Kol */}
              <path
                d="M268 300 C280 330, 260 365, 235 360"
                stroke="url(#clayBody)"
                strokeWidth="32"
                strokeLinecap="round"
                fill="none"
              />

              {/* Akıllı Telefon Kasası */}
              <rect
                x="184"
                y="315"
                width="52"
                height="80"
                rx="8"
                fill="#1B1B1E"
                stroke="#333338"
                strokeWidth="2"
              />
              <rect x="187" y="320" width="46" height="70" rx="5" fill="url(#phoneScreen)" />
              {/* Telefon Hoparlör / Kamera çentiği */}
              <circle cx="194" cy="326" r="3" fill="#0D0D0F" />
              <circle cx="202" cy="326" r="3" fill="#0D0D0F" />
              {/* Ekranda çalan ses dalgası */}
              <path
                d="M195 358 L198 352 L202 364 L206 348 L210 362 L214 354 L218 360 L222 356"
                stroke="#FF5500"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </g>
          </svg>
        </div>

        {/* 3. KİNETİK UÇUŞAN KELİMELER & SES SİNYALLERİ */}
        {/* Sol Taraf: Turuncu "TRA" + Ses çizgileri */}
        <div
          style={{
            position: "absolute",
            left: "50px",
            top: "220px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            transform: `rotate(-14deg) scale(${interpolate(wordLeftSpring, [0, 1], [0.6, 1])})`,
            opacity: interpolate(wordLeftSpring, [0, 1], [0, 1]),
            zIndex: 25,
          }}
        >
          <span
            style={{
              fontFamily: "Impact, 'Arial Black', sans-serif",
              fontSize: "64px",
              fontWeight: 900,
              color: "#FF5500",
              letterSpacing: "1px",
              lineHeight: 1,
            }}
          >
            {floatingLeftWord}
          </span>
          {/* Ses frekans çubukları */}
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            {[18, 32, 22, 14].map((h, i) => (
              <div
                key={i}
                style={{
                  width: "5px",
                  height: `${h + Math.sin((frame + i * 4) * 0.2) * 8}px`,
                  backgroundColor: "#FF5500",
                  borderRadius: "3px",
                }}
              />
            ))}
          </div>
        </div>

        {/* Sağ Taraf 1: Siyah "LA" */}
        <div
          style={{
            position: "absolute",
            right: "80px",
            top: "230px",
            transform: `rotate(12deg) scale(${interpolate(wordRight1Spring, [0, 1], [0.6, 1])})`,
            opacity: interpolate(wordRight1Spring, [0, 1], [0, 1]),
            zIndex: 25,
          }}
        >
          <span
            style={{
              fontFamily: "Impact, 'Arial Black', sans-serif",
              fontSize: "72px",
              fontWeight: 900,
              color: "#111111",
              letterSpacing: "1px",
              lineHeight: 1,
            }}
          >
            {floatingRightWord1}
          </span>
        </div>

        {/* Sağ Taraf 2: Siyah Alt "LA" */}
        <div
          style={{
            position: "absolute",
            right: "60px",
            top: "320px",
            transform: `rotate(18deg) scale(${interpolate(wordRight2Spring, [0, 1], [0.6, 1])})`,
            opacity: interpolate(wordRight2Spring, [0, 1], [0, 1]),
            zIndex: 25,
          }}
        >
          <span
            style={{
              fontFamily: "Impact, 'Arial Black', sans-serif",
              fontSize: "78px",
              fontWeight: 900,
              color: "#111111",
              letterSpacing: "1px",
              lineHeight: 1,
            }}
          >
            {floatingRightWord2}
          </span>
        </div>

        {/* 4. DİNAMİK SAYAÇ HAPI (DİNLEYİŞ ×10) */}
        <div
          style={{
            position: "absolute",
            left: "80px",
            bottom: "120px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            backgroundColor: "#111111",
            padding: "8px 18px",
            borderRadius: "14px",
            boxShadow: "0 10px 24px rgba(0,0,0,0.15)",
            zIndex: 25,
            transform: `scale(${interpolate(enterSpring, [0, 1], [0.85, 1])})`,
          }}
        >
          <span
            style={{
              fontFamily: TurkishFont,
              fontSize: "15px",
              fontWeight: 900,
              color: "#FFFFFF",
              letterSpacing: "2.5px",
              textTransform: "uppercase",
            }}
          >
            {counterLabel}
          </span>
          <span
            style={{
              fontFamily: "Impact, sans-serif",
              fontSize: "24px",
              fontWeight: 900,
              color: "#FF5500",
              letterSpacing: "1px",
            }}
          >
            ×{currentCount}
          </span>
        </div>
      </div>
    </div>
  );
};
