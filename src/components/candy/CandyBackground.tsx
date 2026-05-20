"use client";

/**
 * Cookie shapes on light purple — fixed layer behind candy page content.
 */
export function CandyBackground() {
  const cookies = [
    { x: "6%", y: "8%", rot: -12, scale: 0.95 },
    { x: "84%", y: "12%", rot: 18, scale: 1.05 },
    { x: "72%", y: "78%", rot: -8, scale: 0.98 },
    { x: "14%", y: "72%", rot: 14, scale: 1.08 },
    { x: "48%", y: "18%", rot: -6, scale: 0.9 },
    { x: "22%", y: "38%", rot: -22, scale: 1 },
    { x: "88%", y: "48%", rot: 28, scale: 0.92 },
    { x: "8%", y: "52%", rot: -4, scale: 0.86 },
    { x: "52%", y: "86%", rot: 10, scale: 1.04 },
    { x: "38%", y: "58%", rot: -16, scale: 0.96 },
  ];
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#e9d6ff]"
    >
      {/* soft gradient depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#f3e9ff] via-[#e5d4ff] to-[#dcc7fa]" />

      {/* cookie circles */}
      {cookies.map((c, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: c.x,
            top: c.y,
            transform: `translate(-50%, -50%) rotate(${c.rot}deg) scale(${c.scale})`,
          }}
        >
          {/* cookie body */}
          <div className="relative h-24 w-24 overflow-hidden rounded-full border-[5px] border-[#a87246] bg-[#e7bd73] shadow-[0_10px_0_rgba(122,78,42,0.18),0_16px_24px_rgba(76,37,88,0.14)] sm:h-28 sm:w-28">
            <div className="absolute inset-[7px] rounded-full bg-[#f1d192] shadow-[inset_-12px_-14px_0_rgba(180,112,54,0.22),inset_8px_9px_0_rgba(255,245,207,0.48)]" />
            <div className="absolute left-[13%] top-[12%] h-8 w-10 rounded-full bg-white/20 blur-[1px]" />

            {/* chips */}
            <span className="absolute left-[18%] top-[25%] h-3 w-3 rotate-12 rounded-full bg-[#5a3324] shadow-[inset_-1px_-1px_0_rgba(0,0,0,0.18)]" />
            <span className="absolute right-[18%] top-[31%] h-3.5 w-3 rotate-45 rounded-full bg-[#4b2b20] shadow-[inset_-1px_-1px_0_rgba(0,0,0,0.18)]" />
            <span className="absolute bottom-[23%] left-[20%] h-2.5 w-3.5 -rotate-12 rounded-full bg-[#6a3d2a] shadow-[inset_-1px_-1px_0_rgba(0,0,0,0.16)]" />
            <span className="absolute bottom-[18%] right-[24%] h-3 w-3.5 rotate-6 rounded-full bg-[#513024] shadow-[inset_-1px_-1px_0_rgba(0,0,0,0.18)]" />
            <span className="absolute left-[45%] top-[14%] h-2 w-2.5 -rotate-45 rounded-full bg-[#73452e]" />
            <span className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rotate-12 rounded-full bg-[#5a3324] shadow-[inset_-1px_-1px_0_rgba(0,0,0,0.18)]" />
          </div>
        </div>
      ))}
    </div>
  );
}
