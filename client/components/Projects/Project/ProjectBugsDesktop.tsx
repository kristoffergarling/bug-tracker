import { useState } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  Typography,
  TableBody,
  Button,
  Chip,
  Badge,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CommentIcon from "@mui/icons-material/Comment";
import { BugState } from "../../../redux/types";
import AddBugModal from "./AddBugModal/AddBugModal";

interface ProjectBugsProps {
  bugs: BugState[];
}

const ProjectBugsDesktop: React.FC<ProjectBugsProps> = ({ bugs }) => {
  const [openModal, setOpenModal] = useState(false);
  const handleModalClick = () => {
    setOpenModal(!openModal);
  };

  return (
    <TableContainer component={Paper} sx={{ marginTop: 2 }}>
      <Table sx={{ minWidth: 250 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell colSpan={3}>
              <Typography variant="h5" component="h3">
                <strong>Bugs</strong>
              </Typography>
            </TableCell>

            <TableCell colSpan={3} component="th" scope="row" align="right">
              <AddBugModal
                open={openModal}
                handleModalClick={handleModalClick}
              />
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddCircleOutlineIcon />}
                onClick={handleModalClick}
              >
                Add Bug
              </Button>
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          <TableRow sx={{ backgroundColor: "#A5C9CA" }}>
            <TableCell align="center">
              <Typography variant="body2">
                <strong>Title</strong>
              </Typography>
            </TableCell>

            <TableCell align="center">
              <Typography variant="body2">
                <strong>Priority</strong>
              </Typography>
            </TableCell>

            <TableCell align="center">
              <Typography variant="body2">
                <strong>Status</strong>
              </Typography>
            </TableCell>

            <TableCell align="center">
              <Typography variant="body2">
                <strong>Created At</strong>
              </Typography>
            </TableCell>

            <TableCell align="center">
              <Typography variant="body2">
                <strong>Updated At</strong>
              </Typography>
            </TableCell>

            <TableCell align="center">
              <Typography variant="body2">
                <strong>Comments</strong>
              </Typography>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell align="center">
              <Typography variant="body2">Title</Typography>
            </TableCell>

            <TableCell align="center">
              <Typography component={"span"} variant="body2">
                <Chip label="Low" color="success" />
              </Typography>
            </TableCell>

            <TableCell align="center">
              <Typography component={"span"} variant="body2">
                <Chip label="Closed" color="success" />
              </Typography>
            </TableCell>

            <TableCell align="center">
              <Typography variant="body2">
                <strong>Created At</strong>
              </Typography>
            </TableCell>

            <TableCell align="center">
              <Typography variant="body2">
                <strong>Updated At</strong>
              </Typography>
            </TableCell>

            <TableCell align="center">
              <Typography variant="body2">
                <Badge badgeContent={0} color="primary">
                  <CommentIcon color="primary" />
                </Badge>
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default ProjectBugsDesktop;
