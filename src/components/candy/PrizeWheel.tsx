"use client";

import { useEffect, useRef, useState } from "react";

const SEG = 360 / 3;
const FILLS = ["#fcd34d", "#fbbf24", "#fde68a"] as const;

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

/** Winning segment index after rotating the wheel CLOCKWISE by `rotationDeg`. */
export function rotationToWinnerIndex(rotationDeg: number): number {
  const a = ((-rotationDeg % 360) + 360) % 360;
  const idx = Math.floor(a / SEG) % 3;
  return idx;
}

function pickEndRotation(prev: number, targetIdx: number): number {
  for (let t = 0; t < 500; t++) {
    const fullSpins = (4 + Math.floor(Math.random() * 8)) * 360;
    const jitter = Math.random() * 90 - 45;
    const candidate = prev + fullSpins + jitter;
    const idx = rotationToWinnerIndex(candidate);
    if (idx === targetIdx) return candidate;
  }
  return prev + (5 + Math.random() * 5) * 360;
}

export type PrizeWheelProps = {
  labels: readonly string[];
  reduceMotion?: boolean;
  onSpinBusyChange?: (busy: boolean) => void;
  onLandedChange?: (payload: { label: string; index: number } | null) => void;
};

export function PrizeWheel({
  labels,
  reduceMotion,
  onSpinBusyChange,
  onLandedChange,
}: PrizeWheelProps) {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const animRef = useRef<number>(0);

  const safeLabels = [...labels.slice(0, 3)];
  while (safeLabels.length < 3) safeLabels.push("—");

  const cx = 100;
  const cy = 100;
  const r = 95;

  useEffect(() => {
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  function spinOnce() {
    if (spinning) return;

    const targetIdx = Math.floor(Math.random() * 3);

    const end = reduceMotion ? rotationToAlign(rotation, targetIdx) : pickEndRotation(rotation, targetIdx);

    setSpinning(true);
    onSpinBusyChange?.(true);
    onLandedChange?.(null);

    if (reduceMotion) {
      setRotation(end);
      setSpinning(false);
      onSpinBusyChange?.(false);
      const landedIdx = rotationToWinnerIndex(end);
      onLandedChange?.({ label: safeLabels[landedIdx], index: landedIdx });
      return;
    }

    const start = rotation;
    const startTime = performance.now();
    const duration = 3400;

    function easeOutCubic(t: number): number {
      return 1 - (1 - t) ** 3;
    }

    function frame(now: number) {
      const t = Math.min(1, (now - startTime) / duration);
      const e = easeOutCubic(t);
      const current = start + (end - start) * e;
      setRotation(current);
      if (t < 1) {
        animRef.current = requestAnimationFrame(frame);
      } else {
        setSpinning(false);
        onSpinBusyChange?.(false);
        const idx = rotationToWinnerIndex(end);
        onLandedChange?.({ label: safeLabels[idx], index: idx });
      }
    }

    animRef.current = requestAnimationFrame(frame);
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative h-[260px] w-[260px] sm:h-[280px] sm:w-[280px]">
        {/* pointer */}
        <div
          className="pointer-events-none absolute left-1/2 top-0 z-10 -translate-x-1/2 drop-shadow"
          aria-hidden
        >
          <div className="h-0 w-0 border-l-[14px] border-r-[14px] border-t-[22px] border-l-transparent border-r-transparent border-t-rose-500" />
        </div>

        <svg className="h-full w-full drop-shadow-xl" viewBox="0 0 200 200" role="img" aria-label="Prize wheel with three candies">
          <title>Prize wheel</title>
          <g
            transform={`rotate(${rotation} ${cx} ${cy})`}
            style={{
              transition: reduceMotion ? "none" : undefined,
              transformOrigin: "100px 100px",
              transformBox: "fill-box",
            }}
          >
            {[0, 1, 2].map((i) => {
              const start = -150 + SEG * i;
              const end = start + SEG;
              const mid = (start + end) / 2;
              const [tx, ty] = polar(cx, cy, r * 0.62, mid);
              return (
                <g key={i}>
                  <path
                    d={wedgePath(cx, cy, r, start, end)}
                    fill={FILLS[i % FILLS.length]}
                    stroke="#b45309"
                    strokeWidth="2"
                  />
                  <text
                    x={tx}
                    y={ty}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize={10}
                    fontWeight={700}
                    fill="#78350f"
                    style={{ pointerEvents: "none" }}
                    transform={`rotate(${mid + 90} ${tx} ${ty})`}
                  >
                    {/* split long labels into two lines-ish by word wrap simplistic */}
                    <tspan x={tx} dy="-0.3em">{safeLabels[i].slice(0, 18)}{safeLabels[i].length > 18 ? "…" : ""}</tspan>
                  </text>
                </g>
              );
            })}
            <circle cx={cx} cy={cy} r={16} fill="#fff7ed" stroke="#b45309" strokeWidth={2} />
          </g>
        </svg>
      </div>

      <button
        type="button"
        onClick={spinOnce}
        disabled={spinning}
        className="rounded-full bg-rose-600 px-8 py-3 text-lg font-bold text-white shadow-lg transition hover:bg-rose-500 disabled:pointer-events-none disabled:opacity-50"
      >
        {spinning ? "Spinning…" : "Spin the wheel"}
      </button>
    </div>
  );
}

function rotationToAlign(current: number, targetIdx: number): number {
  for (let bump = 0; bump <= 720; bump += 1) {
    const cand = current + bump;
    if (rotationToWinnerIndex(cand) === targetIdx) return cand;
  }
  return current + 360 * 6;
}
