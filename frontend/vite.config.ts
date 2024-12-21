import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";


export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/signup": {
        target: "http://localhost:3000", // Сервер Gin
        changeOrigin: true,
        secure: false,
      },
      "/login": {
        target: "http://localhost:3000", // Сервер Gin
        changeOrigin: true,
        secure: false,
      },
      "/api": {
        target: "http://localhost:3000", // Для всех других API маршрутов
        changeOrigin: true,
        secure: false,
      },
    },
  },
});