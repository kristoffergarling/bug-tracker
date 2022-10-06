import * as React from "react";
import { Menu, MenuItem, ListItemIcon, ListItemText, Box } from "@mui/material";
import Link from "next/link";
import LaunchIcon from "@mui/icons-material/Launch";
import EditIcon from "@mui/icons-material/Edit";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import DeleteIcon from "@mui/icons-material/Delete";
interface ActionMenuProps {
  anchorEl: null | HTMLElement;
  handleClose: () => void;
  open: boolean;
  projectId: string;
}

const ActionMenu: React.FC<ActionMenuProps> = ({
  anchorEl,
  open,
  handleClose,
  projectId,
}) => {
  return (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
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

      <MenuItem onClick={handleClose}>
        <ListItemIcon>
          <EditIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Edit Title</ListItemText>
      </MenuItem>

      <MenuItem onClick={handleClose}>
        <ListItemIcon>
          <PersonAddIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Add Contributors</ListItemText>
      </MenuItem>

      <MenuItem onClick={handleClose}>
        <ListItemIcon>
          <DeleteIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Delete Project</ListItemText>
      </MenuItem>
    </Menu>
  );
};

export default ActionMenu;
