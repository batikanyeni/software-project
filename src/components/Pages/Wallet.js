import React, { useState, useEffect } from 'react';
import { walletActions } from '../store/wallet';
import { useDispatch, useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import classes from './Wallet.module.css';
import Footer from '../UI/Footer/Footer';
import axios from 'axios';
const Wallet = () => {
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.userId);
  const [enteredAmount, setEnteredAmount] = useState('');
  const [balance, setBalance] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/wallet/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setBalance(response.data.balance);
        dispatch(
          walletActions.setWalletBalance({
            walletBalance: response.data.balance,
          })
        );
      });
  }, [dispatch]);

  const handleChange = (event) => {
    setEnteredAmount(event.target.value);
  };

  const addAmount = () => {
    setEnteredAmount(enteredAmount);
    axios
      .put(
        `http://localhost:8080/wallet`,
        {
          walletId: userId,
          balance: parseInt(enteredAmount),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        setBalance(res.data.balance);
        dispatch(
          walletActions.setWalletBalance({ walletBalance: res.data.balance })
        );
        setEnteredAmount(0);
      });
  };

  return (
    <div>
      <Container className={classes['deneme']}>
        <Row className={classes['walletPage']}>
          <Col className={classes['yourBalance']}>
            <div className={classes['balance']}>
              <p>
                Your Balance : <br></br>
                <div className={classes['amount']}> {balance}$</div>
              </p>
            </div>
          </Col>

          <Col className={classes['addBalance']}>
            <div className={classes['adding']}>
              <input
                onChange={handleChange}
                type="text"
                id="enterBalance"
                placeholder=" Amount"
                value={enteredAmount}
              />
              <br></br>
              <Button onClick={addAmount} variant="warning">
                ADD
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default Wallet;
