import React, { useState } from 'react';
import { authActions } from '../store/auth';
import { useSelector, useDispatch } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import classes from './MainHeader.module.css';
import Register from '../Pages/Register';
import Image from 'react-bootstrap/Image';

import { Link, useNavigate } from 'react-router-dom';

const MainHeader = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [show, setShow] = useState(false);
  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/`;
    navigate(path);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const logoutHandler = () => {
    dispatch(authActions.onLogOut());
    routeChange();
  };

  return (
    <React.Fragment>
      {show && <Register onShow={show} onConfirm={handleClose}></Register>}
      <Navbar
        collapseOnSelect
        expand="lg"
        variant="dark"
        className={`${classes['main-header']} sticky-top `}
      >
        <Container>
          <Navbar.Brand className={classes['logo-container']} as={Link} to="/">
            <Image
              className={classes['logo']}
              alt="logo"
              src={process.env.PUBLIC_URL + '/assets/logo.png'}
            />
          </Navbar.Brand>
          <Navbar.Toggle
            className="position-absolute top-10 end-0"
            aria-controls="responsive-navbar-nav"
          />
          <Navbar.Collapse
            id="responsive-navbar-nav"
            className=" justify-content-end"
          >
            <Nav className="align-items-lg-center ml-auto ">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/store">
                Store
              </Nav.Link>
              {isLoggedIn && (
                <Nav.Link as={Link} to="/library">
                  Library
                </Nav.Link>
              )}
              {!isLoggedIn && (
                <React.Fragment>
                  <Nav.Link as={Link} to="/login">
                    Login
                  </Nav.Link>

                  <Nav.Link
                    as={Button}
                    size="lg"
                    className={classes['register-button']}
                    onClick={handleShow}
                  >
                    Register
                  </Nav.Link>
                </React.Fragment>
              )}
              {isLoggedIn && (
                <React.Fragment>
                  <Nav.Link
                    as={Link}
                    to="/wallet"
                    className={classes['nav-link']}
                  >
                    <Image
                      className={classes['header-icon']}
                      alt="wallet"
                      src={process.env.PUBLIC_URL + '/assets/wallet-2.png'}
                    />
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    to="/cart"
                    className={classes['nav-link']}
                  >
                    <Image
                      className={classes['header-icon']}
                      alt="cart"
                      src={process.env.PUBLIC_URL + '/assets/carts.png'}
                    />
                  </Nav.Link>
                </React.Fragment>
              )}
              {isLoggedIn && (
                <Nav className="justify-content-end">
                  <Nav.Link
                    as={Button}
                    className={`${classes['logout-button']}`}
                    onClick={logoutHandler}
                  >
                    Log-out
                  </Nav.Link>
                </Nav>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </React.Fragment>
  );
};

export default MainHeader;
