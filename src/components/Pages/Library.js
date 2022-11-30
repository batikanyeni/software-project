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
        setLibraryGames(res.data.buy);
        setLibraryId(res.data.libraryId);
      });
  }, []);
  return (
    <Container>
      <Row>
        {libraryGames?.map((e) => (
          <Col md={4} key={e.buyId}></Col>
        ))}
      </Row>
    </Container>
  );
};

export default Library;
