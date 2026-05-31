import type { TreatCategory } from "@/data/candies";

type LandedTreatPictureProps = {
  label: string;
  category: TreatCategory;
  eyebrow?: string;
  className?: string;
};

const PICTURE_THEMES: Record<
  TreatCategory,
  {
    bgClass: string;
    badgeClass: string;
    caption: string;
  }
> = {
  iceCream: {
    bgClass: "from-sky-100 via-pink-100 to-amber-100",
    badgeClass: "bg-sky-100 text-sky-900 ring-sky-200",
    caption: "Cold, creamy, and ready for dessert time.",
  },
  mint: {
    bgClass: "from-emerald-100 via-white to-rose-100",
    badgeClass: "bg-emerald-100 text-emerald-900 ring-emerald-200",
    caption: "A cool minty pick with a sweet snap.",
  },
  gummy: {
    bgClass: "from-fuchsia-100 via-orange-100 to-lime-100",
    badgeClass: "bg-fuchsia-100 text-fuchsia-900 ring-fuchsia-200",
    caption: "Soft, chewy, and bright like a candy shop window.",
  },
  chocolate: {
    bgClass: "from-amber-100 via-orange-100 to-rose-100",
    badgeClass: "bg-amber-100 text-amber-950 ring-amber-200",
    caption: "A cozy chocolate win for today's treat.",
  },
  candy: {
    bgClass: "from-rose-100 via-purple-100 to-yellow-100",
    badgeClass: "bg-rose-100 text-rose-900 ring-rose-200",
    caption: "A colorful candy prize from the wheel.",
  },
  gum: {
    bgClass: "from-cyan-100 via-sky-100 to-pink-100",
    badgeClass: "bg-cyan-100 text-cyan-950 ring-cyan-200",
    caption: "A playful bubblegum pick with extra pop.",
  },
};

export function LandedTreatPicture({
  label,
  category,
  eyebrow = "Landed treat",
  className,
}: LandedTreatPictureProps) {
  const theme = PICTURE_THEMES[category];
  const rootClass = [
    "relative isolate overflow-hidden rounded-[1.65rem] border border-white/80 bg-gradient-to-br p-3 shadow-inner shadow-white/65 ring-1 ring-purple-950/5 sm:p-4",
    theme.bgClass,
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
          <TreatArtwork category={category} />
        </div>

        <figcaption className="min-w-0 flex-1">
          <p className="text-[0.64rem] font-extrabold uppercase tracking-[0.26em] text-purple-900/55">
            {eyebrow}
          </p>
          <p className="mt-1 text-base font-extrabold leading-snug text-purple-950 sm:text-lg">
            {label}
          </p>
          <p className="mt-2 text-sm font-semibold leading-snug text-purple-900/65">
            {theme.caption}
          </p>
          <span
            className={`mt-3 inline-flex rounded-full px-3 py-1 text-xs font-extrabold capitalize ring-1 ${theme.badgeClass}`}
          >
            {categoryLabel(category)}
          </span>
        </figcaption>
      </div>
    </figure>
  );
}

function categoryLabel(category: TreatCategory): string {
  switch (category) {
    case "iceCream":
      return "ice cream";
    case "mint":
      return "mint";
    case "gummy":
      return "gummy";
    case "chocolate":
      return "chocolate";
    case "gum":
      return "gum";
    case "candy":
      return "candy";
  }
}

