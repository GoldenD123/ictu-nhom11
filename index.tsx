// src/index.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // Component gốc của app
import "./index.css"; // Tailwind CSS + CSS tùy chỉnh

// Lấy thẻ root trong HTML để mount React app
const rootElement = document.getElementById("root");

if (!rootElement) {
  // Nếu không tìm thấy #root, ném lỗi để dễ debug
  throw new Error("Could not find root element to mount to");
}

// Tạo root React (React 18+ sử dụng createRoot)
const root = ReactDOM.createRoot(rootElement);

// Render toàn bộ App bên trong StrictMode để phát hiện lỗi tiềm ẩn
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
