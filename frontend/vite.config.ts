import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
  ],
  server: {
    host: true,
    // TEMPORARY: allow ngrok host 
    allowedHosts: [
      "ragged-sherly-satisfactorily.ngrok-free.dev",
    ],
  },
});
