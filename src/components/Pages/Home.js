import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import HomePageCarousel from '../UI/Carousel/HomePageCarousel';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import classes from './Home.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import Image from 'react-bootstrap/Image';
import axios from 'axios';

const Home = () => {
  const [games, setGames] = useState([]);
  const baseURL = `http://localhost:8080/game/getAll`;

  const fetchData = async () => {
    let response = await axios(baseURL);
    let user = await response.data;
    setGames(user);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <React.Fragment>
      <HomePageCarousel />
      <Container className={classes['card-container']}>
        <Row>
          <Col md={4}>
            <Card>
              <Card.Body>
                <Card.Title>Credit Card</Card.Title>
                <Card.Img
                  variant="top"
                  src={process.env.PUBLIC_URL + '/assets/credit-card.png'}
                  className={classes['card-img']}
                />
              </Card.Body>
              <Button variant="primary">Go somewhere</Button>
            </Card>
          </Col>
          <Col md={4}>
            <Card>
              <Card.Body>
                <Card.Title>Bitcoin</Card.Title>
                <Card.Img
                  variant="top"
                  src={process.env.PUBLIC_URL + '/assets/bitcoin.png'}
                  className={classes['card-img']}
                />
              </Card.Body>
              <Button variant="primary">Go somewhere</Button>
            </Card>
          </Col>
          <Col md={4}>
            <Card>
              <Card.Body>
                <Card.Title>Paypal</Card.Title>
                <Card.Img
                  variant="top"
                  src={process.env.PUBLIC_URL + '/assets/paypal.png'}
                  className={classes['card-img']}
                />
              </Card.Body>
              <Button variant="primary">Go somewhere</Button>
            </Card>
          </Col>
        </Row>
      </Container>
      <br></br>
      <Container className={classes['game-container']}>
        <Row>
          {games.map((e) => (
            <Col id={e.gameId} md={4} key={e.gameId}>
              <Card className={`${classes['game-border']} `}>
                <Card.Body>
                  <Card.Title>{e.name}</Card.Title>
                  <Card.Img
                    variant="top"
                    src={e.images.map((image) => image.url)[0]}
                    className={classes['game-img']}
                  />
                  {/* id eklenecek */}
                </Card.Body>
                <Card.Text>{e.price}</Card.Text>
                <Button as={Link} to="/gamepage" variant="primary">
                  Go somewhere
                </Button>
              </Card>
              <br></br>
            </Col>
          ))}
        </Row>
      </Container>
      <footer>
        <Container fluid className={classes['main-footer']}>
          <Row>
            <Col>
              <Container className={classes['about-container']}>
                {<h1>About us</h1>} Lorem ipsum odor amet, consectetuer
                adipiscing elit. Ac purus in massa egestas mollis varius;
                dignissim elementum. Mollis tincidunt mattis hendrerit dolor
                eros enim, nisi ligula ornare. Hendrerit parturient habitant
                pharetra rutrum gravida porttitor eros feugiat. Mollis elit
                sodales taciti duis praesent id. Consequat urna vitae morbi nunc
                congue.
              </Container>
              <Container>
                <p></p>
              </Container>
            </Col>
          </Row>
          <Row>
            <Col>
              <Container className={classes['contact-container']}>
                {<h2>Contact Us</h2>}
                {<h4>Phone: (+90)531 313 3131</h4>}
                {<h4>E-mail: gamehub@outlook.com</h4>}
                {
                  <Link>
                    <Image
                      className={classes['social-icon']}
                      src={process.env.PUBLIC_URL + '/assets/linkedin.png'}
                    ></Image>
                  </Link>
                }
                {
                  <Link>
                    <Image
                      className={classes['social-icon']}
                      src={process.env.PUBLIC_URL + '/assets/github.png'}
                    ></Image>
                  </Link>
                }
                {
                  <Link>
                    <Image
                      className={classes['social-icon']}
                      src={process.env.PUBLIC_URL + '/assets/instagram.png'}
                    ></Image>
                  </Link>
                }
              </Container>
            </Col>
          </Row>
        </Container>
      </footer>
    </React.Fragment>
  );
};

export default Home;
