import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      manifest: false,
      registerType: "autoUpdate",
    }),
  ],
  resolve: {
    tsconfigPaths: true,
  },
  define: {
    APP_VERSION: JSON.stringify(process.env.npm_package_version),

    /**
     * Workaround
     * https://github.com/react-grid-layout/react-draggable/issues/806
     */
    "process.env.DRAGGABLE_DEBUG": JSON.stringify(false),
  },
});
