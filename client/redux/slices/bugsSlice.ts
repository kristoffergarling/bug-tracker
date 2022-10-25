import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../store";
import { BugState, BugPayload, EditBugPayload } from "../types";
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
        `${process.env.BACKEND_URI}/projects/bugs/${projectId}`,
        bugData
      );
      dispatch(addBug(response.data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const editBug = (
  bugData: EditBugPayload,
  projectId: string,
  bugId: string
): AppThunk => {
  return async (dispatch) => {
    try {
      dispatch(setAddBugLoading());
      const response = await axios.post(
        `${process.env.BACKEND_URI}/projects/bugs/edit/${bugId}`,
        bugData
      );
      dispatch(updateBug(response.data));
      dispatch(fetchBugsByProjectId(projectId));
    } catch (err) {
      console.log(err);
    }
  };
};

export const changeBugStatus = (
  isOpen: boolean,
  projectId: string,
  bugId: string
): AppThunk => {
  return async (dispatch) => {
    try {
      dispatch(setAddBugLoading());
      const response = await axios.post(
        `${process.env.BACKEND_URI}/projects/bugs/edit/status/${bugId}`,
        { isOpen }
      );
      dispatch(updateBug(response.data));
      dispatch(fetchBugsByProjectId(projectId));
    } catch (err) {
      console.log(err);
    }
  };
};

export const fetchBugsByProjectId = (projectId: string): AppThunk => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${process.env.BACKEND_URI}/projects/bugs/${projectId}`
      );
      dispatch(setBugs({ projectId, bugs: response.data }));
    } catch (err) {
      console.log(err);
    }
  };
};

export const deleteBug = (bugId: string, projectId: string): AppThunk => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(
        `${process.env.BACKEND_URI}/projects/bugs/${bugId}`
      );
      dispatch(removeBug(response.data));
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

export const selectBugByProjectId = (
  state: RootState,
  projectId: string,
  bugId: string
) => {
  return state.bugs.bugs?.[projectId]?.find((bug) => bug._id === bugId);
};

export default bugsSlice.reducer;
