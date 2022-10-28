import { userSchema } from '../Validations/LoginValidation';
import { authActions } from '../store/auth';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import classes from './Login.module.css';

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
      dispatch(authActions.onLogIn());
      routeChange();
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
  console.log(errors);
  return (
    <Form onSubmit={handleSubmit} className={classes.form}>
      <Form.Group className="mb-3" controlId="email">
        <Form.Label className={classes.label}>Email address</Form.Label>
        <Form.Control
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
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
          type="password"
          placeholder="Password"
          isValid={touched.password && !errors.password}
        />
      </Form.Group>
      <Button className={classes.btn} type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default Login;
