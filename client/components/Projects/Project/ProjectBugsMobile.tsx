import Link from "next/link";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  Typography,
  TableBody,
  Chip,
  Badge,
} from "@mui/material";
import { ColouredAvatar } from "../../../styles/customStyles";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CommentIcon from "@mui/icons-material/Comment";
import { BugState } from "../../../redux/types";
import {
  formatDateTime,
  firstLetterToUpperCase,
  renderPrioColor,
} from "../../../utils/helperFunctions";

import LoadingSkeleton from "../../../components/UI/LoadingSkeleton";
import AddBugModal from "./AddBugModal/AddBugModal";

interface ProjectBugsProps {
  bugs: BugState[];
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProjectBugsMobile: React.FC<ProjectBugsProps> = ({
  bugs,
  openModal,
  setOpenModal,
}) => {
  const handleModalClick = () => {
    setOpenModal(!openModal);
  };

  return (
    <TableContainer component={Paper} sx={{ marginTop: 3 }}>
      <Table sx={{ minWidth: 250 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="h5" component="h3">
                <strong>Bugs</strong>
              </Typography>
            </TableCell>

            <TableCell
              component="th"
              scope="row"
              sx={{
                display: "flex",
                justifyContent: "end",
              }}
            >
              <AddBugModal
                open={openModal}
                handleModalClick={handleModalClick}
              />
              <ColouredAvatar
                onClick={handleModalClick}
                sx={{ cursor: "pointer", textAlign: "right" }}
              >
                <AddCircleOutlineIcon />
              </ColouredAvatar>
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {!bugs || bugs[bugs.length - 1] === undefined ? (
            <TableRow>
              <TableCell colSpan={2}>
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
                  <TableCell colSpan={2} align="left">
                    <Link href={`/projects/${bug.projectId}/bugs/${bug._id}`}>
                      <Typography
                        variant="h6"
                        sx={{ display: "flex", cursor: "pointer" }}
                      >
                        <strong>{firstLetterToUpperCase(bug.title)}</strong>
                      </Typography>
                    </Link>

                    <Typography
                      variant="subtitle1"
                      sx={{ display: "flex", mb: 0.5 }}
                    >
                      <strong>Priority: </strong>{" "}
                      <Typography
                        sx={{ marginLeft: 1 }}
                        component={"span"}
                        variant="body2"
                      >
                        <Chip
                          label={firstLetterToUpperCase(bug.priority)}
                          color={renderPrioColor(bug.priority)}
                        />
                      </Typography>
                    </Typography>

                    <Typography variant="subtitle1" sx={{ display: "flex" }}>
                      <strong>Status: </strong>{" "}
                      <Typography
                        sx={{
                          marginLeft: 1,
                        }}
                        component={"span"}
                        variant="body2"
                      >
                        <Chip
                          label={bug.isOpen ? "Open" : "Closed"}
                          color={bug.isOpen ? "secondary" : "success"}
                        />
                      </Typography>
                    </Typography>

                    <Typography variant="subtitle1" sx={{ display: "flex" }}>
                      <strong>Created At: </strong>{" "}
                      <Typography sx={{ marginLeft: 1 }} variant="subtitle1">
                        {formatDateTime(bug.createdAt)}
                      </Typography>
                    </Typography>

                    <Typography variant="subtitle1" sx={{ display: "flex" }}>
                      <strong>Updated At: </strong>{" "}
                      <Typography sx={{ marginLeft: 1 }} variant="subtitle1">
                        {formatDateTime(bug.updatedAt)}
                      </Typography>
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{ display: "flex", marginTop: 0.5 }}
                    >
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
export default ProjectBugsMobile;
