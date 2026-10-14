import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();

const API_KEY = process.env.APIFY_API_TOKEN;

async function researchAttentionErgonomics() {
  console.log("🚀 [APIFY RESEARCH] Görsel Dikkat, Göz Takibi & Retansiyon Sanatı Taraması başlatılıyor...");

  const queries = [
    '"motion graphics" "eye tracking" explainer "visual hierarchy" retention',
    '"vox style" "johnny harris" motion design techniques breakdown "visual pacing"',
    'vertical video retention "visual hooks" editing "eye movement" capcut after effects',
    '"magnatesmedia" "visual storytelling" documentary motion graphics editing breakdown'
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
  while (!isDone && attempts < 25) {
    await new Promise(r => setTimeout(r, 4000));
    attempts++;
    const sRes = await fetch(`https://api.apify.com/v2/actor-runs/${runId}?token=${API_KEY}`);
    const sData = await sRes.json();
    const st = sData.data?.status;
    console.log(`Durum: ${st} (${attempts}/25)`);
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
  fs.writeFileSync(path.join(outDir, "attention_ergonomics_research.json"), JSON.stringify(items, null, 2), "utf-8");
  console.log(`✅ Ergonomi Araştırma sonuçları kaydedildi: out/research/attention_ergonomics_research.json`);

  for (const page of items) {
    console.log(`\n📌 Sorgu: ${page.searchQuery?.term}`);
    if (page.aiOverview?.content) {
      console.log(`💡 AI Overview: ${page.aiOverview.content.slice(0, 300)}...`);
    }
    if (page.organicResults) {
      for (const res of page.organicResults.slice(0, 3)) {
        console.log(`  - [${res.title}](${res.url})`);
        console.log(`    ${res.description?.slice(0, 160)}...`);
      }
    }
  }
}

researchAttentionErgonomics().catch(err => console.error("Hata:", err.message));
