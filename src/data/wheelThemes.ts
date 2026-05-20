export type WheelDesignId =
  | "carnival"
  | "pastel"
  | "diner"
  | "neon"
  | "neon-sunset"
  | "neon-synthwave"
  | "neon-arcade"
  | "neon-aurora"
  | "minimal"
  | "cookie";

export type WheelSegmentTheme = {
  /** Solid hex or `segment-N` for carnival radial gradients */
  fill: string;
  accent: string;
  labelFill: string;
  labelStroke: string;
  /** Carnival radial gradient stops when fill is segment-N */
  gradient?: { from: string; via: string; to: string };
};

export type WheelTheme = {
  id: WheelDesignId;
  name: string;
  tagline: string;
  segments: [WheelSegmentTheme, WheelSegmentTheme, WheelSegmentTheme];
  rimFill: string;
  rimUsesGradient: boolean;
  innerRimFill: string;
  innerRimOpacity: number;
  centerFill: string;
  centerUsesGradient: boolean;
  centerStroke: string;
  centerHighlight: boolean;
  wedgeStroke: string;
  wedgeStrokeWidth: number;
  /** Per-segment stroke for neon; otherwise uses wedgeStroke */
  neonWedgeStrokes?: [string, string, string];
  outerStroke: string;
  pointerClass: string;
  showSparkle: boolean;
  showInnerWedgeArc: boolean;
  showSegmentDots: boolean;
  showSegmentDash: boolean;
  showCookieHighlightArc: boolean;
  labelFilter: boolean;
  labelStrokeWidth: number;
  iconClass: string;
  /** Diner white wedge uses dark icon */
  iconClassBySegment?: Partial<Record<0 | 1 | 2, string>>;
  dinerCenterGradient?: boolean;
  cookieCenterGradient?: boolean;
  /** Hub gradient when `neonWedgeStrokes` is set */
  neonCenterStops?: { from: string; to: string };
};

export const DEFAULT_WHEEL_DESIGN_ID: WheelDesignId = "carnival";

