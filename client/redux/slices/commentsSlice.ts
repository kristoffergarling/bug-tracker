import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../store";
import { Comment, CommentPayload } from "../types";
import axios from "axios";

interface InitialCommentsState {
  comments: { [bugId: string]: Comment[] };
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
      action: PayloadAction<{ bugId: string; comments: Comment[] }>
    ) => {
      state.comments[action.payload.bugId] = action.payload.comments;
      state.loading = false;
      state.error = null;
    },
    addComment: (
      state,
      action: PayloadAction<{ bugId: string; comment: Comment }>
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
      action: PayloadAction<{ bugId: string; commentId: string }>
    ) => {
      const { bugId, commentId } = action.payload;
      state.comments[bugId] = state.comments[bugId].filter(
        (comment) => comment._id !== commentId
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
        `${process.env.BACKEND_URI}/projects/bugs/comment/${commentData.bugId}`,
        commentData
      );
      console.log(data);
      dispatch(addComment(JSON.parse(data)));
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

export default commentsSlice.reducer;
