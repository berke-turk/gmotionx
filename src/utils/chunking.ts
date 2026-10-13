import { WordTimestamp } from "../types";

export interface CaptionChunk {
  id: number;
  words: WordTimestamp[];
  start: number;
  end: number;
}

/**
 * Kelimeleri cümle ve anlam bütünlüğüne (semantik), noktalama işaretlerine (. ! ?) 
 * ve nefes/duraklama boşluklarına göre akıllı gruplara ayırır.
 * 
 * Kural 1: Noktalama (. ! ?) olan kelimeden sonra ASLA yeni cümle kelimesi aynı gruba giremez!
 * Kural 2: İki kelime arasında 0.35 saniyeden uzun sessizlik/soluklanma varsa yeni grup başlar.
 * Kural 3: Maksimum 3 kelime (veya virgüllü 2 kelime) tek ekranda kalır.
 */
export function buildSemanticChunks(words: WordTimestamp[]): CaptionChunk[] {
  if (!words || words.length === 0) return [];

  const chunks: CaptionChunk[] = [];
  let currentWords: WordTimestamp[] = [];

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    currentWords.push(word);

    const cleanText = word.text.trim();
    const isSentenceEnd = /[.!?]$/.test(cleanText);
    const isClauseEnd = /[,;:]$/.test(cleanText);
    const reachedWordLimit = currentWords.length >= 3;
    const clauseBreak = isClauseEnd && currentWords.length >= 2;

    const nextWord = words[i + 1];
    const hasBreathGap = nextWord ? (nextWord.start - word.end > 0.32) : true;

    if (isSentenceEnd || clauseBreak || reachedWordLimit || hasBreathGap || !nextWord) {
      if (currentWords.length > 0) {
        chunks.push({
          id: chunks.length,
          words: [...currentWords],
          start: currentWords[0].start,
          end: currentWords[currentWords.length - 1].end,
        });
        currentWords = [];
      }
    }
  }

  return chunks;
}
