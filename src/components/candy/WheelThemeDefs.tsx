import type { WheelTheme } from "@/data/wheelThemes";

type WheelThemeDefsProps = {
  theme: WheelTheme;
  id: (name: string) => string;
};

/** Shared SVG defs for prize wheel + design gallery previews. */
export function WheelThemeDefs({ theme, id }: WheelThemeDefsProps) {
  return (
    <>
      {theme.segments.map((seg, i) => {
        if (!seg.gradient) return null;
        return (
          <radialGradient key={i} id={id(seg.fill)} cx="34%" cy="22%" r="88%">
            <stop offset="0%" stopColor={seg.gradient.from} />
            <stop offset="56%" stopColor={seg.gradient.via} />
            <stop offset="100%" stopColor={seg.gradient.to} />
          </radialGradient>
        );
      })}
      {theme.rimUsesGradient && (
        <linearGradient id={id("rim")} x1="28%" y1="8%" x2="76%" y2="92%">
          <stop offset="0%" stopColor="#fff7ed" />
          <stop offset="45%" stopColor="#f9a8d4" />
          <stop offset="100%" stopColor="#7e22ce" />
        </linearGradient>
      )}
      {theme.centerUsesGradient && theme.id === "carnival" && (
        <radialGradient id={id("center")} cx="38%" cy="28%" r="72%">
          <stop offset="0%" stopColor="#fff7ed" />
          <stop offset="48%" stopColor="#fde68a" />
          <stop offset="100%" stopColor="#f97316" />
        </radialGradient>
      )}
      {theme.dinerCenterGradient && (
        <radialGradient id={id("center")} cx="50%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="100%" stopColor="#cbd5e1" />
        </radialGradient>
      )}
      {theme.cookieCenterGradient && (
        <radialGradient id={id("center")} cx="42%" cy="32%" r="70%">
          <stop offset="0%" stopColor="#f1d192" />
          <stop offset="100%" stopColor="#a87246" />
        </radialGradient>
      )}
      {theme.neonWedgeStrokes && (
        <radialGradient id={id("center")} cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor={theme.neonCenterStops?.from ?? "#312e81"} />
          <stop offset="100%" stopColor={theme.neonCenterStops?.to ?? "#0f172a"} />
        </radialGradient>
      )}
      {theme.labelFilter && (
        <filter id={id("label-shadow")} x="-25%" y="-25%" width="150%" height="150%">
          <feDropShadow dx="0" dy="1" stdDeviation="1" floodColor="#2e1065" floodOpacity="0.65" />
        </filter>
      )}
      {theme.neonWedgeStrokes?.map((_, i) => (
        <filter key={i} id={id(`glow-${i}`)}>
          <feGaussianBlur stdDeviation="3" />
        </filter>
      ))}
    </>
  );
}

export function segmentFill(theme: WheelTheme, index: number, id: (name: string) => string): string {
  const seg = theme.segments[index];
  if (seg.gradient) return `url(#${id(seg.fill)})`;
  return seg.fill;
}

export function rimFill(theme: WheelTheme, id: (name: string) => string): string {
  return theme.rimUsesGradient ? `url(#${id("rim")})` : theme.rimFill;
}

export function centerFill(theme: WheelTheme, id: (name: string) => string): string {
  if (
    theme.centerUsesGradient ||
    theme.dinerCenterGradient ||
    theme.cookieCenterGradient ||
    theme.neonWedgeStrokes
  ) {
    return `url(#${id("center")})`;
  }
  return theme.centerFill;
}
