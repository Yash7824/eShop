import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductState from "./contexts/state/ProductState";
import { Home, Login, Register } from './pages';

function App() {
  return (
    <div className="">
      <ProductState>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
      </ProductState>
    </div>
  );
}

export default App;
