import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import './GameCard.css';

import classes from './HomeGames.module.css';

const HomeGames = (props) => {
  return (
    <Container className={classes['game-container']}>
      <Row>
        {props.gameList.map((e) => (
          <Col id={e.gameId} md={4} key={e.gameId}>
            <div class="card">
              <div class="card_image">
                <img src={e.images[0]?.url || null} />
              </div>
              <div class="card_content">
                <h2 class="card_title">{e.name}</h2>
                <p class="card_text">{e.price}$</p>

                <Button
                  className="btn card_btn"
                  as={Link}
                  to={`/gamepage/${e.gameId}`}
                  variant="primary"
                >
                  Go to Game
                </Button>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default HomeGames;
