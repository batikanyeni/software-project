import React from 'react';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';
import userSchema from '../Validations/LoginValidation';
import { authActions } from '../store/auth';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import classes from './Login.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const routeChange = () => {
    let path = `/`;
    navigate(path);
  };
 
 

  const submitHandler = async (values) => {
    let formData = {
      email: values.email,
      password: values.password,
    };
    let isValid = await userSchema.isValid(formData);
  

    if (isValid) {
      axios
        .post(`http://localhost:8080/login`, {
          email: values.email,
          password: values.password,
        })
        .then((res) => {
          const token = res.data.jwtToken;
          const userId = res.data.customerDto.customerId;

          dispatch(authActions.onLogIn({ token: token, userId: userId }));
          routeChange();
        
        })
        .catch((err) => {
          console.log(err.response.data);
          toast.error('Please check your email or password!');
        });

     // routeChange();
    
    }
  };

  const { handleSubmit, handleChange, handleBlur, values, touched, errors } =
    useFormik({
      initialValues: {
        email: '',
        password: '',
      },
      onSubmit: submitHandler,
      userSchema,
    });
  
  return (
    <React.Fragment>
      <Form onSubmit={handleSubmit} className={classes.form}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label className={classes.label}>Email address</Form.Label>
          <Form.Control
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            name="email"
            type="email"
            placeholder="Enter email"
            isValid={touched.email && !errors.email}
          />
          {errors.email && (
            <Form.Text className="text">${errors.email}</Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label className={classes.label}>Password</Form.Label>
          <Form.Control
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            name="password"
            type="password"
            placeholder="Password"
            isValid={touched.password && !errors.password}
          />
        </Form.Group>
        <Button className={classes.btn} type="submit" >
          Submit
        </Button><ToastContainer />
      </Form>
      <footer>
        <Container fluid className={classes['main-footer']}>
          <Row>
            <Col>
              <Container className={classes['about-container']}>
                {<h1>About us</h1>} Lorem ipsum odor amet, consectetuer
                adipiscing elit. Ac purus in massa egestas mollis varius;
                dignissim elementum. Mollis tincidunt mattis hendrerit dolor
                eros enim, nisi ligula ornare. Hendrerit parturient habitant
                pharetra rutrum gravida porttitor eros feugiat. Mollis elit
                sodales taciti duis praesent id. Consequat urna vitae morbi nunc
                congue.
              </Container>
              <Container>
                <p></p>
              </Container>
            </Col>
          </Row>
          <Row>
            <Col>
              <Container className={classes['contact-container']}>
                {<h2>Contact Us</h2>}
                {<h4>Phone: (+90)531 313 3131</h4>}
                {<h4>E-mail: gamehub@outlook.com</h4>}
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
    </React.Fragment>
  );
};

export default Login;
