import userSchema from '../Validations/RegisterValidation';
import React, { useState } from 'react';
import { useFormik } from 'formik';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import classes from './Register.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = (props) => {
  let navigate = useNavigate();
  const [confirmed, setConfirmed] = useState(false);
  const routeChange = () => {
    let path = `/login`;
    navigate(path);
  };
  const submitHandler = async (values) => {
    let formData = {
      email: values.email,
      name: values.name,
      surname: values.surname,
      password: values.password,
      confirmpassword: values.confirmpassword,
    };

    let isValid = await userSchema.isValid(formData);

    let sembol = '*|,:<>[]{}`;()@&$#%!+-"/.';

    let sembolvar = false;
    for (var i = 0; i < formData.password.length; i++) {
      if (sembol.indexOf(formData.password.charAt(i)) !== -1) {
        sembolvar = true;
      }
    }
    let error = [];

    if (
      formData.email === '' ||
      formData.name === '' ||
      formData.surname === '' ||
      formData.password === '' ||
      formData.confirmpassword === ''
    ) {
      toast.error('Please complate all fields!', { autoClose: 1500 });
    } else {
      if (formData.password !== formData.confirmpassword) {
        error.push('Password does not match!');
      } else if (formData.password.length < 6) {
        error.push('Password must be 6 characters or greater!');
      } else if (formData.password.search(/[a-z]/) < 0) {
        error.push('Password must contain at least one lowercase letter!');
      } else if (formData.password.search(/[A-Z]/) < 0) {
        error.push('Password must contain at least one uppercase letter!');
      } else if (formData.password.search(/[0-9]/) < 0) {
        error.push('Password must contain at least one number!');
      } else if (sembolvar === false)
        error.push('Password must contain at least one symbol!');
    }
    if (error.length > 0) {
      toast.error(error.join('\n'), { autoClose: 1500 });
      return false;
    } else {
      if (
        formData.email &&
        formData.name &&
        formData.surname &&
        formData.password &&
        formData.confirmpassword
      ) {
        toast.success('User registration successful! Please login.', {
          position: 'bottom-left',
          autoClose: 1500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
      }
    }
    if (isValid) {
      setConfirmed(true);
      axios
        .post(`http://localhost:8080/customer`, {
          mail: values.email,
          name: values.name,
          surname: values.surname,
          password: values.password,
          passwordMatch: values.confirmpassword,
        })
        .then(() => {
          props.setShow(false);
          routeChange();
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    }
  };
  const { handleSubmit, handleChange, values } = useFormik({
    initialValues: {
      email: '',
      name: '',
      surname: '',
      password: '',
      confirmpassword: '',
    },
    onSubmit: submitHandler,
    userSchema,
  });

  return (
    <>
      <Modal show={props.onShow} onHide={props.onConfirm}>
        <Modal.Header closeButton>
          <Modal.Title>Create Your Account</Modal.Title>
        </Modal.Header>
        <Modal.Body className={classes['body']}>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>E-mail Address</Form.Label>
              <Form.Control
                onChange={handleChange}
                value={values.email}
                type="email"
                placeholder="Enter E-mail"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                onChange={handleChange}
                values={values.name}
                type="name"
                placeholder="Enter Your Name"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="surname">
              <Form.Label>Surname</Form.Label>
              <Form.Control
                onChange={handleChange}
                values={values.surname}
                type="surname"
                placeholder="Enter Your Surname"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                onChange={handleChange}
                values={values.password}
                type="password"
                placeholder="Password"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="confirmpassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                onChange={handleChange}
                values={values.confirmpassword}
                type="password"
                placeholder="Confirm Password"
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              className={classes['register']}
            >
              Register
            </Button>
            <ToastContainer />
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Register;
