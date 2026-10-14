import { execSync } from "child_process";
import fs from "fs";
import path from "path";

console.log("🔍 [AUDIT] Video kareleri senkron ve görselleştirme kontrolü için render alınıyor...");

const auditDir = path.join(process.cwd(), "out", "audit");
if (!fs.existsSync(auditDir)) {
  fs.mkdirSync(auditDir, { recursive: true });
}

// Subtitles üzerinden toplam kareyi dinamik hesapla (Maks: 3600 kare / 2 dakika)
let totalFrames = 1424;
const subsPath = path.join(process.cwd(), "public", "subtitles.json");
if (fs.existsSync(subsPath)) {
  try {
    const subs = JSON.parse(fs.readFileSync(subsPath, "utf-8"));
    if (subs.length > 0) {
      const lastWord = subs[subs.length - 1];
      totalFrames = Math.min(Math.ceil((lastWord.end + 0.3) * 30), 3600);
    }
  } catch (e) {
    // varsayılan totalFrames
  }
}

const keyFrames = [
  { frame: Math.min(80, totalFrames - 5), name: "audit_01_entangled_orbit.png" },
  { frame: Math.min(260, totalFrames - 5), name: "audit_02_barrier_clash.png" },
  { frame: Math.min(480, totalFrames - 5), name: "audit_03_fullscreen_morph.png" },
  { frame: Math.min(740, totalFrames - 5), name: "audit_04_spin_flip.png" },
  { frame: Math.max(1, totalFrames - 15), name: "audit_05_monolithic_verdict.png" },
];

for (const kf of keyFrames) {
  const outPath = path.join(auditDir, kf.name);
  console.log(`📸 Render alınıyor: Kare ${kf.frame}/${totalFrames} -> ${kf.name}...`);
  execSync(`npx remotion still ReelVideo "${outPath}" --frame ${kf.frame}`, { stdio: "inherit" });
}

console.log("✅ Tüm inceleme kareleri hazır: out/audit/");
