import { create } from "zustand";

export const THEMES = {
  hologram: {
    name: "Hologram",
    bgColor: "#05070d",
    starColor: "#99faff",
    glowColor: "#6cf1ff",
    accent: "#3defff",
    vignette: 0.25,
  },

  galaxy: {
    name: "Galaxy Neon",
    bgColor: "#030014",
    starColor: "#8ab4ff",
    glowColor: "#b37cff",
    accent: "#7b4dff",
    vignette: 0.35,
  },

  aurora: {
    name: "Aurora",
    bgColor: "#00100b",
    starColor: "#7affc9",
    glowColor: "#39ffba",
    accent: "#00ffa6",
    vignette: 0.30,
  },

  solar: {
    name: "Solar",
    bgColor: "#150a00",
    starColor: "#ffdd99",
    glowColor: "#ff9e42",
    accent: "#ffb84d",
    vignette: 0.25,
  },

  void: {
    name: "Void",
    bgColor: "#000000",
    starColor: "#ffffff",
    glowColor: "#cccccc",
    accent: "#999999",
    vignette: 0.10,
  },
};

const useThemeStore = create((set) => ({
  currentTheme: THEMES.hologram,

  setTheme: (key) =>
    set({
      currentTheme: THEMES[key],
    }),
}));

export default useThemeStore;
