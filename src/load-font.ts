import { loadFont as loadMontserrat } from "@remotion/google-fonts/Montserrat";

// Montserrat Latin-Extended (Türkçe tam destek: ç, ğ, ı, ö, ş, ü, Ç, Ğ, İ, Ö, Ş, Ü)
export const { fontFamily: TurkishFont } = loadMontserrat("normal", {
  weights: ["800", "900"],
  subsets: ["latin-ext", "latin"],
});

export const TheBoldFont = TurkishFont;
export const loadFont = () => ({ fontFamily: TurkishFont });

