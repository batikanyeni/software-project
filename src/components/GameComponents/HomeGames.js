import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import classes from './HomeGames.module.css';

const HomeGames = (props) => {
  return (
    <Container>
      <Row>
        {props.gameList.map((e) => (
          <Col id={e.gameId} md={4} key={e.gameId}>
            <div className={classes['card-item']}>
              <div className={classes['card']}>
                <div className={classes['card_image']}>
                  <img
                    className={classes['card-img']}
                    alt="img"
                    src={e.images[0]?.url || null}
                  />
                </div>
                <div className={classes['card_content']}>
                  <h2 className={classes['card_title']}>{e.name}</h2>
                  <p className={classes['card_text']}>{e.price}$</p>

                  <Button
                    className={classes['btn']}
                    as={Link}
                    to={`/gamepage/${e.gameId}`}
                    variant="primary"
                  >
                    Go to Game
                  </Button>
                </div>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default HomeGames;
