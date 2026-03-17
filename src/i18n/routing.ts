import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["pt", "en", "pt-br", "es"],
  defaultLocale: "pt",
});
