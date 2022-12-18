import { createSlice } from '@reduxjs/toolkit';

const initialAuthState = {
  isLoggedIn: localStorage.getItem('isLoggedIn'),
  token: localStorage.getItem('token'),
  userId: localStorage.getItem('userId'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    onLogIn(state, action) {
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      state.isLoggedIn = true;
      localStorage.setItem('isLoggedIn', '1');
      localStorage.setItem('token', state.token);
      localStorage.setItem('userId', state.userId);
    },
    onLogOut(state) {
      state.isLoggedIn = false;
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
