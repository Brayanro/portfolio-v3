import en from "./en.json";
import es from "./es.json";

type Translations = typeof es;

const translations: Record<string, Translations> = { es, en };

const STORAGE_KEY = "locale";
const SUPPORTED_LOCALES = ["es", "en"] as const;
type Locale = (typeof SUPPORTED_LOCALES)[number];

function isSupportedLocale(locale: string): locale is Locale {
  return SUPPORTED_LOCALES.includes(locale as Locale);
}

export function getLocale(): Locale {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored && isSupportedLocale(stored)) {
    return stored;
  }

  const browserLang = navigator.language.split("-")[0];
  if (isSupportedLocale(browserLang)) {
    return browserLang;
  }

  return "es";
}

export function setLocale(locale: Locale): void {
  localStorage.setItem(STORAGE_KEY, locale);
  document.documentElement.lang = locale;
  applyTranslations(locale);
  document.dispatchEvent(new CustomEvent("locale-changed", { detail: { locale } }));
}

export function t(key: string, locale?: Locale): string {
  const currentLocale = locale || getLocale();
  const dict = translations[currentLocale];
  const keys = key.split(".");
  let value: unknown = dict;

  for (const k of keys) {
    if (value && typeof value === "object" && k in value) {
      value = (value as Record<string, unknown>)[k];
    } else {
      return key;
    }
  }

  return typeof value === "string" ? value : key;
}

export function applyTranslations(locale?: Locale): void {
  const currentLocale = locale || getLocale();

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (!key) return;
    const translation = t(key, currentLocale);
    if (translation !== key) {
      el.innerHTML = translation;
    }
  });

  document.querySelectorAll("[data-i18n-attr]").forEach((el) => {
    const raw = el.getAttribute("data-i18n-attr");
    if (!raw) return;

    const pairs = raw.split(",");
    for (const pair of pairs) {
      const [attr, key] = pair.split(":").map((s) => s.trim());
      if (!attr || !key) continue;
      const translation = t(key, currentLocale);
      if (translation !== key) {
        el.setAttribute(attr, translation);
      }
    }
  });

  const langEs = document.getElementById("lang-es");
  const langEn = document.getElementById("lang-en");
  if (langEs && langEn) {
    if (currentLocale === "es") {
      langEs.classList.add("text-[#3B82F6]", "font-bold");
      langEs.classList.remove("opacity-50");
      langEn.classList.remove("text-[#3B82F6]", "font-bold");
      langEn.classList.add("opacity-50");
    } else {
      langEn.classList.add("text-[#3B82F6]", "font-bold");
      langEn.classList.remove("opacity-50");
      langEs.classList.remove("text-[#3B82F6]", "font-bold");
      langEs.classList.add("opacity-50");
    }
  }
}

export function initI18n(): void {
  const locale = getLocale();
  localStorage.setItem(STORAGE_KEY, locale);
  document.documentElement.lang = locale;
  applyTranslations(locale);
}
