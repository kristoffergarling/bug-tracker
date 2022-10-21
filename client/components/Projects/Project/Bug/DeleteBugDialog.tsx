import { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { deleteBug } from "../../../../redux/slices/bugsSlice";
import {
  Button,
  Dialog,
  Divider,
  DialogActions,
  DialogTitle,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface DeleteBugDialogProps {
  title: string;
  bugId: string;
  projectId: string;
}

const DeleteBugDialog: React.FC<DeleteBugDialogProps> = ({
  title,
  bugId,
  projectId,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const handleClickConfirmDialog = () => {
    setOpenConfirmDialog(!openConfirmDialog);
  };

  const deleteBugHandler = () => {
    dispatch(deleteBug(bugId, projectId));
    router.push(`/projects/${projectId}/`);
  };
  return (
    <>
      <Button
        onClick={handleClickConfirmDialog}
        startIcon={<DeleteIcon />}
        variant="contained"
      >
        Delete Bug
      </Button>
      <Dialog open={openConfirmDialog} onClose={handleClickConfirmDialog}>
        <DialogTitle>
          <strong>Delete "{title}" Bug</strong>
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
              deleteBugHandler();
              handleClickConfirmDialog();
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default DeleteBugDialog;
