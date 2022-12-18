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
import { Table } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  const NewBalance = balance - totalAmount;

  useEffect(() => {
    const getCart = () => {
      axios
        .get(`http://localhost:8080/gameInTheBasket/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setCart(response.data);
          setGameRemoved(false);
        });
    };
    getCart();
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

  const showToastMessage = () => {
    toast.success('Transaction successful!', {
        position: toast.POSITION.TOP_RIGHT
    });
};

  return (
    <Container className={classes['cart-maincontainer']}>
      {cart.length > 0 ? (
        <React.Fragment>
          <Col md={{ span: 9, offset: 1 }}>
            <Table
              striped
              bordered
              hover
              size="md"
              className={classes['table-product']}
            >
              <thead>
                <tr>
                  <th>
                    <h4>Remove</h4>
                  </th>
                  <th>
                    <h4>Product </h4>
                  </th>
                  <th>
                    <h4>Product Name</h4>
                  </th>
                  <th>
                    <h4>Price</h4>
                  </th>
                </tr>
              </thead>
              <tbody>
                {cart.map((e) => (
                  <tr key={e.gameId}>
                    <td className={classes['trash-td']}>
                      <Image
                        fluid
                        onClick={() => {
                          setGameId(e.gameId);
                        }}
                        className={classes['trash-img']}
                        src={process.env.PUBLIC_URL + '/assets/remove.png'}
                      ></Image>
                    </td>
                    <td className={classes['image-td']}>
                      <Image
                        className={classes.image}
                        src={e.images[0]?.url || null}
                      />
                    </td>
                    <td className={classes['text-td']}>
                      <h4 className={classes['game-text']}>{e.name}</h4>
                    </td>
                    <td className={classes['text-td']}>
                      <h4 className={classes['game-text']}>{e.price}$</h4>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
          <br></br>
          <Row>
            <Col md={8}></Col>
            <Col md={3}>
              <Container fluid className={classes['subtraction-container']}>
                <h4 className={classes['substraction-h41']}>
                  Balance: {balance}
                </h4>

                <h4 className={classes['substraction-h4']}>
                  -Total Amount: {totalAmount}
                </h4>
                <h4 className={classes['substraction-h41']}>
                  New Balance:{NewBalance}$
                </h4>
                <Button className={classes['Buy-Button']} onClick={function(event){ buyGames(); showToastMessage()}}>
                  Buy
                </Button>
                <ToastContainer />
              </Container>
            </Col>
          </Row>
        </React.Fragment>
      ) : (
        <Container className={classes['no-items']}>
          <p>Your cart is empty</p>
        </Container>
      )}
    </Container>
  );
};

const calculateTotal = (arr) => {
  let result = 0;
  arr.map((cartObject) => {
    return (result += cartObject.price);
  });
  return result;
};

export default Cart;
