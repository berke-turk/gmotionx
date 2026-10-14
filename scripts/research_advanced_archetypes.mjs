import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();

const API_KEY = process.env.APIFY_API_TOKEN;

async function researchAdvanced() {
  console.log("🌐 [APIFY DEEP DIVE] Geopolitik Harita, Finans & Gelişmiş SFX Trendleri taranıyor...");

  const queries = [
    'site:youtube.com/shorts "johnny harris" style map animation explainer',
    'site:youtube.com/shorts "finance explainer" chart animation motion graphics',
    'site:instagram.com/reel "map animation" 3d territory motion design',
    'site:instagram.com/reel "sound design" motion graphics explainer sfx tutorial'
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
  fs.writeFileSync(path.join(outDir, "advanced_archetypes.json"), JSON.stringify(items, null, 2), "utf-8");
  console.log(`✅ Araştırma sonuçları kaydedildi: out/research/advanced_archetypes.json`);

  for (const page of items) {
    console.log(`\n📌 Sorgu: ${page.searchQuery?.term}`);
    if (page.organicResults) {
      for (const res of page.organicResults.slice(0, 4)) {
        console.log(`  - [${res.title}](${res.url})`);
        console.log(`    ${res.description?.slice(0, 140)}...`);
      }
    }
  }
}

researchAdvanced().catch(err => console.error("Hata:", err.message));
