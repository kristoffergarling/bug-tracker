import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../store";
import { Comment } from "../types";

interface InitialCommentsState {
  comments: Comment[];
  loading: boolean;
  error: string | null;
}

const initialState: InitialCommentsState = {
  comments: [],
  loading: false,
  error: null,
};

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    setComments: (state, action: PayloadAction<Comment[]>) => {
      state.comments = action.payload;
      state.loading = false;
      state.error = null;
    },
    addComment: (state, action: PayloadAction<Comment>) => {
      state.comments.push(action.payload);
      state.loading = false;
      state.error = null;
    },
    setAddCommentLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    setAddCommentError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    removeComment: (state, action: PayloadAction<string>) => {
      state.comments = state.comments.filter(
        (comment) => comment._id !== action.payload
      );
      state.loading = false;
      state.error = null;
    },
  },
});

// export const postComment =
//   (comment: Comment): AppThunk =>
//   async (dispatch) => {
//     try {
//       dispatch(setAddCommentLoading());
//       const response = await fetch("/api/comments", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(comment),
//       });
//       const data = await response.json();
//       dispatch(addComment(data));
//     } catch (error) {
//       dispatch(setAddCommentError(error.message));
//     }
//   };

export const {
  setComments,
  addComment,
  setAddCommentLoading,
  setAddCommentError,
  removeComment,
} = commentsSlice.actions;

export const selectComments = (state: RootState) => state.comments.comments;

export default commentsSlice.reducer;
