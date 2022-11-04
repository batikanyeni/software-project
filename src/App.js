import Home from './components/Pages/Home';
import './App.css';
import Login from './components/Pages/Login';
import Library from './components/Pages/Library';
import Wallet from './components/Pages/Wallet';
import Cart from './components/Pages/Cart';
import GamePage from './components/Pages/GamePage';
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
        <Route path="/login" element={<Login />} />,
        <Route path="/library" element={<Library />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/gamepage" element={<GamePage />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
