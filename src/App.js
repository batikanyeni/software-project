import Home from './components/Pages/Home';
import './App.css';
import Store from './components/Pages/Store';
import Login from './components/Pages/Login';
import Library from './components/Pages/Library';
import Wallet from './components/Pages/Wallet';
import Cart from './components/Pages/Cart';
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import MainHeader from './components/MainHeader/MainHeader';

function App() {
  return (
    <React.Fragment>
      <MainHeader></MainHeader>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/store" element={<Store />} />
        <Route path="/login" element={<Login />} />,
        <Route path="/library" element={<Library />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
