import userSchema from '../Validations/RegisterValidation';
import React, { useState } from 'react';
import { useFormik } from 'formik';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
  const { handleSubmit, handleChange, values, errors, touched } = useFormik({
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
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                onChange={handleChange}
                value={values.email}
                type="email"
                placeholder="Enter email"
                isValid={touched.email && !errors.email}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>name</Form.Label>
              <Form.Control
                onChange={handleChange}
                values={values.name}
                type="name"
                placeholder="Enter Your Name"
                isValid={touched.name && !errors.name}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="surname">
              <Form.Label>surname</Form.Label>
              <Form.Control
                onChange={handleChange}
                values={values.surname}
                type="surname"
                placeholder="Enter Your Surname"
                isValid={touched.surname && !errors.surname}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                onChange={handleChange}
                values={values.password}
                type="password"
                placeholder="Password"
                isValid={touched.password && !errors.password}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="confirmpassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                onChange={handleChange}
                values={values.confirmpassword}
                type="password"
                placeholder="Confirm Password"
                isValid={touched.confirmpassword && !errors.confirmpassword}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Register;
