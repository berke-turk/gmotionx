import "./index.css";
import React from "react";
import { Composition } from "remotion";
import { ReelComposition } from "./ReelComposition";
import { IsgCepCommercial } from "./components/commercial/IsgCepCommercial";
import subtitlesData from "../public/subtitles.json";
import { WordTimestamp } from "./types";

const FPS = 30;
const MAX_DURATION_SECONDS = 120; // 2 Dakika Maksimum Tavan Sınır
const MAX_FRAMES = MAX_DURATION_SECONDS * FPS; // 3600 Kare

// Seslendirme bittiğinde video tam olarak biter (+0.5s doğal sönümleme payı)
const subtitles = subtitlesData as WordTimestamp[];
const lastSubtitle = subtitles.length > 0 ? subtitles[subtitles.length - 1] : null;
const audioDurationSeconds = lastSubtitle ? lastSubtitle.end + 0.5 : 34;

export const DURATION_IN_FRAMES = Math.min(
  Math.max(Math.ceil(audioDurationSeconds * FPS), 30),
  MAX_FRAMES
);

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="ReelVideo"
        component={ReelComposition}
        durationInFrames={DURATION_IN_FRAMES}
        fps={FPS}
        width={1080}
        height={1920}
      />
      <Composition
        id="IsgCepCommercial"
        component={IsgCepCommercial}
        durationInFrames={DURATION_IN_FRAMES}
        fps={FPS}
        width={1080}
        height={1920}
      />
    </>
  );
};
