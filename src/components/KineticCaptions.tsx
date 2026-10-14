import React, { useMemo } from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { WordTimestamp } from "../types";
import { TurkishFont } from "../load-font";
import { currentTheme } from "../theme";
import { buildSemanticChunks } from "../utils/chunking";

export interface CaptionConfig {
  position?: "bottom" | "center" | "top" | "below_hero" | "above_hero" | string;
  customTop?: string | number;
  styleVariant?:
    | "default"
    | "automotive"
    | "islamic"
    | "legal"
    | "math"
    | "sound"
    | "psychology"
    | "cinema"
    | "geopolitics"
    | "finance"
    | "kurzgesagt"
    | "brutalist_thinking"
    | "blueprint"
    | "quantum"
    | string;
  fontSize?: string | number;
  hideCaptions?: boolean;
}

interface KineticCaptionsProps {
  subtitles: WordTimestamp[];
  channelGenre?: string;
  captionConfig?: CaptionConfig;
  activeSceneCaptionConfig?: CaptionConfig;
}

export const KineticCaptions: React.FC<KineticCaptionsProps> = ({
  subtitles,
  channelGenre,
  captionConfig,
  activeSceneCaptionConfig,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const currentTime = frame / fps;

  // Aktif sahnenin yapılandırması önceliklidir, yoksa genel ayarlar ve kanal türü devralır
  const activeConfig = activeSceneCaptionConfig || captionConfig || {};
  if (activeConfig.hideCaptions) {
    return null;
  }

  const effectiveGenre = (activeConfig.styleVariant || channelGenre || "").toLowerCase().trim();
  const position = activeConfig.position || "bottom";

  // Cümle ve noktalama (. ! ?) duyarlı semantik grupları hesapla
  const chunks = useMemo(() => buildSemanticChunks(subtitles), [subtitles]);

  // Şu an konuşulan kelimeyi içeren chunk'ı bul
  const activeChunk = chunks.find((c, idx) => {
    const nextChunk = chunks[idx + 1];
    const chunkEnd = c.end;
    const chunkMaxEnd = nextChunk ? Math.min(nextChunk.start, chunkEnd + 0.3) : chunkEnd + 0.5;
    return currentTime >= c.start && currentTime < chunkMaxEnd;
  });

  if (!activeChunk) {
    return null;
  }

  // 1. DİNAMİK DİKEY KONUM HESABI (Her konsepte göre serbestçe yer değişebilir)
  let topStyle = "1160px";
  let transformY = "none";

  if (activeConfig.customTop !== undefined) {
    topStyle = typeof activeConfig.customTop === "number" ? `${activeConfig.customTop}px` : activeConfig.customTop;
  } else if (position === "center") {
    topStyle = "50%";
    transformY = "translateY(-50%)";
  } else if (position === "top") {
    topStyle = "230px";
  } else if (position === "below_hero") {
    if (effectiveGenre === "sound") {
      topStyle = "790px";
    } else if (effectiveGenre === "cinema") {
      topStyle = "940px";
    } else if (effectiveGenre === "legal") {
      topStyle = "920px";
    } else if (effectiveGenre === "automotive") {
      topStyle = "880px";
    } else if (effectiveGenre === "math") {
      topStyle = "820px";
    } else if (effectiveGenre === "psychology") {
      topStyle = "960px";
    } else if (effectiveGenre === "geopolitics" || effectiveGenre === "map") {
      topStyle = "980px";
    } else if (effectiveGenre === "finance" || effectiveGenre === "market") {
      topStyle = "920px";
    } else if (effectiveGenre === "kurzgesagt" || effectiveGenre === "cosmic") {
      topStyle = "930px";
    } else if (effectiveGenre === "brutalist_thinking" || effectiveGenre === "dan_koe") {
      topStyle = "960px";
    } else if (effectiveGenre === "blueprint" || effectiveGenre === "cad") {
      topStyle = "920px";
    } else {
      topStyle = "880px";
    }
  } else if (position === "above_hero") {
    topStyle = "340px";
  } else {
    // Default "bottom" pozisyonu - her genre'nin güvenli bölgesine göre optimize edilmiş (bottom 450px UI'dan uzak)
    if (effectiveGenre === "psychology") {
      topStyle = "1180px";
    } else if (effectiveGenre === "cinema") {
      topStyle = "1140px";
    } else if (effectiveGenre === "legal") {
      topStyle = "1150px";
    } else if (effectiveGenre === "automotive") {
      topStyle = "1140px";
    } else if (effectiveGenre === "math") {
      topStyle = "1140px";
    } else if (effectiveGenre === "sound") {
      topStyle = "1150px";
    } else if (effectiveGenre === "islamic") {
      topStyle = "1140px";
    } else if (effectiveGenre === "geopolitics" || effectiveGenre === "map") {
      topStyle = "1150px";
    } else if (effectiveGenre === "finance" || effectiveGenre === "market") {
      topStyle = "1140px";
    } else if (effectiveGenre === "kurzgesagt" || effectiveGenre === "cosmic") {
      topStyle = "1140px";
    } else if (effectiveGenre === "brutalist_thinking" || effectiveGenre === "dan_koe") {
      topStyle = "1150px";
    } else if (effectiveGenre === "blueprint" || effectiveGenre === "cad") {
      topStyle = "1140px";
    } else {
      topStyle = "1160px";
    }
  }

  // Yazı boyutu
  const customFontSize = activeConfig.fontSize || (position === "center" ? "56px" : "48px");

  return (
    <div
      style={{
        position: "absolute",
        top: topStyle,
        left: "45px",
        right: "115px", // Instagram Reels & TikTok sağ aksiyon butonları (Beğen, Yorum, Paylaş) güvenli boşluğu
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        gap: "12px 16px",
        transform: transformY,
        zIndex: 50,
        transition: "top 0.3s ease, transform 0.3s ease",
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

        // Focal Dimming (Göz Takibi Optimizasyonu):
        // Konuşulan kelime yay gibi fırlar (1.14x) ve %100 canlı parlar,
        // aktif olmayan kelimeler %42 opaklığa çekilerek beyin yorgunluğu önlenir.
        const scale = isCurrentWord ? interpolate(popSpring, [0, 1], [0.98, 1.14]) : 0.96;
        const wordOpacity = isCurrentWord ? 1 : 0.42;

        // 2. KONSEPT VE TÜR'E ÖZEL KİNETİK STİL (Typography, Renk, Glow, Kenarlık)
        let bgColor = "#FFFFFF";
        let textColor = currentTheme.colors.textPrimary;
        let border = currentTheme.styles.border;
        let shadow = currentTheme.styles.boxShadowSmall;
        let rotate = "0deg";
        let borderRadius = "14px";
        let fontFamily = TurkishFont;

        // A) OTOMOTİV & MEKATRONİK
        if (effectiveGenre === "automotive" || effectiveGenre === "car") {
          borderRadius = "12px";
          if (isCurrentWord) {
            bgColor = "#38BDF8";
            textColor = "#050505";
            border = "2px solid #FFFFFF";
            shadow = "0 0 35px rgba(56, 189, 248, 0.9), 0 10px 25px rgba(0, 0, 0, 0.8)";
          } else {
            bgColor = "rgba(15, 23, 42, 0.85)";
            textColor = "#94A3B8";
            border = "1.5px solid rgba(56, 189, 248, 0.25)";
            shadow = "0 4px 15px rgba(0, 0, 0, 0.6)";
          }
        }
        // B) İSLAMİ & MANEVİ
        else if (effectiveGenre === "islamic" || effectiveGenre === "spiritual") {
          borderRadius = "8px";
          if (isCurrentWord) {
            bgColor = "#C81D25"; // Canlı hat mürekkebi kırmızısı
            textColor = "#FFFFFF";
            border = "2px solid #D4AF37"; // Kutsal altın çerçeve
            shadow = "0 8px 30px rgba(200, 29, 37, 0.45)";
            rotate = "-1deg";
          } else {
            bgColor = "rgba(245, 238, 219, 0.92)"; // Antik parşömen
            textColor = "#1B3B6F"; // Kobalt hat mavisi
            border = "1.5px solid rgba(212, 175, 55, 0.4)";
            shadow = "0 4px 12px rgba(0, 0, 0, 0.08)";
          }
        }
        // C) HUKUK & CEZA DAVASI
        else if (effectiveGenre === "legal" || effectiveGenre === "law") {
          borderRadius = "6px";
          if (isCurrentWord) {
            bgColor = "#DC2626"; // Suç hüküm damgası
            textColor = "#FFFFFF";
            border = "2.5px solid #0B2545";
            shadow = "0 10px 25px rgba(220, 38, 38, 0.4)";
            rotate = "-1.5deg";
          } else {
            bgColor = "#FFFFFF";
            textColor = "#0B2545";
            border = "1.5px solid #CBD5E1";
            shadow = "0 4px 10px rgba(0, 0, 0, 0.06)";
          }
        }
        // D) GÖRSEL MATEMATİK & İSPAT
        else if (effectiveGenre === "math" || effectiveGenre === "geometry") {
          borderRadius = "12px";
          if (isCurrentWord) {
            bgColor = "#DFFF00"; // Neon Asit Lime
            textColor = "#030712";
            border = "2px solid #00F2FE";
            shadow = "0 0 35px rgba(223, 255, 0, 0.9)";
          } else {
            bgColor = "rgba(10, 15, 30, 0.88)";
            textColor = "#00F2FE";
            border = "1.5px solid rgba(0, 242, 254, 0.3)";
            shadow = "0 4px 15px rgba(0, 0, 0, 0.5)";
          }
        }
        // E) AKUSTİK SES & FREKANS
        else if (effectiveGenre === "sound" || effectiveGenre === "acoustic") {
          borderRadius = "999px"; // Tam oval ses dalgası hapı
          if (isCurrentWord) {
            bgColor = "#FFB703"; // Rezonans Kehribarı
            textColor = "#030303";
            border = "2px solid #FFFFFF";
            shadow = "0 0 35px rgba(255, 183, 3, 0.85)";
          } else {
            bgColor = "rgba(20, 20, 26, 0.9)";
            textColor = "#F1F5F9";
            border = "1.5px solid rgba(255, 183, 3, 0.25)";
            shadow = "0 4px 15px rgba(0, 0, 0, 0.5)";
          }
        }
        // F) BİLİŞSEL PSİKOLOJİ
        else if (effectiveGenre === "psychology" || effectiveGenre === "behavioral") {
          borderRadius = "14px";
          fontFamily = "Impact, -apple-system, sans-serif";
          if (isCurrentWord) {
            bgColor = "#FF5500"; // Neon punchy orange
            textColor = "#FFFFFF";
            border = "none";
            shadow = "0 10px 30px rgba(255, 85, 0, 0.55)";
            rotate = "-2deg";
          } else {
            bgColor = "#111111";
            textColor = "#F4EFEA";
            border = "none";
            shadow = "0 6px 16px rgba(0, 0, 0, 0.2)";
          }
        }
        // G) SİNEMA KADRAJI
        else if (effectiveGenre === "cinema" || effectiveGenre === "film") {
          borderRadius = "4px"; // Dikdörtgen 16mm film teleprompter
          if (isCurrentWord) {
            bgColor = "#E63946"; // REC kırmızı vurgusu
            textColor = "#FFFFFF";
            border = "2px solid #111111";
            shadow = "0 6px 22px rgba(230, 57, 70, 0.4)";
          } else {
            bgColor = "#FAF9F5";
            textColor = "#111111";
            border = "1.5px solid #111111";
            shadow = "0 3px 8px rgba(0, 0, 0, 0.08)";
          }
        }
        // H) JEOPOLİTİK VE TAKTİK HARİTA
        else if (effectiveGenre === "geopolitics" || effectiveGenre === "map") {
          borderRadius = "8px";
          fontFamily = "monospace, -apple-system, sans-serif";
          if (isCurrentWord) {
            bgColor = "#0EA5E9"; // Taktik radar mavisi
            textColor = "#050B14";
            border = "2px solid #38BDF8";
            shadow = "0 0 35px rgba(14, 165, 233, 0.9), 0 8px 24px rgba(0, 0, 0, 0.6)";
          } else {
            bgColor = "rgba(10, 16, 26, 0.88)";
            textColor = "#38BDF8";
            border = "1.5px solid rgba(14, 165, 233, 0.3)";
            shadow = "0 4px 15px rgba(0, 0, 0, 0.5)";
          }
        }
        // I) FİNANS, PİYASALAR & EKONOMİ
        else if (effectiveGenre === "finance" || effectiveGenre === "financial" || effectiveGenre === "market") {
          borderRadius = "10px";
          fontFamily = "monospace, -apple-system, sans-serif";
          if (isCurrentWord) {
            bgColor = "#10B981"; // Bullish zümrüt yeşili
            textColor = "#04160E";
            border = "2px solid #34D399";
            shadow = "0 0 35px rgba(16, 185, 129, 0.9), 0 8px 20px rgba(0, 0, 0, 0.5)";
          } else {
            bgColor = "rgba(8, 14, 26, 0.9)";
            textColor = "#10B981";
            border = "1.5px solid rgba(16, 185, 129, 0.25)";
            shadow = "0 4px 14px rgba(0, 0, 0, 0.5)";
          }
        }
        // J) KOZMİK VE EVRENSEL BİLİM (Kurzgesagt)
        else if (effectiveGenre === "kurzgesagt" || effectiveGenre === "cosmic" || effectiveGenre === "universe") {
          borderRadius = "16px";
          if (isCurrentWord) {
            bgColor = "#EC4899"; // Canlı Hyper Pink
            textColor = "#FFFFFF";
            border = "2px solid #FDE047"; // Lazer sarı çerçeve
            shadow = "0 0 35px rgba(236, 72, 153, 0.9), 0 8px 24px rgba(124, 58, 237, 0.5)";
          } else {
            bgColor = "rgba(31, 16, 79, 0.88)";
            textColor = "#A78BFA";
            border = "1.5px solid rgba(124, 58, 237, 0.35)";
            shadow = "0 4px 15px rgba(0, 0, 0, 0.5)";
          }
        }
        // K) MİNİMAL BRUTALİST DÜŞÜNCE (Dan Koe)
        else if (effectiveGenre === "brutalist_thinking" || effectiveGenre === "dan_koe" || effectiveGenre === "concept") {
          borderRadius = "6px";
          if (isCurrentWord) {
            bgColor = "#DFFF00"; // Neon Asit Sarısı
            textColor = "#0A0A0A";
            border = "2px solid #FFFFFF";
            shadow = "0 0 35px rgba(223, 255, 0, 0.9)";
          } else {
            bgColor = "#141414";
            textColor = "#E5E5E5";
            border = "1.5px solid #262626";
            shadow = "0 4px 12px rgba(0, 0, 0, 0.3)";
          }
        }
        // L) TEKNİK CAD BLUEPRINT & MÜHENDİSLİK (Ayhan Tarakcı)
        else if (effectiveGenre === "blueprint" || effectiveGenre === "cad" || effectiveGenre === "hardware") {
          borderRadius = "4px";
          fontFamily = "monospace, -apple-system, sans-serif";
          if (isCurrentWord) {
            bgColor = "#00F2FE"; // CAD Cyan
            textColor = "#021626";
            border = "2px solid #FFFFFF";
            shadow = "0 0 35px rgba(0, 242, 254, 0.9), 0 8px 20px rgba(0, 0, 0, 0.6)";
          } else {
            bgColor = "rgba(2, 22, 38, 0.9)";
            textColor = "#00F2FE";
            border = "1.5px solid rgba(0, 242, 254, 0.3)";
            shadow = "0 4px 14px rgba(0, 0, 0, 0.5)";
          }
        }
        // M) TEMA VARSAYILANLARI (Glass, Paper, Brutalism vb.)
        else {
          const isGlass = currentTheme.id === "glassmorphism";
          const isPaper = currentTheme.id === "paper-explainer";

          if (isGlass) {
            borderRadius = "16px";
            if (isCurrentWord) {
              bgColor = currentTheme.colors.accentPrimary;
              textColor = "#0A0D14";
              border = "2px solid #FFFFFF";
              shadow = "0 0 30px rgba(0, 242, 254, 0.8), 0 10px 25px rgba(0, 0, 0, 0.5)";
            } else {
              bgColor = "rgba(255, 255, 255, 0.08)";
              textColor = "rgba(255, 255, 255, 0.85)";
              border = "1.5px solid rgba(255, 255, 255, 0.2)";
              shadow = "0 4px 15px rgba(0, 0, 0, 0.3)";
            }
          } else if (isPaper) {
            borderRadius = "4px";
            if (isCurrentWord) {
              bgColor = currentTheme.colors.accentPrimary;
              textColor = "#18181B";
              border = "2.5px solid #18181B";
              shadow = "0 10px 20px rgba(0, 0, 0, 0.15)";
              rotate = "-1.5deg";
            } else {
              bgColor = "rgba(255, 255, 255, 0.95)";
              textColor = "#18181B";
              border = "1.5px solid #E4DEC8";
              shadow = "0 3px 8px rgba(0, 0, 0, 0.06)";
            }
          } else {
            if (isCurrentWord) {
              bgColor = currentTheme.colors.accentPrimary;
              textColor = currentTheme.colors.inkBlack || "#171717";
              border = currentTheme.styles.borderThick;
              shadow = currentTheme.styles.boxShadow;
            } else {
              bgColor = currentTheme.colors.cardBackground || "#FFFFFF";
              textColor = currentTheme.colors.textPrimary;
              border = currentTheme.styles.border;
              shadow = currentTheme.styles.boxShadowSmall;
            }
          }
        }

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
              borderRadius,
              boxShadow: shadow,
              opacity: wordOpacity,
              transform: `scale(${scale}) rotate(${rotate})`,
              transformOrigin: "center center",
              transition: "opacity 0.15s ease, transform 0.15s ease",
            }}
          >
            <span
              style={{
                fontFamily,
                fontSize: customFontSize,
                fontWeight: 900,
                letterSpacing: "0.02em",
                color: textColor,
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
