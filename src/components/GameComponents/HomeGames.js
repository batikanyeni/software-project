import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

import classes from './HomeGames.module.css';

const HomeGames = (props) => {
  return (
    <Container className={classes['game-container']}>
      <Row>
        {props.gameList.map((e) => (
          <Col id={e.gameId} md={4} key={e.gameId}>
            <Card className={`${classes['game-border']} `}>
              <Card.Body>
                <Card.Title>{e.name}</Card.Title>
                <Card.Img
                  variant="top"
                  src={e.images[0]?.url || null}
                  className={classes['game-img']}
                />
                {/* id eklenecek */}
              </Card.Body>
              <Card.Text>{`${e.price}$`}</Card.Text>
              <Button
                className={classes['button']}
                as={Link}
                to={`/gamepage/${e.gameId}`}
                variant="primary"
              >
                Go to Game
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default HomeGames;
