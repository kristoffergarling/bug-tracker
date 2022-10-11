import React from "react";
import Dashboard from "../components/Dashboard/Dashboard";
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

const dummyData = [
  {
    id: 1,
    title: "Bug 1",
    description: "Bug 1 description",
    priority: "High",
    status: "Open",
    type: "Bug",
    createdBy: "John Doe",
    createdAt: "2021-10-10",
    updatedAt: "2021-10-10",
  },
  {
    id: 5,
    title: "Bug 1",
    description: "Bug 1 description",
    priority: "High",
    status: "Open",
    type: "Bug",
    createdBy: "John Doe",
    createdAt: "2021-10-10",
    updatedAt: "2021-10-10",
  },
  {
    id: 4,
    title: "Bug 1",
    description: "Bug 1 description",
    priority: "High",
    status: "Open",
    type: "Bug",
    createdBy: "John Doe",
    createdAt: "2021-10-10",
    updatedAt: "2021-10-10",
  },
  {
    id: 3,
    title: "Bug 1",
    description: "Bug 1 description",
    priority: "High",
    status: "Open",
    type: "Bug",
    createdBy: "John Doe",
    createdAt: "2021-10-10",
    updatedAt: "2021-10-10",
  },
  {
    id: 2,
    title: "Bug 1",
    description: "Bug 1 description",
    priority: "High",
    status: "Open",
    type: "Bug",
    createdBy: "John Doe",
    createdAt: "2021-10-10",
    updatedAt: "2021-10-10",
  },
];

const Index: React.FC = () => {
  return (
    <Dashboard title="Dashboard">
      <TableContainer component={Paper} sx={{ marginTop: 3 }}>
        <Table sx={{ minWidth: 250 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell colSpan={3}>
                <Typography variant="h5" component="h3">
                  <strong>Latest Bugs</strong>
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            <TableRow sx={{ backgroundColor: "#A5C9CA" }}>
              <TableCell align="center">
                <Typography variant="body2">
                  <strong>Project</strong>
                </Typography>
              </TableCell>

              <TableCell align="center">
                <Typography variant="body2">
                  <strong>Bug</strong>
                </Typography>
              </TableCell>

              <TableCell align="center">
                <Typography variant="body2">
                  <strong>Priority</strong>
                </Typography>
              </TableCell>

              <TableCell align="center">
                <Typography variant="body2">
                  <strong>Created At</strong>
                </Typography>
              </TableCell>

              <TableCell align="center">
                <Typography variant="body2">
                  <strong>Created By</strong>
                </Typography>
              </TableCell>

              <TableCell align="center">
                <Typography variant="body2">
                  <strong>Comments</strong>
                </Typography>
              </TableCell>
            </TableRow>

            {dummyData.map((bug) => (
              <TableRow>
                <TableCell align="center">
                  <Typography variant="body2">ProjectName</Typography>
                </TableCell>

                <TableCell align="center">
                  <Typography variant="body2">BugTitle</Typography>
                </TableCell>

                <TableCell align="center">
                  <Typography component={"span"} variant="body2">
                    <Chip label="Low" color="warning" />
                  </Typography>
                </TableCell>

                <TableCell align="center">
                  <Typography component={"span"} variant="body2">
                    {bug.createdAt}
                  </Typography>
                </TableCell>

                <TableCell align="center">
                  <Typography variant="body2">Demo Account</Typography>
                </TableCell>

                <TableCell align="center">
                  <Typography variant="body2">
                    <strong>Created At</strong>
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Dashboard>
  );
};

export default Index;
