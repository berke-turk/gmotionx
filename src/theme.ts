export interface ThemeConfig {
  id: string;
  name: string;
  description: string;
  colors: {
    background: string;     // Ana arka plan
    textPrimary: string;    // Ana metin
    textSecondary: string;  // İkincil metin
    accentPrimary: string;  // Birinci vurgu (aktif altyazı)
    accentSecondary: string;// İkinci vurgu (damgalar, uyarılar)
    cardBackground: string; // Kart zemini
    borderColor: string;    // Çerçeve rengi

    // Takma adlar ve geriye dönük uyumluluk
    acidYellow?: string;
    signalOrange?: string;
    inkBlack?: string;
    warmCream?: string;
    pureWhite?: string;
  };
  styles: {
    border: string;
    borderThick: string;
    boxShadow: string;
    boxShadowSmall: string;
    borderRadius: string;
    shadowHard?: string;
    shadowSmall?: string;
    shadowMedium?: string;
    backdropBlur?: string;
  };
}

// 🏛️ 1. NEO-BRUTALISM (Sert gölgeler, kalın siyah çerçeveler, yüksek kontrast)
export const NEO_BRUTALISM: ThemeConfig = {
  id: "neo-brutalism",
  name: "Neo-Brutalism",
  description: "Sert gölgeler, kalın çerçeveler, Warm Cream ve Acid Yellow kontrastı",
  colors: {
    background: "#F4F0E6",      // %50 Warm Cream
    textPrimary: "#171717",     // %30 Ink Black
    textSecondary: "#4B5563",
    accentPrimary: "#DFFF00",   // %15 Acid Yellow
    accentSecondary: "#FF5A36", // %5 Signal Orange
    cardBackground: "#FFFFFF",  // Pure White
    borderColor: "#171717",
    acidYellow: "#DFFF00",
    signalOrange: "#FF5A36",
    inkBlack: "#171717",
    warmCream: "#F4F0E6",
    pureWhite: "#FFFFFF",
  },
  styles: {
    border: "4px solid #171717",
    borderThick: "6px solid #171717",
    boxShadow: "8px 8px 0px #171717",
    boxShadowSmall: "3px 3px 0px #171717",
    borderRadius: "18px",
    shadowHard: "8px 8px 0px #171717",
    shadowSmall: "3px 3px 0px #171717",
    shadowMedium: "6px 6px 0px #171717",
  },
};

// 💎 2. GLASSMORPHISM & MOTION DESIGN (Buzlu cam, neon parıltılar, koyu SaaS estetiği)
export const GLASSMORPHISM: ThemeConfig = {
  id: "glassmorphism",
  name: "Glassmorphism & Motion",
  description: "Buzlu cam efekti (frosted glass), neon siber parıltılar ve derin koyu zemin",
  colors: {
    background: "#0A0D14",
    textPrimary: "#FFFFFF",
    textSecondary: "#94A3B8",
    accentPrimary: "#00F2FE",   // Neon Cyan
    accentSecondary: "#9D4EDD", // Electric Purple
    cardBackground: "rgba(255, 255, 255, 0.07)",
    borderColor: "rgba(255, 255, 255, 0.18)",
    acidYellow: "#00F2FE",
    signalOrange: "#9D4EDD",
    inkBlack: "#0A0D14",
    warmCream: "#111827",
    pureWhite: "#FFFFFF",
  },
  styles: {
    border: "1.5px solid rgba(255, 255, 255, 0.2)",
    borderThick: "2px solid rgba(0, 242, 254, 0.6)",
    boxShadow: "0 20px 50px rgba(0, 0, 0, 0.6), 0 0 25px rgba(0, 242, 254, 0.2)",
    boxShadowSmall: "0 8px 24px rgba(0, 0, 0, 0.4)",
    borderRadius: "24px",
    shadowHard: "0 20px 50px rgba(0, 0, 0, 0.6)",
    shadowSmall: "0 8px 24px rgba(0, 0, 0, 0.4)",
    shadowMedium: "0 14px 35px rgba(0, 0, 0, 0.5)",
    backdropBlur: "blur(20px)",
  },
};

// 📐 3. SWISS / INTERNATIONAL TYPOGRAPHIC STYLE (Katı ızgara, Helvetica/Montserrat ciddiyeti, İsviçre Kırmızısı)
export const SWISS_STYLE: ThemeConfig = {
  id: "swiss-style",
  name: "Swiss / International Typographic",
  description: "Tipografik ızgara, modernist afiş düzeni, İsviçre Kırmızısı ve katı asimetri",
  colors: {
    background: "#F5F5F7",      // Off-white modernist zemin
    textPrimary: "#0F0F0F",     // Katı siyah
    textSecondary: "#525252",
    accentPrimary: "#E30613",   // İsviçre Uluslararası Kırmızısı
    accentSecondary: "#0F0F0F",
    cardBackground: "#FFFFFF",
    borderColor: "#E5E5E5",
    acidYellow: "#E30613",
    signalOrange: "#E30613",
    inkBlack: "#0F0F0F",
    warmCream: "#F5F5F7",
    pureWhite: "#FFFFFF",
  },
  styles: {
    border: "2px solid #0F0F0F",
    borderThick: "3px solid #0F0F0F",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
    boxShadowSmall: "0 4px 12px rgba(0, 0, 0, 0.05)",
    borderRadius: "4px", // İsviçre stilinde keskin köşeler
    shadowHard: "0 10px 30px rgba(0, 0, 0, 0.08)",
    shadowSmall: "0 4px 12px rgba(0, 0, 0, 0.05)",
    shadowMedium: "0 8px 20px rgba(0, 0, 0, 0.07)",
  },
};

