import React from "react";
import { Audio, Sequence, staticFile, useVideoConfig } from "remotion";
import { Background } from "./components/Background";
import { ProgressBar } from "./components/ProgressBar";
import { HeaderBadge } from "./components/HeaderBadge";
import { VisualIllustration } from "./components/VisualIllustration";
import { KineticCaptions } from "./components/KineticCaptions";
import { FloatingParticles } from "./components/FloatingParticles";
import { AudioVisualizer } from "./components/AudioVisualizer";
import { HistoricalStamp } from "./components/HistoricalStamp";
import subtitlesData from "../public/subtitles.json";
import { WordTimestamp } from "./types";
import { currentTheme } from "./theme";

const subtitles = subtitlesData as WordTimestamp[];

export const ReelComposition: React.FC = () => {
  const { fps } = useVideoConfig();

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

      {/* 2. Neo-Brutalism Warm Cream Arka Plan */}
      <Background />

      {/* 3. Dinamik Uçuşan Parçacıklar */}
      <FloatingParticles />

      {/* 4. Canlı Ses Dalgası (Equalizer) */}
      <AudioVisualizer />

      {/* 5. Üst İlerleme Çubuğu */}
      <ProgressBar />

      {/* 6. Üst Başlık Rozeti */}
      <HeaderBadge title="EZBER BOZAN TARİH" />

      {/* 7. Görsel İnfografikler (Yazı kalabalığı yok, sadece simgeler ve grafikler) */}

      {/* 0 - 3.5 sn: Giriş Kancası (Görsel Karşılaştırma) */}
      <Sequence from={0} durationInFrames={Math.round(3.5 * fps)}>
        <VisualIllustration type="myth_buster" />
        <HistoricalStamp text="ŞEHİR EFSANESİ" subtext="ARAŞTIRILDI" />
      </Sequence>

      {/* 3.5 - 14.5 sn: 1931 Arşiv Belgesi Grafiği */}
      <Sequence from={Math.round(3.5 * fps)} durationInFrames={Math.round(11 * fps)}>
        <VisualIllustration type="archive_1931" />
        <HistoricalStamp text="DEVLET MATBAASI" subtext="1931 ARŞİV" />
      </Sequence>

      {/* 14.5 - 26 sn: 1935 El Yazısı Grafiği */}
      <Sequence from={Math.round(14.5 * fps)} durationInFrames={Math.round(11.5 * fps)}>
        <VisualIllustration type="handwriting_1935" />
        <HistoricalStamp text="EL YAZISIYLA" subtext="1935 PROGRAMI" />
      </Sequence>

      {/* 26 - 41 sn: Laiklik Adalet / Mantık Terazisi */}
      <Sequence from={Math.round(26 * fps)} durationInFrames={Math.round(15 * fps)}>
        <VisualIllustration type="scales_laiklik" />
        <HistoricalStamp text="TBMM ZABITLARI" subtext="1 KASIM 1937" />
      </Sequence>

      {/* 41 - 53 sn: CTA Oylama / Yorum Kutusu */}
      <Sequence from={Math.round(41 * fps)} durationInFrames={Math.round(12 * fps)}>
        <VisualIllustration type="poll_cta" />
      </Sequence>

      {/* 8. Cümle Duyarlı Kinetik Altyazılar (Noktalamaya ve soluklanmaya tam senkron) */}
      <KineticCaptions subtitles={subtitles} />
    </div>
  );
};
