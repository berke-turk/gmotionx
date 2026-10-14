import React from "react";
import { Audio, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Background } from "./components/Background";
import { ProgressBar } from "./components/ProgressBar";
import { VisualIllustration } from "./components/VisualIllustration";
import { CaptionConfig, KineticCaptions } from "./components/KineticCaptions";
import { FloatingParticles } from "./components/FloatingParticles";
import subtitlesData from "../public/subtitles.json";
import videoScript from "../public/video_script.json";
import { WordTimestamp } from "./types";
import { currentTheme } from "./theme";

const subtitles = subtitlesData as WordTimestamp[];

interface SceneConfig {
  startSec?: number;
  endSec?: number;
  type?: string;
  channelGenre?: string;
  genreProps?: Record<string, any>;
  captionConfig?: CaptionConfig;
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
  cameraMove?: {
    zoom?: number;
    panX?: number;
    panY?: number;
    rotateZ?: number;
    rotateX?: number;
    rotateY?: number;
    enableMicroDrift?: boolean;
  };
  morphFrom?: string;
  morphTo?: string;
  show3D?: boolean;
  layout?: string;
  position?: "center" | "top" | "fill";
}

export const ReelComposition: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const script = videoScript as any;
  const globalGenre = script.channelGenre as string | undefined;
  const scenes = (script.scenes || []) as SceneConfig[];

  const currentTime = frame / fps;
  const activeScene = scenes.find((s) => {
    const start = s.startSec || 0;
    const end = s.endSec || 999;
    return currentTime >= start && currentTime < end;
  });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        backgroundColor: currentTheme.colors.background,
        overflow: "hidden",
      }}
    >
      {/* 1. Seslendirme */}
      <Audio src={staticFile("voice.mp3")} />

      {/* 2. Dinamik Tema Arka Planı (Neo-Brutalism / Glassmorphism / Paper Explainer vb.) */}
      <Background />

      {/* 3. Dinamik Uçuşan Parçacıklar */}
      <FloatingParticles />

      {/* 4. Zarif Üst İlerleme Çubuğu (Süre İşareti) */}
      <ProgressBar />

      {/* 5. Dinamik Görsel Motion Graphics Sahneleri (Her konuya ve sahneye özel özgür mimari) */}
      {scenes.map((scene, index) => {
        const fromFrame = Math.round((scene.startSec || 0) * fps);
        const isLast = index === scenes.length - 1;
        const rawDuration = Math.round(((scene.endSec || 10) - (scene.startSec || 0)) * fps);
        const duration = isLast ? Math.max(1, durationInFrames - fromFrame) : Math.max(1, rawDuration);

        return (
          <Sequence key={`scene-${index}`} from={fromFrame} durationInFrames={duration}>
            <VisualIllustration
              type={scene.type}
              channelGenre={scene.channelGenre || globalGenre}
              genreProps={scene.genreProps}
              badge={scene.badge}
              title={scene.title}
              highlightWord={scene.highlightWord}
              leftTitle={scene.leftTitle}
              leftDesc={scene.leftDesc}
              rightTitle={scene.rightTitle}
              rightDesc={scene.rightDesc}
              items={scene.items}
              metricValue={scene.metricValue}
              metricLabel={scene.metricLabel}
              verdictText={scene.verdictText}
              cameraMove={scene.cameraMove}
              morphFrom={scene.morphFrom}
              morphTo={scene.morphTo}
              show3D={scene.show3D}
              layout={scene.layout}
              position={scene.position}
            />
          </Sequence>
        );
      })}

      {/* 7. Konsept Duyarlı & Dinamik Konumlu Kinetik Altyazılar */}
      <KineticCaptions
        subtitles={subtitles}
        channelGenre={activeScene?.channelGenre || globalGenre}
        captionConfig={script.captionConfig}
        activeSceneCaptionConfig={activeScene?.captionConfig}
      />
    </div>
  );
};
