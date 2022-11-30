import React, { useState, useEffect } from 'react';
import { walletActions } from '../store/wallet';
import { useDispatch, useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
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
    <Container>
      <Row>
        <Col>
          <input
            onChange={handleChange}
            type="text"
            id="enterBalance"
            placeholder="add balance"
            value={enteredAmount}
          />
          <Button onClick={addAmount}>Add</Button>
        </Col>
        <Col>
          <p>Your balance: {balance}</p>
        </Col>
      </Row>
    </Container>
  );
};

export default Wallet;
