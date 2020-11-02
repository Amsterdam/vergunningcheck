import i18n from "i18next";
import { initReactI18next } from "react-i18next";
const nl = require("./nl");

export default i18n
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  .init({
    resources: { nl },
    lng: "en",
    fallbackLng: "nl",
    debug: false,

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });
