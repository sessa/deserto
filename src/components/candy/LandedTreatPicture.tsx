import type { ReactNode } from "react";
import type { TreatCategory } from "@/data/candies";

type LandedTreatPictureProps = {
  label: string;
  category: TreatCategory;
  eyebrow?: string;
  className?: string;
};

type TreatArtKind =
  | "mini-cones"
  | "cream-pops"
  | "starlight-mints"
  | "candy-cane-kisses"
  | "pink-round"
  | "fun-dip"
  | "jelly-beans"
  | "bubble-tape"
  | "skittles-gummies"
  | "gummy-clusters"
  | "reese-carrot"
  | "ring-pop"
  | "nerds-box"
  | "chocolate-carrot"
  | "pocky"
  | "fallback";

type TreatPicture = {
  match?: string;
  art: TreatArtKind;
  bgClass: string;
  badgeClass: string;
  caption: string;
  badge: string;
  category?: TreatCategory;
};

const TREAT_PICTURES: readonly TreatPicture[] = [
  {
    match: "blue bunny",
    art: "mini-cones",
    bgClass: "from-sky-100 via-pink-100 to-amber-100",
    badgeClass: "bg-sky-100 text-sky-900 ring-sky-200",
    caption: "Vanilla swirls stacked in tiny chocolate-dipped cones.",
    badge: "mini cones",
  },
  {
    match: "jonnypops",
    art: "cream-pops",
    bgClass: "from-amber-100 via-pink-100 to-sky-100",
    badgeClass: "bg-amber-100 text-amber-950 ring-amber-200",
    caption: "Birthday cake cream pops with sprinkles and vanilla stripes.",
    badge: "cream pops",
  },
  {
    match: "peppermint starlight",
    art: "starlight-mints",
    bgClass: "from-emerald-100 via-white to-rose-100",
    badgeClass: "bg-emerald-100 text-emerald-900 ring-emerald-200",
    caption: "Classic red-and-white starlight mints with a cool finish.",
    badge: "starlight mints",
  },
  {
    match: "hershey",
    art: "candy-cane-kisses",
    bgClass: "from-red-100 via-white to-emerald-100",
    badgeClass: "bg-red-100 text-red-900 ring-red-200",
    caption: "Candy cane kisses with striped foil and little chocolate peaks.",
    badge: "kisses",
  },
  {
    match: "dunkin",
    art: "pink-round",
    bgClass: "from-pink-100 via-orange-100 to-fuchsia-100",
    badgeClass: "bg-pink-100 text-pink-900 ring-pink-200",
    caption: "The pink round candy gets its own bright donut-shop look.",
    badge: "pink round",
  },
  {
    match: "fun dip",
    art: "fun-dip",
    bgClass: "from-rose-100 via-sky-100 to-yellow-100",
    badgeClass: "bg-rose-100 text-rose-900 ring-rose-200",
    caption: "Cherry powder, dipping stick, and a splash of sugar color.",
    badge: "dip pack",
  },
  {
    match: "jelly beans",
    art: "jelly-beans",
    bgClass: "from-lime-100 via-fuchsia-100 to-orange-100",
    badgeClass: "bg-lime-100 text-lime-950 ring-lime-200",
    caption: "A mixed handful of glossy jelly beans.",
    badge: "mixed beans",
  },
  {
    match: "hubba bubba",
    art: "bubble-tape",
    bgClass: "from-cyan-100 via-sky-100 to-pink-100",
    badgeClass: "bg-cyan-100 text-cyan-950 ring-cyan-200",
    caption: "A bubble tape roll with a big gum bubble pop.",
    badge: "bubble tape",
  },
  {
    match: "skittles gummies",
    art: "skittles-gummies",
    bgClass: "from-red-100 via-yellow-100 to-lime-100",
    badgeClass: "bg-red-100 text-red-900 ring-red-200",
    caption: "Soft fruit gummies in rainbow Skittles colors.",
    badge: "fruit gummies",
  },
  {
    match: "nerds gummy clusters",
    art: "gummy-clusters",
    bgClass: "from-purple-100 via-pink-100 to-sky-100",
    badgeClass: "bg-purple-100 text-purple-900 ring-purple-200",
    caption: "Crunchy little Nerds wrapped around gummy centers.",
    badge: "clusters",
  },
  {
    match: "reese",
    art: "reese-carrot",
    bgClass: "from-orange-100 via-yellow-100 to-amber-100",
    badgeClass: "bg-orange-100 text-orange-950 ring-orange-200",
    caption: "Peanut-butter pieces tucked into the carrot bag.",
    badge: "pieces",
  },
  {
    match: "watermelon ring pop",
    art: "ring-pop",
    bgClass: "from-emerald-100 via-rose-100 to-pink-100",
    badgeClass: "bg-emerald-100 text-emerald-900 ring-emerald-200",
    caption: "A watermelon jewel ring with green candy sparkle.",
    badge: "ring pop",
  },
  {
    match: "nerds (little crunchy box)",
    art: "nerds-box",
    bgClass: "from-pink-100 via-violet-100 to-sky-100",
    badgeClass: "bg-violet-100 text-violet-900 ring-violet-200",
    caption: "A tiny crunchy Nerds box spilling colorful bits.",
    badge: "crunchy box",
  },
  {
    match: "lindt chocolate carrot",
    art: "chocolate-carrot",
    bgClass: "from-amber-100 via-orange-100 to-rose-100",
    badgeClass: "bg-amber-100 text-amber-950 ring-amber-200",
    caption: "A chocolate carrot wrapped in shiny orange foil.",
    badge: "chocolate carrot",
  },
  {
    match: "pocky",
    art: "pocky",
    bgClass: "from-rose-100 via-pink-100 to-amber-100",
    badgeClass: "bg-rose-100 text-rose-900 ring-rose-200",
    caption: "Crunchy strawberry sticks with pink coating and crumbly bits.",
    badge: "strawberry sticks",
  },
];

const FALLBACK_PICTURES: Record<TreatCategory, TreatPicture> = {
  iceCream: {
    art: "fallback",
    category: "iceCream",
    bgClass: "from-sky-100 via-pink-100 to-amber-100",
    badgeClass: "bg-sky-100 text-sky-900 ring-sky-200",
    caption: "Cold, creamy, and ready for dessert time.",
    badge: "ice cream",
  },
  mint: {
    art: "fallback",
    category: "mint",
    bgClass: "from-emerald-100 via-white to-rose-100",
    badgeClass: "bg-emerald-100 text-emerald-900 ring-emerald-200",
    caption: "A cool minty pick with a sweet snap.",
    badge: "mint",
  },
  gummy: {
    art: "fallback",
    category: "gummy",
    bgClass: "from-fuchsia-100 via-orange-100 to-lime-100",
    badgeClass: "bg-fuchsia-100 text-fuchsia-900 ring-fuchsia-200",
    caption: "Soft, chewy, and bright like a candy shop window.",
    badge: "gummy",
  },
  chocolate: {
    art: "fallback",
    category: "chocolate",
    bgClass: "from-amber-100 via-orange-100 to-rose-100",
    badgeClass: "bg-amber-100 text-amber-950 ring-amber-200",
    caption: "A cozy chocolate win for today's treat.",
    badge: "chocolate",
  },
  candy: {
    art: "fallback",
    category: "candy",
    bgClass: "from-rose-100 via-purple-100 to-yellow-100",
    badgeClass: "bg-rose-100 text-rose-900 ring-rose-200",
    caption: "A colorful candy prize from the wheel.",
    badge: "candy",
  },
  gum: {
    art: "fallback",
    category: "gum",
    bgClass: "from-cyan-100 via-sky-100 to-pink-100",
    badgeClass: "bg-cyan-100 text-cyan-950 ring-cyan-200",
    caption: "A playful bubblegum pick with extra pop.",
    badge: "gum",
  },
};

export function LandedTreatPicture({
  label,
  category,
  eyebrow = "Landed treat",
  className,
}: LandedTreatPictureProps) {
  const picture = pictureForTreat(label, category);
  const rootClass = [
    "relative isolate overflow-hidden rounded-[1.65rem] border border-white/80 bg-gradient-to-br p-3 shadow-inner shadow-white/65 ring-1 ring-purple-950/5 sm:p-4",
    picture.bgClass,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <figure className={rootClass} aria-label={`Picture of ${label}`}>
      <div className="pointer-events-none absolute -left-8 -top-10 h-28 w-28 rounded-full bg-white/45 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-12 -right-8 h-32 w-32 rounded-full bg-purple-200/35 blur-2xl" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(255,255,255,0.72)_0_2px,transparent_3px),radial-gradient(circle_at_78%_32%,rgba(255,255,255,0.62)_0_2px,transparent_3px),radial-gradient(circle_at_64%_78%,rgba(255,255,255,0.55)_0_2px,transparent_3px)]" />

      <div className="relative flex items-center gap-3 sm:gap-4">
        <div className="flex h-28 w-32 shrink-0 items-center justify-center rounded-[1.35rem] bg-white/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.85),0_14px_35px_rgba(88,28,135,0.14)] ring-1 ring-white/85 sm:h-32 sm:w-36">
          <TreatArtwork picture={picture} category={category} />
        </div>

        <figcaption className="min-w-0 flex-1">
          <p className="text-[0.64rem] font-extrabold uppercase tracking-[0.26em] text-purple-900/55">
            {eyebrow}
          </p>
          <p className="mt-1 text-base font-extrabold leading-snug text-purple-950 sm:text-lg">
            {label}
          </p>
          <p className="mt-2 text-sm font-semibold leading-snug text-purple-900/65">
            {picture.caption}
          </p>
          <span
            className={`mt-3 inline-flex rounded-full px-3 py-1 text-xs font-extrabold capitalize ring-1 ${picture.badgeClass}`}
          >
            {picture.badge}
          </span>
        </figcaption>
      </div>
    </figure>
  );
}

function pictureForTreat(label: string, category: TreatCategory): TreatPicture {
  const normalized = label.toLowerCase();
  return (
    TREAT_PICTURES.find((picture) =>
      picture.match ? normalized.includes(picture.match) : false,
    ) ?? FALLBACK_PICTURES[category]
  );
}

function TreatArtwork({
  picture,
  category,
}: {
  picture: TreatPicture;
  category: TreatCategory;
}) {
  switch (picture.art) {
    case "mini-cones":
      return (
        <svg viewBox="0 0 160 130" className="h-full w-full" aria-hidden>
          <MiniCone x={45} y={23} scoop="#fff7ed" stripe="#38bdf8" />
          <MiniCone x={78} y={16} scoop="#f9a8d4" stripe="#fb7185" />
          <MiniCone x={106} y={28} scoop="#fef3c7" stripe="#a78bfa" />
          <path d="M37 103c25 14 67 14 91 0" stroke="#7c2d12" strokeWidth="5" strokeLinecap="round" opacity="0.18" />
        </svg>
      );
    case "cream-pops":
      return (
        <svg viewBox="0 0 160 130" className="h-full w-full" aria-hidden>
          <rect x="52" y="18" width="29" height="71" rx="14" fill="#fef3c7" />
          <rect x="84" y="18" width="29" height="71" rx="14" fill="#f9a8d4" />
          <path d="M66 89v24M98 89v24" stroke="#b45309" strokeWidth="7" strokeLinecap="round" />
          <path d="M59 35h15M91 35h15M61 52h12M93 52h10" stroke="#fff" strokeWidth="5" strokeLinecap="round" opacity="0.85" />
          <circle cx="63" cy="26" r="3" fill="#38bdf8" />
          <circle cx="72" cy="44" r="3" fill="#fb7185" />
          <circle cx="101" cy="28" r="3" fill="#a855f7" />
          <circle cx="92" cy="62" r="3" fill="#22c55e" />
        </svg>
      );
    case "starlight-mints":
      return (
        <svg viewBox="0 0 160 130" className="h-full w-full" aria-hidden>
          <StarlightMint cx={60} cy={65} rotate={-14} />
          <StarlightMint cx={99} cy={57} rotate={18} />
          <path d="M36 101c25 9 62 8 88-2" stroke="#10b981" strokeWidth="6" strokeLinecap="round" opacity="0.22" />
        </svg>
      );
    case "candy-cane-kisses":
      return (
        <svg viewBox="0 0 160 130" className="h-full w-full" aria-hidden>
          <KissCandy x={38} y={46} stripe="#ef4444" />
          <KissCandy x={77} y={35} stripe="#10b981" />
          <KissCandy x={99} y={56} stripe="#ef4444" />
          <path d="M55 30c18-12 38-13 56-1" stroke="#94a3b8" strokeWidth="5" strokeLinecap="round" opacity="0.5" />
        </svg>
      );
    case "pink-round":
      return (
        <svg viewBox="0 0 160 130" className="h-full w-full" aria-hidden>
          <circle cx="80" cy="63" r="39" fill="#f472b6" />
          <circle cx="80" cy="63" r="22" fill="#fb7185" />
          <path d="M55 45c15-12 38-12 52 2" stroke="#fff7ed" strokeWidth="8" strokeLinecap="round" opacity="0.55" />
          <path d="M47 74c18 20 48 24 68 0" stroke="#be185d" strokeWidth="5" strokeLinecap="round" opacity="0.28" />
          <circle cx="54" cy="34" r="8" fill="#fb923c" />
          <circle cx="109" cy="90" r="7" fill="#f97316" />
          <text x="80" y="70" textAnchor="middle" fontSize="25" fontWeight="900" fill="#fff7ed">D</text>
        </svg>
      );
    case "fun-dip":
      return (
        <svg viewBox="0 0 160 130" className="h-full w-full" aria-hidden>
          <rect x="39" y="33" width="57" height="70" rx="9" fill="#ef4444" />
          <rect x="46" y="44" width="43" height="22" rx="4" fill="#fff7ed" />
          <text x="67" y="61" textAnchor="middle" fontSize="12" fontWeight="900" fill="#ef4444">DIP</text>
          <path d="M53 78c12-8 24-8 35 0v15H53V78Z" fill="#f9a8d4" />
          <rect x="103" y="22" width="12" height="88" rx="6" fill="#fef3c7" transform="rotate(15 109 66)" />
          <circle cx="108" cy="96" r="16" fill="#fb7185" opacity="0.75" />
          <circle cx="115" cy="88" r="4" fill="#fff" opacity="0.65" />
        </svg>
      );
    case "jelly-beans":
      return (
        <svg viewBox="0 0 160 130" className="h-full w-full" aria-hidden>
          <JellyBean x={41} y={51} color="#ef4444" rotate={-24} />
          <JellyBean x={68} y={38} color="#facc15" rotate={16} />
          <JellyBean x={95} y={50} color="#22c55e" rotate={-12} />
          <JellyBean x={60} y={78} color="#a855f7" rotate={22} />
          <JellyBean x={94} y={82} color="#fb7185" rotate={-28} />
          <path d="M37 103c25 10 61 10 87 0" stroke="#4c1d95" strokeWidth="5" strokeLinecap="round" opacity="0.15" />
        </svg>
      );
    case "bubble-tape":
      return (
        <svg viewBox="0 0 160 130" className="h-full w-full" aria-hidden>
          <circle cx="73" cy="65" r="38" fill="#22d3ee" />
          <circle cx="73" cy="65" r="25" fill="#fdf2f8" />
          <circle cx="73" cy="65" r="13" fill="#ec4899" />
          <path d="M104 52c22 2 28 28 8 40" fill="none" stroke="#67e8f9" strokeWidth="12" strokeLinecap="round" />
          <circle cx="112" cy="51" r="17" fill="#f9a8d4" opacity="0.85" />
          <path d="M35 103c23 9 67 10 91-1" stroke="#0e7490" strokeWidth="5" strokeLinecap="round" opacity="0.22" />
        </svg>
      );
    case "skittles-gummies":
      return (
        <svg viewBox="0 0 160 130" className="h-full w-full" aria-hidden>
          <rect x="38" y="25" width="84" height="79" rx="14" fill="#dc2626" />
          <path d="M48 50c20-16 43-17 64-2" stroke="#fff" strokeWidth="8" strokeLinecap="round" opacity="0.85" />
          <GummyDot cx={56} cy={76} fill="#facc15" />
          <GummyDot cx={77} cy={66} fill="#22c55e" />
          <GummyDot cx={99} cy={77} fill="#a855f7" />
          <GummyDot cx={82} cy={91} fill="#f97316" />
          <text x="80" y="48" textAnchor="middle" fontSize="12" fontWeight="900" fill="#fff">S</text>
        </svg>
      );
    case "gummy-clusters":
      return (
        <svg viewBox="0 0 160 130" className="h-full w-full" aria-hidden>
          <Cluster cx={57} cy={59} core="#f9a8d4" bits={["#a855f7", "#38bdf8", "#facc15"]} />
          <Cluster cx={93} cy={50} core="#fb7185" bits={["#22c55e", "#a855f7", "#38bdf8"]} />
          <Cluster cx={82} cy={86} core="#f472b6" bits={["#facc15", "#38bdf8", "#22c55e"]} />
          <path d="M44 105c25 8 51 8 75-1" stroke="#7e22ce" strokeWidth="5" strokeLinecap="round" opacity="0.2" />
        </svg>
      );
    case "reese-carrot":
      return (
        <svg viewBox="0 0 160 130" className="h-full w-full" aria-hidden>
          <path d="M55 31c24 10 43 10 67 0l-18 72c-14 8-32 8-48 0L55 31Z" fill="#f97316" />
          <path d="M61 48c15 6 35 6 51 0M58 67c17 7 34 7 50 0M55 86c16 8 32 8 47 0" stroke="#7c2d12" strokeWidth="4" strokeLinecap="round" opacity="0.28" />
          <path d="M72 30c-4-13 9-20 17-8 8-12 22-5 17 8" fill="#22c55e" />
          <circle cx="72" cy="58" r="6" fill="#7c2d12" />
          <circle cx="91" cy="74" r="6" fill="#7c2d12" />
          <circle cx="81" cy="93" r="5" fill="#7c2d12" />
        </svg>
      );
    case "ring-pop":
      return (
        <svg viewBox="0 0 160 130" className="h-full w-full" aria-hidden>
          <path d="M61 77c0-19 15-34 34-34s34 15 34 34-15 34-34 34-34-15-34-34Zm15 0c0 11 8 19 19 19s19-8 19-19-8-19-19-19-19 8-19 19Z" fill="#fdf2f8" stroke="#94a3b8" strokeWidth="5" />
          <path d="M67 44 86 18h30l17 26-33 34L67 44Z" fill="#22c55e" />
          <path d="M86 18 100 78M116 18 100 78M67 44h66" stroke="#dcfce7" strokeWidth="4" opacity="0.75" />
          <path d="M80 33c9-8 22-10 35-5" stroke="#f9a8d4" strokeWidth="5" strokeLinecap="round" opacity="0.65" />
        </svg>
      );
    case "nerds-box":
      return (
        <svg viewBox="0 0 160 130" className="h-full w-full" aria-hidden>
          <rect x="43" y="31" width="73" height="62" rx="8" fill="#ec4899" />
          <path d="M79 31h37v62H79Z" fill="#7c3aed" opacity="0.75" />
          <text x="78" y="66" textAnchor="middle" fontSize="18" fontWeight="900" fill="#fff">NERDS</text>
          <Crunch x={39} y={99} fill="#38bdf8" />
          <Crunch x={59} y={105} fill="#facc15" />
          <Crunch x={84} y={101} fill="#22c55e" />
          <Crunch x={108} y={105} fill="#fb7185" />
          <Crunch x={123} y={94} fill="#a855f7" />
        </svg>
      );
    case "chocolate-carrot":
      return (
        <svg viewBox="0 0 160 130" className="h-full w-full" aria-hidden>
          <path d="M55 37c26-9 47-9 69 0l-27 72c-12 7-27 7-39 0L55 37Z" fill="#fb923c" />
          <path d="M64 47c18 5 35 5 52 0M61 65c16 5 31 5 47 0M57 83c14 6 28 6 42 0" stroke="#fef3c7" strokeWidth="4" strokeLinecap="round" opacity="0.65" />
          <path d="M77 34c-8-12 3-22 13-11 6-14 23-9 17 8 11-4 17 8 7 14" fill="#16a34a" />
          <ellipse cx="82" cy="74" rx="18" ry="23" fill="#7c2d12" opacity="0.82" />
          <path d="M74 59c8-5 18-4 25 2" stroke="#fed7aa" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );
    case "pocky":
      return (
        <svg viewBox="0 0 160 130" className="h-full w-full" aria-hidden>
          <PockyStick x={54} rotate={-16} />
          <PockyStick x={73} rotate={-5} />
          <PockyStick x={92} rotate={8} />
          <PockyStick x={111} rotate={18} />
          <path d="M43 102c25 10 60 10 82-1" stroke="#be123c" strokeWidth="5" strokeLinecap="round" opacity="0.18" />
        </svg>
      );
    case "fallback":
      return <FallbackArtwork category={picture.category ?? category} />;
  }
}

function MiniCone({
  x,
  y,
  scoop,
  stripe,
}: {
  x: number;
  y: number;
  scoop: string;
  stripe: string;
}) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M12 47h32L30 90a6 6 0 0 1-11 0L5 47h7Z" fill="#d98b45" />
      <path d="M10 56h30M14 67h22M18 78h14" stroke="#8a4d24" strokeWidth="3" strokeLinecap="round" />
      <circle cx="25" cy="31" r="20" fill={scoop} />
      <path d="M12 36c9 5 20 6 32 0" stroke={stripe} strokeWidth="4" strokeLinecap="round" opacity="0.8" />
      <circle cx="19" cy="24" r="2.4" fill="#a855f7" />
      <circle cx="31" cy="35" r="2.4" fill="#f97316" />
    </g>
  );
}

function StarlightMint({
  cx,
  cy,
  rotate,
}: {
  cx: number;
  cy: number;
  rotate: number;
}) {
  return (
    <g transform={`rotate(${rotate} ${cx} ${cy})`}>
      <circle cx={cx} cy={cy} r="27" fill="#f8fafc" stroke="#10b981" strokeWidth="5" />
      <path d={`M${cx} ${cy - 26}c12 11 12 24 2 36-6 7-5 13 1 18`} fill="none" stroke="#ef4444" strokeWidth="9" strokeLinecap="round" />
      <path d={`M${cx - 23} ${cy - 9}c15 2 25 10 25 23 0 8 6 14 18 16`} fill="none" stroke="#10b981" strokeWidth="8" strokeLinecap="round" />
    </g>
  );
}

function KissCandy({ x, y, stripe }: { x: number; y: number; stripe: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M28 0c12 16 24 29 24 45 0 14-11 23-24 23S4 59 4 45C4 29 16 16 28 0Z" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="3" />
      <path d="M16 37c10-7 21-7 32 0M12 51c12-8 24-8 34 0" stroke={stripe} strokeWidth="5" strokeLinecap="round" />
      <path d="M31 2c9-7 17-8 24-4" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />
    </g>
  );
}

function JellyBean({
  x,
  y,
  color,
  rotate,
}: {
  x: number;
  y: number;
  color: string;
  rotate: number;
}) {
  return (
    <ellipse
      cx={x}
      cy={y}
      rx="19"
      ry="12"
      fill={color}
      transform={`rotate(${rotate} ${x} ${y})`}
      opacity="0.9"
    />
  );
}

function GummyDot({ cx, cy, fill }: { cx: number; cy: number; fill: string }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r="12" fill={fill} opacity="0.9" />
      <circle cx={cx - 4} cy={cy - 4} r="3" fill="#fff" opacity="0.45" />
    </g>
  );
}

function Cluster({
  cx,
  cy,
  core,
  bits,
}: {
  cx: number;
  cy: number;
  core: string;
  bits: [string, string, string];
}) {
  return (
    <g>
      <circle cx={cx} cy={cy} r="16" fill={core} />
      <circle cx={cx - 13} cy={cy - 5} r="6" fill={bits[0]} />
      <circle cx={cx + 10} cy={cy - 9} r="6" fill={bits[1]} />
      <circle cx={cx + 8} cy={cy + 12} r="6" fill={bits[2]} />
      <circle cx={cx - 4} cy={cy + 13} r="5" fill="#fef3c7" />
    </g>
  );
}

