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

const TeamMobile: React.FC<TeamProps> = ({ users, user }) => {
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
          {users.map((user) => (
            <TableRow key={user._id}>
              <TableCell colSpan={2} align="left">
                <Typography variant="h6" sx={{ display: "flex" }}>
                  <strong>{`${user.firstName} ${user.lastName}`}</strong>
                  {user.isAdmin ? (
                    <ColouredAvatar
                      sx={{
                        backgroundColor: "grey !important",
                        ml: 2,
                        width: 30,
                        height: 30,
                      }}
                    >
                      <DeleteIcon />
                    </ColouredAvatar>
                  ) : (
                    <ColouredAvatar
                      sx={{
                        ml: 2,
                        width: 30,
                        height: 30,
                      }}
                    >
                      <DeleteIcon />
                    </ColouredAvatar>
                  )}
                </Typography>

                <Typography variant="subtitle1" sx={{ display: "flex" }}>
                  <strong>Registered At: </strong>{" "}
                  <Typography sx={{ marginLeft: 1 }} variant="subtitle1">
                    {`${new Date(user.registerDate).toLocaleDateString(
                      "en-GB",
                      {
                        timeZone: "UTC",
                      }
                    )} `}
                  </Typography>
                </Typography>

                <Typography variant="subtitle1" sx={{ display: "flex" }}>
                  <strong>Email: </strong>{" "}
                  <Typography sx={{ marginLeft: 1 }} variant="subtitle1">
                    {user.email}
                  </Typography>
                </Typography>

                <Typography variant="subtitle1" sx={{ display: "flex" }}>
                  <strong>Role: </strong>{" "}
                  <Typography sx={{ marginLeft: 1 }} variant="subtitle1">
                    {user.isAdmin ? "Admin" : "User"}
                  </Typography>
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TeamMobile;
