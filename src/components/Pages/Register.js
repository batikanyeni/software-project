import userSchema from '../Validations/RegisterValidation';
import React, { useState } from 'react';
import classes from './Register.module.css';
import { useFormik } from 'formik';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const Register = (props) => {
  const [confirmed, setConfirmed] = useState(false);
  const submitHandler = async (values) => {
    let formData = {
      email: values.email,
      username: values.username,
      password: values.password,
      confirmpassword: values.confirmpassword,
    };
    let isValid = await userSchema.isValid(formData);

    if (isValid) {
      setConfirmed(true);
    }
  };
  const { handleSubmit, handleChange, values, errors, touched } = useFormik({
    initialValues: {
      email: '',
      username: '',
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
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                onChange={handleChange}
                values={values.username}
                type="username"
                placeholder="Enter Your UserName"
                isValid={touched.username && !errors.username}
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
                type="confirmpassword"
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
