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
import Link from "next/link";
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
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProjectBugsDesktop: React.FC<ProjectBugsProps> = ({
  bugs,
  openModal,
  setOpenModal,
}) => {
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

          {!bugs || bugs[bugs.length - 1] === undefined ? (
            <TableRow>
              <TableCell colSpan={6}>
                {bugs && bugs.length === 0 ? (
                  <Typography variant="body2" sx={{ textAlign: "center" }}>
                    No bugs yet
                  </Typography>
                ) : (
                  <LoadingSkeleton />
                )}
              </TableCell>
            </TableRow>
          ) : (
            <>
              {bugs.map((bug) => (
                <TableRow key={bug._id}>
                  <Link href={`/projects/${bug.projectId}/bugs/${bug._id}`}>
                    <TableCell
                      align="center"
                      sx={{
                        color: "#395B64",
                        cursor: "pointer",
                        "&:hover": {
                          backgroundColor: "#E7F6F2",
                          textDecoration: "underline",
                        },
                      }}
                    >
                      <Typography variant="body2">
                        {firstLetterToUpperCase(bug.title)}
                      </Typography>
                    </TableCell>
                  </Link>

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
