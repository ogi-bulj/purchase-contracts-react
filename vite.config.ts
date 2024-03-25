import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/purchase-contracts-react/",
  plugins: [react()],
});
