import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { FluidCamera, CameraMoveConfig } from "./FluidCamera";
import { MorphingShape } from "./MorphingShape";
import { KineticTitle } from "./KineticTitle";
import { Scene3DContainer } from "./Scene3DContainer";
import { CinematicAtmosphere } from "./CinematicAtmosphere";
import { EntangledQuantumParticles } from "./EntangledQuantumParticles";
import { SpeedBarrierClash } from "./SpeedBarrierClash";
import { QuantumSpinFlip } from "./QuantumSpinFlip";
import { MonolithicVerdict } from "./MonolithicVerdict";
import { TurkishFont } from "../../load-font";
import { currentTheme } from "../../theme";
import { Sparkles, Zap } from "lucide-react";

export interface CinematicSceneProps {
  badge?: string;
  title?: string;
  highlightWord?: string;
  leftTitle?: string;
  leftDesc?: string;
  rightTitle?: string;
  rightDesc?: string;
  metricValue?: string;
  metricLabel?: string;
  verdictText?: string;
  cameraMove?: CameraMoveConfig;
  morphFrom?: string;
  morphTo?: string;
  show3D?: boolean;
  layout?:
    | "entangled_orbit"
    | "barrier_clash"
    | "spin_flip"
    | "monolithic_verdict"
    | "fullscreen_morph"
    | "isometric_stack"
    | "default"
    | string;
  position?: "center" | "top" | "fill";
}

/**
 * CinematicExplainerScene:
 * Yapay zeka tarafından her konunun ihtiyacına göre tamamen dinamik konumlandırılan,
 * sabit kutu ve şablon kalıplarından arındırılmış, sinematik hareket tasarım sahnesi.
 */
