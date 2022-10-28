import React from 'react';
import classes from './Store.module.css';
import GameCard from '../GameComponents/GameCard';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const Store = () => {
  return (
    <Container className={classes['main-container']}>
      <Row>
        <Col md={{ span: 4, offset: 4 }}>
          <GameCard className={classes.store}></GameCard>
        </Col>
      </Row>
    </Container>
  );
};

export default Store;
