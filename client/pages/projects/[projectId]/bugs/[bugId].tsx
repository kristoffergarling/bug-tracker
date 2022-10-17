import { NextPage, NextPageContext } from "next";

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
import getBreakpoints from "../../../../utils/getBreakpoints";
import Dashboard from "../../../../components/Dashboard/Dashboard";

interface BugProps {
  bugId: string;
}

const Bug: NextPage<BugProps> = ({ bugId }) => {
  console.log(bugId);
  return (
    <Dashboard title="Bugs">
      <Box sx={{ display: { xs: "auto", md: "flex" } }}>
        <TableContainer component={Paper} sx={{ maxHeight: 300 }}>
          <Table sx={{ minWidth: 250 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="h4" component="h2">
                    <strong>asdasd</strong>
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="subtitle1" component="p">
                    <strong>Created At: </strong>
                    asd
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row" colSpan={2}>
                  <Typography variant="subtitle1" component="p">
                    <strong>Created by: </strong>
                    asdasd
                  </Typography>
                  <Typography variant="subtitle1" component="p">
                    <strong>Description: </strong>
                    asdsad
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
            maxHeight: 300,
          }}
          component={Paper}
        >
          <TableContainer component={Paper} sx={{ maxHeight: 300 }}>
            <Table sx={{ minWidth: 300 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography variant="h6" component="h3">
                      <strong>Comments</strong>
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography variant="subtitle1" component="p">
                      <strong>FirstName LastName: </strong> This is a great bug!
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Dashboard>
  );
};

Bug.getInitialProps = async (ctx: NextPageContext) => {
  const { query } = ctx;
  const { bugId } = query as { bugId: string };
  return { bugId };
};

export default Bug;
