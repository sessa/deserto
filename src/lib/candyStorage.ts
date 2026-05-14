export const STORAGE_KEY = "deserto_candy_picks_v1";

export type PickRecord = {
  /** YYYY-MM-DD local */
  dateKey: string;
  label: string;
  savedAt: string;
};

export type PickMap = Record<string, PickRecord>;

export function loadPickMap(): PickMap {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object") return {};
    return parsed as PickMap;
  } catch {
    return {};
  }
}

export function savePickForDay(dateKey: string, label: string): PickMap {
  const map = loadPickMap();
  const next: PickMap = {
    ...map,
    [dateKey]: { dateKey, label, savedAt: new Date().toISOString() },
  };
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return next;
}
