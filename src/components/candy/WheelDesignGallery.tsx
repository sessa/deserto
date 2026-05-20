"use client";

import type { ReactNode } from "react";

import { TreatIcon } from "@/components/candy/TreatIcon";
import { panelClass, eyebrowClass } from "@/components/candy/styles";
import type { TreatCategory } from "@/data/candies";
import Link from "next/link";

const SEG = 360 / 3;
const CX = 100;
const CY = 100;
const R = 95;

const SAMPLE_PICKS: { label: string; category: TreatCategory }[] = [
  { label: "Fun Dip — Cherry", category: "candy" },
  { label: "Peppermint Starlight", category: "mint" },
  { label: "Reese's Pieces", category: "chocolate" },
];

type SegmentStyle = {
  fill: string;
  accent: string;
  labelFill: string;
  labelStroke: string;
};

export type WheelDesignId =
  | "carnival"
  | "pastel"
  | "diner"
  | "neon"
  | "minimal"
  | "cookie";

type WheelDesign = {
  id: WheelDesignId;
  name: string;
  tagline: string;
  isCurrent?: boolean;
  segments: SegmentStyle[];
  /** SVG defs + overlays rendered once per wheel */
  renderDefs: (uid: string) => ReactNode;
  rimFill: string;
  innerRimFill: string;
  centerFill: string;
  centerStroke: string;
  wedgeStroke: string;
  outerStroke: string;
  pointerClass: string;
  showSparkle: boolean;
  showInnerArc: boolean;
  showSegmentDots: boolean;
  showSegmentDash: boolean;
  labelFilter?: string;
};

function polar(cx: number, cy: number, r: number, deg: number): [number, number] {
  const rad = (deg * Math.PI) / 180;
  return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)];
}

function wedgePath(
  cx: number,
  cy: number,
  r: number,
  startDeg: number,
  endDeg: number,
): string {
  const [sx, sy] = polar(cx, cy, r, startDeg);
  const [ex, ey] = polar(cx, cy, r, endDeg);
  return `M ${cx} ${cy} L ${sx} ${sy} A ${r} ${r} 0 0 1 ${ex} ${ey} Z`;
}

function splitLabel(label: string): string[] {
  const words = label.trim().split(/\s+/);
  if (words.length <= 2) return [label.slice(0, 14)];
  return [`${words[0]} ${words[1]}`, words.slice(2).join(" ")].map((l) =>
    l.length > 13 ? `${l.slice(0, 11)}…` : l,
  );
}

