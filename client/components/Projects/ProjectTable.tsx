import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteProject } from "../../redux/slices/projectsSlice";
import { ProjectState } from "../../redux/types";
import {
  selectProjectsState,
  fetchProjects,
} from "../../redux/slices/projectsSlice";
import Link from "next/link";

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
import PostAddIcon from "@mui/icons-material/PostAdd";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import NewProjectModal from "./NewProjectModal/NewProjectModal";
import ActionMenu from "./ActionMenu/ActionMenu";

const ProjectTable: React.FC = () => {
  const dispatch = useDispatch();
  const { projects } = useSelector(selectProjectsState);
  console.log(projects);

  const [openModal, setOpenModal] = useState(false);
  const handleModalClick = () => {
    setOpenModal(!openModal);
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openActionMenu = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    dispatch(fetchProjects());
  }, [openModal]);

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
              <Button
                sx={{ fontSize: { xs: "0.7rem", sm: "0.875rem" } }}
                variant="contained"
                color="primary"
                startIcon={<PostAddIcon />}
                onClick={handleModalClick}
              >
                New Project
              </Button>
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          <TableRow sx={{ backgroundColor: "#A5C9CA" }}>
            <TableCell>
              <Typography variant="body2" sx={{ cursor: "pointer" }}>
                <strong>Project</strong>
              </Typography>
            </TableCell>

            <TableCell align="left">
              <Typography variant="body2">
                <strong>Description</strong>
              </Typography>
            </TableCell>

            <TableCell
              align="left"
              sx={{ display: { xs: "none", sm: "table-cell" } }}
            >
              <Typography variant="body2" sx={{ cursor: "pointer" }}>
                <strong>Date Created</strong>
              </Typography>
            </TableCell>

            <TableCell
              sx={{ display: { xs: "none", md: "table-cell" } }}
              align="center"
            >
              <Typography variant="body2">
                <strong>Actions</strong>
              </Typography>
            </TableCell>
          </TableRow>

          {projects.map((project) => (
            <TableRow
              key={project._id}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
              }}
            >
              <Link href={`/projects/${project._id}`}>
                <TableCell
                  component="th"
                  scope="row"
                  sx={{
                    color: "#395B64",
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: "#E7F6F2",
                      textDecoration: "underline",
                    },
                  }}
                >
                  {project.title}
                </TableCell>
              </Link>

              <TableCell align="left">{project.description}</TableCell>

              <TableCell
                align="left"
                sx={{ display: { xs: "none", sm: "table-cell" } }}
              >{`${new Date(project.createdAt).toLocaleDateString("en-GB", {
                timeZone: "UTC",
              })} `}</TableCell>

              <TableCell
                sx={{ display: { xs: "none", md: "table-cell" } }}
                align="center"
              >
                <IconButton
                  aria-controls={openActionMenu ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={openActionMenu ? "true" : undefined}
                  onClick={handleClick}
                >
                  <MoreVertIcon sx={{ cursor: "pointer" }} color="primary" />
                </IconButton>
                <ActionMenu
                  anchorEl={anchorEl}
                  open={openActionMenu}
                  handleClose={handleClose}
                  projectId={project._id}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default ProjectTable;
