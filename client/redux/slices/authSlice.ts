import axios from "axios";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../store";
import storage from "../../utils/localStorage";

import { UserState, CredentialsPayload } from "../types";
import { NextRouter } from "next/router";

interface InitialAuthState {
  user: UserState | null;
  loading: boolean;
  error: string | null;
}

const initialState: InitialAuthState = {
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    removeUser: (state) => {
      state.user = null;
    },
    setAuthLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    setAuthError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearAuthError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setUser,
  removeUser,
  setAuthLoading,
  setAuthError,
  clearAuthError,
} = authSlice.actions;

export const signIn = (
  credentials: CredentialsPayload,
  router: NextRouter
): AppThunk => {
  return async (dispatch) => {
    try {
      dispatch(setAuthLoading());

      const response = await axios.post(
        `${process.env.BACKEND_URI}/signin`,
        credentials
      );

      const userData = response.data;

      if (userData.error) {
        dispatch(setAuthError(userData.error));
        return;
      }

      storage.saveUser(userData);
      dispatch(setUser(userData));
      router.push("/");
    } catch (error: any) {
      dispatch(setAuthError(error.message));
    }
  };
};

export const signUp = (
  credentials: CredentialsPayload,
  router: NextRouter
): AppThunk => {
  return async (dispatch) => {
    try {
      dispatch(setAuthLoading());

      credentials.email = credentials.email.toLowerCase();
      const response = await axios.post(
        `${process.env.BACKEND_URI}/signup`,
        credentials
      );

      const userData = response.data;

      if (userData.error) {
        dispatch(setAuthError(userData.error));
        return;
      }

      dispatch(clearAuthError());
      router.push("/signin");
    } catch (error: any) {
      dispatch(setAuthError(error.message));
    }
  };
};

export const signOut = (): AppThunk => {
  return async (dispatch) => {
    try {
      storage.removeUser();
      dispatch(removeUser());
    } catch (error: any) {
      dispatch(setAuthError(error.message));
    }
  };
};

export const selectAuthState = (state: RootState) => state.auth;

export default authSlice.reducer;