function TreatArtwork({ category }: { category: TreatCategory }) {
  switch (category) {
    case "iceCream":
      return (
        <svg viewBox="0 0 160 130" className="h-full w-full" aria-hidden>
          <path d="M65 68h45l-21 49a8 8 0 0 1-15 0L53 68h12Z" fill="#d98b45" />
          <path d="M58 76h47M63 89h37M68 102h27" stroke="#8a4d24" strokeWidth="4" strokeLinecap="round" />
          <circle cx="69" cy="48" r="25" fill="#f9a8d4" />
          <circle cx="93" cy="48" r="25" fill="#bae6fd" />
          <circle cx="81" cy="31" r="24" fill="#fff7ed" />
          <path d="M56 55c16 9 36 9 54 0" stroke="#7c2d12" strokeWidth="4" strokeLinecap="round" opacity="0.25" />
          <circle cx="92" cy="18" r="7" fill="#ef4444" />
          <path d="M97 14c8-6 14-6 19-2" stroke="#166534" strokeWidth="4" strokeLinecap="round" />
          <circle cx="69" cy="35" r="3" fill="#f97316" />
          <circle cx="87" cy="40" r="3" fill="#a855f7" />
          <circle cx="99" cy="55" r="3" fill="#14b8a6" />
        </svg>
      );
    case "mint":
      return (
        <svg viewBox="0 0 160 130" className="h-full w-full" aria-hidden>
          <circle cx="80" cy="64" r="43" fill="#f8fafc" stroke="#10b981" strokeWidth="7" />
          <path d="M80 21c20 16 23 35 9 52-10 12-9 23 3 34" fill="none" stroke="#ef4444" strokeWidth="13" strokeLinecap="round" />
          <path d="M45 38c25 2 41 15 42 36 1 15 10 25 26 30" fill="none" stroke="#10b981" strokeWidth="13" strokeLinecap="round" />
          <circle cx="80" cy="64" r="24" fill="none" stroke="#e11d48" strokeWidth="5" strokeDasharray="9 8" />
          <path d="M35 49 17 37l18-12M125 49l18-12-18-12M35 80 17 93l18 12M125 80l18 13-18 12" fill="#dbeafe" stroke="#93c5fd" strokeWidth="4" strokeLinejoin="round" />
        </svg>
      );
    case "gummy":
      return (
        <svg viewBox="0 0 160 130" className="h-full w-full" aria-hidden>
          <ellipse cx="65" cy="71" rx="31" ry="38" fill="#fb7185" opacity="0.88" />
          <ellipse cx="95" cy="70" rx="31" ry="38" fill="#a3e635" opacity="0.86" />
          <ellipse cx="80" cy="54" rx="31" ry="38" fill="#facc15" opacity="0.82" />
          <circle cx="70" cy="46" r="5" fill="#7c2d12" opacity="0.5" />
          <circle cx="90" cy="46" r="5" fill="#7c2d12" opacity="0.5" />
          <path d="M68 61c8 8 17 8 25 0" fill="none" stroke="#7c2d12" strokeWidth="5" strokeLinecap="round" opacity="0.35" />
          <path d="M49 94c14 9 49 11 64 0" stroke="#fff7ed" strokeWidth="7" strokeLinecap="round" opacity="0.55" />
          <circle cx="54" cy="38" r="9" fill="#fb7185" />
          <circle cx="106" cy="38" r="9" fill="#a3e635" />
        </svg>
      );
    case "chocolate":
      return (
        <svg viewBox="0 0 160 130" className="h-full w-full" aria-hidden>
          <rect x="44" y="25" width="72" height="84" rx="12" fill="#7c2d12" />
          <rect x="53" y="35" width="22" height="22" rx="5" fill="#9a3412" />
          <rect x="84" y="35" width="22" height="22" rx="5" fill="#9a3412" />
          <rect x="53" y="66" width="22" height="22" rx="5" fill="#9a3412" />
          <rect x="84" y="66" width="22" height="22" rx="5" fill="#9a3412" />
          <path d="M55 101c18 10 34 10 50 0" stroke="#fed7aa" strokeWidth="7" strokeLinecap="round" />
          <path d="M48 23c17-11 45-10 64 1" stroke="#fef3c7" strokeWidth="5" strokeLinecap="round" opacity="0.6" />
          <circle cx="58" cy="75" r="3" fill="#fed7aa" />
          <circle cx="99" cy="45" r="3" fill="#fed7aa" />
        </svg>
      );
    case "gum":
      return (
        <svg viewBox="0 0 160 130" className="h-full w-full" aria-hidden>
          <rect x="35" y="38" width="88" height="58" rx="15" fill="#22d3ee" />
          <path d="M51 51h54v32H51z" fill="#fdf2f8" opacity="0.9" />
          <path d="M55 67c12-16 35-16 47 0-12 16-35 16-47 0Z" fill="#f9a8d4" />
          <circle cx="79" cy="67" r="14" fill="#ec4899" />
          <circle cx="79" cy="67" r="7" fill="#fdf2f8" />
          <path d="M117 49c21 3 24 27 4 36" fill="none" stroke="#67e8f9" strokeWidth="12" strokeLinecap="round" />
          <path d="M36 93c18 10 62 11 87 0" stroke="#0e7490" strokeWidth="5" strokeLinecap="round" opacity="0.3" />
        </svg>
      );
    case "candy":
      return (
        <svg viewBox="0 0 160 130" className="h-full w-full" aria-hidden>
          <path d="M42 50 18 35l8 31-8 29 24-15V50Z" fill="#f97316" />
          <path d="M118 50 142 35l-8 31 8 29-24-15V50Z" fill="#a855f7" />
          <rect x="40" y="39" width="80" height="51" rx="25" fill="#fb7185" />
          <path d="M54 43c15 19 15 29 0 44" stroke="#fff7ed" strokeWidth="9" strokeLinecap="round" />
          <path d="M80 40c15 20 15 30 0 50" stroke="#fef08a" strokeWidth="9" strokeLinecap="round" />
          <path d="M105 43c-15 19-15 29 0 44" stroke="#dbeafe" strokeWidth="9" strokeLinecap="round" />
          <ellipse cx="80" cy="52" rx="31" ry="10" fill="#fff" opacity="0.2" />
        </svg>
      );
  }
}
