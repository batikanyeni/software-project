import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import classes from './GamePlayerModal.module.css';
import { Unity, useUnityContext } from 'react-unity-webgl';

const GamePlayerModal = (props) => {
  const { unityProvider } = useUnityContext({
    loaderUrl: 'ballgame/Build/ballgame.loader.js',
    dataUrl: 'ballgame/Build/ballgame.data',
    frameworkUrl: 'ballgame/Build/ballgame.framework.js',
    codeUrl: 'ballgame/Build/ballgame.wasm',
  });

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
          src="https://i.simmer.io/@Ahmetdayii/bring-down-the-enemy"
          className={classes['game-player']}
        ></iframe>
      </Modal.Body>
    </Modal>
  );
};

export default GamePlayerModal;
