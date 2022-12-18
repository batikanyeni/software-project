import * as yup from 'yup';

const userSchema = yup.object().shape({
  name: yup.string().required(),
  surname: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
  passwordconfirm: yup.string().oneOf([yup.ref('password')], null),
});

export default userSchema;
