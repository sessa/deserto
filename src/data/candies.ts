/** Family treats stash — candy & desserts from photos; edit together anytime. */

export const TREAT_CATEGORIES = [
  "iceCream",
  "mint",
  "gummy",
  "chocolate",
  "candy",
  "gum",
] as const;

export type TreatCategory = (typeof TREAT_CATEGORIES)[number];

export type TreatItem = {
  readonly label: string;
  readonly category: TreatCategory;
};

export const CANDY_POOL = [
  {
    label:
      "Blue Bunny Mini Swirls — Vanilla (8 mini cones, chocolate-dipped sugar cones)",
    category: "iceCream",
  },
  {
    label: "JonnyPops Cream minis — Birthday Surprise (6 pops, birthday cake & vanilla)",
    category: "iceCream",
  },
  { label: "Peppermint Starlight Mints", category: "mint" },
  { label: "Hershey's Candy Cane Kisses", category: "mint" },
  { label: "Dunkin' candy (the pink round one)", category: "candy" },
  { label: "Fun Dip — Cherry Yum Diddly Dip", category: "candy" },
  { label: "Jelly beans (mixed bag)", category: "gummy" },
  { label: "Hubba Bubba Bubble Tape", category: "gum" },
  { label: "Skittles Gummies (soft fruity gummies)", category: "gummy" },
  { label: "Nerds Gummy Clusters", category: "gummy" },
  { label: "Reese's Pieces (carrot bag)", category: "chocolate" },
  { label: "Watermelon Ring Pop", category: "candy" },
  { label: "Nerds (little crunchy box)", category: "candy" },
  { label: "Lindt chocolate carrot (milk chocolate with hazelnuts)", category: "chocolate" },
  { label: "Pocky — Crunchy Strawberry", category: "candy" },
] as const satisfies readonly TreatItem[];

/** Resolve category when loading older picks that only stored a label. */
export function categoryForTreatLabel(label: string): TreatCategory | undefined {
  const found = CANDY_POOL.find((t) => t.label === label);
  return found?.category;
}
