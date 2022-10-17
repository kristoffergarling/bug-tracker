import { useState } from "react";
import { ProjectState } from "../../redux/types";
import Link from "next/link";
import { formatDateTime, shortenString } from "../../utils/helperFunctions";

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
  Box,
} from "@mui/material";
import PostAddIcon from "@mui/icons-material/PostAdd";
import MoreVertIcon from "@mui/icons-material/MoreVert";

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
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openActionMenu = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 250 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell colSpan={3}>
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

              <TableCell align="left">
                <Typography variant="body2" sx={{ cursor: "pointer" }}>
                  <strong>Created By</strong>
                </Typography>
              </TableCell>

              <TableCell align="center">
                <Typography variant="body2" sx={{ cursor: "pointer" }}>
                  <strong>Last Updated</strong>
                </Typography>
              </TableCell>

              <TableCell align="center">
                <Typography variant="body2" sx={{ cursor: "pointer" }}>
                  <strong>Contributors</strong>
                </Typography>
              </TableCell>

              <TableCell align="center">
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

                <TableCell align="left">
                  {shortenString(project.description, 128)}
                </TableCell>

                <TableCell align="left">{project.createdBy}</TableCell>

                <TableCell align="center">
                  {formatDateTime(project.updatedAt)}
                </TableCell>

                <TableCell align="center">
                  {project.contributors.length}
                </TableCell>

                <TableCell align="center">
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
    </Box>
  );
};
export default ProjectsTableDesktop;