export const CinematicExplainerScene: React.FC<CinematicSceneProps> = ({
  badge = "DERİN ANALİZ",
  title = "GÖRÜNENİN ÖTESİNDEKİ MEKANİZMA",
  highlightWord,
  leftTitle,
  leftDesc,
  rightTitle,
  rightDesc,
  metricValue,
  metricLabel,
  verdictText,
  cameraMove = { zoom: 1.08, panY: -10, rotateZ: 1.5, enableMicroDrift: true },
  morphFrom = "circle",
  morphTo = "hexagon",
  show3D = true,
  layout = "default",
  position = "center",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Kart yaylanması
  const cardSpring = spring({
    frame: Math.max(0, frame - 8),
    fps,
    config: { damping: 13, mass: 0.6, stiffness: 120 },
  });

  const cardScale = interpolate(cardSpring, [0, 1], [0.85, 1]);
  const cardOpacity = interpolate(cardSpring, [0, 1], [0, 1]);

  // Otomatik layout tespiti (eğer belirtilmemişse sahne parametrelerinden anla)
  let resolvedLayout = layout;
  if (resolvedLayout === "default") {
    if (verdictText) {
      resolvedLayout = "monolithic_verdict";
    } else if (title?.toLowerCase().includes("hızlı") || title?.toLowerCase().includes("dolanık")) {
      resolvedLayout = "entangled_orbit";
    } else if (title?.toLowerCase().includes("korkunç") || title?.toLowerCase().includes("engel") || leftTitle) {
      resolvedLayout = "barrier_clash";
    } else if (title?.toLowerCase().includes("yukarı") || title?.toLowerCase().includes("spin") || title?.toLowerCase().includes("aşağı")) {
      resolvedLayout = "spin_flip";
    }
  }

  // 1. ÖZEL DİNAMİK SAHNE: Kapanış Hükmü (Monolithic Verdict)
  if (resolvedLayout === "monolithic_verdict" || verdictText) {
    return (
      <FluidCamera move={cameraMove}>
        <CinematicAtmosphere />
        <div
          style={{
            position: "absolute",
            top: "220px",
            left: "40px",
            right: "40px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 35,
          }}
        >
          <MonolithicVerdict badge={badge} verdictText={verdictText} />
        </div>
      </FluidCamera>
    );
  }

  // 2. ÖZEL DİNAMİK SAHNE: Kuantum Dolanıklığı Yörüngesi (Entangled Quantum Orbit)
  if (resolvedLayout === "entangled_orbit") {
    return (
      <FluidCamera move={cameraMove}>
        <CinematicAtmosphere />
        <div
          style={{
            position: "absolute",
            top: "140px",
            left: "40px",
            right: "40px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
            zIndex: 35,
          }}
        >
          <KineticTitle
            badge={badge}
            text={title}
            highlightWord={highlightWord}
            fontSize={44}
            delay={0}
            styleMode="punch"
          />

          <EntangledQuantumParticles orbitRadius={190} orbitSpeed={0.05} />

          {metricValue && (
            <div
              style={{
                backgroundColor: "rgba(10, 13, 20, 0.85)",
                border: "2px solid #00F2FE",
                borderRadius: "14px",
                padding: "12px 28px",
                display: "flex",
                alignItems: "center",
                gap: "14px",
                boxShadow: "0 0 30px rgba(0, 242, 254, 0.35)",
                backdropFilter: "blur(15px)",
              }}
            >
              <Zap color="#00F2FE" size={24} />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontFamily: TurkishFont, fontSize: "11px", color: "#94A3B8", fontWeight: 800 }}>
                  {metricLabel || "HESAPLANAN DEĞER"}
                </span>
                <span style={{ fontFamily: TurkishFont, fontSize: "24px", fontWeight: 900, color: "#DFFF00" }}>
                  {metricValue}
                </span>
              </div>
            </div>
          )}
        </div>
      </FluidCamera>
    );
  }

  // 3. ÖZEL DİNAMİK SAHNE: Hız Limiti Bariyeri & Kozmik Paradoks (Speed Barrier Clash)
  if (resolvedLayout === "barrier_clash") {
    return (
      <FluidCamera move={cameraMove}>
        <CinematicAtmosphere />
        <div
          style={{
            position: "absolute",
            top: "140px",
            left: "40px",
            right: "40px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "24px",
            zIndex: 35,
          }}
        >
          <KineticTitle
            badge={badge}
            text={title}
            highlightWord={highlightWord}
            fontSize={44}
            delay={0}
            styleMode="punch"
          />

          <SpeedBarrierClash />
        </div>
      </FluidCamera>
    );
  }

  // 4. ÖZEL DİNAMİK SAHNE: Eşzamanlı Spin Dönüşü (Spin Flip)
  if (resolvedLayout === "spin_flip") {
    return (
      <FluidCamera move={cameraMove}>
        <CinematicAtmosphere />
        <div
          style={{
            position: "absolute",
            top: "150px",
            left: "40px",
            right: "40px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "30px",
            zIndex: 35,
          }}
        >
          <KineticTitle
            badge={badge}
            text={title}
            highlightWord={highlightWord}
            fontSize={44}
            delay={0}
            styleMode="punch"
          />

          <QuantumSpinFlip />
        </div>
      </FluidCamera>
    );
  }

  // 5. GENEL SERBEST MORFOLOJİ SAHNESİ (Açık Uzayda Tablasız Morfoloji)
  const isTop = position === "top";
  const topOffset = isTop ? "130px" : "160px";

  return (
    <FluidCamera move={cameraMove}>
      <CinematicAtmosphere />

      <div
        style={{
          position: "absolute",
          top: topOffset,
          left: "50px",
          right: "50px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "24px",
          zIndex: 35,
        }}
      >
        <KineticTitle
          badge={badge}
          text={title}
          highlightWord={highlightWord}
          fontSize={44}
          delay={0}
          styleMode="punch"
        />

        {/* Serbest Uçuşan Morfoloji (Sabit ızgara tablası olmadan, açık derinlik) */}
        <div
          style={{
            transform: `scale(${cardScale})`,
            opacity: cardOpacity,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          {show3D ? (
            <Scene3DContainer autoSpin={true} depth={45} showIsometricGrid={false}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                }}
              >
                <MorphingShape
                  fromShape={morphFrom}
                  toShape={morphTo}
                  size={260}
                  strokeWidth={6}
                  glow={true}
                />
                <div
                  style={{
                    position: "absolute",
                    transform: "translateZ(50px)",
                    backgroundColor: currentTheme.colors.cardBackground,
                    border: currentTheme.styles.border,
                    borderRadius: "50%",
                    padding: "16px",
                    boxShadow: currentTheme.styles.boxShadow,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Sparkles size={36} color={currentTheme.colors.accentSecondary || "#FF5A36"} />
                </div>
              </div>
            </Scene3DContainer>
          ) : (
            <div
              style={{
                width: "100%",
                height: "360px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
            >
              <MorphingShape
                fromShape={morphFrom}
                toShape={morphTo}
                size={290}
                strokeWidth={7}
                glow={true}
              />
            </div>
          )}
        </div>

        {/* Alt Bilgi Kartı */}
        {(leftTitle || rightTitle || metricValue) && (
          <div
            style={{
              width: "100%",
              maxWidth: "880px",
              margin: "0 auto",
              transform: `scale(${cardScale})`,
              opacity: cardOpacity,
              marginTop: "-15px",
            }}
          >
            {metricValue && (
              <div
                style={{
                  backgroundColor: currentTheme.colors.cardBackground,
                  border: currentTheme.styles.border,
                  borderRadius: currentTheme.styles.borderRadius,
                  boxShadow: currentTheme.styles.boxShadow,
                  padding: "18px 24px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <span
                    style={{
                      fontFamily: TurkishFont,
                      fontSize: "13px",
                      color: currentTheme.colors.textSecondary,
                      fontWeight: 800,
                      letterSpacing: "0.5px",
                    }}
                  >
                    {metricLabel || "HESAPLANAN DEĞER"}
                  </span>
                  <span
                    style={{
                      fontFamily: TurkishFont,
                      fontSize: "36px",
                      fontWeight: 900,
                      color: currentTheme.colors.accentSecondary || "#FF5A36",
                      lineHeight: 1,
                    }}
                  >
                    {metricValue}
                  </span>
                </div>
                <div
                  style={{
                    backgroundColor: currentTheme.colors.accentPrimary || "#DFFF00",
                    color: "#171717",
                    borderRadius: "50%",
                    padding: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "2px solid #171717",
                  }}
                >
                  <Zap size={28} />
                </div>
              </div>
            )}

            {leftTitle && rightTitle && (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "14px",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    backgroundColor: currentTheme.colors.cardBackground,
                    border: currentTheme.styles.border,
                    borderRadius: "14px",
                    padding: "14px",
                    boxShadow: currentTheme.styles.boxShadowSmall,
                  }}
                >
                  <div style={{ fontFamily: TurkishFont, fontSize: "14px", fontWeight: 900, color: currentTheme.colors.accentSecondary }}>
                    {leftTitle}
                  </div>
                  {leftDesc && (
                    <div style={{ fontFamily: TurkishFont, fontSize: "12px", color: currentTheme.colors.textSecondary, marginTop: "4px", fontWeight: 700 }}>
                      {leftDesc}
                    </div>
                  )}
                </div>

                <div
                  style={{
                    backgroundColor: currentTheme.colors.cardBackground,
                    border: currentTheme.styles.border,
                    borderRadius: "14px",
                    padding: "14px",
                    boxShadow: currentTheme.styles.boxShadowSmall,
                  }}
                >
                  <div style={{ fontFamily: TurkishFont, fontSize: "14px", fontWeight: 900, color: currentTheme.colors.textPrimary }}>
                    {rightTitle}
                  </div>
                  {rightDesc && (
                    <div style={{ fontFamily: TurkishFont, fontSize: "12px", color: currentTheme.colors.textSecondary, marginTop: "4px", fontWeight: 700 }}>
                      {rightDesc}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </FluidCamera>
  );
};
