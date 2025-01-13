import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"
import { PWAAssetsOptions, VitePWA } from "vite-plugin-pwa"

const pwaAssets: PWAAssetsOptions = {
	config: true,
	overrideManifestIcons: true,
}

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		VitePWA({
			mode: "development",
			base: "/",
			injectRegister: "inline",
			strategies: "generateSW",
			registerType: "autoUpdate",
			includeAssets: ["favicon/favicon.svg"],
			manifest: {
				name: "GYST",
				short_name: "GYST",
				theme_color: "#f6f5ec",
			},
			pwaAssets,
			devOptions: {
				enabled: true,
			},
			workbox: {
				globPatterns: ["**/*.{js,css,html,png,svg,ico}"],
				cleanupOutdatedCaches: true,
				clientsClaim: true,
				skipWaiting: true,
			},
		}),
	],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
			"@components": path.resolve(__dirname, "./src/components"),
			"@utils": path.resolve(__dirname, "./src/utils"),
			"@themes": path.resolve(__dirname, "./src/themes"),
		},
	},
})
