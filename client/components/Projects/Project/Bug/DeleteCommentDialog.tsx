import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { ColouredAvatar } from "../../../../styles/customStyles";
import {
  deleteComment,
  fetchCommentsByBugId,
} from "../../../../redux/slices/commentsSlice";
import { useDispatch } from "react-redux";

interface DeleteCommentDialogProps {
  comment: string;
}

const DeleteCommentDialog: React.FC<DeleteCommentDialogProps> = ({
  comment,
}) => {
  const dispatch = useDispatch();
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const handleClickConfirmDialog = () => {
    setOpenConfirmDialog(!openConfirmDialog);
  };

  const handleDeleteComment = (bugId: string, createdAt: Date) => {
    dispatch(deleteComment(bugId, createdAt));
    dispatch(fetchCommentsByBugId(bugId));
    dispatch(fetchCommentsByBugId(bugId));
    dispatch(fetchCommentsByBugId(bugId));
    dispatch(fetchCommentsByBugId(bugId));
    dispatch(fetchCommentsByBugId(bugId));
  };

  return (
    <ColouredAvatar
      onClick={handleClickConfirmDialog}
      sx={{ cursor: "pointer" }}
    >
      <DeleteIcon />
      <Dialog open={openConfirmDialog} onClose={handleClickConfirmDialog}>
        <DialogTitle>
          <strong>Remove this Comment</strong>
        </DialogTitle>
        <Divider />
        <DialogActions>
          <Button
            variant="outlined"
            autoFocus
            onClick={handleClickConfirmDialog}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              handleDeleteComment(
                JSON.parse(comment).bugId,
                JSON.parse(comment).createdAt
              );
              handleClickConfirmDialog;
            }}
          >
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </ColouredAvatar>
  );
};
export default DeleteCommentDialog;
