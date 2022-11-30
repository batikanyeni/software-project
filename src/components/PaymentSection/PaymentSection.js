import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import classes from './PaymentSection.module.css';

const PaymentSection = () => {
  return (
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
  );
};

export default PaymentSection;
