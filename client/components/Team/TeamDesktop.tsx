import { User } from "../../redux/types";
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
import AdminDeleteIcon from "./AdminDeleteIcon";

interface TeamProps {
  users: User[];
  user: User;
}

const TeamDesktop: React.FC<TeamProps> = ({ users, user }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 250 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="h5" component="h2">
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

            {user.isAdmin && (
              <TableCell align="center">
                <strong>Delete</strong>
              </TableCell>
            )}
          </TableRow>

          {users.map((u) => (
            <TableRow
              key={u._id}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
              }}
            >
              <TableCell align="left">{`${u.firstName} ${u.lastName}`}</TableCell>

              <TableCell align="left">{u.email}</TableCell>

              <TableCell align="left">{`${new Date(
                u.registerDate
              ).toLocaleDateString("en-GB", {
                timeZone: "UTC",
              })} `}</TableCell>

              <TableCell align="left">
                {u.isAdmin ? "Admin" : "Employee"}
              </TableCell>

              {user.isAdmin && (
                <TableCell
                  align="center"
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <AdminDeleteIcon
                    signedInUserIsAdmin={user.isAdmin}
                    userIsAdmin={u.isAdmin}
                  />
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TeamDesktop;
