import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/Login";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* <Route path="/about" element={<About />} /> */}
      </Routes>
    </div>
  );
}

export default App;