function Crunch({ x, y, fill }: { x: number; y: number; fill: string }) {
  return <path d={`M${x} ${y}l7-5 7 5-3 8h-8l-3-8Z`} fill={fill} />;
}

function PockyStick({ x, rotate }: { x: number; rotate: number }) {
  return (
    <g transform={`rotate(${rotate} ${x} 68)`}>
      <rect x={x - 5} y="18" width="10" height="92" rx="5" fill="#d97706" />
      <rect x={x - 6} y="18" width="12" height="61" rx="6" fill="#f9a8d4" />
      <circle cx={x - 1} cy="31" r="2.2" fill="#be123c" />
      <circle cx={x + 2} cy="48" r="2.2" fill="#fff7ed" />
      <circle cx={x - 2} cy="64" r="2.2" fill="#be123c" />
    </g>
  );
}

function FallbackArtwork({ category }: { category: TreatCategory }) {
  const artByCategory: Record<TreatCategory, ReactNode> = {
    iceCream: (
      <svg viewBox="0 0 160 130" className="h-full w-full" aria-hidden>
        <MiniCone x={61} y={18} scoop="#fff7ed" stripe="#f9a8d4" />
      </svg>
    ),
    mint: (
      <svg viewBox="0 0 160 130" className="h-full w-full" aria-hidden>
        <StarlightMint cx={80} cy={64} rotate={0} />
      </svg>
    ),
    gummy: (
      <svg viewBox="0 0 160 130" className="h-full w-full" aria-hidden>
        <JellyBean x={60} y={60} color="#fb7185" rotate={-22} />
        <JellyBean x={91} y={70} color="#a3e635" rotate={18} />
      </svg>
    ),
    chocolate: (
      <svg viewBox="0 0 160 130" className="h-full w-full" aria-hidden>
        <rect x="44" y="25" width="72" height="84" rx="12" fill="#7c2d12" />
        <rect x="53" y="35" width="22" height="22" rx="5" fill="#9a3412" />
        <rect x="84" y="35" width="22" height="22" rx="5" fill="#9a3412" />
        <rect x="53" y="66" width="22" height="22" rx="5" fill="#9a3412" />
        <rect x="84" y="66" width="22" height="22" rx="5" fill="#9a3412" />
      </svg>
    ),
    candy: (
      <svg viewBox="0 0 160 130" className="h-full w-full" aria-hidden>
        <path d="M42 50 18 35l8 31-8 29 24-15V50Z" fill="#f97316" />
        <path d="M118 50 142 35l-8 31 8 29-24-15V50Z" fill="#a855f7" />
        <rect x="40" y="39" width="80" height="51" rx="25" fill="#fb7185" />
      </svg>
    ),
    gum: (
      <svg viewBox="0 0 160 130" className="h-full w-full" aria-hidden>
        <circle cx="73" cy="65" r="38" fill="#22d3ee" />
        <circle cx="73" cy="65" r="25" fill="#fdf2f8" />
        <circle cx="73" cy="65" r="13" fill="#ec4899" />
      </svg>
    ),
  };

  return artByCategory[category];
}
