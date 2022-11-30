import { createSlice } from '@reduxjs/toolkit';

const initialWalletState = {
  walletBalance: localStorage.getItem('walletBalance'),
};

const walletSlice = createSlice({
  name: 'wallet',
  initialState: initialWalletState,
  reducers: {
    setWalletBalance(state, action) {
      state.walletBalance = action.payload.walletBalance;
      localStorage.setItem('walletBalance', state.walletBalance);
    },
  },
});

export const walletActions = walletSlice.actions;

export default walletSlice.reducer;
