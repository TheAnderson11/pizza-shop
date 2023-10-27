import './scss/app.scss';
import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import NotFoundBlock from './components/NotFoundBlock';
import Cart from './pages/Cart';
import Home from './pages/Home';

const App = () => {
  const [search, setSearch] = useState('');
  return (
    <div className="wrapper">
      <Header search={search} setSearch={setSearch} />
      <div className="content">
        <Routes>
          <Route path="" element={<Home search={search} />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFoundBlock />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
