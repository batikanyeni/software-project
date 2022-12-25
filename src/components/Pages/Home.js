import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HomePageCarousel from '../UI/Carousel/HomePageCarousel';
import './Home.css';
import PaymentSection from '../PaymentSection/PaymentSection';
import HomeGames from '../GameComponents/HomeGames';
import { Container } from 'react-bootstrap';

const Home = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8080/game/getAll`).then((response) => {
      setGames(response.data);
    });
  }, []);

  return (
    <React.Fragment>
      <HomePageCarousel gameList={games} />
      <Container fluid className="banner">
        <h1>Pay however you want!</h1>
        <h2>With multiple options</h2>
      </Container>
      <br></br>

      <PaymentSection />
      <br></br>
      <br></br>
      <br></br>
      <br></br>

      <Container fluid className="main">
        <h1>
          Our Games
          <div className="roller">
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
      </Container>
      <br></br>
      <HomeGames gameList={games} />
      <br></br>
    </React.Fragment>
  );
};

export default Home;