// 🌿 4. ORGANIC / WARM MINIMALISM (Huzurlu toprak tonları, pişmiş toprak, adaçayı, doğal akış)
export const ORGANIC_MINIMALISM: ThemeConfig = {
  id: "organic-minimalism",
  name: "Organic / Warm Minimalism",
  description: "Doğal toprak tonları (Terracotta, Sage, Sand), yumuşak kavisler ve huzurlu akış",
  colors: {
    background: "#EFECE6",      // Sand / Yulaf zemini
    textPrimary: "#2A2421",     // Derin espresso
    textSecondary: "#6E655F",
    accentPrimary: "#C86D51",   // Terracotta (Pişmiş toprak)
    accentSecondary: "#7D8C71", // Sage Green (Adaçayı yeşili)
    cardBackground: "#FAF8F5",  // Sıcak pamuk beyazı
    borderColor: "#DDD7CD",
    acidYellow: "#C86D51",
    signalOrange: "#7D8C71",
    inkBlack: "#2A2421",
    warmCream: "#EFECE6",
    pureWhite: "#FAF8F5",
  },
  styles: {
    border: "1.5px solid #DDD7CD",
    borderThick: "2px solid #C86D51",
    boxShadow: "0 15px 35px rgba(42, 36, 33, 0.06)",
    boxShadowSmall: "0 6px 18px rgba(42, 36, 33, 0.04)",
    borderRadius: "28px", // Çok yumuşak organik kavisler
    shadowHard: "0 15px 35px rgba(42, 36, 33, 0.06)",
    shadowSmall: "0 6px 18px rgba(42, 36, 33, 0.04)",
    shadowMedium: "0 10px 25px rgba(42, 36, 33, 0.05)",
  },
};

// 📰 5. PAPER & CUTOUT EXPLAINER (Vox, Kurzgesagt, Asıl Olay Bu koli bantlı defter kurgusu)
export const PAPER_EXPLAINER: ThemeConfig = {
  id: "paper-explainer",
  name: "Paper & Cutout Explainer",
  description: "Koli bantlı kâğıt kartlar, milimetrik defter dokusu, sarı fosforlu kalem ve el çizimi animasyonlar",
  colors: {
    background: "#F2EFE9",      // Sıcak kâğıt / hafif parşömen dokusu
    textPrimary: "#18181B",     // Koyu kömür siyahı
    textSecondary: "#52525B",
    accentPrimary: "#FBBF24",   // Sarı fosforlu kalem (highlighter)
    accentSecondary: "#E11D48", // Kırmızı düzeltme kalemi & onay damgası
    cardBackground: "#FAF8F5",  // Temiz kâğıt kartı
    borderColor: "#E4DEC8",
    acidYellow: "#FBBF24",
    signalOrange: "#E11D48",
    inkBlack: "#18181B",
    warmCream: "#F2EFE9",
    pureWhite: "#FAF8F5",
  },
  styles: {
    border: "1.5px solid #E4DEC8",
    borderThick: "2.5px solid #18181B",
    boxShadow: "0 12px 24px -4px rgba(0, 0, 0, 0.12), 0 4px 8px -2px rgba(0, 0, 0, 0.06)",
    boxShadowSmall: "0 4px 10px rgba(0, 0, 0, 0.08)",
    borderRadius: "6px", // Kâğıt gibi hafif kırpılmış köşeler
    shadowHard: "0 12px 24px -4px rgba(0, 0, 0, 0.12)",
    shadowSmall: "0 4px 10px rgba(0, 0, 0, 0.08)",
    shadowMedium: "0 8px 18px rgba(0, 0, 0, 0.10)",
  },
};

// Desteklenen tüm temalar listesi
export const AVAILABLE_THEMES: Record<string, ThemeConfig> = {
  "neo-brutalism": NEO_BRUTALISM,
  "glassmorphism": GLASSMORPHISM,
  "swiss-style": SWISS_STYLE,
  "organic-minimalism": ORGANIC_MINIMALISM,
  "paper-explainer": PAPER_EXPLAINER,
};

// Aktif Seçili Tema (Varsayılan: Neo-Brutalism)
export const currentTheme: ThemeConfig = GLASSMORPHISM;
