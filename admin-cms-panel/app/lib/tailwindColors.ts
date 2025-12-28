export const TAILWIND_COLORS = [
  "primary",
  "accent",
  "gold",
  "teal",
  "blue",
  "purple",
  "rose",
  "orange",
  "emerald",
  "cyan",
] as const;

export const TAILWIND_SHADES = ["400", "500", "600"] as const;

export type TailwindColor = typeof TAILWIND_COLORS[number];
export type TailwindShade = typeof TAILWIND_SHADES[number];
