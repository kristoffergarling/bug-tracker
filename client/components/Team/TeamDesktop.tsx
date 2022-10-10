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
import { ColouredAvatar } from "../../styles/customStyles";
import DeleteIcon from "@mui/icons-material/Delete";

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

          {users.map((user) => (
            <TableRow
              key={user._id}
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
              <TableCell
                align="center"
                sx={{ display: "flex", justifyContent: "center" }}
              >
                {user.isAdmin ? (
                  <ColouredAvatar sx={{ backgroundColor: "grey !important" }}>
                    <DeleteIcon />
                  </ColouredAvatar>
                ) : (
                  <ColouredAvatar>
                    <DeleteIcon />
                  </ColouredAvatar>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TeamDesktop;