export const WHEEL_DESIGNS: WheelTheme[] = [
  {
    id: "carnival",
    name: "Carnival Burst",
    tagline: "Bold radial gradients, glossy rim, playful sparkles.",
    segments: [
      {
        fill: "segment-0",
        accent: "#fecdd3",
        labelFill: "#fafafa",
        labelStroke: "#2e1065",
        gradient: { from: "#fb7185", via: "#ef4444", to: "#be123c" },
      },
      {
        fill: "segment-1",
        accent: "#fef3c7",
        labelFill: "#fafafa",
        labelStroke: "#2e1065",
        gradient: { from: "#fde047", via: "#f97316", to: "#c2410c" },
      },
      {
        fill: "segment-2",
        accent: "#ddd6fe",
        labelFill: "#fafafa",
        labelStroke: "#2e1065",
        gradient: { from: "#c084fc", via: "#8b5cf6", to: "#5b21b6" },
      },
    ],
    rimFill: "#fff7ed",
    rimUsesGradient: true,
    innerRimFill: "#fff7ed",
    innerRimOpacity: 0.95,
    centerFill: "#f97316",
    centerUsesGradient: true,
    centerStroke: "#581c87",
    centerHighlight: true,
    wedgeStroke: "rgba(255,255,255,0.55)",
    wedgeStrokeWidth: 3,
    outerStroke: "#ffffff",
    pointerClass: "border-t-rose-600",
    showSparkle: true,
    showInnerWedgeArc: true,
    showSegmentDots: true,
    showSegmentDash: true,
    showCookieHighlightArc: false,
    labelFilter: true,
    labelStrokeWidth: 0.55,
    iconClass: "text-white",
    dinerCenterGradient: false,
    cookieCenterGradient: false,
  },
  {
    id: "pastel",
    name: "Pastel Candy Shop",
    tagline: "Soft fills, thin borders, gentle rim.",
    segments: [
      { fill: "#fbcfe8", accent: "#fdf2f8", labelFill: "#831843", labelStroke: "#fce7f3" },
      { fill: "#bbf7d0", accent: "#ecfdf5", labelFill: "#14532d", labelStroke: "#d1fae5" },
      { fill: "#fde68a", accent: "#fffbeb", labelFill: "#78350f", labelStroke: "#fef3c7" },
    ],
    rimFill: "#faf5ff",
    rimUsesGradient: false,
    innerRimFill: "#ffffff",
    innerRimOpacity: 1,
    centerFill: "#f5d0fe",
    centerUsesGradient: false,
    centerStroke: "#c084fc",
    centerHighlight: false,
    wedgeStroke: "rgba(255,255,255,0.9)",
    wedgeStrokeWidth: 2.5,
    outerStroke: "#e9d5ff",
    pointerClass: "border-t-fuchsia-400",
    showSparkle: false,
    showInnerWedgeArc: false,
    showSegmentDots: false,
    showSegmentDash: false,
    showCookieHighlightArc: false,
    labelFilter: false,
    labelStrokeWidth: 0,
    iconClass: "text-purple-950",
    dinerCenterGradient: false,
    cookieCenterGradient: false,
  },
  {
    id: "diner",
    name: "Retro Diner",
    tagline: "Flat wedges, thick white dividers, chrome hub.",
    segments: [
      { fill: "#dc2626", accent: "#ffffff", labelFill: "#ffffff", labelStroke: "#7f1d1d" },
      { fill: "#f8fafc", accent: "#dc2626", labelFill: "#0f172a", labelStroke: "#f1f5f9" },
      { fill: "#0d9488", accent: "#ffffff", labelFill: "#ffffff", labelStroke: "#134e4a" },
    ],
    rimFill: "#1e293b",
    rimUsesGradient: false,
    innerRimFill: "#f8fafc",
    innerRimOpacity: 1,
    centerFill: "#cbd5e1",
    centerUsesGradient: false,
    centerStroke: "#475569",
    centerHighlight: false,
    wedgeStroke: "#ffffff",
    wedgeStrokeWidth: 5,
    outerStroke: "#1e293b",
    pointerClass: "border-t-slate-900",
    showSparkle: false,
    showInnerWedgeArc: false,
    showSegmentDots: true,
    showSegmentDash: false,
    showCookieHighlightArc: false,
    labelFilter: false,
    labelStrokeWidth: 0.5,
    iconClass: "text-white",
    iconClassBySegment: { 1: "text-rose-600" },
    dinerCenterGradient: true,
    cookieCenterGradient: false,
  },
  {
    id: "neon",
    name: "Neon Night",
    tagline: "Dark base with cyan, magenta, and lime electric glows.",
    segments: [
      { fill: "#0f172a", accent: "#22d3ee", labelFill: "#67e8f9", labelStroke: "#083344" },
      { fill: "#0f172a", accent: "#e879f9", labelFill: "#f0abfc", labelStroke: "#4a044e" },
      { fill: "#0f172a", accent: "#a3e635", labelFill: "#bef264", labelStroke: "#1a2e05" },
    ],
    rimFill: "#020617",
    rimUsesGradient: false,
    innerRimFill: "#1e1b4b",
    innerRimOpacity: 1,
    centerFill: "#0f172a",
    centerUsesGradient: false,
    centerStroke: "#22d3ee",
    centerHighlight: false,
    wedgeStroke: "#22d3ee",
    wedgeStrokeWidth: 3,
    neonWedgeStrokes: ["#22d3ee", "#e879f9", "#a3e635"],
    neonCenterStops: { from: "#312e81", to: "#0f172a" },
    outerStroke: "#22d3ee",
    pointerClass: "border-t-cyan-400",
    showSparkle: false,
    showInnerWedgeArc: false,
    showSegmentDots: false,
    showSegmentDash: false,
    showCookieHighlightArc: false,
    labelFilter: false,
    labelStrokeWidth: 0.5,
    iconClass: "text-cyan-300",
    dinerCenterGradient: false,
    cookieCenterGradient: false,
  },
  {
    id: "neon-sunset",
    name: "Neon Sunset",
    tagline: "Warm pink, orange, and gold glows on a deep charcoal base.",
    segments: [
      { fill: "#0c0a09", accent: "#f472b6", labelFill: "#fbcfe8", labelStroke: "#500724" },
      { fill: "#0c0a09", accent: "#fb923c", labelFill: "#fed7aa", labelStroke: "#431407" },
      { fill: "#0c0a09", accent: "#fbbf24", labelFill: "#fef08a", labelStroke: "#422006" },
    ],
    rimFill: "#0c0a09",
    rimUsesGradient: false,
    innerRimFill: "#1c1917",
    innerRimOpacity: 1,
    centerFill: "#0c0a09",
    centerUsesGradient: false,
    centerStroke: "#fb923c",
    centerHighlight: false,
    wedgeStroke: "#f472b6",
    wedgeStrokeWidth: 3,
    neonWedgeStrokes: ["#f472b6", "#fb923c", "#fbbf24"],
    neonCenterStops: { from: "#9a3412", to: "#0c0a09" },
    outerStroke: "#f472b6",
    pointerClass: "border-t-pink-400",
    showSparkle: false,
    showInnerWedgeArc: false,
    showSegmentDots: false,
    showSegmentDash: false,
    showCookieHighlightArc: false,
    labelFilter: false,
    labelStrokeWidth: 0.5,
    iconClass: "text-pink-300",
    dinerCenterGradient: false,
    cookieCenterGradient: false,
  },
  {
    id: "neon-synthwave",
    name: "Synthwave",
    tagline: "Hot pink, violet, and sky-blue — classic 80s grid energy.",
    segments: [
      { fill: "#0f0518", accent: "#f0abfc", labelFill: "#f5d0fe", labelStroke: "#4a044e" },
      { fill: "#0f0518", accent: "#a78bfa", labelFill: "#ddd6fe", labelStroke: "#3b0764" },
      { fill: "#0f0518", accent: "#38bdf8", labelFill: "#bae6fd", labelStroke: "#0c4a6e" },
    ],
    rimFill: "#0f0518",
    rimUsesGradient: false,
    innerRimFill: "#2e1065",
    innerRimOpacity: 1,
    centerFill: "#0f0518",
    centerUsesGradient: false,
    centerStroke: "#e879f9",
    centerHighlight: false,
    wedgeStroke: "#f0abfc",
    wedgeStrokeWidth: 3,
    neonWedgeStrokes: ["#f0abfc", "#a78bfa", "#38bdf8"],
    neonCenterStops: { from: "#701a75", to: "#0f0518" },
    outerStroke: "#f0abfc",
    pointerClass: "border-t-fuchsia-400",
    showSparkle: false,
    showInnerWedgeArc: false,
    showSegmentDots: false,
    showSegmentDash: false,
    showCookieHighlightArc: false,
    labelFilter: false,
    labelStrokeWidth: 0.5,
    iconClass: "text-fuchsia-300",
    dinerCenterGradient: false,
    cookieCenterGradient: false,
  },
  {
    id: "neon-arcade",
    name: "Neon Arcade",
    tagline: "Cabinet-bright cyan, yellow, and red on a near-black cabinet.",
    segments: [
      { fill: "#0a0a0a", accent: "#22d3ee", labelFill: "#a5f3fc", labelStroke: "#083344" },
      { fill: "#0a0a0a", accent: "#facc15", labelFill: "#fef08a", labelStroke: "#422006" },
      { fill: "#0a0a0a", accent: "#f87171", labelFill: "#fecaca", labelStroke: "#450a0a" },
    ],
    rimFill: "#000000",
    rimUsesGradient: false,
    innerRimFill: "#171717",
    innerRimOpacity: 1,
    centerFill: "#0a0a0a",
    centerUsesGradient: false,
    centerStroke: "#facc15",
    centerHighlight: false,
    wedgeStroke: "#22d3ee",
    wedgeStrokeWidth: 3,
    neonWedgeStrokes: ["#22d3ee", "#facc15", "#f87171"],
    neonCenterStops: { from: "#404040", to: "#000000" },
    outerStroke: "#facc15",
    pointerClass: "border-t-yellow-400",
    showSparkle: false,
    showInnerWedgeArc: false,
    showSegmentDots: false,
    showSegmentDash: false,
    showCookieHighlightArc: false,
    labelFilter: false,
    labelStrokeWidth: 0.5,
    iconClass: "text-yellow-300",
    dinerCenterGradient: false,
    cookieCenterGradient: false,
  },
  {
    id: "neon-aurora",
    name: "Aurora Borealis",
    tagline: "Emerald, teal, and indigo glows like northern lights over midnight.",
    segments: [
      { fill: "#020617", accent: "#34d399", labelFill: "#a7f3d0", labelStroke: "#064e3b" },
      { fill: "#020617", accent: "#2dd4bf", labelFill: "#99f6e4", labelStroke: "#134e4a" },
      { fill: "#020617", accent: "#818cf8", labelFill: "#c7d2fe", labelStroke: "#312e81" },
    ],
    rimFill: "#020617",
    rimUsesGradient: false,
    innerRimFill: "#0f172a",
    innerRimOpacity: 1,
    centerFill: "#020617",
    centerUsesGradient: false,
    centerStroke: "#34d399",
    centerHighlight: false,
    wedgeStroke: "#34d399",
    wedgeStrokeWidth: 3,
    neonWedgeStrokes: ["#34d399", "#2dd4bf", "#818cf8"],
    neonCenterStops: { from: "#064e3b", to: "#020617" },
    outerStroke: "#34d399",
    pointerClass: "border-t-emerald-400",
    showSparkle: false,
    showInnerWedgeArc: false,
    showSegmentDots: false,
    showSegmentDash: false,
    showCookieHighlightArc: false,
    labelFilter: false,
    labelStrokeWidth: 0.5,
    iconClass: "text-emerald-300",
    dinerCenterGradient: false,
    cookieCenterGradient: false,
  },
  {
    id: "minimal",
    name: "Minimal Flat",
    tagline: "Solid wedges, no ornaments — clean and modern.",
    segments: [
      { fill: "#f43f5e", accent: "#ffffff", labelFill: "#ffffff", labelStroke: "#881337" },
      { fill: "#8b5cf6", accent: "#ffffff", labelFill: "#ffffff", labelStroke: "#4c1d95" },
      { fill: "#14b8a6", accent: "#ffffff", labelFill: "#ffffff", labelStroke: "#134e4a" },
    ],
    rimFill: "#fafafa",
    rimUsesGradient: false,
    innerRimFill: "#ffffff",
    innerRimOpacity: 1,
    centerFill: "#581c87",
    centerUsesGradient: false,
    centerStroke: "#581c87",
    centerHighlight: false,
    wedgeStroke: "#ffffff",
    wedgeStrokeWidth: 2.5,
    outerStroke: "#e5e7eb",
    pointerClass: "border-t-purple-900",
    showSparkle: false,
    showInnerWedgeArc: false,
    showSegmentDots: false,
    showSegmentDash: false,
    showCookieHighlightArc: false,
    labelFilter: false,
    labelStrokeWidth: 0.5,
    iconClass: "text-white",
    dinerCenterGradient: false,
    cookieCenterGradient: false,
  },
  {
    id: "cookie",
    name: "Cookie Wheel",
    tagline: "Warm dough tones and chip dots.",
    segments: [
      { fill: "#e7bd73", accent: "#5a3324", labelFill: "#422006", labelStroke: "#fef3c7" },
      { fill: "#d4a574", accent: "#5a3324", labelFill: "#422006", labelStroke: "#fef3c7" },
      { fill: "#c9956a", accent: "#5a3324", labelFill: "#422006", labelStroke: "#fef3c7" },
    ],
    rimFill: "#a87246",
    rimUsesGradient: false,
    innerRimFill: "#f1d192",
    innerRimOpacity: 1,
    centerFill: "#a87246",
    centerUsesGradient: false,
    centerStroke: "#7c4a2e",
    centerHighlight: false,
    wedgeStroke: "rgba(255,247,237,0.7)",
    wedgeStrokeWidth: 2.5,
    outerStroke: "#a87246",
    pointerClass: "border-t-amber-800",
    showSparkle: false,
    showInnerWedgeArc: false,
    showSegmentDots: true,
    showSegmentDash: false,
    showCookieHighlightArc: true,
    labelFilter: false,
    labelStrokeWidth: 0.5,
    iconClass: "text-amber-950",
    dinerCenterGradient: false,
    cookieCenterGradient: true,
  },
];

export function getWheelTheme(id: WheelDesignId): WheelTheme {
  return WHEEL_DESIGNS.find((d) => d.id === id) ?? WHEEL_DESIGNS[0];
}

export function isWheelDesignId(value: string): value is WheelDesignId {
  return WHEEL_DESIGNS.some((d) => d.id === value);
}
