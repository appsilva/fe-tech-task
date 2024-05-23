import { combineReducers, configureStore } from '@reduxjs/toolkit';
import postReducer from './features/postSlice';
import userReducer from './features/userSlice';

const rootReducer = combineReducers({
  posts: postReducer,
  users: userReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
