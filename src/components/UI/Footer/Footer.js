import React from 'react';
import classes from './Footer.module.css';
import { Link } from 'react-router-dom';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Footer = () => {
  return (
    <footer>
      <Container fluid className={classes['main-footer']}>
        <Row>
          <Col>
            <Container className={classes['about-container']}>
              {<h1>About us</h1>}
              {
                <h5>
                  We are a small and ambitious development team from Eskisehir
                  Technical University.
                </h5>
              }
            </Container>
          </Col>
        </Row>
        <Row>
          <Col>
            <Container className={classes['contact-container']}>
              {<h2>Contact Us</h2>}
              {<h4>Phone: (+90)533 333 3333</h4>}
              {<h4>E-mail: gamehome@outlook.com</h4>}
              {
                <Link>
                  <Image
                    className={classes['social-icon']}
                    src={process.env.PUBLIC_URL + '/assets/linkedin.png'}
                  ></Image>
                </Link>
              }
              {
                <Link>
                  <Image
                    className={classes['social-icon']}
                    src={process.env.PUBLIC_URL + '/assets/github.png'}
                  ></Image>
                </Link>
              }
              {
                <Link>
                  <Image
                    className={classes['social-icon']}
                    src={process.env.PUBLIC_URL + '/assets/instagram.png'}
                  ></Image>
                </Link>
              }
            </Container>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
