import { useEffect, useState } from "react";

const DEFAULT_COLORS = ["#c5f36b", "#1fbf75", "#f6c344", "#94a3b8"];

const isColorArray = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every((c) => typeof c === "string");

export const useSliceColors = () => {
  const [colors, setColors] = useState<string[]>(() => {
    const saved = localStorage.getItem("sliceColors");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (isColorArray(parsed)) return parsed;
      } catch {
        /* ignore invalid saved value */
      }
    }
    return DEFAULT_COLORS;
  });

  const [history, setHistory] = useState<string[][]>([]);

  useEffect(() => {
    localStorage.setItem("sliceColors", JSON.stringify(colors));
  }, [colors]);

  const setColorAt = (index: number, value: string) => {
    setHistory((prev) => [colors, ...prev]);
    setColors((prev) => prev.map((c, i) => (i === index ? value : c)));
  };

  const undo = () => {
    setHistory((prev) => {
      if (prev.length === 0) return prev;
      const [last, ...rest] = prev;
      setColors(last);
      return rest;
    });
  };

  return {
    colors,
    setColorAt,
    undo,
    canUndo: history.length > 0,
  } as const;
};

export default useSliceColors;