const DESIGNS: WheelDesign[] = [
  {
    id: "carnival",
    name: "Carnival Burst",
    tagline: "Bold radial gradients, glossy rim, playful sparkles — what you have today.",
    isCurrent: true,
    segments: [
      { fill: "segment-0", accent: "#fecdd3", labelFill: "#fafafa", labelStroke: "#2e1065" },
      { fill: "segment-1", accent: "#fef3c7", labelFill: "#fafafa", labelStroke: "#2e1065" },
      { fill: "segment-2", accent: "#ddd6fe", labelFill: "#fafafa", labelStroke: "#2e1065" },
    ],
    renderDefs: (uid) => (
      <>
        <radialGradient id={`${uid}-c0`} cx="34%" cy="22%" r="88%">
          <stop offset="0%" stopColor="#fb7185" />
          <stop offset="56%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#be123c" />
        </radialGradient>
        <radialGradient id={`${uid}-c1`} cx="34%" cy="22%" r="88%">
          <stop offset="0%" stopColor="#fde047" />
          <stop offset="56%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#c2410c" />
        </radialGradient>
        <radialGradient id={`${uid}-c2`} cx="34%" cy="22%" r="88%">
          <stop offset="0%" stopColor="#c084fc" />
          <stop offset="56%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#5b21b6" />
        </radialGradient>
        <linearGradient id={`${uid}-rim`} x1="28%" y1="8%" x2="76%" y2="92%">
          <stop offset="0%" stopColor="#fff7ed" />
          <stop offset="45%" stopColor="#f9a8d4" />
          <stop offset="100%" stopColor="#7e22ce" />
        </linearGradient>
        <radialGradient id={`${uid}-center`} cx="38%" cy="28%" r="72%">
          <stop offset="0%" stopColor="#fff7ed" />
          <stop offset="48%" stopColor="#fde68a" />
          <stop offset="100%" stopColor="#f97316" />
        </radialGradient>
        <filter id={`${uid}-shadow`} x="-25%" y="-25%" width="150%" height="150%">
          <feDropShadow dx="0" dy="1" stdDeviation="1" floodColor="#2e1065" floodOpacity="0.65" />
        </filter>
      </>
    ),
    rimFill: "url(#RIM)",
    innerRimFill: "#fff7ed",
    centerFill: "url(#CENTER)",
    centerStroke: "#581c87",
    wedgeStroke: "rgba(255,255,255,0.55)",
    outerStroke: "#ffffff",
    pointerClass: "border-t-rose-600",
    showSparkle: true,
    showInnerArc: true,
    showSegmentDots: true,
    showSegmentDash: true,
    labelFilter: "url(#SHADOW)",
  },
  {
    id: "pastel",
    name: "Pastel Candy Shop",
    tagline: "Soft fills, thin borders, gentle rim — airy and sweet without heavy contrast.",
    segments: [
      { fill: "#fbcfe8", accent: "#fdf2f8", labelFill: "#831843", labelStroke: "#fce7f3" },
      { fill: "#bbf7d0", accent: "#ecfdf5", labelFill: "#14532d", labelStroke: "#d1fae5" },
      { fill: "#fde68a", accent: "#fffbeb", labelFill: "#78350f", labelStroke: "#fef3c7" },
    ],
    renderDefs: () => null,
    rimFill: "#faf5ff",
    innerRimFill: "#ffffff",
    centerFill: "#f5d0fe",
    centerStroke: "#c084fc",
    wedgeStroke: "rgba(255,255,255,0.9)",
    outerStroke: "#e9d5ff",
    pointerClass: "border-t-fuchsia-400",
    showSparkle: false,
    showInnerArc: false,
    showSegmentDots: false,
    showSegmentDash: false,
  },
  {
    id: "diner",
    name: "Retro Diner",
    tagline: "Flat wedges, thick white dividers, chrome hub — 1950s boardwalk energy.",
    segments: [
      { fill: "#dc2626", accent: "#ffffff", labelFill: "#ffffff", labelStroke: "#7f1d1d" },
      { fill: "#f8fafc", accent: "#dc2626", labelFill: "#0f172a", labelStroke: "#f1f5f9" },
      { fill: "#0d9488", accent: "#ffffff", labelFill: "#ffffff", labelStroke: "#134e4a" },
    ],
    renderDefs: (uid) => (
      <radialGradient id={`${uid}-center`} cx="50%" cy="35%" r="65%">
        <stop offset="0%" stopColor="#f8fafc" />
        <stop offset="100%" stopColor="#cbd5e1" />
      </radialGradient>
    ),
    rimFill: "#1e293b",
    innerRimFill: "#f8fafc",
    centerFill: "url(#CENTER)",
    centerStroke: "#475569",
    wedgeStroke: "#ffffff",
    outerStroke: "#1e293b",
    pointerClass: "border-t-slate-900",
    showSparkle: false,
    showInnerArc: false,
    showSegmentDots: true,
    showSegmentDash: false,
  },
  {
    id: "neon",
    name: "Neon Night",
    tagline: "Dark base with glowing wedges and electric accents — arcade / nightlife vibe.",
    segments: [
      { fill: "#0f172a", accent: "#22d3ee", labelFill: "#67e8f9", labelStroke: "#083344" },
      { fill: "#0f172a", accent: "#e879f9", labelFill: "#f0abfc", labelStroke: "#4a044e" },
      { fill: "#0f172a", accent: "#a3e635", labelFill: "#bef264", labelStroke: "#1a2e05" },
    ],
    renderDefs: (uid) => (
      <>
        <filter id={`${uid}-glow-cyan`}>
          <feGaussianBlur stdDeviation="2.5" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id={`${uid}-glow-magenta`}>
          <feGaussianBlur stdDeviation="2.5" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id={`${uid}-glow-lime`}>
          <feGaussianBlur stdDeviation="2.5" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <radialGradient id={`${uid}-center`} cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#312e81" />
          <stop offset="100%" stopColor="#0f172a" />
        </radialGradient>
      </>
    ),
    rimFill: "#020617",
    innerRimFill: "#1e1b4b",
    centerFill: "url(#CENTER)",
    centerStroke: "#22d3ee",
    wedgeStroke: "#22d3ee",
    outerStroke: "#22d3ee",
    pointerClass: "border-t-cyan-400",
    showSparkle: false,
    showInnerArc: false,
    showSegmentDots: false,
    showSegmentDash: false,
  },
  {
    id: "minimal",
    name: "Minimal Flat",
    tagline: "Solid color wedges, no ornaments — clean, modern, lets labels carry the UI.",
    segments: [
      { fill: "#f43f5e", accent: "#ffffff", labelFill: "#ffffff", labelStroke: "#881337" },
      { fill: "#8b5cf6", accent: "#ffffff", labelFill: "#ffffff", labelStroke: "#4c1d95" },
      { fill: "#14b8a6", accent: "#ffffff", labelFill: "#ffffff", labelStroke: "#134e4a" },
    ],
    renderDefs: () => null,
    rimFill: "#fafafa",
    innerRimFill: "#ffffff",
    centerFill: "#581c87",
    centerStroke: "#581c87",
    wedgeStroke: "#ffffff",
    outerStroke: "#e5e7eb",
    pointerClass: "border-t-purple-900",
    showSparkle: false,
    showInnerArc: false,
    showSegmentDots: false,
    showSegmentDash: false,
  },
  {
    id: "cookie",
    name: "Cookie Wheel",
    tagline: "Warm dough tones and chip dots — ties directly into the cookie background.",
    segments: [
      { fill: "#e7bd73", accent: "#5a3324", labelFill: "#422006", labelStroke: "#fef3c7" },
      { fill: "#d4a574", accent: "#5a3324", labelFill: "#422006", labelStroke: "#fef3c7" },
      { fill: "#c9956a", accent: "#5a3324", labelFill: "#422006", labelStroke: "#fef3c7" },
    ],
    renderDefs: (uid) => (
      <radialGradient id={`${uid}-center`} cx="42%" cy="32%" r="70%">
        <stop offset="0%" stopColor="#f1d192" />
        <stop offset="100%" stopColor="#a87246" />
      </radialGradient>
    ),
    rimFill: "#a87246",
    innerRimFill: "#f1d192",
    centerFill: "url(#CENTER)",
    centerStroke: "#7c4a2e",
    wedgeStroke: "rgba(255,247,237,0.7)",
    outerStroke: "#a87246",
    pointerClass: "border-t-amber-800",
    showSparkle: false,
    showInnerArc: true,
    showSegmentDots: true,
    showSegmentDash: false,
  },
];

