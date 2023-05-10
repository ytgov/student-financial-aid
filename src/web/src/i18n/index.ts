import { createI18n } from "vue-i18n";
import { en } from "./en-us";
import { fr } from "./fr-ca";

const messages = {
  en,
  fr,
};

export default createI18n({
  locale: "en", // <--- 1
  fallbackLocale: "fr", // <--- 2
  legacy: false,
  messages,
});
