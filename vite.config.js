import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ["balance-facility-narrative-tutorial.trycloudflare.com"],
  },
  preview: {
    allowedHosts: [".trycloudflare.com"],
  },
});
