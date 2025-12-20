import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss(), react()],

  server: {
    host: true,
    // Dev-only: ngrok host
    allowedHosts: ["ragged-sherly-satisfactorily.ngrok-free.dev"],
  },

  preview: {
    host: true,
    port: Number(process.env.PORT) || 4173,
    strictPort: true,
  },
});
