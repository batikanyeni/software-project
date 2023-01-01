import React, { useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import classes from './GamePlayerModal.module.css';
import Countdown from 'react-countdown';

const GamePlayerModal = (props) => {
  let timeOut;
  const renderer = ({ minutes, seconds }) => {
    return (
      <span>
        {minutes}:{seconds}
      </span>
    );
  };
  useEffect(() => {
    timeOut = setTimeout(() => {
      props.displaySetter(false);
    }, 60000);
    return () => {
      clearTimeout(timeOut);
    };
  }, [props]);
  return (
    <Modal
      {...props}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className={classes.modal}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {`Remaining Demo Time : `}
          <Countdown
            intervalDelay={0}
            precision={3}
            renderer={renderer}
            date={Date.now() + 60000}
          />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={classes.body}>
        <iframe
          title="GameFrame"
          src={props.url}
          className={classes['game-player']}
        ></iframe>
      </Modal.Body>
    </Modal>
  );
};

export default GamePlayerModal;
