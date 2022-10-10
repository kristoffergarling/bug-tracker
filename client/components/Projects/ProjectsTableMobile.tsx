import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteProject } from "../../redux/slices/projectsSlice";
import { ProjectState } from "../../redux/types";
import {
  selectProjectsState,
  fetchProjects,
} from "../../redux/slices/projectsSlice";
import Link from "next/link";
import { formatDateTime } from "../../utils/helperFunctions";

import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Button,
  Typography,
  IconButton,
} from "@mui/material";
import { ColouredAvatar } from "../../styles/customStyles";
import PostAddIcon from "@mui/icons-material/PostAdd";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";

import NewProjectModal from "./NewProjectModal/NewProjectModal";
import ActionMenu from "./ActionMenu/ActionMenu";

interface ProjectsProps {
  projects: ProjectState[];
  handleModalClick: () => void;
  openModal: boolean;
}

const ProjectsTableDesktop: React.FC<ProjectsProps> = ({
  projects,
  handleModalClick,
  openModal,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openActionMenu = Boolean(anchorEl);
  const handleActionMenuClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorEl(event.currentTarget);
  };
  const handleActionMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 250 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="h5" component="h2">
                <strong>Projects</strong>
              </Typography>
            </TableCell>
            <TableCell align="right" colSpan={3}>
              <NewProjectModal
                open={openModal}
                handleModalClick={handleModalClick}
              />
              <ColouredAvatar
                sx={{ cursor: "pointer" }}
                onClick={handleModalClick}
              >
                <PostAddIcon />
              </ColouredAvatar>
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {projects.map((project) => (
            <TableRow key={project._id}>
              <TableCell colSpan={2}>
                <Typography variant="h6" sx={{ display: "flex" }}>
                  <strong>{project.title}</strong>
                  <IconButton
                    sx={{ ml: 1, width: 30, height: 30 }}
                    aria-controls={openActionMenu ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={openActionMenu ? "true" : undefined}
                    onClick={handleActionMenuClick}
                  >
                    <ArrowDropDownCircleIcon
                      sx={{ cursor: "pointer" }}
                      color="primary"
                    />
                  </IconButton>
                  <ActionMenu
                    anchorEl={anchorEl}
                    open={openActionMenu}
                    handleClose={handleActionMenuClose}
                    projectId={project._id}
                  />
                </Typography>

                <Typography variant="subtitle1" sx={{ display: "flex" }}>
                  <strong>Description:</strong>
                  <Typography sx={{ marginLeft: 1 }} variant="subtitle1">
                    {project.description}
                  </Typography>
                </Typography>

                <Typography variant="subtitle1" sx={{ display: "flex" }}>
                  <strong>Created By:</strong>
                  <Typography sx={{ marginLeft: 1 }} variant="subtitle1">
                    {project.createdBy}
                  </Typography>
                </Typography>

                <Typography variant="subtitle1" sx={{ display: "flex" }}>
                  <strong>Last Updated:</strong>
                  <Typography sx={{ marginLeft: 1 }} variant="subtitle1">
                    {formatDateTime(project.updatedAt)}
                  </Typography>
                </Typography>

                <Typography variant="subtitle1" sx={{ display: "flex" }}>
                  <strong>Contributors:</strong>
                  <Typography sx={{ marginLeft: 1 }} variant="subtitle1">
                    {project.contributors.length}
                  </Typography>
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default ProjectsTableDesktop;
