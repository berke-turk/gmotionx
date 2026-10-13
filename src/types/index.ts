export interface WordTimestamp {
  text: string;
  start: number; // saniye cinsinden
  end: number;   // saniye cinsinden
}

export interface FactCardData {
  startFrame: number;
  durationFrames: number;
  badge: string;
  title: string;
  subtitle: string;
  accentColor?: string;
}

export interface ReelProps {
  audioSrc: string;
  subtitles: WordTimestamp[];
  topicTitle: string;
}
