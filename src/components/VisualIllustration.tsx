import React from "react";
import { TerminalHookScene } from "./scenes/TerminalHookScene";
import { ArchitectureStackScene } from "./scenes/ArchitectureStackScene";
import { CargoMetaphorScene } from "./scenes/CargoMetaphorScene";
import { SpeedBenchmarkScene } from "./scenes/SpeedBenchmarkScene";
import { StrikethroughVerdictScene } from "./scenes/StrikethroughVerdictScene";
import { CinematicExplainerScene } from "./cinematic/CinematicExplainerScene";
import { CameraMoveConfig } from "./cinematic/FluidCamera";
import { ChannelGenreOrchestrator } from "./genres/ChannelGenreOrchestrator";
import { TurkishFont } from "../load-font";
import { currentTheme } from "../theme";
import { MaskingTape } from "./MaskingTape";
import { Play } from "lucide-react";
import { useCurrentFrame } from "remotion";

export interface VisualIllustrationProps {
  type?: string;
  channelGenre?: string;
  genreProps?: Record<string, any>;
  badge?: string;
  title?: string;
  highlightWord?: string;
  leftTitle?: string;
  leftDesc?: string;
  rightTitle?: string;
  rightDesc?: string;
  items?: string[];
  metricValue?: string;
  metricLabel?: string;
  verdictText?: string;
  cameraMove?: CameraMoveConfig;
  morphFrom?: string;
  morphTo?: string;
  show3D?: boolean;
  layout?: string;
  position?: "center" | "top" | "fill";
}

export const VisualIllustration: React.FC<VisualIllustrationProps> = ({
  type = "terminal_hook",
  channelGenre,
  genreProps,
  badge,
  title,
  highlightWord,
  leftTitle,
  leftDesc,
  rightTitle,
  rightDesc,
  items,
  metricValue,
  metricLabel,
  verdictText,
  cameraMove,
  morphFrom,
  morphTo,
  show3D,
  layout,
  position,
}) => {
  const frame = useCurrentFrame();
  const isPaper = currentTheme.id === "paper-explainer";

  // 0. ÖZEL KANAL MİMARİSİ ROUTER'I (Otomotiv, İslami Hat, Hukuk, Matematik, Akustik, Psikoloji, Sinema, Jeopolitik, Finans)
  const activeGenre = channelGenre || (
    ["automotive", "car", "islamic", "spiritual", "legal", "law", "math", "geometry", "sound", "acoustic", "psychology", "cinema", "geopolitics", "map", "finance", "economy"].includes(type)
      ? type
      : undefined
  );

  if (activeGenre) {
    const genreElement = (
      <ChannelGenreOrchestrator
        genre={activeGenre}
        badge={badge}
        title={title}
        highlightWord={highlightWord}
        leftTitle={leftTitle}
        leftDesc={leftDesc}
        rightTitle={rightTitle}
        rightDesc={rightDesc}
        metricValue={metricValue}
        metricLabel={metricLabel}
        verdictText={verdictText}
        genreProps={genreProps}
      />
    );
    if (genreElement) return genreElement;
  }

  // 1. TERMİNAL & YAZILIMCI ÇIKMAZI (Terminal Hook / Comparison)
  if (type === "terminal_hook" || type === "developer_clash" || type === "comparison") {
    return (
      <TerminalHookScene
        badge={badge}
        title={title}
        leftTitle={leftTitle}
        leftDesc={leftDesc}
        rightTitle={rightTitle}
        rightDesc={rightDesc}
      />
    );
  }

  // 2. MİMARİ MUKAYESE (Architecture Stack / VM vs Docker)
  if (type === "architecture_stack" || type === "container_vs_vm" || type === "tech_stack") {
    return (
      <ArchitectureStackScene
        badge={badge}
        title={title}
      />
    );
  }

  // 3. KARGO KONTEYNERİ METAFORU (Cargo Metaphor / Ship)
  if (type === "cargo_metaphor" || type === "cargo_ship" || type === "feature_list") {
    return (
      <CargoMetaphorScene
        badge={badge}
        title={title}
      />
    );
  }

  // 4. HIZ VE PERFORMANS GRAFİĞİ (Speed Benchmark / Curve)
  if (type === "speed_benchmark" || type === "speed_metric" || type === "frequency_graph") {
    return (
      <SpeedBenchmarkScene
        badge={badge}
        title={title}
        metricValue={metricValue}
        metricLabel={metricLabel}
      />
    );
  }

  // 5. ÜSTÜ ÇİZİLEN HÜKÜM & MİC-DROP (Strikethrough Verdict)
  if (type === "strikethrough_verdict" || type === "closing_verdict") {
    return (
      <StrikethroughVerdictScene
        badge={badge}
        title={title}
        verdictText={verdictText}
      />
    );
  }

  // 6. SES KAYDI MOCKUP (Audio Memo)
  if (type === "audio_memo" || type === "audio_hook") {
    return (
      <div
        style={{
          position: "absolute",
          top: "100px",
          left: "30px",
          right: "30px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "16px",
          zIndex: 35,
        }}
      >
        <div
          style={{
            width: "100%",
            backgroundColor: isPaper ? "#FFFFFF" : currentTheme.colors.cardBackground,
            border: currentTheme.styles.borderThick,
            borderRadius: "18px",
            padding: "24px 20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
            position: "relative",
            boxShadow: currentTheme.styles.boxShadow,
          }}
        >
          {isPaper && <MaskingTape width={180} top={-18} rotate={-1.5} />}
          <div
            style={{
              backgroundColor: currentTheme.colors.accentSecondary,
              color: "#FFFFFF",
              borderRadius: "6px",
              padding: "4px 16px",
              fontFamily: TurkishFont,
              fontSize: "13px",
              fontWeight: 900,
            }}
          >
            🎙️ {badge || "GELEN SES KAYDI"}
          </div>

          <div
            style={{
              width: "100%",
              backgroundColor: isPaper ? "#F4F0E6" : "rgba(255, 255, 255, 0.08)",
              borderRadius: "14px",
              padding: "16px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                backgroundColor: currentTheme.colors.accentPrimary,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Play size={20} fill="#18181B" style={{ marginLeft: "2px" }} />
            </div>

            <div style={{ flex: 1, display: "flex", alignItems: "center", gap: "3px", height: "36px" }}>
              {Array.from({ length: 26 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    height: `${10 + Math.abs(Math.sin((frame + i * 4) * 0.15)) * 24}px`,
                    backgroundColor: i < (frame % 26) ? currentTheme.colors.accentSecondary : "rgba(0,0,0,0.2)",
                    borderRadius: "2px",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 7. SİNEMATİK ANİMASYONLU, KİNETİK TİPOGRAFİLİ, MORFOLOJİK ŞEKİLLİ & 3D SAHNE
  // (type 'cinematic', 'morphing_metaphor', 'spatial_3d', 'kinetic_manifesto' veya konuya özel herhangi bir yeni sahne)
  return (
    <CinematicExplainerScene
      badge={badge}
      title={title}
      highlightWord={highlightWord}
      leftTitle={leftTitle}
      leftDesc={leftDesc}
      rightTitle={rightTitle}
      rightDesc={rightDesc}
      metricValue={metricValue}
      metricLabel={metricLabel}
      verdictText={verdictText}
      cameraMove={cameraMove}
      morphFrom={morphFrom}
      morphTo={morphTo}
      show3D={show3D !== false}
      layout={layout}
      position={position}
    />
  );
};
