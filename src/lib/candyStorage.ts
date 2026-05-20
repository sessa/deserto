import type { TreatCategory } from "@/data/candies";

export const STORAGE_KEY = "deserto_candy_picks_v1";

export type PickRecord = {
  /** YYYY-MM-DD local */
  dateKey: string;
  label: string;
  savedAt: string;
  /** Present for new saves; omitted for picks stored before categories existed. */
  category?: TreatCategory;
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

export function savePickForDay(
  dateKey: string,
  label: string,
  category?: TreatCategory,
): PickMap {
  const map = loadPickMap();
  const record: PickRecord = {
    dateKey,
    label,
    savedAt: new Date().toISOString(),
    ...(category ? { category } : {}),
  };
  const next: PickMap = {
    ...map,
    [dateKey]: record,
  };
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return next;
}
