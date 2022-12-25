import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import GamePageSlider from '../UI/Carousel/GamePageSlider';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import classes from './GamePage.module.css';
import GamePlayerModal from '../GameComponents/GamePlayerModal';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };
  const showToastMessage = () => {
    toast.success('Successfully added to cart!', {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1000,
    });
  };
  const showToastMessage2 = () => {
    toast.success('Your comment has been added!', {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1000,
    });
  };
  return (
    <React.Fragment>
      <GamePlayerModal
        url={gameInfo.url}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <Container className={classes['GameDetail']}>
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
                <Button
                  disabled={disabled}
                  onClick={function (event) {
                    addToCart();
                    showToastMessage();
                  }}
                >
                  Add to Cart
                </Button>
                <ToastContainer />

                <Button onClick={() => setModalShow(true)}>Play Demo</Button>
              </Container>
            </Row>
          </Col>
        </Row>
      </Container>
      {isLoggedIn && (
        <Container fluid className={classes['send-comment-container']}>
          <input
            className={classes['comment-input']}
            value={userComment}
            type="text"
            onChange={handleComment}
            placeholder="Add your comment"
          ></input>

          <Button
            className={classes['send-comment-btn']}
            onClick={function (event) {
              sendComment();
              showToastMessage2();
            }}
          >
            Send Comment
          </Button>
        </Container>
      )}
      <Container className={classes['banner']}>Comment Section</Container>
      <Container className={classes['comments']}>
        {gameInfo.comments?.length > 0 ? (
          <Row>
            {gameInfo.comments?.map((e) => (
              <Col md={6} key={e.commentId}>
                <div className={classes['comment']}>
                  <div className={classes['commenter-email']}>
                    <p className={classes['email']}>{e.customerDto.mail}</p>
                  </div>
                  <div className={classes['comment-text']}>
                    <p>{e.comment}</p>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        ) : (
          <Container className={classes['no-comments']}>
            <p>There are no comments for this game yet.</p>
          </Container>
        )}
      </Container>
    </React.Fragment>
  );
};

export default GamePage;
