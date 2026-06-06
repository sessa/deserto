"use client";

import { TreatIcon } from "@/components/candy/TreatIcon";
import {
  centerFill,
  rimFill,
  segmentFill,
  WheelThemeDefs,
} from "@/components/candy/WheelThemeDefs";
import { panelClass, eyebrowClass } from "@/components/candy/styles";
import type { TreatCategory } from "@/data/candies";
import { DEFAULT_WHEEL_DESIGN_ID, WHEEL_DESIGNS, type WheelTheme } from "@/data/wheelThemes";
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
  const primary = label.trim().split(" — ")[0]?.trim() ?? label.trim();
  const words = primary.split(/\s+/);
  if (words.length <= 2 && primary.length <= 14) return [primary];
  if (words.length <= 3) return [words.slice(0, 2).join(" "), words.slice(2).join(" ")].filter(Boolean);
  return [`${primary.slice(0, 10)}…`];
}

function StaticWheelPreview({ theme }: { theme: WheelTheme }) {
  const gradientId = (name: string) => `${theme.id}-${name}`;
  const dotRadiusOuter = theme.id === "cookie" ? 4 : 3.4;
  const dotRadiusInner = theme.id === "cookie" ? 3 : 2.6;
  const dotDistOuter = theme.id === "cookie" ? 0.55 : 0.78;

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[220px]">
      <div
        className={`pointer-events-none absolute left-1/2 top-0 z-10 h-0 w-0 border-l-[14px] border-r-[14px] border-l-transparent border-r-transparent drop-shadow-md ${theme.pointerClass}`}
        style={{ borderTopWidth: 22, transform: "translate(-50%, -6px)" }}
        aria-hidden
      />
      <svg viewBox="-12 -12 224 224" className="h-full w-full overflow-visible" role="img" aria-label={`${theme.name} wheel preview`}>
        <title>{theme.name}</title>
        <defs>
          <WheelThemeDefs theme={theme} id={gradientId} />
        </defs>

        <circle cx={CX} cy={CY} r={104} fill={rimFill(theme, gradientId)} />
        <circle cx={CX} cy={CY} r={99} fill={theme.innerRimFill} opacity={theme.innerRimOpacity} />

        {[0, 1, 2].map((i) => {
          const start = -150 + SEG * i;
          const end = start + SEG;
          const mid = (start + end) / 2;
          const [ix, iy] = polar(CX, CY, R * 0.41, mid);
          const [tx, ty] = polar(CX, CY, R * 0.62, mid);
          const pick = SAMPLE_PICKS[i];
          const seg = theme.segments[i];
          const lines = splitLabel(pick.label);
          const wedgeStroke = theme.neonWedgeStrokes?.[i] ?? theme.wedgeStroke;
          const iconClass = theme.iconClassBySegment?.[i as 0 | 1 | 2] ?? theme.iconClass;

          return (
            <g key={i}>
              <path
                d={wedgePath(CX, CY, R, start, end)}
                fill={segmentFill(theme, i, gradientId)}
                stroke={wedgeStroke}
                strokeWidth={theme.wedgeStrokeWidth}
                filter={theme.neonWedgeStrokes ? `url(#${gradientId(`glow-${i}`)})` : undefined}
              />
              {theme.showInnerWedgeArc && (
                <path
                  d={wedgePath(CX, CY, R * 0.92, start + 2, end - 2)}
                  fill="none"
                  stroke="rgba(255,255,255,0.35)"
                  strokeWidth="2.5"
                />
              )}
              {theme.showSegmentDots && (
                <>
                  {(() => {
                    const [dx, dy] = polar(CX, CY, R * dotDistOuter, mid - (theme.id === "cookie" ? 20 : 28));
                    const [dx2, dy2] = polar(CX, CY, R * 0.38, mid + 32);
                    return (
                      <>
                        <circle cx={dx} cy={dy} r={dotRadiusOuter} fill={seg.accent} />
                        <circle cx={dx2} cy={dy2} r={dotRadiusInner} fill="#fff7ed" opacity={0.85} />
                      </>
                    );
                  })()}
                </>
              )}
              {theme.showSegmentDash && (
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
                <div className={`flex size-full items-center justify-center ${iconClass}`}>
                  <TreatIcon category={pick.category} size={16} className={iconClass} decorative />
                </div>
              </foreignObject>
              <text
                x={tx}
                y={ty}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={11}
                fontWeight={700}
                fill={seg.labelFill}
                stroke={seg.labelStroke}
                strokeWidth={theme.labelStrokeWidth}
                filter={theme.labelFilter ? `url(#${gradientId("label-shadow")})` : undefined}
                paintOrder="stroke fill"
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

        {theme.id === "carnival" && <circle cx={CX} cy={CY} r={19} fill="#581c87" opacity="0.35" />}
        <circle cx={CX} cy={CY} r={16} fill={centerFill(theme, gradientId)} stroke={theme.centerStroke} strokeWidth={2.5} />
        {theme.centerHighlight && <circle cx={CX - 4} cy={CY - 5} r={4.2} fill="#fff7ed" opacity="0.85" />}
        <circle cx={CX} cy={CY} r={96} fill="none" stroke={theme.outerStroke} strokeOpacity={0.7} strokeWidth="2" />
        {theme.showSparkle && (
          <path
            d="M 42 25 C 70 7 123 5 158 27"
            fill="none"
            stroke="#fff"
            strokeLinecap="round"
            strokeWidth="5"
            opacity="0.38"
          />
        )}
        {theme.showCookieHighlightArc && (
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
            {WHEEL_DESIGNS.length} static previews using sample treats. Use the <strong>Wheel style</strong> dropdown on
            the Candy room to apply any of these to the live spinner.
          </p>
          <Link
            href="/"
            className="mt-4 inline-block text-sm font-bold text-rose-600 underline decoration-dotted underline-offset-4 hover:text-rose-500"
          >
            Back to Candy room
          </Link>
        </header>

        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {WHEEL_DESIGNS.map((design, index) => {
            const isCurrent = design.id === DEFAULT_WHEEL_DESIGN_ID;
            return (
              <li key={design.id}>
                <article
                  className={`${panelClass} flex h-full flex-col overflow-hidden ${
                    isCurrent ? "ring-2 ring-rose-500/60" : ""
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 border-b border-purple-950/5 bg-white/60 px-4 py-3">
                    <div>
                      <h2 className="text-lg font-extrabold text-purple-950">{design.name}</h2>
                      <p className="text-xs font-semibold uppercase tracking-widest text-purple-900/50">
                        Option {index + 1}
                        {isCurrent ? " · current" : ""}
                      </p>
                    </div>
                    {isCurrent && (
                      <span className="shrink-0 rounded-full bg-rose-100 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wide text-rose-700">
                        Live
                      </span>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col items-center justify-center bg-gradient-to-b from-white/80 to-violet-50/60 px-4 py-6">
                    <StaticWheelPreview theme={design} />
                  </div>

                  <p className="border-t border-purple-950/5 px-4 py-4 text-sm leading-relaxed text-purple-900/80">
                    {design.tagline}
                  </p>
                </article>
              </li>
            );
          })}
        </ul>

        <footer className={`${panelClass} mt-8 px-5 py-4 text-center text-sm text-purple-900/70`}>
          Open the Candy room and choose a style from the dropdown — your pick is saved in this browser.
        </footer>
      </div>
    </div>
  );
}
