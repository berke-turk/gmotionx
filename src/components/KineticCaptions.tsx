import React, { useMemo } from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { WordTimestamp } from "../types";
import { TurkishFont } from "../load-font";
import { currentTheme } from "../theme";
import { buildSemanticChunks } from "../utils/chunking";

interface KineticCaptionsProps {
  subtitles: WordTimestamp[];
}

export const KineticCaptions: React.FC<KineticCaptionsProps> = ({ subtitles }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const currentTime = frame / fps;

  // Cümle ve noktalama (. ! ?) duyarlı semantik grupları hesapla
  const chunks = useMemo(() => buildSemanticChunks(subtitles), [subtitles]);

  // Şu an konuşulan kelimeyi içeren chunk'ı bul
  // Kural: Bir cümlenin son kelimesi bittiğinde, sonraki cümle ses başlayana kadar ASLA ekrana gelmez!
  const activeChunk = chunks.find((c, idx) => {
    const nextChunk = chunks[idx + 1];
    const chunkEnd = c.end;
    // Küçük bir soluklanma payı (maksimum 0.3s) verilir ama sonraki cümlenin start'ı aşılamaz!
    const chunkMaxEnd = nextChunk ? Math.min(nextChunk.start, chunkEnd + 0.3) : chunkEnd + 0.5;
    return currentTime >= c.start && currentTime < chunkMaxEnd;
  });

  if (!activeChunk) {
    return null;
  }

  return (
    <div
      style={{
        position: "absolute",
        top: "1060px",
        left: "30px",
        right: "30px",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        gap: "16px 20px",
        zIndex: 45,
      }}
    >
      {activeChunk.words.map((item, idx) => {
        const isCurrentWord = currentTime >= item.start && currentTime < item.end;
        
        const wordStartFrame = Math.round(item.start * fps);
        const framesSinceStart = Math.max(0, frame - wordStartFrame);

        const popSpring = spring({
          frame: framesSinceStart,
          fps,
          config: {
            damping: 10,
            mass: 0.35,
            stiffness: 180,
          },
        });

        const scale = isCurrentWord ? interpolate(popSpring, [0, 1], [0.95, 1.15]) : 1;
        
        const bgColor = isCurrentWord ? currentTheme.colors.acidYellow : currentTheme.colors.pureWhite;
        const shadow = isCurrentWord ? "6px 6px 0px #171717" : "3px 3px 0px #171717";
        const border = isCurrentWord ? "4px solid #171717" : "3px solid #171717";

        const formattedWord = item.text.toLocaleUpperCase("tr-TR");

        return (
          <div
            key={`${activeChunk.id}-${idx}`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "10px 22px",
              backgroundColor: bgColor,
              border,
              borderRadius: "12px",
              boxShadow: shadow,
              transform: `scale(${scale})`,
              transformOrigin: "center center",
            }}
          >
            <span
              style={{
                fontFamily: TurkishFont,
                fontSize: "56px",
                fontWeight: 900,
                letterSpacing: "0.02em",
                color: currentTheme.colors.inkBlack,
                lineHeight: 1.1,
              }}
            >
              {formattedWord}
            </span>
          </div>
        );
      })}
    </div>
  );
};
