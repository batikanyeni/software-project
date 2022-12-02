import React from 'react';
import Modal from 'react-bootstrap/Modal';
import classes from './GamePlayerModal.module.css';

const GamePlayerModal = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton />
      <Modal.Body className={classes.body}>
        <iframe
          src="https://storage.googleapis.com/ballgame/ballgame/index.html"
          className={classes['game-player']}
        ></iframe>
      </Modal.Body>
    </Modal>
  );
};

export default GamePlayerModal;