function StaticWheelPreview({ design }: { design: WheelDesign }) {
  const uid = design.id;
  const segmentFills = design.segments.map((s) =>
    s.fill.startsWith("segment-") ? `url(#${uid}-${s.fill})` : s.fill,
  );

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[220px]">
      <div
        className={`pointer-events-none absolute left-1/2 top-0 z-10 h-0 w-0 border-l-[14px] border-r-[14px] border-l-transparent border-r-transparent drop-shadow-md ${design.pointerClass}`}
        style={{ borderTopWidth: 22, transform: "translate(-50%, -6px)" }}
        aria-hidden
      />
      <svg viewBox="-12 -12 224 224" className="h-full w-full overflow-visible">
        <defs>
          {design.renderDefs(uid)}
          {design.id === "carnival" && (
            <>
              <linearGradient id={`${uid}-rim`} x1="28%" y1="8%" x2="76%" y2="92%">
                <stop offset="0%" stopColor="#fff7ed" />
                <stop offset="45%" stopColor="#f9a8d4" />
                <stop offset="100%" stopColor="#7e22ce" />
              </linearGradient>
              <radialGradient id={`${uid}-center`} cx="38%" cy="28%" r="72%">
                <stop offset="0%" stopColor="#fff7ed" />
                <stop offset="48%" stopColor="#fde68a" />
                <stop offset="100%" stopColor="#f97316" />
              </radialGradient>
              <filter id={`${uid}-shadow`} x="-25%" y="-25%" width="150%" height="150%">
                <feDropShadow dx="0" dy="1" stdDeviation="1" floodColor="#2e1065" floodOpacity="0.65" />
              </filter>
            </>
          )}
          {design.id === "neon" && (
            <>
              <filter id={`${uid}-glow0`}>
                <feGaussianBlur stdDeviation="3" />
              </filter>
              <filter id={`${uid}-glow1`}>
                <feGaussianBlur stdDeviation="3" />
              </filter>
              <filter id={`${uid}-glow2`}>
                <feGaussianBlur stdDeviation="3" />
              </filter>
            </>
          )}
        </defs>

        <circle
          cx={CX}
          cy={CY}
          r={104}
          fill={design.id === "carnival" ? `url(#${uid}-rim)` : design.rimFill}
        />
        <circle cx={CX} cy={CY} r={99} fill={design.innerRimFill} opacity={design.id === "carnival" ? 0.95 : 1} />

        {[0, 1, 2].map((i) => {
          const start = -150 + SEG * i;
          const end = start + SEG;
          const mid = (start + end) / 2;
          const [ix, iy] = polar(CX, CY, R * 0.41, mid);
          const [tx, ty] = polar(CX, CY, R * 0.62, mid);
          const pick = SAMPLE_PICKS[i];
          const style = design.segments[i];
          const lines = splitLabel(pick.label);
          const neonStrokes = ["#22d3ee", "#e879f9", "#a3e635"];

          return (
            <g key={i}>
              <path
                d={wedgePath(CX, CY, R, start, end)}
                fill={segmentFills[i]}
                stroke={design.id === "neon" ? neonStrokes[i] : design.wedgeStroke}
                strokeWidth={design.id === "diner" ? 5 : design.id === "neon" ? 3 : 2.5}
                filter={design.id === "neon" ? `url(#${uid}-glow${i})` : undefined}
              />
              {design.showInnerArc && design.id === "carnival" && (
                <path
                  d={wedgePath(CX, CY, R * 0.92, start + 2, end - 2)}
                  fill="none"
                  stroke="rgba(255,255,255,0.35)"
                  strokeWidth="2.5"
                />
              )}
              {design.showSegmentDots && (
                <>
                  {(() => {
                    const [dx, dy] = polar(CX, CY, R * (design.id === "cookie" ? 0.55 : 0.78), mid - 20);
                    const [dx2, dy2] = polar(CX, CY, R * 0.38, mid + 28);
                    return (
                      <>
                        <circle cx={dx} cy={dy} r={design.id === "cookie" ? 4 : 3.4} fill={style.accent} />
                        <circle cx={dx2} cy={dy2} r={design.id === "cookie" ? 3 : 2.6} fill="#fff7ed" opacity={0.85} />
                      </>
                    );
                  })()}
                </>
              )}
              {design.showSegmentDash && (
                <>
                  {(() => {
                    const [dashX, dashY] = polar(CX, CY, R * 0.72, mid + 21);
                    return (
                      <rect
                        x={dashX - 6}
                        y={dashY - 1.8}
                        width="12"
                        height="3.6"
                        rx="1.8"
                        fill="rgba(255,255,255,0.72)"
                        transform={`rotate(${mid + 55} ${dashX} ${dashY})`}
                      />
                    );
                  })()}
                </>
              )}
              <foreignObject
                x={ix - 11}
                y={iy - 11}
                width={22}
                height={22}
                transform={`rotate(${mid + 90} ${ix} ${iy})`}
              >
                <div className="flex size-full items-center justify-center">
                  <TreatIcon
                    category={pick.category}
                    size={16}
                    className={
                      design.id === "neon"
                        ? "text-cyan-300"
                        : design.id === "diner" && i === 1
                          ? "text-rose-600"
                          : design.id === "cookie"
                            ? "text-amber-950"
                            : "text-white"
                    }
                    decorative
                  />
                </div>
              </foreignObject>
              <text
                x={tx}
                y={ty}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={11}
                fontWeight={700}
                fill={style.labelFill}
                stroke={style.labelStroke}
                strokeWidth={design.id === "pastel" ? 0 : 0.5}
                filter={design.labelFilter ? `url(#${uid}-shadow)` : undefined}
                transform={`rotate(${mid + 90} ${tx} ${ty})`}
              >
                {lines.map((line, li) => (
                  <tspan key={li} x={tx} dy={li === 0 ? (lines.length > 1 ? "-0.35em" : "0.1em") : "1.1em"}>
                    {line}
                  </tspan>
                ))}
              </text>
            </g>
          );
        })}

        <circle cx={CX} cy={CY} r={16} fill={design.id === "carnival" ? `url(#${uid}-center)` : design.centerFill} stroke={design.centerStroke} strokeWidth={2.5} />
        {design.id === "carnival" && <circle cx={CX - 4} cy={CY - 5} r={4.2} fill="#fff7ed" opacity="0.85" />}
        <circle cx={CX} cy={CY} r={96} fill="none" stroke={design.outerStroke} strokeOpacity={0.7} strokeWidth="2" />
        {design.showSparkle && (
          <path
            d="M 42 25 C 70 7 123 5 158 27"
            fill="none"
            stroke="#fff"
            strokeLinecap="round"
            strokeWidth="5"
            opacity="0.38"
          />
        )}
        {design.showInnerArc && design.id === "cookie" && (
          <path
            d="M 48 30 C 72 14 128 12 152 32"
            fill="none"
            stroke="#fff7ed"
            strokeLinecap="round"
            strokeWidth="4"
            opacity="0.45"
          />
        )}
      </svg>
    </div>
  );
}

