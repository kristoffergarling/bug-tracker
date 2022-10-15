import { configureStore, Action } from "@reduxjs/toolkit";
import { ThunkAction } from "redux-thunk";
import type {} from "redux-thunk/extend-redux";
import authReducer from "./slices/authSlice";
import usersReducer from "./slices/usersSlice";
import projectsReducer from "./slices/projectsSlice";
import bugsReducer from "./slices/bugsSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    projects: projectsReducer,
    bugs: bugsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export default store;
