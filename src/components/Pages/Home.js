import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from '../UI/Footer/Footer';
import HomePageCarousel from '../UI/Carousel/HomePageCarousel';
import './Home.css';
import PaymentSection from '../PaymentSection/PaymentSection';
import HomeGames from '../GameComponents/HomeGames';
import GameCard from '../GameComponents/GameCard';

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

      <div class="main-">
        <h1>
          Our Games
          <div class="roller">
            <span id="rolltext">
              Try It
              <br />
              Buy It
              <br />
              Play It
              <br />
              <span id="spare-time">Have fun!</span>
            </span>

            <br />
          </div>
        </h1>
      </div>
      <br></br>
      <HomeGames gameList={games} />
      <br></br>
      <Footer />
    </React.Fragment>
  );
};

export default Home;
