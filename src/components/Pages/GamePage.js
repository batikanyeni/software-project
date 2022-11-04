import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import GamePageSlider from '../UI/Carousel/GamePageSlider';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import Image from 'react-bootstrap/Image';
import classes from './GamePage.module.css';

const GamePage = () => {
  const games = [
    { gameid: '00', gametitle: 'pac-man', price: '5' },
    { gameid: '01', gametitle: 'pac-man', price: '5' },
    { gameid: '02', gametitle: 'pac-man', price: '5' },
    { gameid: '03', gametitle: 'pac-man', price: '5' },
  ];

  return (
    <Container>
      <Row>
        <Col md={8}>
          <Row>
            <Container className={classes['GameSliderContainer']}>
              <GamePageSlider />
            </Container>
          </Row>
          <Row>
            <Container className={classes['Gameimg']}>
              <Image src={process.env.PUBLIC_URL + '/assets/bitcoin.png'} />
              <Image src={process.env.PUBLIC_URL + '/assets/bitcoin.png'} />
              <Image src={process.env.PUBLIC_URL + '/assets/bitcoin.png'} />
              <Image src={process.env.PUBLIC_URL + '/assets/bitcoin.png'} />
              <Image src={process.env.PUBLIC_URL + '/assets/bitcoin.png'} />
            </Container>
          </Row>
        </Col>
        <Col md={4}>
          <Row>
            <Container className={classes['gameinfo-container']}>
              <h3>Game Title</h3>
              <p>
                Lorem ipsum odor amet, consectetuer adipiscing elit. Ac purus in
                massa egestas mollis varius; dignissim elementum. Mollis
                tincidunt mattis hendrerit dolor eros enim, nisi ligula ornare.
                Hendrerit parturient habitant pharetra rutrum gravida porttitor
                eros feugiat. Mollis elit sodales taciti duis praesent id.
                Consequat urna vitae morbi nunc congue.
              </p>
            </Container>
          </Row>
          <Container className={classes['button-container']}>
            <Button>Add to Cart</Button>

            <Button>Play Demo</Button>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default GamePage;
