import React from "react";

import { Routes, Route } from "react-router-dom";

import BeanListContainer from './pages/Index';
import BeanDetailsPage from './pages/ItemBean'; 
     


function App() {
  return (
    <Routes>
      <Route path="/" element={<BeanListContainer />} />
      <Route path="/beans/:beanId" element={<BeanDetailsPage />} />
    </Routes>
  );
}

export default App;
