import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();

const API_KEY = process.env.APIFY_API_TOKEN;

async function runDeepEducationResearch() {
  console.log("🌟 [APIFY DEEP DIVE] Küresel & Yerli Viral Eğitici Kanal Mimarileri Taraması başlatılıyor...");

  // 1. DÜNYA VE TÜRKİYE'NİN EN İYİ EĞİTİCİ ANLATIM MİMARİLERİ
  const queries = [
    // A) Kurzgesagt & 3Blue1Brown: Bilim, Kozmoloji ve Matematiksel Animasyon Dili
    '"kurzgesagt" motion design visual style guide colors animation rules breakdown',
    '"3blue1brown" manim visual mathematical intuition animation principles',

    // B) Barış Özcan, Bebar Bilim & Evrim Ağacı: Türkçe Eğitici Storytelling & Görsel Hiyerarşi
    'site:youtube.com "barış özcan" storytelling visual pacing editing style breakdown',
    'site:youtube.com "evrim ağacı" bilimsel infografik şema görselleştirme teknikleri',
    'site:youtube.com "bebar bilim" felsefe düşünce deneyi animasyon kurgu',

    // C) Dan Koe & Yan Graphics: Minimalist Brutalist Visual Thinking (Kavramsal Zihin Haritaları)
    '"dan koe" "yan graphics" visual thinking motion graphics 2d animation breakdown',
    '"visual metaphors" explainer video retention "cognitive load" design rules',

    // D) Ayhan Tarakcı & Blueprint / X-Ray Kesit Mimarisi
    'technical blueprint explainer video motion design x-ray cross section animation'
  ].join("\n");

  const actorId = "apify~google-search-scraper";
  const runRes = await fetch(`https://api.apify.com/v2/acts/${actorId}/runs?token=${API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      queries: queries,
      maxPagesPerQuery: 1,
      resultsPerPage: 6
    })
  });

  const runData = await runRes.json();
  const runId = runData.data?.id;
  const datasetId = runData.data?.defaultDatasetId;
  console.log(`⏳ Apify Run ID: ${runId}`);

  let isDone = false;
  let attempts = 0;
  while (!isDone && attempts < 30) {
    await new Promise(r => setTimeout(r, 4000));
    attempts++;
    const sRes = await fetch(`https://api.apify.com/v2/actor-runs/${runId}?token=${API_KEY}`);
    const sData = await sRes.json();
    const st = sData.data?.status;
    console.log(`Durum: ${st} (${attempts}/30)`);
    if (st === "SUCCEEDED") {
      isDone = true;
    } else if (st === "FAILED" || st === "ABORTED") {
      throw new Error("Apify hatası: " + st);
    }
  }

  const itemsRes = await fetch(`https://api.apify.com/v2/datasets/${datasetId}/items?token=${API_KEY}&clean=true`);
  const items = await itemsRes.json();

  const outDir = path.join(process.cwd(), "out", "research");
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, "deep_viral_education_research.json"), JSON.stringify(items, null, 2), "utf-8");
  console.log(`✅ Derin Araştırma sonuçları kaydedildi: out/research/deep_viral_education_research.json`);

  for (const page of items) {
    console.log(`\n======================================================`);
    console.log(`📌 Sorgu: ${page.searchQuery?.term}`);
    if (page.aiOverview?.content) {
      console.log(`💡 AI OVERVIEW:\n${page.aiOverview.content.slice(0, 450)}...\n`);
    }
    if (page.organicResults) {
      for (const res of page.organicResults.slice(0, 3)) {
        console.log(`  - [${res.title}](${res.url})`);
        if (res.description) console.log(`    ${res.description.slice(0, 160)}...`);
      }
    }
  }
}

runDeepEducationResearch().catch(err => console.error("Hata:", err.message));
