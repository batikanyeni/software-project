import React, { useState, useEffect, useRef, useMemo } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import classes from './Cart.module.css';
import Container from 'react-bootstrap/Container';
import { walletActions } from '../store/wallet';
import { useSelector, useDispatch } from 'react-redux';

const Cart = () => {
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.userId);
  const balance = useSelector((state) => state.wallet.walletBalance);
  const firstUpdate = useRef(true);
  const [gameRemoved, setGameRemoved] = useState(false);
  const dispatch = useDispatch();
  const [gameId, setGameId] = useState('');
  const [cart, setCart] = useState([]);
  const totalAmount = useMemo(() => calculateTotal(cart), [cart]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/gameInTheBasket/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setCart(response.data);
        setGameRemoved(false);
      });
  }, [gameRemoved, token, userId]);

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    const deleteCartItem = () => {
      axios
        .delete(
          `http://localhost:8080/gameInTheBasket`,
          {
            data: {
              gameId: gameId,
              customerId: userId,
            },
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then(() => {
          setGameRemoved(true);
        });
    };
    deleteCartItem();
  }, [gameId, token, userId]);

  const buyGames = () => {
    axios
      .post(`http://localhost:8080/buy/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setGameRemoved(true);
        const newBalance = balance - totalAmount;
        dispatch(walletActions.setWalletBalance({ walletBalance: newBalance }));
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  return (
    <Container>
      <div className={classes['div-container']}>your balance:{balance}$</div>
      <p>Cart total: {totalAmount}$</p>
      {cart.map((e) => (
        <Row key={e.gameId}>
          <Col>
            <p>{e.name}</p>
          </Col>
          <Col>
            <Image className={classes.image} src={e.images[0]?.url || null} />
          </Col>
          <Col>
            <p>price:{`${e.price}$`}</p>
          </Col>
          <Col>
            <Button
              onClick={() => {
                setGameId(e.gameId);
              }}
            >
              [X]
            </Button>
          </Col>
        </Row>
      ))}
      <Row>
        <Button onClick={buyGames}>Buy</Button>
      </Row>
    </Container>
  );
};

const calculateTotal = (arr) => {
  let result = 0;
  arr.map((cartObject) => {
    result += cartObject.price;
  });
  return result;
};

export default Cart;
