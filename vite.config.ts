import path from "path";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, ".", "");

  return {
    base: "/ictu-nhom11/", // tên repo GitHub Pages
    root: ".", // root của project là thư mục hiện tại
    server: {
      port: 3000,
      host: "0.0.0.0",
    },
    plugins: [react()],
    define: {
      "process.env.API_KEY": JSON.stringify(env.GEMINI_API_KEY),
      "process.env.GEMINI_API_KEY": JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "."), // alias @ trỏ vào root
      },
    },
    build: {
      outDir: "dist", // folder build
      emptyOutDir: true,
      rollupOptions: {
        input: path.resolve(__dirname, "index.html"), // entry point là index.html
      },
    },
  };
});
