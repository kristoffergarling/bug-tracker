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
          {users.map((u) => (
            <TableRow key={u._id}>
              <TableCell colSpan={2} align="left">
                <Typography variant="h6" sx={{ display: "flex" }}>
                  <strong>{`${u.firstName} ${u.lastName}`}</strong>
                </Typography>

                <Typography variant="subtitle1" sx={{ display: "flex" }}>
                  <strong>Registered At: </strong>{" "}
                  <Typography sx={{ marginLeft: 1 }} variant="subtitle1">
                    {`${new Date(u.registerDate).toLocaleDateString("en-GB", {
                      timeZone: "UTC",
                    })} `}
                  </Typography>
                </Typography>

                <Typography variant="subtitle1" sx={{ display: "flex" }}>
                  <strong>Email: </strong>{" "}
                  <Typography sx={{ marginLeft: 1 }} variant="subtitle1">
                    {u.email}
                  </Typography>
                </Typography>

                <Typography variant="subtitle1" sx={{ display: "flex" }}>
                  <strong>Role: </strong>{" "}
                  <Typography sx={{ marginLeft: 1 }} variant="subtitle1">
                    {u.isAdmin ? "Admin" : "User"}
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
