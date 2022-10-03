import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState, AppThunk } from "../store";
import { User } from "../types";

interface InitialUsersState {
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialState: InitialUsersState = {
  users: [],
  loading: false,
  error: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
      state.loading = false;
      state.error = null;
    },
    setUsersLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
  },
});

export const { setUsers, setUsersLoading } = usersSlice.actions;

export const fetchUsers = (): AppThunk => {
  return async (dispatch) => {
    try {
      dispatch(setUsersLoading());
      const { data } = await axios.get(`${process.env.BACKEND_URI}/users`);
      dispatch(setUsers(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const selectUsersState = (state: RootState) => state.users;

export default usersSlice.reducer;
