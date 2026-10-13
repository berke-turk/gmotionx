export interface ThemeConfig {
  name: string;
  colors: {
    background: string;     // %50 Warm Cream
    inkBlack: string;       // %30 Ink Black
    acidYellow: string;     // %15 Acid Yellow
    signalOrange: string;   // %5 Signal Orange
    pureWhite: string;      // Pure White
  };
  styles: {
    border: string;
    borderThick: string;
    shadowHard: string;
    shadowMedium: string;
    shadowSmall: string;
    borderRadius: string;
  };
}

// 🏛️ Varsayılan ve Aktif Tema: Neo-Brutalism
export const NEO_BRUTALISM_THEME: ThemeConfig = {
  name: "Neo-Brutalism",
  colors: {
    background: "#F4F0E6",   // %50 — Warm Cream (Ana arka plan, geniş alanlar)
    inkBlack: "#171717",     // %30 — Ink Black (Metinler, sert çerçeveler, gölgeler)
    acidYellow: "#DFFF00",   // %15 — Acid Yellow (Vurgu kelimeleri, aktif kartlar, CTA)
    signalOrange: "#FF5A36", // %5 — Signal Orange (Uyarılar, damgalar, karşıt fikirler)
    pureWhite: "#FFFFFF",    // Pure White (Kontrast zeminler)
  },
  styles: {
    border: "4px solid #171717",
    borderThick: "6px solid #171717",
    shadowHard: "8px 8px 0px #171717",
    shadowMedium: "5px 5px 0px #171717",
    shadowSmall: "3px 3px 0px #171717",
    borderRadius: "18px",
  },
};

// İstendiğinde farklı bir tema ile değiştirilebilir:
export const currentTheme: ThemeConfig = NEO_BRUTALISM_THEME;
