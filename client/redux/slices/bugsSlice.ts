import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../store";
import { BugState, BugPayload } from "../types";
import axios from "axios";

interface InitialBugsState {
  bugs: { [projectId: string]: BugState[] };
  loading: boolean;
  error: string | null;
}

const initialState: InitialBugsState = {
  bugs: {},
  loading: false,
  error: null,
};

const bugsSlice = createSlice({
  name: "bugs",
  initialState,
  reducers: {
    setBugs: (
      state,
      action: PayloadAction<{ projectId: string; bugs: BugState[] }>
    ) => {
      state.bugs[action.payload.projectId] = action.payload.bugs;
      state.loading = false;
      state.error = null;
    },
    addBug: (
      state,
      action: PayloadAction<{ projectId: string; bug: BugState }>
    ) => {
      state.bugs[action.payload.projectId].push(action.payload.bug);
      state.loading = false;
      state.error = null;
    },
    updateBug: (
      state,
      action: PayloadAction<{ projectId: string; bug: BugState }>
    ) => {
      const { projectId, bug } = action.payload;
      const bugIndex = state.bugs[projectId].findIndex(
        (b) => b._id === bug._id
      );
      state.bugs[projectId][bugIndex] = bug;
      state.loading = false;
      state.error = null;
    },
    setAddBugLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    removeBug: (
      state,
      action: PayloadAction<{ projectId: string; bugId: string }>
    ) => {
      const { projectId, bugId } = action.payload;
      state.bugs[projectId] = state.bugs[projectId].filter(
        (bug) => bug._id !== bugId
      );
      state.loading = false;
      state.error = null;
    },
  },
});

export const createBug = (bugData: BugPayload, projectId: string): AppThunk => {
  return async (dispatch) => {
    try {
      dispatch(setAddBugLoading());
      const response = await axios.post(
        `${process.env.BACKEND_URI}/projects/${projectId}/bugs/${projectId}`,
        bugData
      );
      dispatch(addBug(response.data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const fetchBugsByProjectId = (projectId: string): AppThunk => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${process.env.BACKEND_URI}/projects/${projectId}/bugs/${projectId}`
      );
      dispatch(setBugs({ projectId, bugs: response.data }));
    } catch (err) {
      console.log(err);
    }
  };
};

export const { setBugs, addBug, updateBug, setAddBugLoading, removeBug } =
  bugsSlice.actions;

export const selectBugsByProjectId = (state: RootState, projectId: string) => {
  return state.bugs.bugs?.[projectId];
};

export default bugsSlice.reducer;
