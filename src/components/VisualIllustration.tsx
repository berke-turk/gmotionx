import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { TurkishFont } from "../load-font";
import { currentTheme } from "../theme";

export type IllustrationType = "myth_buster" | "archive_1931" | "handwriting_1935" | "scales_laiklik" | "poll_cta";

interface VisualIllustrationProps {
  type: IllustrationType;
}

export const VisualIllustration: React.FC<VisualIllustrationProps> = ({ type }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Yaylanarak ekranın üst merkezine inme
  const enterSpring = spring({
    frame,
    fps,
    config: {
      damping: 12,
      mass: 0.6,
      stiffness: 130,
    },
  });

  const translateY = interpolate(enterSpring, [0, 1], [-60, 0]);
  const scale = interpolate(enterSpring, [0, 1], [0.85, 1]);
  const opacity = interpolate(enterSpring, [0, 1], [0, 1]);

  // Hafif yüzen canlı hareket (floating)
  const floatY = Math.sin(frame / 20) * 6;

  return (
    <div
      style={{
        position: "absolute",
        top: "200px",
        left: "50px",
        right: "50px",
        transform: `translateY(${translateY + floatY}px) scale(${scale})`,
        opacity,
        zIndex: 35,
        display: "flex",
        justifyContent: "center",
      }}
    >
      {type === "myth_buster" && (
        <div
          style={{
            width: "100%",
            backgroundColor: currentTheme.colors.pureWhite,
            border: currentTheme.styles.borderThick,
            borderRadius: "20px",
            boxShadow: currentTheme.styles.shadowHard,
            padding: "28px 24px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "18px",
          }}
        >
          {/* Üst Uyarı Rozeti */}
          <div
            style={{
              backgroundColor: currentTheme.colors.signalOrange,
              border: "3px solid #171717",
              borderRadius: "10px",
              padding: "6px 20px",
              boxShadow: "3px 3px 0px #171717",
            }}
          >
            <span
              style={{
                fontFamily: TurkishFont,
                color: currentTheme.colors.pureWhite,
                fontSize: "18px",
                fontWeight: 900,
                letterSpacing: "0.1em",
              }}
            >
              ⚠️ TARİHİ EFSANE vs GERÇEK
            </span>
          </div>

          {/* İkili Görsel Karşılaştırma Grafiği */}
          <div style={{ display: "flex", width: "100%", gap: "16px" }}>
            {/* Yanlış / Efsane */}
            <div
              style={{
                flex: 1,
                backgroundColor: "#FEE2E2",
                border: "3px solid #171717",
                borderRadius: "14px",
                padding: "16px 12px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "8px",
                boxShadow: "3px 3px 0px #171717",
              }}
            >
              <span style={{ fontSize: "40px" }}>❌</span>
              <span
                style={{
                  fontFamily: TurkishFont,
                  fontSize: "20px",
                  fontWeight: 900,
                  color: "#991B1B",
                }}
              >
                YANLIŞ
              </span>
              <span
                style={{
                  fontFamily: TurkishFont,
                  fontSize: "16px",
                  fontWeight: 800,
                  color: currentTheme.colors.inkBlack,
                  textAlign: "center",
                }}
              >
                Sürekli Değişmek & Doktrinsizlik
              </span>
            </div>

            {/* Doğru / Belge */}
            <div
              style={{
                flex: 1,
                backgroundColor: "#DCFCE7",
                border: "3px solid #171717",
                borderRadius: "14px",
                padding: "16px 12px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "8px",
                boxShadow: "3px 3px 0px #171717",
              }}
            >
              <span style={{ fontSize: "40px" }}>✅</span>
              <span
                style={{
                  fontFamily: TurkishFont,
                  fontSize: "20px",
                  fontWeight: 900,
                  color: "#166534",
                }}
              >
                DOĞRU
              </span>
              <span
                style={{
                  fontFamily: TurkishFont,
                  fontSize: "16px",
                  fontWeight: 800,
                  color: currentTheme.colors.inkBlack,
                  textAlign: "center",
                }}
              >
                Kazanımları Muhafaza Etmek
              </span>
            </div>
          </div>
        </div>
      )}

      {type === "archive_1931" && (
        <div
          style={{
            width: "100%",
            backgroundColor: currentTheme.colors.pureWhite,
            border: currentTheme.styles.borderThick,
            borderRadius: "20px",
            boxShadow: currentTheme.styles.shadowHard,
            padding: "26px 30px",
            display: "flex",
            alignItems: "center",
            gap: "24px",
          }}
        >
          {/* Sol: Büyük Arşiv İkonu & Etiket */}
          <div
            style={{
              width: "100px",
              height: "100px",
              backgroundColor: currentTheme.colors.acidYellow,
              border: "3px solid #171717",
              borderRadius: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "52px",
              boxShadow: "4px 4px 0px #171717",
              flexShrink: 0,
            }}
          >
            📜
          </div>

          {/* Sağ: İnfografik Başlıkları */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <div
              style={{
                display: "inline-flex",
                alignSelf: "flex-start",
                backgroundColor: currentTheme.colors.background,
                border: "2px solid #171717",
                borderRadius: "6px",
                padding: "4px 12px",
                fontSize: "14px",
                fontWeight: 900,
                fontFamily: TurkishFont,
              }}
            >
              1931 DEVLET MATBAASI
            </div>
            <div
              style={{
                fontFamily: TurkishFont,
                fontSize: "26px",
                fontWeight: 900,
                color: currentTheme.colors.inkBlack,
                lineHeight: 1.2,
              }}
            >
              TARİH IV DERS KİTABI
            </div>
            <div
              style={{
                fontSize: "18px",
                fontWeight: 700,
                color: "#4B5563",
              }}
            >
              "İnkılapçılık: Prensipleri müdafaa etmeyi esas tutar."
            </div>
          </div>
        </div>
      )}

      {type === "handwriting_1935" && (
        <div
          style={{
            width: "100%",
            backgroundColor: currentTheme.colors.pureWhite,
            border: currentTheme.styles.borderThick,
            borderRadius: "20px",
            boxShadow: currentTheme.styles.shadowHard,
            padding: "26px 30px",
            display: "flex",
            alignItems: "center",
            gap: "24px",
          }}
        >
          {/* Sol İkon */}
          <div
            style={{
              width: "100px",
              height: "100px",
              backgroundColor: "#BAE6FD", // Açık mavi
              border: "3px solid #171717",
              borderRadius: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "52px",
              boxShadow: "4px 4px 0px #171717",
              flexShrink: 0,
            }}
          >
            ✍️
          </div>

          {/* Sağ Metin */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <div
              style={{
                display: "inline-flex",
                alignSelf: "flex-start",
                backgroundColor: currentTheme.colors.acidYellow,
                border: "2px solid #171717",
                borderRadius: "6px",
                padding: "4px 12px",
                fontSize: "14px",
                fontWeight: 900,
                fontFamily: TurkishFont,
              }}
            >
              ATATÜRK'ÜN EL YAZISIYLA (1935)
            </div>
            <div
              style={{
                fontFamily: TurkishFont,
                fontSize: "28px",
                fontWeight: 900,
                color: currentTheme.colors.inkBlack,
                lineHeight: 1.2,
              }}
            >
              "KAMÂLİZM PRENSİPLERİ"
            </div>
            <div
              style={{
                fontSize: "18px",
                fontWeight: 700,
                color: "#4B5563",
              }}
            >
              CHP Programına bizzat Atatürk tarafından eklenmiştir.
            </div>
          </div>
        </div>
      )}

      {type === "scales_laiklik" && (
        <div
          style={{
            width: "100%",
            backgroundColor: currentTheme.colors.pureWhite,
            border: currentTheme.styles.borderThick,
            borderRadius: "20px",
            boxShadow: currentTheme.styles.shadowHard,
            padding: "26px 30px",
            display: "flex",
            alignItems: "center",
            gap: "24px",
          }}
        >
          {/* Sol Adalet Terazisi İkonu */}
          <div
            style={{
              width: "100px",
              height: "100px",
              backgroundColor: currentTheme.colors.acidYellow,
              border: "3px solid #171717",
              borderRadius: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "52px",
              boxShadow: "4px 4px 0px #171717",
              flexShrink: 0,
            }}
          >
            ⚖️
          </div>

          {/* Sağ İnfografik */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <div
              style={{
                display: "inline-flex",
                alignSelf: "flex-start",
                backgroundColor: "#DCFCE7",
                border: "2px solid #171717",
                borderRadius: "6px",
                padding: "4px 12px",
                fontSize: "14px",
                fontWeight: 900,
                fontFamily: TurkishFont,
                color: "#166534",
              }}
            >
              1 KASIM 1937 TBMM KONUŞMASI
            </div>
            <div
              style={{
                fontFamily: TurkishFont,
                fontSize: "26px",
                fontWeight: 900,
                color: currentTheme.colors.inkBlack,
                lineHeight: 1.2,
              }}
            >
              GERÇEK LAİKLİK İLKESİ
            </div>
            <div
              style={{
                fontSize: "18px",
                fontWeight: 700,
                color: "#4B5563",
              }}
            >
              "Kanun yaparken dogmaları değil, ilmi ve hayatı rehber almak."
            </div>
          </div>
        </div>
      )}

      {type === "poll_cta" && (
        <div
          style={{
            width: "100%",
            backgroundColor: currentTheme.colors.pureWhite,
            border: currentTheme.styles.borderThick,
            borderRadius: "20px",
            boxShadow: currentTheme.styles.shadowHard,
            padding: "26px 24px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div
            style={{
              backgroundColor: currentTheme.colors.signalOrange,
              color: currentTheme.colors.pureWhite,
              border: "3px solid #171717",
              borderRadius: "8px",
              padding: "6px 20px",
              fontSize: "18px",
              fontWeight: 900,
              fontFamily: TurkishFont,
              boxShadow: "3px 3px 0px #171717",
            }}
          >
            💬 SEN NE DÜŞÜNÜYORSUN?
          </div>

          <div style={{ display: "flex", width: "100%", gap: "12px" }}>
            <div
              style={{
                flex: 1,
                backgroundColor: currentTheme.colors.background,
                border: "3px solid #171717",
                borderRadius: "10px",
                padding: "12px",
                textAlign: "center",
                fontFamily: TurkishFont,
                fontWeight: 900,
                fontSize: "16px",
                boxShadow: "3px 3px 0px #171717",
              }}
            >
              [A] Resmi Belgeler
            </div>
            <div
              style={{
                flex: 1,
                backgroundColor: currentTheme.colors.background,
                border: "3px solid #171717",
                borderRadius: "10px",
                padding: "12px",
                textAlign: "center",
                fontFamily: TurkishFont,
                fontWeight: 900,
                fontSize: "16px",
                boxShadow: "3px 3px 0px #171717",
              }}
            >
              [B] Kulaktan Dolma Anılar
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