export function WheelDesignGallery() {
  return (
    <div className="relative min-h-dvh bg-[#e9d6ff] text-purple-950">
      <div className="absolute inset-0 bg-gradient-to-b from-[#f3e9ff] via-[#e5d4ff] to-[#dcc7fa]" aria-hidden />

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        <header className={`${panelClass} mb-8 px-6 py-6 text-center`}>
          <p className={eyebrowClass}>Design exploration</p>
          <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-purple-950 sm:text-3xl">
            Prize wheel visual options
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm text-purple-900/75">
            Six static previews using sample treats. Use the <strong>Wheel style</strong> dropdown on the Candy room to
            apply any of these to the live spinner.
          </p>
          <Link
            href="/"
            className="mt-4 inline-block text-sm font-bold text-rose-600 underline decoration-dotted underline-offset-4 hover:text-rose-500"
          >
            Back to Candy room
          </Link>
        </header>

        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {DESIGNS.map((design) => (
            <li key={design.id}>
              <article
                className={`${panelClass} flex h-full flex-col overflow-hidden ${
                  design.isCurrent ? "ring-2 ring-rose-500/60" : ""
                }`}
              >
                <div className="flex items-center justify-between gap-2 border-b border-purple-950/5 bg-white/60 px-4 py-3">
                  <div>
                    <h2 className="text-lg font-extrabold text-purple-950">{design.name}</h2>
                    <p className="text-xs font-semibold uppercase tracking-widest text-purple-900/50">
                      Option {DESIGNS.indexOf(design) + 1}
                      {design.isCurrent ? " · current" : ""}
                    </p>
                  </div>
                  {design.isCurrent && (
                    <span className="shrink-0 rounded-full bg-rose-100 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wide text-rose-700">
                      Live
                    </span>
                  )}
                </div>

                <div className="flex flex-1 flex-col items-center justify-center bg-gradient-to-b from-white/80 to-violet-50/60 px-4 py-6">
                  <StaticWheelPreview design={design} />
                </div>

                <p className="border-t border-purple-950/5 px-4 py-4 text-sm leading-relaxed text-purple-900/80">
                  {design.tagline}
                </p>
              </article>
            </li>
          ))}
        </ul>

        <footer className={`${panelClass} mt-8 px-5 py-4 text-center text-sm text-purple-900/70`}>
          Open the Candy room and choose a style from the dropdown — your pick is saved in this browser.
        </footer>
      </div>
    </div>
  );
}
