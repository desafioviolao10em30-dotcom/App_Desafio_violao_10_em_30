// router.js
import React from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";

import App from "./app";
import Home from "./pages/home";
import Ebook from "./pages/ebook";
import Comunidade from "./pages/comunidade";
import Mentoria from "./pages/mentoria";
import Obrigado from "./pages/obrigado";

export default function Router() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<App />}>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/ebook" element={<Ebook />} />
          <Route path="/comunidade" element={<Comunidade />} />
          <Route path="/mentoria" element={<Mentoria />} />
          <Route path="/obrigado" element={<Obrigado />} />
        </Route>

        {/* fallback */}
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </HashRouter>
  );
}
