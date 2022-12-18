import * as yup from 'yup';

const userSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export default userSchema;
