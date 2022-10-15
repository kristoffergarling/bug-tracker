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
} from "@mui/material";
import AddContributorsDialog from "./AddContributorsDialog";
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

  const [openAddContributorDialog, setOpenAddContributorDialog] =
    useState(false);
  const handleClickAddContributorDialog = () => {
    setOpenAddContributorDialog(!openAddContributorDialog);
  };

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
    <Grid item xs={12} md={6} sx={{ padding: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" component="div">
          <strong>Contributors:</strong>
        </Typography>
        <ColouredAvatar
          onClick={handleClickAddContributorDialog}
          sx={{ cursor: "pointer" }}
        >
          <GroupAddIcon />
          <AddContributorsDialog
            open={openAddContributorDialog}
            handleClose={handleClickAddContributorDialog}
          />
        </ColouredAvatar>
      </Box>
      <Box>
        <List>
          {contributors.map((contributor) => (
            <ListItem
              key={contributor}
              secondaryAction={
                <ColouredAvatar
                  onClick={handleClickConfirmDialog}
                  sx={
                    contributors[0] === contributor
                      ? { backgroundColor: "grey !important" }
                      : { cursor: "pointer" }
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
