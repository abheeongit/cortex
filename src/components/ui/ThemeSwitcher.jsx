import React from "react";
import useThemeStore, { THEMES } from "../../store/useThemeStore";

export default function ThemeSwitcher() {
  const current = useThemeStore((s) => s.currentTheme);
  const setTheme = useThemeStore((s) => s.setTheme);

  return (
    <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-xl 
                    border border-white/10 rounded-lg px-3 py-2 flex gap-2">
      {Object.keys(THEMES).map((key) => (
        <button
          key={key}
          onClick={() => setTheme(key)}
          className={`px-3 py-1 rounded text-sm transition ${
            current.name === THEMES[key].name
              ? "bg-white/25 text-white"
              : "bg-white/10 text-slate-300 hover:bg-white/20"
          }`}
        >
          {THEMES[key].name}
        </button>
      ))}
    </div>
  );
}
