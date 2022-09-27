import { configureStore, Action } from "@reduxjs/toolkit";
import { ThunkAction } from "redux-thunk"
import type {} from 'redux-thunk/extend-redux';
import authReducer from "./slices/authSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export default store;