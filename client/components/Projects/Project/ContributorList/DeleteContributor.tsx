import { useState } from "react";
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Dialog,
  DialogTitle,
  Divider,
  DialogActions,
  Button,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { deleteProjectContributor } from "../../../../redux/slices/projectsSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import { ColouredAvatar } from "../../../../styles/customStyles";

interface DeleteContributor {
  contributor: string;
  contributors: string[];
  projectId: string;
}

const DeleteContributor: React.FC<DeleteContributor> = ({
  contributor,
  contributors,
  projectId,
}) => {
  const dispatch = useDispatch();
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const handleClickConfirmDialog = () => {
    setOpenConfirmDialog(!openConfirmDialog);
  };

  const handleDeleteContributor = (contributor: string) => {
    // Can't delete creator of the project
    if (contributor === contributors[0]) {
      return;
    }
    dispatch(deleteProjectContributor(projectId, contributor));
  };

  return (
    <ListItem
      sx={{ pr: 0, pl: 0 }}
      key={JSON.parse(contributor)._id}
      secondaryAction={
        <ColouredAvatar
          onClick={handleClickConfirmDialog}
          sx={
            contributors[0] === contributor
              ? { backgroundColor: "grey !important", right: "-16px" }
              : { cursor: "pointer", right: "-16px" }
          }
        >
          {contributors[0] === contributor ? (
            <DeleteIcon />
          ) : (
            <>
              <DeleteIcon />
              <Dialog
                open={openConfirmDialog}
                onClose={handleClickConfirmDialog}
              >
                <DialogTitle>
                  <strong>
                    Remove "{JSON.parse(contributor).fullName}" from project
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
                      handleDeleteContributor(contributor);
                      handleClickConfirmDialog();
                    }}
                  >
                    Remove
                  </Button>
                </DialogActions>
              </Dialog>
            </>
          )}
        </ColouredAvatar>
      }
    >
      <ListItemAvatar>
        <Avatar>{JSON.parse(contributor).fullName.charAt(0)}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={JSON.parse(contributor).fullName}
        secondary={JSON.parse(contributor).email}
      />
    </ListItem>
  );
};

export default DeleteContributor;
