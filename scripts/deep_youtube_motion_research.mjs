import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const API_KEY = process.env.APIFY_API_TOKEN;
const RUN_ID = process.argv[2] || "JF3QFYVnmcYc8DY5m";

async function fetchResults() {
  console.log(`⏳ Apify görevi kontrol ediliyor (Run ID: ${RUN_ID})...`);

  let finished = false;
  let attempts = 0;

  while (!finished && attempts < 30) {
    await new Promise((r) => setTimeout(r, 4000));
    attempts++;
    const statusRes = await fetch(`https://api.apify.com/v2/actor-runs/${RUN_ID}?token=${API_KEY}`);
    const statusData = await statusRes.json();
    const status = statusData?.data?.status;
    console.log(`Durum (${attempts}): ${status}`);

    if (status === "SUCCEEDED") {
      finished = true;
      const datasetId = statusData.data.defaultDatasetId;
      const itemsRes = await fetch(`https://api.apify.com/v2/datasets/${datasetId}/items?token=${API_KEY}`);
      const items = await itemsRes.json();

      const outDir = path.join(process.cwd(), "out", "research");
      if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

      const outFile = path.join(outDir, "youtube_motion_showcases.json");
      fs.writeFileSync(outFile, JSON.stringify(items, null, 2), "utf-8");
      console.log(`✅ [APIFY] ${items.length} adet YouTube video verisi kaydedildi: ${outFile}`);

      for (const item of items) {
        console.log("\n-------------------------------------------");
        console.log(`🎬 BAŞLIK: ${item.title}`);
        console.log(`👤 YAZAR: ${item.channelName || item.author}`);
        console.log(`⏱️ SÜRE: ${item.duration}`);
        console.log(`📝 AÇIKLAMA ÖZETİ:\n${(item.text || item.description || "").slice(0, 300)}...`);
        if (item.subtitlesText) {
          console.log(`🗣️ TRANSKRİPT:\n${item.subtitlesText.slice(0, 400)}...`);
        }
      }
      return items;
    } else if (status === "FAILED" || status === "ABORTED" || status === "TIMED-OUT") {
      throw new Error(`Apify görevi durduruldu veya başarısız oldu: ${status}`);
    }
  }
}

fetchResults().catch((e) => console.error("Hata:", e.message));
