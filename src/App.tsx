import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        {/* <Route path="/about" element={<About />} /> */}
      </Routes>
    </div>
  );
}

export default App;
