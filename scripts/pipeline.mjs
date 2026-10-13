import { execSync } from "child_process";
import fs from "fs";
import path from "path";

console.log("==========================================");
console.log("🎬 OTONOM VİDEO ÜRETİM HATTI BAŞLATILDI");
console.log("==========================================");

// 1. files/ altındaki metin dosyasını bul
const filesDir = path.join(process.cwd(), "files");
const allFiles = fs.readdirSync(filesDir);
const textFiles = allFiles.filter(f => f.endsWith(".txt") || f.endsWith(".md"));

if (textFiles.length === 0) {
  console.error("❌ 'files/' klasöründe işlenecek .txt veya .md dosyası bulunamadı!");
  process.exit(1);
}

const targetFile = path.join(filesDir, textFiles[0]);
console.log(`📄 Kaynak Metin: ${textFiles[0]}`);

// 2. Seslendirme ve Altyazı Zamanlamalarını Üret
console.log("\n🎙️ Adım 1: Seslendirme ve Kelime Zamanlamaları (TTS) üretiliyor...");
try {
  execSync("python scripts/generate_audio.py", { stdio: "inherit" });
} catch (err) {
  console.error("❌ Seslendirme oluşturulurken hata:", err.message);
  process.exit(1);
}

// 3. Remotion ile MP4 Videosunu Render Al
console.log("\n🎥 Adım 2: Remotion ile 1080x1920 MP4 Video Render alınıyor...");
const outDir = path.join(process.cwd(), "out");
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const outputFile = path.join(outDir, "final_reel.mp4");
try {
  execSync(`npx remotion render ReelVideo "${outputFile}" --concurrency=4`, { stdio: "inherit" });
  console.log(`\n🎉 BAŞARILI! Video hazır: ${outputFile}`);
} catch (err) {
  console.error("❌ Remotion render hatası:", err.message);
  process.exit(1);
}
