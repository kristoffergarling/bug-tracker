import { useState } from "react";
import { useDispatch } from "react-redux";
import { changeBugStatus } from "../../../../redux/slices/bugsSlice";
import {
  Button,
  Dialog,
  Divider,
  DialogActions,
  DialogTitle,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";

interface DeleteBugDialogProps {
  isOpen: boolean;
  title: string;
  bugId: string;
  projectId: string;
}

const DeleteBugDialog: React.FC<DeleteBugDialogProps> = ({
  isOpen,
  title,
  bugId,
  projectId,
}) => {
  const dispatch = useDispatch();
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const handleClickConfirmDialog = () => {
    setOpenConfirmDialog(!openConfirmDialog);
  };

  const changeBugStatusHandler = () => {
    dispatch(changeBugStatus(!isOpen, projectId, bugId));
  };

  return (
    <>
      <Button
        startIcon={isOpen ? <CloseIcon /> : <CheckIcon />}
        sx={{ mr: 1 }}
        variant="contained"
        color={isOpen ? "secondary" : "success"}
        onClick={handleClickConfirmDialog}
      >
        {isOpen ? "Close Bug" : "Open Bug"}
      </Button>
      <Dialog open={openConfirmDialog} onClose={handleClickConfirmDialog}>
        <DialogTitle>
          <strong>
            {isOpen ? `Close "${title}" Bug` : `Open "${title}" Bug`}
          </strong>
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
              changeBugStatusHandler();
              handleClickConfirmDialog();
            }}
          >
            {isOpen ? "Close" : "Open"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default DeleteBugDialog;
