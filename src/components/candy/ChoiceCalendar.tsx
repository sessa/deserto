"use client";

import { useState } from "react";
import type { PickMap } from "@/lib/candyStorage";

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

  return (
    <section className="w-full max-w-2xl rounded-2xl border-2 border-amber-900/20 bg-white/90 p-4 shadow-lg backdrop-blur-sm">
      <h2 className="mb-2 text-center text-2xl font-bold text-purple-950">Treat calendar</h2>
      <p className="mb-4 text-center text-sm text-purple-900/75">
        Days with a dot are saved picks on{" "}
        <span className="font-semibold">this device only</span>.
      </p>

      <div className="mb-4 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={prevMonth}
          className="rounded-lg bg-purple-700 px-3 py-2 text-sm font-bold text-white hover:bg-purple-600"
        >
          ←
        </button>
        <p className="text-lg font-semibold text-purple-950">{title}</p>
        <button
          type="button"
          onClick={nextMonth}
          className="rounded-lg bg-purple-700 px-3 py-2 text-sm font-bold text-white hover:bg-purple-600"
        >
          →
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-purple-900/80">
        {WEEKDAYS.map((w) => (
          <div key={w}>{w}</div>
        ))}
        {cells.map((c, idx) =>
          !c ? (
            <div key={`e-${idx}`} />
          ) : (
            <button
              key={c.key}
              type="button"
              onClick={() => setSelectedKey(c.key)}
              className={`relative flex aspect-square flex-col items-center justify-start rounded-xl border py-2 text-sm font-semibold shadow-sm transition ${
                picks[c.key]
                  ? "border-rose-400 bg-rose-50 text-rose-950"
                  : "border-purple-100 bg-white text-purple-900"
              } ${selectedKey === c.key ? "ring-4 ring-purple-400" : "hover:bg-purple-50"}`}
            >
              <span>{c.day}</span>
              {picks[c.key] ? (
                <span aria-hidden className="mt-1 text-lg leading-none">
                  •
                </span>
              ) : (
                <span className="mt-1 leading-none">&nbsp;</span>
              )}
            </button>
          ),
        )}
      </div>

      <div className="mt-4 min-h-[3rem] rounded-xl bg-purple-50/80 px-4 py-3 text-center text-purple-950">
        {selectedPick ? (
          <p className="text-base">
            <span className="font-bold">{selectedPick.dateKey}:</span>{" "}
            <span>{selectedPick.label}</span>
          </p>
        ) : selectedKey ? (
          <p className="text-sm text-purple-800">No saved treat on this day yet.</p>
        ) : (
          <p className="text-sm text-purple-800">Tap a day to see the full candy name.</p>
        )}
      </div>
    </section>
  );
}
