import readline from "readline/promises";
import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { generateScriptForTopic } from "./generate_script.mjs";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("\n=======================================================");
console.log("🎬 AUTOREEL: İNTERAKTİF OTONOM VİDEO FABRİKASI");
console.log("=======================================================\n");

async function main() {
  try {
    // 1. ADIM: Konu veya İçerik Kaynağı
    console.log("📂 [1/4] İÇERİK & KONU GİRDİSİ");
    const filesDir = path.join(process.cwd(), "files");
    const existingFiles = fs.existsSync(filesDir) 
      ? fs.readdirSync(filesDir).filter(f => f.endsWith(".txt") || f.endsWith(".md"))
      : [];

    if (existingFiles.length > 0) {
      console.log(`💡 'files/' altında tespit edilen dosyalar:`);
      existingFiles.forEach((f, i) => console.log(`   [${i + 1}] ${f}`));
    }

    const topicInput = await rl.question(
      "\n👉 Video konusu nedir veya hangi dosyayı kullanmak istersiniz?\n(Bir dosya numarası, dosya adı veya doğrudan konu başlığı yazabilirsiniz): "
    );

    let scriptContent = "";
    const chosenIndex = parseInt(topicInput.trim(), 10) - 1;

    if (!isNaN(chosenIndex) && existingFiles[chosenIndex]) {
      const filePath = path.join(filesDir, existingFiles[chosenIndex]);
      scriptContent = fs.readFileSync(filePath, "utf-8");
      console.log(`📄 Dosya seçildi: ${existingFiles[chosenIndex]}`);
    } else if (existingFiles.includes(topicInput.trim())) {
      const filePath = path.join(filesDir, topicInput.trim());
      scriptContent = fs.readFileSync(filePath, "utf-8");
      console.log(`📄 Dosya seçildi: ${topicInput.trim()}`);
    } else {
      scriptContent = topicInput.trim();
      console.log(`📝 Konu başlığı alındı: "${scriptContent}"`);
    }

    // 2. ADIM: Apify Araştırması
    console.log("\n🔍 [2/4] APİFY İNTERNET ARAŞTIRMASI");
    const useApify = await rl.question("👉 Apify ile internet/trend araştırması yapılsın mı? (e/h) [varsayılan: h]: ");
    let apifyQuery = "";
    if (useApify.toLowerCase().startsWith("e")) {
      apifyQuery = await rl.question("👉 Apify arama sorgusu ne olsun? (Boş bırakılırsa konu başlığı aranır): ");
      if (!apifyQuery.trim()) apifyQuery = scriptContent.slice(0, 80);
      console.log(`⏳ Apify ile araştırılıyor: "${apifyQuery}"...`);
      try {
        execSync(`node scripts/apify_research.mjs "${apifyQuery}"`, { stdio: "inherit" });
      } catch (err) {
        console.warn("⚠️ Apify araştırmasında uyarı:", err.message);
      }
    } else {
      console.log("⏩ Apify araştırması atlandı, mevcut içerikle devam ediliyor.");
    }

    // 2.5. ADIM: Konuya Özel Senaryo & Sahne Üretimi
    console.log("\n📝 [SENARYO] Konuya özel viral metin ve infografik sahneleri hazırlanıyor...");
    await generateScriptForTopic(scriptContent);

    // 3. ADIM: Tasarım Mimarisi (Theme) Seçimi
    console.log("\n🎨 [3/4] TASARIM MİMARİSİ (STYLE)");
    console.log("   [1] 🏛️ Neo-Brutalism (Warm Cream, Ink Black, Acid Yellow, sert gölgeler)");
    console.log("   [2] 💎 Glassmorphism & Motion (Buzlu cam, neon cyan/purple, derin koyu tech)");
    console.log("   [3] 📐 Swiss / International Typographic (Modernist ızgara, İsviçre Kırmızısı, net tipografi)");
    console.log("   [4] 🌿 Organic / Warm Minimalism (Terracotta, Sage, Sand, huzurlu doğal akış)");
    console.log("   [5] 📰 Paper & Cutout Explainer (Koli bantlı, kareli defter, sarı fosforlu, Asıl Olay Bu / Vox tarzı)");

    const themeChoice = await rl.question("\n👉 Tasarım mimarisi seçin (1-5) [varsayılan: 1]: ");
    const themeMap = {
      "1": "NEO_BRUTALISM",
      "2": "GLASSMORPHISM",
      "3": "SWISS_STYLE",
      "4": "ORGANIC_MINIMALISM",
      "5": "PAPER_EXPLAINER",
    };
    const selectedThemeKey = themeMap[themeChoice.trim()] || "NEO_BRUTALISM";
    console.log(`✅ Seçilen Tasarım: ${selectedThemeKey}`);

    // src/theme.ts dosyasında currentTheme'i güncelle
    updateActiveTheme(selectedThemeKey);

    // 4. ADIM: Seslendirmen Seçimi (Voice Actor)
    console.log("\n🎙️ [4/4] SESLENDİRMEN MOTORU & AKTÖR SEÇİMİ");
    const voicesConfigPath = path.join(process.cwd(), "config", "voices.json");
    let voicesCatalog = [];
    if (fs.existsSync(voicesConfigPath)) {
      try {
        voicesCatalog = JSON.parse(fs.readFileSync(voicesConfigPath, "utf-8"));
      } catch (e) {
        voicesCatalog = [];
      }
    }

    if (voicesCatalog.length === 0) {
      voicesCatalog = [
        { id: "ava", name: "Ava", provider: "edge-tts", displayName: "Ava (Copilot Ultra-Doğal Kadın)", voiceKey: "en-US-AvaMultilingualNeural" },
      ];
    }

    let currentProvider = "";
    voicesCatalog.forEach((v, idx) => {
      const providerLabel =
        v.provider === "gemini"
          ? "🤖 Google Gemini 2.0 AI Sesleri (GEMINI_API_KEY)"
          : v.provider === "openai"
          ? "💬 OpenAI / ChatGPT AI Sesleri (OPENAI_API_KEY)"
          : "🆓 Hazır & Ücretsiz Nöral Motor (Anahtarsız & Hızlı)";

      if (v.provider !== currentProvider) {
        currentProvider = v.provider;
        console.log(`\n   --- ${providerLabel} ---`);
      }
      const isDef = idx === 0 ? " [Varsayılan]" : "";
      console.log(`   [${idx + 1}] 🎙️ ${v.displayName || v.name}${isDef}`);
    });

    const voiceInput = await rl.question(
      `\n👉 Seslendirmen seçin (1-${voicesCatalog.length} veya isim örn: 'ava', 'puck', 'alloy') [varsayılan: 1]: `
    );

    let selectedVoice = voicesCatalog[0];
    const voiceIdx = parseInt(voiceInput.trim(), 10) - 1;

    if (!isNaN(voiceIdx) && voicesCatalog[voiceIdx]) {
      selectedVoice = voicesCatalog[voiceIdx];
    } else if (voiceInput.trim()) {
      const match = voicesCatalog.find(
        (v) =>
          v.id.toLowerCase() === voiceInput.trim().toLowerCase() ||
          v.name.toLowerCase() === voiceInput.trim().toLowerCase() ||
          v.voiceKey.toLowerCase() === voiceInput.trim().toLowerCase()
      );
      if (match) selectedVoice = match;
    }

    // API anahtarı kontrolü ve otomatik .env kaydı
    if (selectedVoice.provider === "gemini") {
      let geminiKey = process.env.GEMINI_API_KEY;
      if (!geminiKey) {
        geminiKey = await rl.question("\n🔑 GEMINI_API_KEY bulunamadı. Lütfen Gemini API anahtarınızı girin: ");
        if (geminiKey.trim()) {
          saveKeyToEnv("GEMINI_API_KEY", geminiKey.trim());
          process.env.GEMINI_API_KEY = geminiKey.trim();
        } else {
          console.warn("⚠️ Anahtar girilmedi, varsayılan ücretsiz Ava (Edge-TTS) sesine dönülüyor.");
          selectedVoice = voicesCatalog[0];
        }
      }
    } else if (selectedVoice.provider === "openai") {
      let openaiKey = process.env.OPENAI_API_KEY;
      if (!openaiKey) {
        openaiKey = await rl.question("\n🔑 OPENAI_API_KEY bulunamadı. Lütfen OpenAI API anahtarınızı girin: ");
        if (openaiKey.trim()) {
          saveKeyToEnv("OPENAI_API_KEY", openaiKey.trim());
          process.env.OPENAI_API_KEY = openaiKey.trim();
        } else {
          console.warn("⚠️ Anahtar girilmedi, varsayılan ücretsiz Ava (Edge-TTS) sesine dönülüyor.");
          selectedVoice = voicesCatalog[0];
        }
      }
    }

    console.log(`✅ Seçilen Seslendirmen: ${selectedVoice.name} (${selectedVoice.provider.toUpperCase()} - ${selectedVoice.voiceKey})`);

    // Projeye ve public altına seslendirmen bilgisini kaydet
    const publicDir = path.join(process.cwd(), "public");
    if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });
    fs.writeFileSync(
      path.join(publicDir, "voice_metadata.json"),
      JSON.stringify(selectedVoice, null, 2),
      "utf-8"
    );

    // Üretim Aşaması
    console.log("\n=======================================================");
    console.log("🚀 OTONOM ÜRETİM BAŞLADI");
    console.log("=======================================================");

    // Sesi ve altyazı senkronunu üret
    console.log(`\n🎙️ 1. Adım: '${selectedVoice.name}' Sesiyle Dublaj ve Senkron Üretiliyor...`);
    execSync(`python scripts/generate_audio.py ${selectedVoice.id}`, { stdio: "inherit" });

    // Kalite kontrol karelerini al
    console.log("\n🔍 2. Adım: Kalite Denetim Kareleri (Self-Audit) Alınıyor...");
    execSync(`node scripts/audit_frames.mjs`, { stdio: "inherit" });

    // Videoyu render al
    console.log("\n🎥 3. Adım: MP4 Video Render Alınıyor...");
    const timestamp = Date.now();
    const finalVideoPath = path.join(process.cwd(), "out", `video_${timestamp}.mp4`);
    execSync(`npx remotion render ReelVideo "${finalVideoPath}" --concurrency=4`, { stdio: "inherit" });

    console.log("\n=======================================================");
    console.log("🎉 TEBRİKLER! VİDEO BAŞARIYLA TAMAMLANDI");
    console.log(`📁 Dosya Yolu: ${finalVideoPath}`);
    console.log(`🎨 Uygulanan Mimari: ${selectedThemeKey}`);
    console.log(`🎙️ Seslendiren Sanatçı: ${selectedVoice.name} (${selectedVoice.voiceKey})`);

    let videoDurationSec = 0;
    const subsPath = path.join(process.cwd(), "public", "subtitles.json");
    if (fs.existsSync(subsPath)) {
      try {
        const subs = JSON.parse(fs.readFileSync(subsPath, "utf-8"));
        if (subs.length > 0) {
          videoDurationSec = Math.min(subs[subs.length - 1].end + 0.3, 120);
        }
      } catch (e) {}
    }
    if (videoDurationSec > 0) {
      console.log(`⏱️ Video Süresi: ${videoDurationSec.toFixed(1)} saniye (Ses bitişiyle tam senkron, maks 120s limitli)`);
    }
    console.log("=======================================================\n");

  } catch (error) {
    console.error("❌ Hata oluştu:", error.message);
  } finally {
    rl.close();
  }
}

function updateActiveTheme(themeKey) {
  const themeFilePath = path.join(process.cwd(), "src", "theme.ts");
  let content = fs.readFileSync(themeFilePath, "utf-8");
  
  // currentTheme export satırını değiştir
  content = content.replace(
    /export const currentTheme: ThemeConfig = [^;]+;/,
    `export const currentTheme: ThemeConfig = ${themeKey};`
  );

  fs.writeFileSync(themeFilePath, content, "utf-8");
  console.log(`💾 'src/theme.ts' yapılandırması '${themeKey}' olarak kaydedildi.`);
}

function saveKeyToEnv(key, value) {
  const envPath = path.join(process.cwd(), ".env");
  let content = fs.existsSync(envPath) ? fs.readFileSync(envPath, "utf-8") : "";
  if (content.includes(`${key}=`)) {
    content = content.replace(new RegExp(`${key}=.*`), `${key}=${value}`);
  } else {
    content += `\n${key}=${value}\n`;
  }
  fs.writeFileSync(envPath, content, "utf-8");
  console.log(`💾 ${key} anahtarı '.env' dosyasına başarıyla kaydedildi.`);
}

main();
