import type { TreatCategory } from "@/data/candies";
import { Boxes, Cookie, IceCream, Lollipop, Scroll, Snowflake, type LucideProps } from "lucide-react";
import type { ComponentType } from "react";

const ICONS: Record<TreatCategory, ComponentType<LucideProps>> = {
  iceCream: IceCream,
  mint: Snowflake,
  gummy: Lollipop,
  chocolate: Cookie,
  candy: Boxes,
  gum: Scroll,
};

export type TreatIconProps = {
  category: TreatCategory;
  /** Pixel size forwarded to lucide-react `size` */
  size?: number;
  className?: string;
  decorative?: boolean;
};

/**
 * Maps each treat bucket to a distinct Lucide icon (MIT).
 * Default is decorative-only; callers should expose the human label separately.
 */
export function TreatIcon({ category, size = 24, className, decorative = true }: TreatIconProps) {
  const Icon = ICONS[category];
  return (
    <Icon
      size={size}
      className={className}
      aria-hidden={decorative ? true : undefined}
      focusable={false}
      strokeWidth={2.25}
    />
  );
}
