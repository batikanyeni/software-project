import React from 'react';
import classes from './GameCard.module.css';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import './GameCard.css';

const GameCard = () => {
  return (
    <div class="main">
      <li class="cards_item">
        <div class="card">
          <div class="card_image">
            <img src={process.env.PUBLIC_URL + '/assets/oyunresim.png'} />
          </div>
          <div class="card_content">
            <h2 class="card_title">Card Grid Layout</h2>
            <p class="card_text">
              Demo of pixel perfect pure CSS simple responsive card grid layout
            </p>
            <button class="btn card_btn">Read More</button>
          </div>
        </div>
      </li>
    </div>
  );
};

export default GameCard;
