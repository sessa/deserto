import type { Metadata } from "next";

import CandyRoom from "./CandyRoom";

export const metadata: Metadata = {
  title: "Daily Candy | Deserto",
  description:
    "Spin the candy wheel among today’s treats, choose what landed, and browse your dessert calendar.",
};

export default function CandyPage() {
  return <CandyRoom />;
}
