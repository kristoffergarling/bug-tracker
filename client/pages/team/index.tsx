import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, selectUsersState } from "../../redux/slices/usersSlice";
import storage from "../../utils/localStorage";
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
import DeleteIcon from "@mui/icons-material/Delete";

import Dashboard from "../../components/Dashboard/Dashboard";

const Index: React.FC = () => {
  const dispatch = useDispatch();
  const { users } = useSelector(selectUsersState);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  return (
    <Dashboard title="Team">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 250 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle1" component="h6">
                  <strong>Team</strong>
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            <TableRow sx={{ backgroundColor: "#A5C9CA" }}>
              <TableCell align="left">
                <strong>Name</strong>
              </TableCell>

              <TableCell align="left">
                <strong>Email</strong>
              </TableCell>

              <TableCell align="left">
                <strong>Register Date</strong>
              </TableCell>

              <TableCell align="left">
                <strong>Role</strong>
              </TableCell>
            </TableRow>

            {users.map((user) => (
              <TableRow
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell align="left">{`${user.firstName} ${user.lastName}`}</TableCell>

                <TableCell align="left">{user.email}</TableCell>

                <TableCell align="left">{`${new Date(
                  user.registerDate
                ).toLocaleDateString("en-GB", {
                  timeZone: "UTC",
                })} `}</TableCell>

                <TableCell align="left">
                  {user.isAdmin ? "Admin" : "Employee"}
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
