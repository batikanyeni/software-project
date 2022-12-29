import './App.css';
import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Spinner from './components/UI/Spinner';
import 'bootstrap/dist/css/bootstrap.min.css';
import ScrollToTop from './components/UI/ScrollToTop';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import Footer from './components/UI/Footer/Footer';
const NotFound = React.lazy(() => import('./components/Pages/NotFound'));
const Home = React.lazy(() => import('./components/Pages/Home'));
const Login = React.lazy(() => import('./components/Pages/Login'));
const Library = React.lazy(() => import('./components/Pages/Library'));
const Wallet = React.lazy(() => import('./components/Pages/Wallet'));
const MainHeader = React.lazy(() =>
  import('./components/MainHeader/MainHeader')
);
const Cart = React.lazy(() => import('./components/Pages/Cart'));
const GamePage = React.lazy(() => import('./components/Pages/GamePage'));

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <React.Fragment>
      <MainHeader></MainHeader>
      <Suspense fallback={<Spinner />}>
        <ScrollToTop>
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />,
            {isLoggedIn && <Route path="/library" element={<Library />} />}
            {isLoggedIn && <Route path="/wallet" element={<Wallet />} />}
            {isLoggedIn && <Route path="/cart" element={<Cart />} />}
            <Route path="/gamepage/:gameId" element={<GamePage />} />
          </Routes>
        </ScrollToTop>
      </Suspense>
      <Footer></Footer>
    </React.Fragment>
  );
}

export default App;
