import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  Typography,
  TableBody,
} from "@mui/material";
import ButtonGroup from "./ButtonGroup";

interface ProjectHeaderProps {
  title: string;
  description: string;
  createdBy: string;
  createdAt: string;
}

const ProjectHeader: React.FC<ProjectHeaderProps> = ({
  title,
  description,
  createdBy,
  createdAt,
}) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 250 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="h4" component="h2">
                <strong>{title}</strong>
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="subtitle1" component="p">
                <strong>Created At: </strong>
                {createdAt}
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          <TableRow>
            <TableCell component="th" scope="row" colSpan={2}>
              <Typography variant="subtitle1" component="p">
                <strong>Created by: </strong>
                {createdBy}
              </Typography>
              <Typography variant="subtitle1" component="p">
                <strong>Description: </strong>
                {description}
              </Typography>
              <ButtonGroup />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default ProjectHeader;
