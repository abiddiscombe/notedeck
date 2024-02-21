import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            registerType: "autoUpdate",
            manifest: false, // To avoid confusion use the JSON manifest.
        }),
    ],
    define: {
        APP_VERSION: JSON.stringify(process.env.npm_package_version),
    },
});
