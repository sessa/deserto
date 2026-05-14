"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { CandyBackground } from "@/components/candy/CandyBackground";
import { ChoiceCalendar } from "@/components/candy/ChoiceCalendar";
import { PrizeWheel } from "@/components/candy/PrizeWheel";
import { CANDY_POOL } from "@/data/candies";
import { savePickForDay, loadPickMap, type PickMap } from "@/lib/candyStorage";
import { getDailyCandyOptions } from "@/lib/dailyCandy";

export default function CandyRoom() {
  const [wheelOpen, setWheelOpen] = useState(false);
  const [picked, setPicked] = useState<{ label: string; index: number } | null>(null);
  const [busy, setBusy] = useState(false);
  const [pickMap, setPickMap] = useState<PickMap>({});
  const [savedFlash, setSavedFlash] = useState(false);

  const reduceMotion = usePrefersReducedMotion();

  useEffect(() => {
    setPickMap(loadPickMap());
  }, []);

  const daily = useMemo(() => getDailyCandyOptions(new Date(), CANDY_POOL), []);

  const todayPick = pickMap[daily.dateKey];

  function confirmChoice() {
    if (!picked?.label) return;
    const next = savePickForDay(daily.dateKey, picked.label);
    setPickMap(next);
    setSavedFlash(true);
    window.setTimeout(() => setSavedFlash(false), 2000);
  }

  return (
    <div className="relative min-h-screen pb-24 text-purple-950">
      <CandyBackground />

      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center gap-8 px-4 py-10">
        <nav className="w-full">
          <Link
            href="/"
            className="inline-flex items-center rounded-lg bg-white/80 px-3 py-2 text-sm font-semibold text-purple-900 shadow backdrop-blur hover:bg-white"
          >
            ← Back home
          </Link>
        </nav>

        <header className="text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-purple-800">Deserto</p>
          <h1 className="text-4xl font-extrabold tracking-tight text-purple-950 sm:text-5xl">
            Daily candy picker
          </h1>
          <p className="mt-2 max-w-xl text-balance text-lg text-purple-900/85">{daily.dateLabel}</p>
        </header>

        <section className="w-full rounded-3xl border-2 border-amber-800/25 bg-white/90 p-6 shadow-xl backdrop-blur-md">
          <h2 className="text-center text-2xl font-bold text-purple-950">Today’s three treats</h2>
          <p className="mt-2 text-center text-sm text-purple-900/80">
            These three stay the same all day — then spin the wheel to pick fun.
          </p>
          <ol className="mt-6 grid gap-3 font-semibold">
            {daily.picks.map((name, i) => (
              <li
                key={name}
                className="rounded-2xl border border-purple-100 bg-gradient-to-br from-yellow-50 to-amber-100 px-4 py-4 text-purple-950 shadow-inner"
              >
                <span className="mr-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-rose-500 text-lg text-white shadow">
                  {i + 1}
                </span>
                {name}
              </li>
            ))}
          </ol>

          {!wheelOpen ? (
            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={() => setWheelOpen(true)}
                className="rounded-full bg-violet-600 px-10 py-4 text-xl font-extrabold text-white shadow-lg transition hover:bg-violet-500"
              >
                Show my prize wheel!
              </button>
            </div>
          ) : (
            <div className="mt-10 flex flex-col items-center gap-6 rounded-3xl border border-purple-100 bg-white/95 p-6 shadow-inner">
              <PrizeWheel
                labels={daily.picks}
                reduceMotion={reduceMotion}
                onSpinBusyChange={setBusy}
                onLandedChange={setPicked}
              />

              <p className="min-h-[1.75rem] text-center text-lg font-semibold text-purple-900">
                {picked?.label
                  ? `Landed on: ${picked.label}`
                  : busy
                    ? "Spinning …"
                    : "Spin anytime — unlimited spins!"}
              </p>

              <button
                type="button"
                disabled={!picked?.label || busy}
                onClick={confirmChoice}
                className="rounded-full bg-emerald-600 px-8 py-3 text-lg font-bold text-white shadow-md transition hover:bg-emerald-500 disabled:pointer-events-none disabled:opacity-40"
              >
                I choose this one for today
              </button>

              {savedFlash ? (
                <p className="text-center font-bold text-emerald-700" role="status">
                  Saved on this calendar! Check below.
                </p>
              ) : null}

              {todayPick ? (
                <p className="text-center text-sm text-purple-900/80">
                  Already saved today:{" "}
                  <span className="font-semibold text-purple-950">{todayPick.label}</span> — tapping
                  “I choose…” will replace it with the last landed candy.
                </p>
              ) : null}

              <button
                type="button"
                onClick={() => setWheelOpen(false)}
                className="text-sm font-semibold text-purple-700 underline-offset-4 hover:underline"
              >
                Hide the wheel for now
              </button>
            </div>
          )}
        </section>

        <ChoiceCalendar picks={pickMap} />

        <p className="max-w-md text-center text-sm text-purple-900/85">
          Your calendar lives in this browser on this computer only. Clearing site storage will erase
          past picks unless we add saving online later.
        </p>
      </div>
    </div>
  );
}

function usePrefersReducedMotion(): boolean | undefined {
  const [pref, setPref] = useState<boolean | undefined>(undefined);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setPref(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);
  return pref;
}
