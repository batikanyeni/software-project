import React from 'react';
import Modal from 'react-bootstrap/Modal';
import classes from './GamePlayerModal.module.css';

const GamePlayerModal = (props) => {
  return (
    <Modal
      {...props}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className={classes.modal}
    >
      <Modal.Header closeButton />
      <Modal.Body className={classes.body}>
        <iframe src={props.url} className={classes['game-player']}></iframe>
      </Modal.Body>
    </Modal>
  );
};

export default GamePlayerModal;
