import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../store";
import { ProjectState, ProjectPayload } from "../types";
import { NextRouter } from "next/router";
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
    setProjects: (state, action: PayloadAction<ProjectState[]>) => {
      state.projects = action.payload;
      state.loading = false;
      state.error = null;
    },
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

export const createProject = (projectData: ProjectPayload): AppThunk => {
  return async (dispatch) => {
    try {
      dispatch(setAddProjectLoading());
      const response = await axios.post(
        `${process.env.BACKEND_URI}/projects`,
        projectData
      );
      dispatch(addProject(response.data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const fetchProjects = (): AppThunk => {
  return async (dispatch) => {
    try {
      dispatch(setAddProjectLoading());
      const { data } = await axios.get(`${process.env.BACKEND_URI}/projects`);
      dispatch(setProjects(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const deleteProject = (
  projectId: string,
  router: NextRouter
): AppThunk => {
  return async (dispatch) => {
    try {
      dispatch(setAddProjectLoading());
      await axios.delete(`${process.env.BACKEND_URI}/projects/${projectId}`);
      dispatch(fetchProjects());
      router.push("/projects");
    } catch (err) {
      console.log(err);
    }
  };
};

export const editProject = (
  projectId: string,
  title?: string,
  description?: string
): AppThunk => {
  return async (dispatch) => {
    try {
      dispatch(setAddProjectLoading());
      await axios.post(`${process.env.BACKEND_URI}/projects/${projectId}`, {
        title,
        description,
      });
      dispatch(fetchProjects());
    } catch (err) {
      console.log(err);
    }
  };
};

export const addProjectContributor = (
  projectId: string,
  contributors: string[]
): AppThunk => {
  return async (dispatch) => {
    try {
      dispatch(setAddProjectLoading());
      await axios.post(
        `${process.env.BACKEND_URI}/projects/${projectId}/contributors`,
        contributors
      );
      dispatch(fetchProjects());
    } catch (err) {
      console.log(err);
    }
  };
};

export const deleteProjectContributor = (
  projectId: string,
  contributor: string
): AppThunk => {
  return async (dispatch) => {
    try {
      dispatch(setAddProjectLoading());
      await axios.delete(
        `${process.env.BACKEND_URI}/projects/${projectId}/contributors/${contributor}`
      );
      dispatch(fetchProjects());
    } catch (err) {
      console.log(err);
    }
  };
};

export const { setProjects, addProject, setAddProjectLoading } =
  projectsSlice.actions;

export const selectProjectsState = (state: RootState) => state.projects;

export const selectProjectById = (state: RootState, projectId: string) => {
  return state.projects.projects.find((project) => project._id === projectId);
};

export default projectsSlice.reducer;
