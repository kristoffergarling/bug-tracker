import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../store";
import { CommentPayload } from "../types";
import axios from "axios";

interface InitialCommentsState {
  comments: { [bugId: string]: string[] };
  loading: boolean;
  error: string | null;
}

const initialState: InitialCommentsState = {
  comments: {},
  loading: false,
  error: null,
};

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    setComments: (
      state,
      action: PayloadAction<{ bugId: string; comments: string[] }>
    ) => {
      state.comments[action.payload.bugId] = action.payload.comments;
      state.loading = false;
      state.error = null;
    },
    addComment: (
      state,
      action: PayloadAction<{ bugId: string; comment: string }>
    ) => {
      state.comments[action.payload.bugId].push(action.payload.comment);
      state.loading = false;
      state.error = null;
    },
    setAddCommentLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    removeComment: (
      state,
      action: PayloadAction<{ bugId: string; createdAt: Date }>
    ) => {
      const { bugId, createdAt } = action.payload;
      state.comments[bugId] = state.comments[bugId].filter(
        (comment) => JSON.parse(comment).createdAt !== createdAt
      );
      state.loading = false;
      state.error = null;
    },
    setCommentsError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const createComment = (commentData: CommentPayload): AppThunk => {
  return async (dispatch) => {
    try {
      dispatch(setAddCommentLoading());
      const { data } = await axios.post(
        `${process.env.BACKEND_URI}/projects/bugs/comments/${commentData.bugId}`,
        commentData
      );
      dispatch(
        addComment({ bugId: commentData.bugId, comment: JSON.stringify(data) })
      );
    } catch (error: any) {
      dispatch(setCommentsError(error));
    }
  };
};

export const fetchCommentsByBugId = (bugId: string): AppThunk => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `${process.env.BACKEND_URI}/projects/bugs/comments/${bugId}`
      );
      dispatch(setComments({ bugId, comments: data }));
    } catch (error: any) {
      dispatch(setCommentsError(error));
    }
  };
};

export const deleteComment = (bugId: string, createdAt: any): AppThunk => {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(
        `${process.env.BACKEND_URI}/projects/bugs/comments/${bugId}/${createdAt}`
      );
      dispatch(removeComment({ bugId, createdAt }));
    } catch (error: any) {
      dispatch(setCommentsError(error));
    }
  };
};

export const {
  setComments,
  addComment,
  setAddCommentLoading,
  setCommentsError,
  removeComment,
} = commentsSlice.actions;

export const selectComments = (state: RootState) => state.comments.comments;

export const selectCommentsByBugId = (state: RootState, bugId: string) => {
  return state.comments.comments[bugId];
};

export default commentsSlice.reducer;
