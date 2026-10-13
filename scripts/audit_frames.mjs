import { execSync } from "child_process";
import fs from "fs";
import path from "path";

console.log("🔍 [AUDIT] Video kareleri senkron ve görselleştirme kontrolü için render alınıyor...");

const auditDir = path.join(process.cwd(), "out", "audit");
if (!fs.existsSync(auditDir)) {
  fs.mkdirSync(auditDir, { recursive: true });
}

const keyFrames = [
  { frame: 60, name: "audit_01_hook.png" },
  { frame: 250, name: "audit_02_archive.png" },
  { frame: 495, name: "audit_03_korumaktir.png" }, // "korumaktır!" karesi
  { frame: 520, name: "audit_04_yakup.png" },       // "Yakup" karesi (ayrı olmalı!)
  { frame: 1400, name: "audit_05_cta.png" }
];

for (const kf of keyFrames) {
  const outPath = path.join(auditDir, kf.name);
  console.log(`📸 Render alınıyor: Kare ${kf.frame} -> ${kf.name}...`);
  execSync(`npx remotion still ReelVideo "${outPath}" --frame ${kf.frame}`, { stdio: "inherit" });
}

console.log("✅ Tüm inceleme kareleri hazır: out/audit/");
