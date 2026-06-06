"use client";

import { useEffect, useMemo, useState } from "react";
import { CandyBackground } from "@/components/candy/CandyBackground";
import { ChoiceCalendar } from "@/components/candy/ChoiceCalendar";
import { WheelDesignSelect } from "@/components/candy/WheelDesignSelect";
import { PrizeWheel } from "@/components/candy/PrizeWheel";
import { DEFAULT_WHEEL_DESIGN_ID, type WheelDesignId } from "@/data/wheelThemes";
import { loadWheelDesignId, saveWheelDesignId } from "@/lib/wheelDesignStorage";
import { choosePanelButtonClass, eyebrowClass, helperTextClass, panelClass } from "@/components/candy/styles";
import { TreatIcon } from "@/components/candy/TreatIcon";
import type { TreatCategory } from "@/data/candies";
import { CANDY_POOL, categoryForTreatLabel } from "@/data/candies";
import { savePickForDay, loadPickMap, type PickMap } from "@/lib/candyStorage";
import { getDailyCandyOptions } from "@/lib/dailyCandy";
import { fireWheelConfetti } from "@/lib/wheelConfetti";

export default function CandyRoom() {
  const [picked, setPicked] = useState<{
    label: string;
    index: number;
    category: TreatCategory;
  } | null>(null);
  const [busy, setBusy] = useState(false);
  const [pickMap, setPickMap] = useState<PickMap>({});
  const [savedFlash, setSavedFlash] = useState(false);
  const [wheelDesignId, setWheelDesignId] = useState<WheelDesignId>(DEFAULT_WHEEL_DESIGN_ID);
  const reduceMotion = usePrefersReducedMotion();

  useEffect(() => {
    setPickMap(loadPickMap());
    setWheelDesignId(loadWheelDesignId());
  }, []);

  function handleWheelDesignChange(id: WheelDesignId) {
    setWheelDesignId(id);
    saveWheelDesignId(id);
  }

  function handleSpinStart() {
    if (reduceMotion) return;
    fireWheelConfetti();
  }

  const daily = useMemo(() => getDailyCandyOptions(new Date(), CANDY_POOL), []);

  const todayPick = pickMap[daily.dateKey];
  const hasLanded = Boolean(picked?.label);
  const statusCategory: TreatCategory | undefined =
    picked?.category ??
    (!busy
      ? (todayPick?.category ??
        (todayPick ? categoryForTreatLabel(todayPick.label) : undefined))
      : undefined);

  function confirmChoice() {
    if (!picked?.label) return;
    const next = savePickForDay(daily.dateKey, picked.label, picked.category);
    setPickMap(next);
    setSavedFlash(true);
    window.setTimeout(() => setSavedFlash(false), 2000);
  }

  const statusDotClass = busy
    ? "bg-amber-500"
    : hasLanded
      ? "bg-emerald-500"
      : todayPick
        ? "bg-purple-400"
        : "bg-purple-200";

  const statusMessage = busy
    ? "Spinning the wheel…"
    : hasLanded
      ? `You landed on ${picked!.label}`
      : todayPick
        ? `Saved today: ${todayPick.label}`
        : "Tap Spin in the center to reveal today’s treat";

  const titleHeader = (
    <header className={`${panelClass} shrink-0 px-5 py-4 text-center sm:px-6 sm:py-5`}>
      <p className={eyebrowClass}>Daily candy picker</p>
      <h1 className="mt-2 text-3xl font-extrabold tracking-[0.32em] text-purple-950 sm:text-4xl">
        DESERTO
      </h1>
      <div className="mx-auto mt-4 w-full max-w-md">
        <WheelDesignSelect value={wheelDesignId} onChange={handleWheelDesignChange} disabled={busy} />
      </div>
      <p className="mt-2 text-sm font-semibold text-purple-900/65 sm:mt-3">
        {daily.dateLabel}
      </p>
    </header>
  );

  const spinMetaStrip = (
    <>
      <div className="flex flex-col gap-2">
        <p className={`${eyebrowClass} text-center`}>Today’s spin</p>
        <div className="flex min-h-[2.25rem] items-center justify-center gap-2.5 px-1">
          {statusCategory ? (
            <TreatIcon
              category={statusCategory}
              size={28}
              className={`shrink-0 ${busy ? "text-purple-950/55" : "text-rose-600"}`}
              decorative
            />
          ) : (
            <span
              aria-hidden
              className={`inline-block h-2 w-2 rounded-full ${statusDotClass} ${busy ? "animate-pulse" : ""}`}
            />
          )}
          <p className="text-center text-base font-extrabold text-purple-950 sm:text-lg">
            {statusMessage}
          </p>
        </div>
      </div>

      <p className={`min-h-[1.25rem] text-center ${helperTextClass}`} role="status" aria-live="polite">
        {savedFlash
          ? "Saved! Check the calendar below."
          : todayPick && hasLanded
            ? "Saving again replaces today’s saved treat."
            : ""}
      </p>
    </>
  );

  return (
    <div className="relative flex min-h-dvh flex-col text-purple-950">
      <CandyBackground />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col px-3 py-3 sm:px-5 sm:py-5">
        <section className="flex min-h-[calc(100dvh-1.5rem)] flex-1 flex-col gap-3 sm:min-h-[calc(100dvh-2.5rem)] sm:gap-4 md:min-h-0 md:grid md:grid-cols-[minmax(0,1fr)_minmax(320px,380px)] md:items-stretch md:gap-4">
          <div className="order-1 shrink-0 md:col-start-2 md:row-start-1">{titleHeader}</div>

          <div
            className={`${panelClass} order-2 flex min-h-0 min-w-0 flex-[2] flex-col overflow-visible p-2 sm:flex-1 sm:p-4 md:col-start-1 md:row-start-1 md:row-span-2 md:flex-none md:aspect-square md:max-h-[calc(100dvh-2.5rem)] md:self-start`}
          >
            <div className="flex min-h-0 flex-1 flex-col gap-2.5 rounded-[1.4rem] bg-gradient-to-b from-white/75 via-white/55 to-violet-50/70 px-2 py-2 ring-1 ring-purple-950/5 sm:gap-3 sm:px-4 sm:py-5">
              {spinMetaStrip}
              <div className="flex min-h-0 flex-1 flex-col items-stretch gap-3">
                <PrizeWheel
                  className="min-h-0 flex-1"
                  picks={daily.picks}
                  designId={wheelDesignId}
                  reduceMotion={reduceMotion}
                  onSpinBusyChange={setBusy}
                  onSpinStart={handleSpinStart}
                  onLandedChange={setPicked}
                />
                <button
                  type="button"
                  disabled={!hasLanded || busy}
                  onClick={confirmChoice}
                  className={choosePanelButtonClass}
                >
                  Save today’s pick
                </button>
              </div>
            </div>
          </div>

          <aside className="order-3 hidden md:col-start-2 md:row-start-2 md:flex md:min-h-0 md:flex-col md:overflow-y-auto md:pb-2">
            <ChoiceCalendar picks={pickMap} />
          </aside>
        </section>

        <div className="mt-3 sm:mt-4 md:hidden">
          <ChoiceCalendar picks={pickMap} />
        </div>
      </div>
    </div>
  );
}

function usePrefersReducedMotion(): boolean | undefined {
  const [pref, setPref] = useState<boolean | undefined>(() =>
    typeof window !== "undefined" ? window.matchMedia("(prefers-reduced-motion: reduce)").matches : undefined,
  );
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setPref(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);
  return pref;
}
