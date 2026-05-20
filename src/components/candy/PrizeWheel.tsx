"use client";

import {
  forwardRef,
  useEffect,
  useId,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import { TreatIcon } from "@/components/candy/TreatIcon";
import {
  centerFill,
  rimFill,
  segmentFill,
  WheelThemeDefs,
} from "@/components/candy/WheelThemeDefs";
import { spinCenterButtonClass } from "@/components/candy/styles";
import { DEFAULT_WHEEL_DESIGN_ID, getWheelTheme, type WheelDesignId } from "@/data/wheelThemes";
import type { TreatCategory, TreatItem } from "@/data/candies";

const SEG = 360 / 3;

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

/**
 * Winning segment index after rotating the wheel group CLOCKWISE by `rotationDeg`
 * (same sign as SVG `rotate(rotationDeg)`).
 *
 * Wedges use `start = -150 + SEG * i` (see render). The pointer is at the top (-90°
 * in the `polar()` convention). Under clockwise spin by R, the original rim angle
 * now under the pointer is -90 - R; shifting by +150 aligns segment 0 with [0, SEG)
 * for binning.
 */
export function rotationToWinnerIndex(rotationDeg: number): number {
  const phiNorm = ((60 - rotationDeg) % 360 + 360) % 360;
  return Math.floor(phiNorm / SEG) % 3;
}

/** Uniform index in 0..2; never repeats `lastIdx` when that is known. */
function pickTargetIndex(lastIdx: number | null): number {
  const pool =
    lastIdx === null ? [0, 1, 2] : ([0, 1, 2] as const).filter((i) => i !== lastIdx);
  return pool[Math.floor(Math.random() * pool.length)];
}

/**
 * Build a clockwise end rotation that lands on `targetIdx` with a random
 * angle inside that wedge (avoids rejection sampling and edge clipping).
 */
function pickEndRotation(prev: number, targetIdx: number): number {
  const margin = 14;
  const span = SEG - 2 * margin;
  const phi = targetIdx * SEG + margin + Math.random() * span;
  const rMod = (60 - phi + 360) % 360;
  const prevMod = ((prev % 360) + 360) % 360;
  let delta = (rMod - prevMod + 360) % 360;
  const fullSpins = (4 + Math.floor(Math.random() * 9)) * 360;
  if (delta < 45) delta += 360;
  return prev + fullSpins + delta;
}

function splitWheelLabel(label: string): string[] {
  const words = label.trim().split(/\s+/).filter(Boolean);
  const lines: string[] = [];

  for (const word of words) {
    const current = lines[lines.length - 1] ?? "";
    const next = current ? `${current} ${word}` : word;
    if (!current || next.length <= 11) {
      lines[lines.length - 1] = next;
    } else if (lines.length < 2) {
      lines.push(word);
    } else {
      lines[1] = `${lines[1]} ${word}`;
    }
  }

  return (lines.length ? lines : [label]).slice(0, 2).map((line) => {
    if (line.length <= 13) return line;
    return `${line.slice(0, 10)}…`;
  });
}

export type PrizeWheelProps = {
  picks: readonly TreatItem[];
  designId?: WheelDesignId;
  reduceMotion?: boolean;
  onSpinBusyChange?: (busy: boolean) => void;
  /** Fires once each time a spin begins (same moment as busy → true). */
  onSpinStart?: () => void;
  onLandedChange?: (
    payload: { label: string; index: number; category: TreatCategory } | null,
  ) => void;
  /** Merged onto the root; use `flex-1 min-h-0` when the wheel should grow inside a flex viewport. */
  className?: string;
};

export type PrizeWheelHandle = {
  spinOnce: () => void;
};

const MEASURE_MARGIN_DESKTOP = 8;
const MEASURE_MARGIN_COMPACT = 2;
/** Matches Tailwind `md` — same breakpoint as CandyRoom two-column layout. */
const COMPACT_MAX_WIDTH = "(max-width: 767px)";
const POINTER_OUTSIDE_RATIO = 0.42;
/** Rotation (deg) where the first wedge boundary sits under the fixed top pointer. */
const POINTER_TICK_OFFSET = 60;
const POINTER_TICK_KICK = 11;

function rotationTickIndex(rotationDeg: number): number {
  return Math.floor((rotationDeg - POINTER_TICK_OFFSET) / SEG);
}

export const PrizeWheel = forwardRef<PrizeWheelHandle, PrizeWheelProps>(function PrizeWheel({
  picks,
  designId = DEFAULT_WHEEL_DESIGN_ID,
  reduceMotion,
  onSpinBusyChange,
  onSpinStart,
  onLandedChange,
  className,
}, ref) {
  const theme = getWheelTheme(designId);
  const gradientSeed = useId().replace(/:/g, "");
  const [rotation, setRotation] = useState(0);
  const [pointerWobble, setPointerWobble] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const animRef = useRef<number>(0);
  const lastWinnerRef = useRef<number | null>(null);
  const lastTickIndexRef = useRef(rotationTickIndex(0));
  const pointerWobbleRef = useRef(0);
  const slotRef = useRef<HTMLDivElement>(null);
  const [side, setSide] = useState(240);
  const [isCompact, setIsCompact] = useState(false);

  const emptyPick: TreatItem = { label: "—", category: "candy" };
  const safePicks: TreatItem[] = [...picks.slice(0, 3)];
  while (safePicks.length < 3) safePicks.push(emptyPick);

  const cx = 100;
  const cy = 100;
  const r = 95;

  useEffect(() => {
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  useEffect(() => {
    const mq = window.matchMedia(COMPACT_MAX_WIDTH);
    const apply = () => setIsCompact(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useLayoutEffect(() => {
    const el = slotRef.current;
    if (!el) return;

    function measure() {
      const node = slotRef.current;
      if (!node) return;
      const compact = window.matchMedia(COMPACT_MAX_WIDTH).matches;
      const margin = compact ? MEASURE_MARGIN_COMPACT : MEASURE_MARGIN_DESKTOP;
      const rect = node.getBoundingClientRect();
      const innerW = rect.width - margin * 2;
      const boxGuess = Math.min(Math.max(0, innerW), Math.max(0, rect.height - margin * 2));
      const pointerOverhang = Math.min(56, Math.max(26, Math.round(boxGuess * 0.11 + 14)));
      const pointerOutside = Math.ceil(pointerOverhang * POINTER_OUTSIDE_RATIO);
      const innerH = rect.height - margin * 2 - pointerOutside;
      const raw = compact
        ? Math.floor(Math.min(Math.max(0, innerW), Math.max(0, innerH * 1.28)))
        : Math.floor(Math.min(Math.max(0, innerW), Math.max(0, innerH)));
      setSide(Math.max(56, raw));
    }

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    const mq = window.matchMedia(COMPACT_MAX_WIDTH);
    mq.addEventListener("change", measure);
    return () => {
      ro.disconnect();
      mq.removeEventListener("change", measure);
    };
  }, []);

  function spinOnce() {
    if (spinning) return;

    const targetIdx = pickTargetIndex(lastWinnerRef.current);

    const end = reduceMotion ? rotationToAlign(rotation, targetIdx) : pickEndRotation(rotation, targetIdx);

    setSpinning(true);
    onSpinBusyChange?.(true);
    onLandedChange?.(null);
    onSpinStart?.();

    if (reduceMotion) {
      setRotation(end);
      setSpinning(false);
      onSpinBusyChange?.(false);
      const landedIdx = rotationToWinnerIndex(end);
      lastWinnerRef.current = landedIdx;
      onLandedChange?.({
        label: safePicks[landedIdx].label,
        index: landedIdx,
        category: safePicks[landedIdx].category,
      });
      return;
    }

    const start = rotation;
    const startTime = performance.now();
    const duration = 3400;
    lastTickIndexRef.current = rotationTickIndex(start);

    function easeOutCubic(t: number): number {
      return 1 - (1 - t) ** 3;
    }

    function frame(now: number) {
      const t = Math.min(1, (now - startTime) / duration);
      const e = easeOutCubic(t);
      const current = start + (end - start) * e;
      const tickIdx = rotationTickIndex(current);
      const missedTicks = tickIdx - lastTickIndexRef.current;
      if (missedTicks > 0) {
        lastTickIndexRef.current = tickIdx;
        pointerWobbleRef.current = Math.min(
          POINTER_TICK_KICK * 1.5,
          pointerWobbleRef.current + POINTER_TICK_KICK * missedTicks,
        );
      }
      pointerWobbleRef.current *= 0.78;
      if (pointerWobbleRef.current < 0.25) pointerWobbleRef.current = 0;
      setPointerWobble(pointerWobbleRef.current);
      setRotation(current);
      if (t < 1) {
        animRef.current = requestAnimationFrame(frame);
      } else {
        setSpinning(false);
        onSpinBusyChange?.(false);
        const idx = rotationToWinnerIndex(end);
        lastWinnerRef.current = idx;
        onLandedChange?.({
          label: safePicks[idx].label,
          index: idx,
          category: safePicks[idx].category,
        });
      }
    }

    animRef.current = requestAnimationFrame(frame);
  }

  useImperativeHandle(ref, () => ({ spinOnce }));

  const rootClass = ["flex min-h-0 w-full flex-1 flex-col items-center", className].filter(Boolean).join(" ");

  const pointerHalf = Math.max(12, Math.min(22, Math.round(side * 0.068)));
  const pointerTip = Math.max(18, Math.min(36, Math.round(side * 0.1)));
  const pointerLift = Math.round(pointerTip * POINTER_OUTSIDE_RATIO);
  const pointerTop = Math.round(side * 0.045);
  const labelFont = isCompact
    ? Math.min(14, Math.max(10, side / 22))
    : Math.min(10, Math.max(7, side / 36));
  const segmentIconPx = Math.min(24, Math.max(11, Math.round(labelFont * 1.35)));
  const hubButtonPx = Math.max(44, Math.min(92, Math.round(side * 0.255)));
  const gradientId = (name: string) => `${gradientSeed}-${name}`;
  const dotRadiusOuter = theme.id === "cookie" ? 4 : 3.4;
  const dotRadiusInner = theme.id === "cookie" ? 3 : 2.6;
  const dotDistOuter = theme.id === "cookie" ? 0.55 : 0.78;

  return (
    <div className={rootClass}>
      <div
        ref={slotRef}
        className="flex min-h-0 w-full min-w-0 flex-1 items-center justify-center"
      >
        <div
          className="relative mx-auto shrink-0"
          style={{ width: side, height: side }}
        >
          <div
            className={`pointer-events-none absolute left-1/2 top-0 z-10 h-0 w-0 border-l-transparent border-r-transparent drop-shadow-[0_4px_6px_rgba(76,5,25,0.35)] ${theme.pointerClass}`}
            style={{
              top: pointerTop,
              borderLeftWidth: pointerHalf,
              borderRightWidth: pointerHalf,
              borderTopWidth: pointerTip,
              transform: `translate(-50%, -${pointerLift}px) rotate(${pointerWobble}deg)`,
              transformOrigin: "50% 100%",
            }}
            aria-hidden
          />

          <svg
            className="aspect-square h-full max-h-full w-full overflow-visible drop-shadow-xl"
            viewBox="-20 -20 240 240"
            preserveAspectRatio="xMidYMid meet"
            role="img"
            aria-label="Prize wheel with three candies"
          >
            <title>Prize wheel</title>
            <defs>
              <WheelThemeDefs theme={theme} id={gradientId} />
            </defs>

            <circle cx={cx} cy={cy} r={104} fill={rimFill(theme, gradientId)} />
            <circle
              cx={cx}
              cy={cy}
              r={99}
              fill={theme.innerRimFill}
              opacity={theme.innerRimOpacity}
            />

            <g transform={`rotate(${rotation} ${cx} ${cy})`}>
              {[0, 1, 2].map((i) => {
                const start = -150 + SEG * i;
                const end = start + SEG;
                const mid = (start + end) / 2;
                const [ix, iy] = polar(cx, cy, r * 0.41, mid);
                const [tx, ty] = polar(cx, cy, r * 0.615, mid);
                const [dotA_X, dotA_Y] = polar(cx, cy, r * dotDistOuter, mid - (theme.id === "cookie" ? 20 : 28));
                const [dotB_X, dotB_Y] = polar(cx, cy, r * 0.38, mid + 32);
                const [dashX, dashY] = polar(cx, cy, r * 0.72, mid + 21);
                const pick = safePicks[i];
                const labelLines = splitWheelLabel(pick.label);
                const seg = theme.segments[i];
                const wedgeStroke = theme.neonWedgeStrokes?.[i] ?? theme.wedgeStroke;
                const iconClass =
                  theme.iconClassBySegment?.[i as 0 | 1 | 2] ?? theme.iconClass;

                return (
                  <g key={i}>
                    <path
                      d={wedgePath(cx, cy, r, start, end)}
                      fill={segmentFill(theme, i, gradientId)}
                      stroke={wedgeStroke}
                      strokeWidth={theme.wedgeStrokeWidth}
                      filter={theme.neonWedgeStrokes ? `url(#${gradientId(`glow-${i}`)})` : undefined}
                    />
                    {theme.showInnerWedgeArc && (
                      <path
                        d={wedgePath(cx, cy, r * 0.92, start + 2, end - 2)}
                        fill="none"
                        stroke="rgba(255,255,255,0.35)"
                        strokeWidth="2.5"
                      />
                    )}
                    {theme.showSegmentDots && (
                      <>
                        <circle cx={dotA_X} cy={dotA_Y} r={dotRadiusOuter} fill={seg.accent} opacity="0.9" />
                        <circle cx={dotB_X} cy={dotB_Y} r={dotRadiusInner} fill="#fff7ed" opacity="0.85" />
                      </>
                    )}
                    {theme.showSegmentDash && (
                      <rect
                        x={dashX - 6}
                        y={dashY - 1.8}
                        width="12"
                        height="3.6"
                        rx="1.8"
                        fill="rgba(255,255,255,0.72)"
                        transform={`rotate(${mid + 55} ${dashX} ${dashY})`}
                      />
                    )}
                    <foreignObject
                      x={ix - segmentIconPx / 2}
                      y={iy - segmentIconPx / 2}
                      width={segmentIconPx}
                      height={segmentIconPx}
                      transform={`rotate(${mid + 90} ${ix} ${iy})`}
                    >
                      <div
                        className={`flex size-full items-center justify-center [&_svg]:drop-shadow-[0_1px_1px_rgba(46,16,101,0.55)] ${iconClass}`}
                      >
                        <TreatIcon
                          category={pick.category}
                          size={Math.round(segmentIconPx * 0.82)}
                          className={iconClass}
                          decorative
                        />
                      </div>
                    </foreignObject>
                    <text
                      x={tx}
                      y={ty}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontSize={labelFont}
                      fontWeight={700}
                      fill={seg.labelFill}
                      stroke={seg.labelStroke}
                      strokeWidth={theme.labelStrokeWidth}
                      filter={theme.labelFilter ? `url(#${gradientId("label-shadow")})` : undefined}
                      paintOrder="stroke fill"
                      style={{ pointerEvents: "none" }}
                      transform={`rotate(${mid + 90} ${tx} ${ty})`}
                    >
                      {labelLines.map((line, lineIdx) => (
                        <tspan
                          key={`${line}-${lineIdx}`}
                          x={tx}
                          dy={
                            lineIdx === 0
                              ? labelLines.length > 1
                                ? "-0.35em"
                                : "0.1em"
                              : "1.15em"
                          }
                        >
                          {line}
                        </tspan>
                      ))}
                    </text>
                  </g>
                );
              })}
              {theme.id === "carnival" && (
                <circle cx={cx} cy={cy} r={19} fill="#581c87" opacity="0.35" />
              )}
              <circle
                cx={cx}
                cy={cy}
                r={16}
                fill={centerFill(theme, gradientId)}
                stroke={theme.centerStroke}
                strokeWidth={2.5}
              />
              {theme.centerHighlight && (
                <circle cx={cx - 4} cy={cy - 5} r={4.2} fill="#fff7ed" opacity="0.85" />
              )}
            </g>

            <circle cx={cx} cy={cy} r={96} fill="none" stroke={theme.outerStroke} strokeOpacity="0.7" strokeWidth="2" />
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

          <button
            type="button"
            aria-busy={spinning}
            aria-disabled={spinning}
            aria-label={spinning ? "Spinning" : "Spin the wheel"}
            onClick={() => spinOnce()}
            className={`${spinCenterButtonClass} absolute left-1/2 top-1/2 z-[15] -translate-x-1/2 -translate-y-1/2 ${
              spinning ? "cursor-wait pointer-events-none" : ""
            }`}
            style={{
              width: hubButtonPx,
              height: hubButtonPx,
              fontSize: Math.max(11, Math.round(hubButtonPx * 0.228)),
            }}
          >
            {spinning ? "…" : "Spin"}
          </button>
        </div>
      </div>
    </div>
  );
});

function rotationToAlign(current: number, targetIdx: number): number {
  const end = pickEndRotation(current, targetIdx);
  return end === current ? end + SEG / 2 : end;
}
