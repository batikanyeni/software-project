import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import classes from './Carousel.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';

const HomePageCarousel = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel
      className={classes['home-carousel']}
      activeIndex={index}
      onSelect={handleSelect}
    >
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={process.env.PUBLIC_URL + '/assets/cyberpunk-2077.jpg'}
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={process.env.PUBLIC_URL + '/assets/witcher3.jpg'}
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={process.env.PUBLIC_URL + '/assets/gta5.jpg'}
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>
  );
};

export default HomePageCarousel;
