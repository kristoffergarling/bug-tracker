import { useState } from "react";
import {
  Grid,
  Box,
  Avatar,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Dialog,
  DialogTitle,
  Divider,
  DialogActions,
  Button,
  TableContainer,
  Paper,
  Table,
  TableCell,
} from "@mui/material";
import AddContributorsModal from "./AddContributorsDialog";
import { useDispatch } from "react-redux";
import {
  addProjectContributor,
  deleteProjectContributor,
} from "../../../../redux/slices/projectsSlice";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import DeleteIcon from "@mui/icons-material/Delete";
import { ColouredAvatar } from "../../../../styles/customStyles";

interface ContributorListProps {
  projectId: string;
  contributors: string[];
}

const ContributorList: React.FC<ContributorListProps> = ({
  projectId,
  contributors,
}) => {
  const dispatch = useDispatch();

  const [openAddContributorModal, setOpenAddContributorModal] = useState(false);
  const handleClickAddContributorDialog = () => {
    setOpenAddContributorModal(!openAddContributorModal);
  };

  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const handleClickConfirmDialog = () => {
    setOpenConfirmDialog(!openConfirmDialog);
  };

  const handleDeleteContributor = (contributor: string) => {
    console.log(contributor);

    // Can't delete creator of the project
    if (contributor === contributors[0]) {
      return;
    }
    dispatch(deleteProjectContributor(projectId, contributor));
  };

  return (
    <Grid>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" component="div">
          <strong>Contributors:</strong>
        </Typography>
        <ColouredAvatar
          onClick={handleClickAddContributorDialog}
          sx={{ cursor: "pointer" }}
        >
          <GroupAddIcon />
        </ColouredAvatar>
        <AddContributorsModal
          projectId={projectId}
          open={openAddContributorModal}
          handleClose={handleClickAddContributorDialog}
        />
      </Box>
      <Box>
        <List>
          {contributors.map((contributor) => (
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
                            Remove "{JSON.parse(contributor).fullName}" from
                            project
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
          ))}
        </List>
      </Box>
    </Grid>
  );
};

export default ContributorList;
