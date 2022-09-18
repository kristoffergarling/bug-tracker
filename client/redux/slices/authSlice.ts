import axios from "axios";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../store";

import { UserState, CredentialsPayload } from "../types";

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

export const signUp = (credentials: CredentialsPayload): AppThunk => {
    return async (dispatch) => {
        try {
            dispatch(setAuthLoading());
            const response = await axios.post(`http://localhost:5000/signup`, credentials);
            const userData = response.data;

            console.log("Test: ", userData);

            if (userData.error) {
                dispatch(setAuthError(userData.error));
            } else {
                dispatch(setUser(userData));
            }
        } catch (error: any) {
            dispatch(setAuthError(error.message));
        }
    };
}

export const selectAuthState = (state: RootState) => state.auth;

export default authSlice.reducer;