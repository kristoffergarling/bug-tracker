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
  Box,
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
import getBreakpoints from "../../../utils/getBreakpoints";

interface ProjectBugsProps {
  bugs: BugState[];
}

const ProjectBugsMobile: React.FC<ProjectBugsProps> = ({ bugs }) => {
  const { xs, sm, md } = getBreakpoints();
  const [openModal, setOpenModal] = useState(false);
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
          {!bugs ? (
            <TableRow>
              <TableCell colSpan={2}>
                <LoadingSkeleton />
              </TableCell>
            </TableRow>
          ) : (
            <>
              {bugs.map((bug) => (
                <TableRow>
                  <TableCell colSpan={2} align="left">
                    <Typography variant="h6" sx={{ display: "flex" }}>
                      <strong>{firstLetterToUpperCase(bug.title)}</strong>
                    </Typography>

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
