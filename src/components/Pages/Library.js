import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import axios from 'axios';
import classes from './Library.module.css';

const Library = () => {
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.userId);
  const [libraryGames, setLibraryGames] = useState([]);
  const [libraryId, setLibraryId] = useState('');

  useEffect(() => {
    axios
      .get(`http://localhost:8080/library/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res.data);
        setLibraryGames(res.data.buy);
        setLibraryId(res.data.libraryId);
      });
  }, []);

  return (
    <div>
      <br />
      <Row className={classes['header']}>
        <h1>LIBRARY</h1>
      </Row>
      <Container className={classes['libraryContainer']}>
        <Row>
          {libraryGames.length > 0 ? (
            libraryGames?.map((e) => (
              <Col md={3} key={e.buyId}>
                <Card
                  style={{ width: '18rem' }}
                  className={classes['gameCard']}
                >
                  <Card.Img
                    className={classes.img}
                    variant="top"
                    src={e.game.images?.[0].url}
                  />
                  <Card.Body>
                    <Card.Title>{e.game.name}</Card.Title>
                    <Card.Text></Card.Text>
                    <Button variant="primary">Download</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <Container fluid className={classes['no-games']}>
              <p>There Are No Games In Your Library</p>
            </Container>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default Library;
