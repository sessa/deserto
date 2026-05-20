import confetti from "canvas-confetti";

/**
 * One burst from top-center downward (celebratory spin kickoff).
 */
export function fireWheelConfetti(): void {
  void confetti({
    particleCount: 92,
    spread: 56,
    startVelocity: 36,
    ticks: 260,
    gravity: 1,
    origin: { x: 0.5, y: 0 },
    angle: 270,
    scalar: 0.95,
    colors: ["#fb7185", "#f472b6", "#fbbf24", "#fcd34d", "#c084fc", "#34d399", "#6ee7b7"],
  });
}
