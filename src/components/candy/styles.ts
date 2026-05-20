/**
 * Shared visual tokens for the candy room UI.
 *
 * Centralizing the panel, typography, and button recipes keeps the wheel,
 * status card, and calendar visually consistent.
 */

export const panelClass =
  "rounded-3xl border border-white/70 bg-white/85 shadow-[0_24px_70px_rgba(88,28,135,0.18)] ring-1 ring-purple-950/5 backdrop-blur-xl";

export const eyebrowClass =
  "text-[0.7rem] font-bold uppercase tracking-[0.3em] text-purple-900/55";

export const sectionTitleClass =
  "text-xl font-extrabold tracking-tight text-purple-950 sm:text-2xl";

export const helperTextClass = "text-sm text-purple-900/70";

const ctaBase =
  "inline-flex h-12 w-full items-center justify-center rounded-full px-6 text-base font-extrabold tracking-tight text-white shadow-lg transition disabled:pointer-events-none disabled:translate-y-0 disabled:opacity-40 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:h-[3.25rem] sm:text-lg";

const roseSpinAccent =
  "bg-gradient-to-b from-rose-500 to-rose-600 shadow-rose-900/25 hover:from-rose-400 hover:to-rose-500 focus-visible:outline-rose-400";

export const spinButtonClass = `${ctaBase} ${roseSpinAccent}`;

/** Round hub control on the prize wheel */
export const spinCenterButtonClass = `inline-flex cursor-pointer items-center justify-center rounded-full font-extrabold tracking-tight text-white shadow-lg transition hover:-translate-y-0.5 active:translate-y-0 disabled:cursor-not-allowed disabled:pointer-events-none disabled:translate-y-0 disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${roseSpinAccent}`;

const emeraldChooseAccent =
  "bg-gradient-to-b from-emerald-500 to-emerald-600 shadow-emerald-900/25 hover:from-emerald-400 hover:to-emerald-500 focus-visible:outline-emerald-400";

export const chooseButtonClass = `${ctaBase} ${emeraldChooseAccent}`;

/** In-panel choose under the wheel (slightly denser hit target) */
const panelChooseLayout =
  "inline-flex h-11 w-[min(100%,22rem)] max-w-full items-center justify-center self-center rounded-full px-6 text-base font-extrabold tracking-tight shadow-lg transition disabled:pointer-events-none disabled:translate-y-0 disabled:opacity-40 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:h-12 sm:w-full";

export const choosePanelButtonClass = `${panelChooseLayout} ${emeraldChooseAccent}`;

export const iconButtonClass =
  "inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-sm font-extrabold text-purple-900 shadow-sm ring-1 ring-purple-950/10 transition hover:-translate-y-0.5 hover:bg-purple-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500 disabled:pointer-events-none disabled:opacity-40";
