export function getCourseStyle(color: string, shade: string) {
  const palette: Record<string, Record<string, string>> = {
    primary: {
      400: "#60a5fa",
      500: "#3b82f6",
      600: "#2563eb",
    },
    accent: {
      400: "#34d399",
      500: "#10b981",
      600: "#059669",
    },
    gold: {
      400: "#fbbf24",
      500: "#f59e0b",
      600: "#d97706",
    },
    teal: {
      400: "#2dd4bf",
      500: "#14b8a6",
      600: "#0d9488",
    },
    blue: {
      400: "#60a5fa",
      500: "#3b82f6",
      600: "#2563eb",
    },
    purple: {
      400: "#c084fc",
      500: "#a855f7",
      600: "#9333ea",
    },
    rose: {
      400: "#fb7185",
      500: "#f43f5e",
      600: "#e11d48",
    },
    orange: {
      400: "#fb923c",
      500: "#f97316",
      600: "#ea580c",
    },
    emerald: {
      400: "#34d399",
      500: "#10b981",
      600: "#059669",
    },
    cyan: {
      400: "#22d3ee",
      500: "#06b6d4",
      600: "#0891b2",
    },
  };

  const main = palette[color]?.[shade] ?? palette.primary["500"];

  return {
    iconGradient: {
      background: `linear-gradient(135deg, ${main}, ${main}cc)`,
    },
    iconTextStyle: {
      color: main,
    },
    buttonStyle: {
      backgroundColor: main,
    },
  };
}
