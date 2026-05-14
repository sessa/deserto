"use client";

/**
 * Cookie + smile faces on light purple — fixed layer behind candy page content.
 */
export function CandyBackground() {
  const cookies = [
    { x: "6%", y: "8%", rot: -12 },
    { x: "84%", y: "12%", rot: 18 },
    { x: "72%", y: "78%", rot: -8 },
    { x: "14%", y: "72%", rot: 14 },
    { x: "48%", y: "18%", rot: -6 },
    { x: "22%", y: "38%", rot: -22 },
    { x: "88%", y: "48%", rot: 28 },
    { x: "8%", y: "52%", rot: -4 },
    { x: "52%", y: "86%", rot: 10 },
    { x: "38%", y: "58%", rot: -16 },
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
          style={{ left: c.x, top: c.y, transform: `translate(-50%, -50%) rotate(${c.rot}deg)` }}
        >
          {/* cookie body */}
          <div className="relative h-24 w-24 rounded-full border-4 border-[#b08968] bg-[#e8cfa3] shadow-md sm:h-28 sm:w-28">
            {/* chips */}
            <span className="absolute left-[18%] top-[26%] h-3 w-3 rounded-full bg-[#5c4033]" />
            <span className="absolute right-[22%] top-[42%] h-2.5 w-2.5 rounded-full bg-[#4a3328]" />
            <span className="absolute bottom-[26%] left-[42%] h-3 w-3 rounded-full bg-[#523426]" />

            {/* smiley */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pb-3">
              <div className="flex gap-[18px] text-[#5c4033]">
                <span className="inline-block h-2 w-2 rounded-full bg-[#5c4033]" />
                <span className="inline-block h-2 w-2 rounded-full bg-[#5c4033]" />
              </div>
              <svg
                className="-mt-0.5 w-12 text-[#5c4033]"
                viewBox="0 0 48 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              >
                <path d="M10 14c6 10 26 10 34 4" />
              </svg>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
