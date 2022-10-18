import { useState } from "react";
import {
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Dialog,
  DialogActions,
  Button,
  Divider,
  DialogTitle,
} from "@mui/material";
import EditTitleDialog from "./EditTitleDialog";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { deleteProject } from "../../../redux/slices/projectsSlice";
import AddContributorsDialog from "../Project/ContributorList/AddContributorsDialog";
import LaunchIcon from "@mui/icons-material/Launch";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";

interface ActionMenuProps {
  projectId: string;
  projectTitle: string;
}

const ActionMenu: React.FC<ActionMenuProps> = ({ projectId, projectTitle }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openActionMenu = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const handleClickConfirmDialog = () => {
    setOpenConfirmDialog(!openConfirmDialog);
  };

  const deleteProjectHandler = () => {
    handleClose();
    dispatch(deleteProject(projectId, router));
  };

  return (
    <>
      <IconButton
        aria-controls={openActionMenu ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={openActionMenu ? "true" : undefined}
        onClick={handleClick}
      >
        <MoreVertIcon sx={{ cursor: "pointer" }} color="primary" />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={openActionMenu}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Link href={`/projects/${projectId}`}>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <LaunchIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>View Project</ListItemText>
          </MenuItem>
        </Link>

        <EditTitleDialog
          handleActionMenuClose={handleClose}
          projectId={projectId}
          projectTitle={projectTitle}
        />

        <MenuItem>
          <AddContributorsDialog isProjectPage={true} projectId={projectId} />
        </MenuItem>

        <MenuItem onClick={handleClickConfirmDialog}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Delete Project</ListItemText>
          <Dialog open={openConfirmDialog} onClose={handleClickConfirmDialog}>
            <DialogTitle>
              <strong>Delete "{projectTitle}" as Project</strong>
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
                  deleteProjectHandler();
                  handleClickConfirmDialog();
                }}
              >
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </MenuItem>
      </Menu>
    </>
  );
};

export default ActionMenu;
