import { configureStore } from '@reduxjs/toolkit';

import authReducer from './auth';
import walletReducer from './wallet';

const store = configureStore({
  reducer: {
    auth: authReducer,
    wallet: walletReducer,
  },
});

export default store;
