import i18next from "i18next";
import { initReactI18next } from "react-i18next";

i18next.use(initReactI18next).init({
  resources: {
    en: { translation: require("../locales/en.json") },
    hi: { translation: require("../locales/hi.json") },
    ta: { translation: require("../locales/ta.json") },
    pa: { translation: require("../locales/pa.json") },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18next;
