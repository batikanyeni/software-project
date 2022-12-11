import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import classes from './Carousel.module.css';
import Container from 'react-bootstrap/Container';

const HomePageCarousel = (props) => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Container className={classes['home-carousel-container']}>
      <Carousel
        className={classes['home-carousel']}
        activeIndex={index}
        onSelect={handleSelect}
      >
        {props.gameList.slice(0, 3).map((e) => (
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={e.images[0]?.url}
              alt="First slide"
            />
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
};

export default HomePageCarousel;
