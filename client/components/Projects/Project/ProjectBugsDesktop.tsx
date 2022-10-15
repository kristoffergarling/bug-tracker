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
import { BugState } from "../../../redux/types";
import {
  formatDateTime,
  firstLetterToUpperCase,
  renderPrioColor,
} from "../../../utils/helperFunctions";

import LoadingSkeleton from "../../../components/UI/LoadingSkeleton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CommentIcon from "@mui/icons-material/Comment";
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
    <TableContainer component={Paper} sx={{ marginTop: 2, maxHeight: 800 }}>
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

          {!bugs ? (
            <TableRow>
              <TableCell colSpan={6}>
                <LoadingSkeleton />
              </TableCell>
            </TableRow>
          ) : (
            <>
              {bugs.map((bug) => (
                <TableRow key={bug._id}>
                  <TableCell align="center">
                    <Typography variant="body2">
                      {firstLetterToUpperCase(bug.title)}
                    </Typography>
                  </TableCell>

                  <TableCell align="center">
                    <Typography component={"span"} variant="body2">
                      <Chip
                        color={renderPrioColor(bug.priority)}
                        label={firstLetterToUpperCase(bug.priority)}
                      />
                    </Typography>
                  </TableCell>

                  <TableCell align="center">
                    <Typography component={"span"} variant="body2">
                      {bug.isOpen ? (
                        <Chip label="Open" color="secondary" />
                      ) : (
                        <Chip label="Closed" color="success" />
                      )}
                    </Typography>
                  </TableCell>

                  <TableCell align="center">
                    <Typography variant="body2">
                      {formatDateTime(bug.createdAt)}
                    </Typography>
                  </TableCell>

                  <TableCell align="center">
                    <Typography variant="body2">
                      {formatDateTime(bug.updatedAt)}
                    </Typography>
                  </TableCell>

                  <TableCell align="center">
                    <Typography variant="body2">
                      <Badge badgeContent={bug.comments.length} color="primary">
                        <CommentIcon color="primary" />
                      </Badge>
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default ProjectBugsDesktop;
