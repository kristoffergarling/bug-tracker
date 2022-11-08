import { useEffect } from "react";
import { NextPage, NextPageContext } from "next";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import {
  selectBugByProjectId,
  fetchBugsByProjectId,
} from "../../../../redux/slices/bugsSlice";
import { selectAuthState } from "../../../../redux/slices/authSlice";
import { RootState } from "../../../../redux/store";
import { useRouter } from "next/router";
import {
  formatDateTime,
  renderPrioColor,
  firstLetterToUpperCase,
} from "../../../../utils/helperFunctions";
import useAuthCheck from "../../../../hooks/useAuthCheck";

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
} from "@mui/material";
import HeadTag from "../../../../components/HeadTag";
import Dashboard from "../../../../components/Dashboard/Dashboard";
import LoadingScreen from "../../../../components/LoadingScreen";
import EditBugModal from "../../../../components/Projects/Project/Bug/EditBugModal";
import DeleteBugDialog from "../../../../components/Projects/Project/Bug/DeleteBugDialog";
import CloseBugDialog from "../../../../components/Projects/Project/Bug/CloseBugDialog";
import Comments from "../../../../components/Projects/Project/Bug/Comments";

interface BugProps {
  bugId: string;
}

const Bug: NextPage<BugProps> = ({ bugId }) => {
  const dispatch = useDispatch();
  const user = useAuthCheck() as any;
  const router = useRouter();
  const path = router.asPath as string;
  const projectId = path.slice(
    path[10] === "/" ? 11 : 10,
    path.indexOf("/bugs")
  );
  const bug = useSelector(
    (state: RootState) => selectBugByProjectId(state, projectId, bugId),
    shallowEqual
  );

  useEffect(() => {
    dispatch(fetchBugsByProjectId(projectId));
  }, []);

  return (
    <Dashboard prevPage="Project" href={`/projects/${projectId}`}>
      {!bug || !user ? (
        <LoadingScreen />
      ) : (
        <Box sx={{ display: { xs: "auto", md: "flex" } }}>
          <HeadTag title={`Bug: ${bug.title} | Bug Tracker by K. Garling`} />
          <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
            <Table sx={{ minWidth: 250 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography variant="h4" component="h2">
                      <strong>{bug.title}</strong>
                      {user?.isAdmin && <EditBugModal bug={bug} />}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="subtitle1" component="p">
                      <strong>Created At: </strong>
                      {formatDateTime(bug.createdAt)}
                    </Typography>
                    <Typography variant="subtitle1" component="p">
                      <strong>Updated At: </strong>
                      {formatDateTime(bug.updatedAt)}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                <TableRow>
                  <TableCell component="th" scope="row" colSpan={2}>
                    <Typography variant="subtitle1" component="p">
                      <strong>Created by: </strong>
                      {bug.createdBy}
                    </Typography>
                    <Typography variant="subtitle1" component="p">
                      <strong>Description: </strong>
                      {bug.description}
                    </Typography>
                    <Typography variant="subtitle1" component="p">
                      <strong>Priority: </strong>
                      <Typography component={"span"} variant="body2">
                        <Chip
                          color={renderPrioColor(bug.priority)}
                          label={firstLetterToUpperCase(bug.priority)}
                        />
                      </Typography>
                    </Typography>
                    <Typography
                      sx={{ mt: 0.5 }}
                      variant="subtitle1"
                      component="p"
                    >
                      <strong>Status: </strong>
                      <Typography component={"span"} variant="body2">
                        {bug.isOpen ? (
                          <Chip label="Open" color="secondary" />
                        ) : (
                          <Chip label="Closed" color="success" />
                        )}
                      </Typography>
                    </Typography>
                  </TableCell>
                </TableRow>
                {user.isAdmin && (
                  <TableRow>
                    <TableCell component="th" scope="row" colSpan={2}>
                      <CloseBugDialog
                        isOpen={bug.isOpen}
                        bugId={bug._id}
                        title={bug.title}
                        projectId={projectId}
                      />
                      <DeleteBugDialog
                        bugId={bug._id}
                        title={bug.title}
                        projectId={projectId}
                      />
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <Box
            sx={{
              ml: { xs: "auto", md: 2 },
              mt: { xs: 2, md: 0 },
              width: "100%",
              maxHeight: 300,
            }}
            component={Paper}
          >
            <TableContainer component={Paper}>
              <Comments
                bugId={bugId}
                userFullName={`${user.firstName} ${user.lastName}`}
              />
            </TableContainer>
          </Box>
        </Box>
      )}
    </Dashboard>
  );
};

Bug.getInitialProps = async (ctx: NextPageContext) => {
  const { query } = ctx;
  const { bugId } = query as { bugId: string };
  return { query, bugId };
};

export default Bug;
