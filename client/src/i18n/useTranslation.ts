import en from "./en.json";
import uk from "./uk.json";

type Catalog = Record<string, string>;

const catalogs: Record<string, Catalog> = { en, uk };

const serverErrorToKey: Record<string, string> = {
  "Invalid parameters": "error.invalidParams",
  "Game not found": "error.gameNotFound",
  "Game is full": "error.gameFull",
  "Missing fields": "error.missingFields",
  "Invalid turn or not your turn": "error.invalidTurn",
  "Cannot reveal": "error.cannotReveal",
};

function interpolate(template: string, params?: Record<string, string | number>): string {
  if (!params) return template;
  return template.replace(/\{(\w+)\}/g, (_, key) =>
    params[key] !== undefined ? String(params[key]) : `{${key}}`
  );
}

export function useTranslation(language: string) {
  const catalog = catalogs[language] || catalogs["en"];

  function t(key: string, params?: Record<string, string | number>): string {
    if (key === "") return "";
    const value = catalog[key];
    if (value === undefined) return key;
    return interpolate(value, params);
  }

  function translateServerError(serverError: string): string {
    const key = serverErrorToKey[serverError];
    return key ? t(key) : serverError;
  }

  return { t, translateServerError, language };
}
