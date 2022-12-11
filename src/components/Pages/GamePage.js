import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import GamePageSlider from '../UI/Carousel/GamePageSlider';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from 'react-bootstrap/Image';
import classes from './GamePage.module.css';
import GamePlayerModal from '../GameComponents/GamePlayerModal';
import axios from 'axios';

const GamePage = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const token = useSelector((state) => state.auth.token);
  const [modalShow, setModalShow] = React.useState(false);
  const userId = useSelector((state) => state.auth.userId);
  const [commentId, setCommentId] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [gameInfo, setGameInfo] = useState([]);
  const [userComment, setUserComment] = useState('');
  let { gameId } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/game/${gameId}`)
      .then((response) => {
        setGameInfo(response.data);
      })
      .then(() => {
        if (!isLoggedIn) {
          setDisabled(true);
        }
      });
  }, [gameId, commentId, isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) {
      const getLibrary = () => {
        axios
          .get(`http://localhost:8080/library/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((res) => {
            const checkLibrary = (arr) => {
              arr.buy.map((e) => {
                if (e.game?.gameId === parseInt(gameId)) {
                  setDisabled(true);
                }
                return true;
              });
            };
            checkLibrary(res.data);
          });
      };
      getLibrary();
    }
  }, [userId, token, isLoggedIn, gameId]);

  useEffect(() => {
    if (isLoggedIn) {
      const getCart = () => {
        axios
          .get(`http://localhost:8080/gameInTheBasket/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((res) => {
            const checkCart = (arr) => {
              arr.map((e) => {
                if (e.gameId === parseInt(gameId)) {
                  setDisabled(true);
                }
                return true;
              });
            };
            checkCart(res.data);
          });
      };
      getCart();
    }
  }, [token, userId, isLoggedIn, gameId]);

  const addToCart = () => {
    axios
      .post(
        'http://localhost:8080/gameInTheBasket',
        {
          customerId: userId,
          gameId: gameId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(setDisabled(true));
  };

  const handleComment = (event) => {
    setUserComment(event.target.value);
  };

  const sendComment = () => {
    axios
      .post(
        `http://localhost:8080/comment`,
        {
          comment: userComment,
          customerId: userId,
          gameId: gameId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        setCommentId(res.data.commentId);
        setUserComment('');
      });
  };

  return (
    <React.Fragment>
      <GamePlayerModal
        url={gameInfo.url}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <Container>
        <Row>
          <Col md={8}>
            <Row>
              <Container className={classes['GameSliderContainer']}>
                <GamePageSlider gameInfo={gameInfo} />
              </Container>
            </Row>
            <Row>
              <Container className={classes['Gameimg']}>
                {gameInfo.images?.map((e) => (
                  <Image key={e.imageId} src={e.url} />
                ))}
              </Container>
            </Row>
          </Col>
          <Col md={4}>
            <Row>
              <Container className={classes['gameinfo-container']}>
                <h3>{gameInfo.name}</h3>
                <p>{gameInfo.description}</p>
              </Container>
            </Row>
            <Row className={classes['button-container']}>
              <Container className={classes['button-container']}>
                <Button disabled={disabled} onClick={addToCart}>
                  Add to Cart
                </Button>

                <Button onClick={() => setModalShow(true)}>Play Demo</Button>
              </Container>
            </Row>
          </Col>
        </Row>
      </Container>
      {isLoggedIn && (
        <React.Fragment>
          <Container>
            <Row>
              <Col>
                <input
                  value={userComment}
                  onChange={handleComment}
                  placeholder="Add your comment"
                ></input>
              </Col>
              <Col>
                <Button onClick={sendComment}>Send Comment</Button>
              </Col>
            </Row>
          </Container>
        </React.Fragment>
      )}
      <Container>
        {gameInfo.comments?.map((e) => (
          <Row key={e.commentId}>
            <Row>
              <Col>
                <p>{e.customerDto.mail}</p>
              </Col>
            </Row>
            <Row>{e.comment}</Row>
          </Row>
        ))}
      </Container>
    </React.Fragment>
  );
};

export default GamePage;
