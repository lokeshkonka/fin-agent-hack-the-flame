import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),

    VitePWA({
      injectRegister: "auto", 
      registerType: "autoUpdate",

      includeAssets: [
        "android-launchericon-48-48.png",
        "android-launchericon-72-72.png",
        "android-launchericon-96-96.png",
        "android-launchericon-144-144.png",
        "android-launchericon-192-192.png",
        "android-launchericon-512-512.png"
      ],

      manifest: {
        name: "SecureBank AI",
        short_name: "SecureBank",
        description: "Secure onboarding with KYC verification",
        theme_color: "#2563eb",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/",
        scope: "/",
        icons: [
          { src: "/android-launchericon-192-192.png", sizes: "192x192", type: "image/png" },
          { src: "/android-launchericon-512-512.png", sizes: "512x512", type: "image/png" }
        ]
      }
    })
  ],

  build: {
    target: "es2018",
    sourcemap: false,
    cssCodeSplit: true
  }
});
