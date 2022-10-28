import { createSlice } from '@reduxjs/toolkit';

const initialAuthState = { isLoggedIn: localStorage.getItem('isLoggedIn') };

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    onLogIn(state) {
      state.isLoggedIn = true;
      localStorage.setItem('isLoggedIn', '1');
    },
    onLogOut(state) {
      state.isLoggedIn = false;
      localStorage.removeItem('isLoggedIn');
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
