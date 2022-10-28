import React from 'react';
import classes from './GameCard.module.css';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

const GameCard = (props) => {
  return (
    <Card className={classes['game-card']} style={{ width: '18rem' }}>
      <Card.Img
        variant="left"
        src={process.env.PUBLIC_URL + '/assets/pacman.jpg'}
      />
      <Card.Body>
        <Card.Title>Game Title</Card.Title>
        <Card.Text>Info about the game</Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>Cras justo odio</ListGroup.Item>
        <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
        <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
      </ListGroup>
      <Card.Body>
        <Card.Link href="#">Card Link</Card.Link>
        <Card.Link href="#">Another Link</Card.Link>
      </Card.Body>
    </Card>
  );
};

export default GameCard;
