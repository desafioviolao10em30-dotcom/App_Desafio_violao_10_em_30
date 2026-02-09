import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Ebook from "./pages/desafio/Ebook.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* BASE_URL vem do vite.config.js (base: '/App_Desafio_violao_10_em_30/') */}
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Ebook />
    </BrowserRouter>
  </React.StrictMode>
);
