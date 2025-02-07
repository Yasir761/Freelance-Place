import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
 
export default defineConfig({
  // typescript: {
  //   ignoreBuildErrors: true
  // },
  // eslint:{
  //   ignoreDuringBuilds:true
  // },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});