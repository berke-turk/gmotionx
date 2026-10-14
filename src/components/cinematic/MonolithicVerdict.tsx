import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { TurkishFont } from "../../load-font";
import { currentTheme } from "../../theme";
import { ShieldCheck, Sparkles } from "lucide-react";

export interface MonolithicVerdictProps {
  badge?: string;
  verdictText?: string;
  symbolColor?: string;
}

/**
 * MonolithicVerdict:
 * Video kapanışında tüm gereksiz kutuları ve şablonları kaldırarak,
 * konunun özünü ve nihai gerçeğini devasa bir sinematik mühür gibi ekrana çakan sahne.
 */
export const MonolithicVerdict: React.FC<MonolithicVerdictProps> = ({
  badge = "OTORİTER HÜKÜM",
  verdictText = "Mesafe bir illüzyondur; evren bütünüyle tek bir dokudan ibarettir.",
  symbolColor = "#00F2FE",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.8, stiffness: 90 },
  });

  const scale = interpolate(enterSpring, [0, 1], [0.75, 1]);
  const opacity = interpolate(enterSpring, [0, 1], [0, 1]);

  // Nefes alan parıltı (breathing glow)
  const pulse = Math.sin(frame * 0.08) * 15;
  const rotation = frame * 0.3;

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "960px",
        height: "620px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "40px",
        transform: `scale(${scale})`,
        opacity,
        position: "relative",
      }}
    >
      {/* 1. ÜST MÜHÜR ROZETİ */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          backgroundColor: currentTheme.colors.accentSecondary || "#FF5A36",
          color: "#FFFFFF",
          padding: "6px 20px",
          borderRadius: "8px",
          fontFamily: TurkishFont,
          fontSize: "14px",
          fontWeight: 900,
          letterSpacing: "1px",
          boxShadow: "0 0 25px rgba(255,90,54,0.6)",
        }}
      >
        <Sparkles size={18} />
        {badge}
      </div>

      {/* 2. MERKEZ SİNEMATİK TEKİLLİK / KALKAN GLYPH */}
      <div
        style={{
          position: "relative",
          width: "220px",
          height: "220px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Dönen Kuantum Halka Aurası */}
        <div
          style={{
            position: "absolute",
            width: "240px",
            height: "240px",
            borderRadius: "50%",
            border: `2px dashed ${symbolColor}`,
            transform: `rotate(${rotation}deg)`,
            opacity: 0.6,
            filter: `drop-shadow(0 0 ${20 + pulse}px ${symbolColor})`,
          }}
        />

        <div
          style={{
            width: "170px",
            height: "170px",
            borderRadius: "32px",
            background: `radial-gradient(circle at 30% 30%, #FFFFFF 0%, ${symbolColor} 50%, #0A192F 100%)`,
            boxShadow: `0 0 60px ${symbolColor}, 0 0 100px rgba(0,242,254,0.4)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "2px solid rgba(255,255,255,0.4)",
          }}
        >
          <ShieldCheck size={84} color="#FFFFFF" strokeWidth={2.5} />
        </div>
      </div>

      {/* 3. DEVASA OTORİTER HÜKÜM TİPOGRAFİSİ (Mic-Drop Sentez) */}
      <div
        style={{
          width: "100%",
          textAlign: "center",
          padding: "0 20px",
        }}
      >
        <p
          style={{
            fontFamily: TurkishFont,
            fontSize: "36px",
            fontWeight: 900,
            lineHeight: 1.25,
            color: "#FFFFFF",
            letterSpacing: "-0.5px",
            margin: 0,
            textShadow: `0 0 35px ${symbolColor}99, 0 4px 12px rgba(0,0,0,0.8)`,
          }}
        >
          "{verdictText}"
        </p>
      </div>
    </div>
  );
};
