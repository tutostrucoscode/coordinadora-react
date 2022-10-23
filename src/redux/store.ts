import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slice/authReducer";
import { uiReducer } from "./slice/uiReducer";

const reducer = combineReducers({
  auth: authReducer,
  ui: uiReducer,
});

export const store = configureStore({ reducer });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;