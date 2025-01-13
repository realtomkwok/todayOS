import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"
import { PWAAssetsOptions, VitePWA } from "vite-plugin-pwa"

const pwaAssets: PWAAssetsOptions = {
	config: false,
	disabled: false,
	preset: {
		transparent: {
			sizes: [48, 72, 96, 144, 192, 256, 384, 512],
			favicons: [
				[16, "favicon-16x16.png"],
				[32, "favicon-32x32.png"],
				[48, "favicon.ico"],
			],
			padding: 0,
		},
		maskable: {
			sizes: [192, 512],
			padding: 0,
		},
		apple: {
			sizes: [120, 152, 167, 180, 1024],
			padding: 0,
		},
	},
	image: "public/favicon.svg",
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
			includeAssets: ["favicon.svg"],
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
