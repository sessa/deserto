import confetti, { type Shape } from "canvas-confetti";

const CONFETTI_COLORS = [
  "#fb7185",
  "#f472b6",
  "#fbbf24",
  "#fcd34d",
  "#c084fc",
  "#34d399",
  "#6ee7b7",
];

const HEART_PATH =
  "M5 9 C5 9 1 5.5 1 3 C1 1.5 2.5 0.5 4 1.5 C4.5 0.8 5 0.5 6 0.8 C7.5 0.5 9 1.5 9 3 C9 5.5 5 9 5 9 Z";

let heartShape: Shape | null = null;
let confettiCanvas: HTMLCanvasElement | null = null;
let shootConfetti: ReturnType<typeof confetti.create> | null = null;

function getShapes(): Shape[] {
  if (!heartShape) {
    heartShape = confetti.shapeFromPath({ path: HEART_PATH });
  }
  return [heartShape, "star", heartShape, "star"];
}

function viewportPixels() {
  const vv = window.visualViewport;
  return {
    width: Math.round(vv?.width ?? window.innerWidth),
    height: Math.round(vv?.height ?? window.innerHeight),
  };
}

/** Keep the confetti layer matched to the visible viewport (fixes stale canvas on desktop resize). */
function syncConfettiCanvas() {
  if (!confettiCanvas) return;
  const { width, height } = viewportPixels();
  confettiCanvas.width = width;
  confettiCanvas.height = height;
}

function getConfettiCannon() {
  if (!shootConfetti) {
    confettiCanvas = document.createElement("canvas");
    confettiCanvas.setAttribute("aria-hidden", "true");
    Object.assign(confettiCanvas.style, {
      position: "fixed",
      inset: "0",
      width: "100%",
      height: "100%",
      pointerEvents: "none",
      zIndex: "9999",
    });
    document.body.appendChild(confettiCanvas);
    shootConfetti = confetti.create(confettiCanvas, { resize: true });
  }
  syncConfettiCanvas();
  return shootConfetti;
}

const pageTopBurst = {
  spread: 55,
  startVelocity: 28,
  ticks: 320,
  gravity: 1.15,
  /** 270° launches particles downward from the spawn point (canvas +y). */
  angle: 270,
  scalar: 1.1,
  colors: CONFETTI_COLORS,
};

/**
 * Bursts downward from along the viewport top edge.
 */
export function fireWheelConfetti(): void {
  if (typeof window === "undefined") return;

  const shoot = getConfettiCannon();
  const shapes = getShapes();

  const anchors = [
    { x: 0.12, particleCount: 40 },
    { x: 0.32, particleCount: 50 },
    { x: 0.5, particleCount: 60 },
    { x: 0.68, particleCount: 50 },
    { x: 0.88, particleCount: 40 },
  ] as const;

  for (const { x, particleCount } of anchors) {
    void shoot({
      ...pageTopBurst,
      shapes,
      origin: { x, y: 0 },
      particleCount,
      startVelocity: 24 + Math.random() * 6,
    });
  }
}
