import type { TreatItem } from "@/data/candies";

/** Local calendar day → YYYY-MM-DD */
export function localDateKey(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function addCalendarDays(dateKey: string, deltaDays: number): string {
  const [y, m, d] = dateKey.split("-").map(Number);
  const dt = new Date(y, m - 1, d + deltaDays);
  return localDateKey(dt);
}

function hashToSeed(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a += 0x6d2b79f5;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffleCopy<T>(items: readonly T[], rng: () => number): T[] {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export type TreatPick = TreatItem;

function trioFor(
  pool: readonly TreatPick[],
  dateKey: string,
  salt: number,
): TreatPick[] {
  const seed = hashToSeed(`${dateKey}|${salt}`);
  const rng = mulberry32(seed);
  const shuffled = shuffleCopy(pool, rng);
  return shuffled.slice(0, 3);
}

function sameMultiset(a: TreatPick[], b: TreatPick[]): boolean {
  if (a.length !== b.length) return false;
  const sa = [...a.map((x) => x.label)].sort();
  const sb = [...b.map((x) => x.label)].sort();
  return sa.every((v, i) => v === sb[i]);
}

const MAX_SALT_TRIES = 256;

export type DailyCandyResult = {
  picks: TreatPick[];
  dateKey: string;
  dateLabel: string;
};

/**
 * Stable picks for local calendar date; bumps salt if today's trio equals
 * yesterday's default trio (salt 0), when pool has more than 3 items.
 */
export function getDailyCandyOptions(
  now: Date,
  pool: readonly TreatPick[],
): DailyCandyResult {
  const dateKey = localDateKey(now);
  const yesterdayKey = addCalendarDays(dateKey, -1);
  const yDefault = trioFor(pool, yesterdayKey, 0);

  let picks = trioFor(pool, dateKey, 0);
  let salt = 0;

  while (pool.length > 3 && sameMultiset(picks, yDefault) && salt < MAX_SALT_TRIES) {
    salt += 1;
    picks = trioFor(pool, dateKey, salt);
  }

  const dateLabel = now.toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return { picks, dateKey, dateLabel };
}
