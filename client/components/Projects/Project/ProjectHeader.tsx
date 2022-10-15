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
} from "@mui/material";
import ContributorList from "./ContributorList/ContributorList";

interface ProjectHeaderProps {
  projectId: string;
  title: string;
  description: string;
  contributors: string[];
  createdBy: string;
  createdAt: string;
}

const ProjectHeader: React.FC<ProjectHeaderProps> = ({
  projectId,
  title,
  description,
  contributors,
  createdBy,
  createdAt,
}) => {
  return (
    <Box sx={{ display: { xs: "auto", md: "flex" } }}>
      <TableContainer component={Paper} sx={{ maxHeight: 300 }}>
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
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Box
        sx={{
          ml: { xs: "auto", md: 2 },
          mt: { xs: 2, md: "auto" },
          width: "100%",
          maxWidth: { xs: "auto", md: 400, xl: "30%" },
          maxHeight: 300,
        }}
        component={Paper}
      >
        <TableContainer component={Paper} sx={{ maxHeight: 300 }}>
          <Table sx={{ minWidth: 300 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <ContributorList
                    projectId={projectId}
                    contributors={contributors}
                  />
                </TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};
export default ProjectHeader;
