import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../store";
import { ProjectState, ProjectPayload, ProjectContributor } from "../types";
import axios from "axios";

interface InitialProjectsState {
  projects: ProjectState[];
  loading: boolean;
  error: string | null;
}

const initialState: InitialProjectsState = {
  projects: [],
  loading: false,
  error: null,
};

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    addProject: (state, action: PayloadAction<ProjectState>) => {
      state.projects.push(action.payload);
      state.loading = false;
      state.error = null;
    },
    setAddProjectLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
  },
});

export const createNewProject = (projectData: ProjectState): AppThunk => {
  return async (dispatch) => {
    try {
      dispatch(setAddProjectLoading());
      const response = await axios.post(
        `${process.env.BACKEND_URI}/projects`,
        projectData
      );
      dispatch(addProject(response));
    } catch (err) {
      console.log(err);
    }
  };
};

export const { addProject } = projectsSlice.actions;

export const selectProjects = (state: RootState) => state.projects;

export default projectsSlice.reducer;
