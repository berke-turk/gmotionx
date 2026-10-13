import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const API_KEY = process.env.APIFY_API_TOKEN;

if (!API_KEY) {
  console.error("❌ Hata: .env dosyasında APIFY_API_TOKEN bulunamadı!");
  process.exit(1);
}

/**
 * Apify Google Search Scraper veya Web Scraper kullanarak hızlı araştırma yapar.
 * @param {string} query Araştırılacak konu
 * @param {number} maxResults Maksimum sonuç sayısı
 */
export async function searchGoogleWithApify(query, maxResults = 5) {
  console.log(`🔍 Apify üzerinden araştırılıyor: "${query}"...`);
  
  // Apify apify/google-search-scraper actor'ü çalıştır
  const actorId = "apify~google-search-scraper";
  const runResponse = await fetch(`https://api.apify.com/v2/acts/${actorId}/runs?token=${API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      queries: query,
      maxPagesPerQuery: 1,
      resultsPerPage: maxResults,
    }),
  });

  const runData = await runResponse.json();
  if (!runData.data || !runData.data.defaultDatasetId) {
    throw new Error(`Apify Actor başlatılamadı: ${JSON.stringify(runData)}`);
  }

  const datasetId = runData.data.defaultDatasetId;
  const runId = runData.data.id;
  console.log(`⏳ Apify görevi başladı (Run ID: ${runId}). Sonuçlar bekleniyor...`);

  // Sonuçları bekle
  let isFinished = false;
  let attempts = 0;
  while (!isFinished && attempts < 20) {
    await new Promise((r) => setTimeout(r, 3000));
    attempts++;
    const statusRes = await fetch(`https://api.apify.com/v2/actor-runs/${runId}?token=${API_KEY}`);
    const statusData = await statusRes.json();
    const status = statusData.data.status;
    
    if (status === "SUCCEEDED") {
      isFinished = true;
    } else if (status === "FAILED" || status === "ABORTED") {
      throw new Error(`Apify görevi başarısız oldu: ${status}`);
    }
  }

  // Veri kümesini al
  const itemsRes = await fetch(`https://api.apify.com/v2/datasets/${datasetId}/items?token=${API_KEY}&clean=true`);
  const items = await itemsRes.json();
  return items;
}

// CLI üzerinden doğrudan çalıştırma desteği
if (process.argv[1]?.endsWith("apify_research.mjs")) {
  const query = process.argv.slice(2).join(" ") || "Atatürk inkılapçılık ve laiklik tanımı";
  searchGoogleWithApify(query, 3)
    .then((results) => {
      console.log("✅ Apify Araştırma Sonuçları:");
      console.log(JSON.stringify(results, null, 2));
    })
    .catch((err) => {
      console.error("Araştırma hatası:", err.message);
    });
}
