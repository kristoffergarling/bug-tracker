import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
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

  //New Project Modal
  const [open, setOpen] = useState(false);
  const handleModalClick = () => {
    setOpen(!open);
  };

  //Action Menu
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
  }, [open]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 250 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="subtitle1" component="h6">
                <strong>Projects</strong>
              </Typography>
            </TableCell>
            <TableCell align="right" colSpan={3}>
              <NewProjectModal
                open={open}
                handleModalClick={handleModalClick}
              />
              <Button
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
              <strong>Project</strong>
            </TableCell>

            <TableCell align="left">
              <strong>Description</strong>
            </TableCell>

            <TableCell align="left">
              <strong>Contributors</strong>
            </TableCell>

            <TableCell
              sx={{ display: { xs: "none", md: "block" } }}
              align="center"
            >
              <strong>Actions</strong>
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

              <TableCell align="left">
                {project.contributors.map((contributor) => {
                  return `${contributor}, `;
                })}
              </TableCell>

              <TableCell
                sx={{ display: { xs: "none", md: "block" } }}
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
