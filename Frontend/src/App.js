import React, {useState, useEffect} from "react";
import {BrowserRouter , Routes , Route } from 'react-router-dom';
import { Home, Login, Register } from './pages';

function App() {
  return (
    <div className="">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
