import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import classes from './GamePageSlider.module.css';

const GamePageSlider = () => {
  return (
    <Carousel className={classes['gamepageslider']} slide={false}>
      <Carousel.Item fluid>
        <img
          className="d-block w-100 "
          src={process.env.PUBLIC_URL + '/assets/witcher3.jpg'}
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={process.env.PUBLIC_URL + '/assets/witcher3.jpg'}
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={process.env.PUBLIC_URL + '/assets/witcher3.jpg'}
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default GamePageSlider;
