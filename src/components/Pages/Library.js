import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Link } from 'react-router-dom';

import classes from './Library.module.css';

const Library = () => {
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.userId);
  const [libraryGames, setLibraryGames] = useState([]);
  const [libraryId, setLibraryId] = useState('');

  useEffect(() => {
    const getLibrary = () => {
      axios
        .get(`http://localhost:8080/library/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setLibraryGames(res.data.buy);
          setLibraryId(res.data.libraryId);
        });
    };
    getLibrary();
  }, [token, userId]);
  console.log(libraryGames);

  return (
    <div>
      <br />
      <Row className={classes['header']}>
        <h1>LIBRARY</h1>
      </Row>
      <Container key={libraryId} className={classes['libraryContainer']}>
        <Row>
          {libraryGames.length > 0 ? (
            libraryGames?.map((e) => (
              <Col md={3} key={e.buyId}>
                <Card
                  style={{ width: '18rem' }}
                  className={classes['gameCard']}
                >
                  <Link to={`/gamepage/${e.game?.gameId}`}>
                    <Card.Img
                      src={e.game.images?.[0]?.url}
                      className={classes.img}
                      variant="top"
                    />
                  </Link>

                  <Card.Body>
                    <Card.Title>{e.game.name}</Card.Title>
                    <Card.Text></Card.Text>
                    <Button variant="primary">
                      <a
                        className={classes.link}
                        href={e.game?.downloadURL}
                        download
                      >
                        Download
                      </a>
                    </Button>
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
