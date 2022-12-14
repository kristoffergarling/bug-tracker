import { useSelector } from "react-redux";
import { selectAuthState } from "../../redux/slices/authSlice";
import { ProjectState } from "../../redux/types";
import { formatDateTime, shortenString } from "../../utils/helperFunctions";

import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Typography,
} from "@mui/material";
import { ColouredAvatar } from "../../styles/customStyles";
import PostAddIcon from "@mui/icons-material/PostAdd";

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
  const user = useSelector(selectAuthState).user;

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
            <TableCell
              sx={{
                display: "flex",
                justifyContent: "end",
              }}
              colSpan={3}
            >
              <NewProjectModal
                open={openModal}
                handleModalClick={handleModalClick}
              />
              <ColouredAvatar
                sx={{ cursor: "pointer", textAlign: "right" }}
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

                  <ActionMenu userIsAdmin={user?.isAdmin} project={project} />
                </Typography>

                <Typography variant="subtitle1" sx={{ display: "flex" }}>
                  <strong>Description:</strong>
                  <Typography sx={{ marginLeft: 1 }} variant="subtitle1">
                    {shortenString(project.description, 128)}
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
