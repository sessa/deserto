"use client";

import { useState } from "react";
import {
  eyebrowClass,
  iconButtonClass,
  panelClass,
  sectionTitleClass,
} from "@/components/candy/styles";
import { TreatIcon } from "@/components/candy/TreatIcon";
import { categoryForTreatLabel } from "@/data/candies";
import type { PickMap } from "@/lib/candyStorage";
import { localDateKey } from "@/lib/dailyCandy";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

type ChoiceCalendarProps = {
  picks: PickMap;
};

export function ChoiceCalendar({ picks }: ChoiceCalendarProps) {
  const [cursor, setCursor] = useState(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const todayKey = localDateKey(new Date());

  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const padStartBlank = new Date(year, month, 1).getDay();

  const cells: ({ day: number; key: string } | null)[] = [];

  function padMonth(n: number): string {
    return String(n + 1).padStart(2, "0");
  }

  for (let i = 0; i < padStartBlank; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) {
    const key = `${year}-${padMonth(month)}-${String(d).padStart(2, "0")}`;
    cells.push({ day: d, key });
  }

  while (cells.length % 7 !== 0) cells.push(null);

  function prevMonth() {
    setCursor(new Date(year, month - 1, 1));
    setSelectedKey(null);
  }

  function nextMonth() {
    setCursor(new Date(year, month + 1, 1));
    setSelectedKey(null);
  }

  const title = cursor.toLocaleString(undefined, { month: "long", year: "numeric" });

  const selectedPick = selectedKey ? picks[selectedKey] : null;
  const selectedCategory =
    selectedPick?.category ??
    (selectedPick ? categoryForTreatLabel(selectedPick.label) : undefined);

  return (
    <section className={`${panelClass} flex w-full flex-col gap-4 px-5 py-5 sm:px-6`}>
      <header className="text-center">
        <p className={eyebrowClass}>Your history</p>
        <h2 className={`mt-2 ${sectionTitleClass}`}>Treat calendar</h2>
      </header>

      <div className="flex items-center justify-between gap-3 rounded-2xl border border-purple-950/5 bg-purple-50/70 p-2">
        <button
          type="button"
          onClick={prevMonth}
          className={iconButtonClass}
          aria-label="Previous month"
        >
          ←
        </button>
        <p className="text-base font-extrabold text-purple-950">{title}</p>
        <button
          type="button"
          onClick={nextMonth}
          className={iconButtonClass}
          aria-label="Next month"
        >
          →
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1.5 text-center text-xs font-bold text-purple-900/55 sm:gap-2">
        {WEEKDAYS.map((w) => (
          <div key={w} className="py-1">
            {w}
          </div>
        ))}
        {cells.map((c, idx) => {
          if (!c) return <div key={`e-${idx}`} />;

          const isToday = c.key === todayKey;
          const isSelected = selectedKey === c.key;
          const pickRecord = picks[c.key];
          const hasPick = Boolean(pickRecord);
          const treatCategory =
            pickRecord?.category ?? (pickRecord ? categoryForTreatLabel(pickRecord.label) : undefined);
          const dayClass = isToday
            ? "border-purple-500 bg-purple-100 text-purple-950 shadow-md shadow-purple-900/10"
            : hasPick
              ? "border-rose-200 bg-rose-50/90 text-rose-950 shadow-sm"
              : "border-purple-950/5 bg-white/75 text-purple-900";

          const ariaPick = hasPick && pickRecord ? `Saved ${pickRecord.label}` : undefined;

          return (
            <button
              key={c.key}
              type="button"
              onClick={() => setSelectedKey(c.key)}
              aria-current={isToday ? "date" : undefined}
              aria-label={ariaPick ? `Day ${c.day}, ${ariaPick}` : `Day ${c.day}`}
              className={`relative flex aspect-square flex-col items-center rounded-2xl border pb-1 pt-1.5 text-sm font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500 ${dayClass} ${
                isSelected
                  ? "ring-2 ring-purple-500 ring-offset-2 ring-offset-white/80"
                  : "hover:-translate-y-0.5 hover:bg-white"
              }`}
            >
              <span className="leading-none">{c.day}</span>
              <span className="mt-auto flex min-h-[1.15rem] w-full flex-col items-center justify-end pb-0.5">
                {hasPick ? (
                  treatCategory ? (
                    <TreatIcon
                      category={treatCategory}
                      size={16}
                      className="text-rose-500 max-sm:scale-95"
                      decorative
                    />
                  ) : (
                    <span aria-hidden className="text-base leading-none text-rose-500">
                      •
                    </span>
                  )
                ) : null}
              </span>
            </button>
          );
        })}
      </div>

      <div className="min-h-[3rem] rounded-2xl border border-purple-950/5 bg-purple-50/70 px-4 py-3 text-center text-purple-950">
        {selectedPick ? (
          <div className="flex items-start justify-center gap-3 text-center">
            {selectedCategory ? (
              <TreatIcon
                category={selectedCategory}
                size={28}
                className="mt-0.5 shrink-0 text-rose-600"
                decorative
              />
            ) : null}
            <p className="min-w-0 flex-1 text-base">
              <span className="font-bold">{selectedPick.dateKey}:</span>{" "}
              <span>{selectedPick.label}</span>
            </p>
          </div>
        ) : selectedKey ? (
          <p className="text-sm text-purple-800">No saved treat on this day yet.</p>
        ) : (
          <p className="text-sm text-purple-800">Tap a day to see the full candy name.</p>
        )}
      </div>

      <p className="text-center text-xs text-purple-900/55">
        Your calendar lives in this browser only — clearing site storage will erase past picks.
      </p>
    </section>
  );
}
