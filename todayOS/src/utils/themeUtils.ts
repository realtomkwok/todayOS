import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { useEffect } from "react";

interface ThemeState {
	appearance: "light" | "dark";
	contrast: "standard" | "medium" | "high";
	theme: "light" | "light-mc" | "light-hc" | "dark" | "dark-mc" | "dark-hc";
	setAppearance: (appearance: ThemeState["appearance"]) => void;
	setContrast: (contrast: ThemeState["contrast"]) => void;
	setTheme: (theme: ThemeState["theme"]) => void;
}

const useThemeStore = create<ThemeState>()(
	persist(
		(set) => ({
			appearance: "light",
			contrast: "standard",
			theme: "light",
			setAppearance: (appearance) => set(() => ({ appearance: appearance })),
			setContrast: (contrast) => set(() => ({ contrast: contrast })),
			setTheme: (theme) => set(() => ({ theme: theme })),
		}),
		{ name: "theme-store", storage: createJSONStorage(() => localStorage) }
	)
);

function getTheme(appearance: ThemeState["appearance"], contrast: ThemeState["contrast"]): ThemeState["theme"] {
	switch (appearance) {
		case "light":
			if (contrast === "standard") {
				return "light";
			} else if (contrast === "medium") {
				return "light-mc";
			} else {
				return "dark-hc";
			}
		case "dark":
			if (contrast === "standard") {
				return "dark";
			} else if (contrast === "medium") {
				return "dark-mc";
			} else {
				return "dark-hc";
			}
	}
}

export const ThemeManager = () => {
	const { appearance, contrast, theme, setAppearance, setTheme } = useThemeStore();

	// Set theme to document root
	useEffect(() => {
		// Remove any existing classes
		document.documentElement.classList.remove("light", "light-mc", "light-hc", "dark", "dark-mc", "dark-hc");

		if (theme) {
			document.documentElement.classList.add(theme);
		}
	}, [theme, appearance, contrast]);

	// Listen to system preference changes
	useEffect(() => {
		const darkModeMQ = window.matchMedia("prefers-color-theme: dark");

		const handleThemeChange = (e: MediaQueryList | MediaQueryListEvent) => {
			const newAppearance: ThemeState["appearance"] = e.matches ? "dark" : "light";
			setAppearance(newAppearance);

			const newTheme: ThemeState["theme"] = getTheme(newAppearance, contrast);
			setTheme(newTheme);
		};

		// Set Initial Theme
		handleThemeChange(darkModeMQ);

		// Add a listener for the change of media query
		darkModeMQ.addEventListener("change", handleThemeChange);

		return () => {
			darkModeMQ.removeEventListener("change", handleThemeChange);
		};
	}, [setAppearance, setTheme, contrast]);

	return null;
};
