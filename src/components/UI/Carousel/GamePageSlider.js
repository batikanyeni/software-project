import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import classes from './GamePageSlider.module.css';

const GamePageSlider = (props) => {
  return (
    <Carousel className={classes['gamepageslider']} slide={false}>
      {props.gameInfo.images?.slice(0, 3).map((e) => (
        <Carousel.Item key={e.imageId}>
          <img className="d-block w-100 " src={e.url} alt="First slide" />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default GamePageSlider;