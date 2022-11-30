import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from '../UI/Footer/Footer';
import HomePageCarousel from '../UI/Carousel/HomePageCarousel';
import PaymentSection from '../PaymentSection/PaymentSection';
import HomeGames from '../GameComponents/HomeGames';

const Home = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8080/game/getAll`).then((response) => {
      setGames(response.data);
    });
  }, []);

  return (
    <React.Fragment>
      <HomePageCarousel />
      <PaymentSection />
      <br></br>
      <HomeGames gameList={games} />
      <br></br>
      <Footer />
    </React.Fragment>
  );
};

export default Home;
