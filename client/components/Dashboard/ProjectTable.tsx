import React, { useState } from "react";

import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Button,
  Typography,
} from "@mui/material";
import PostAddIcon from "@mui/icons-material/PostAdd";

import NewProjectModal from "./NewProjectModal/NewProjectModal";

function createData(name: string, description: string, contributors: string[]) {
  return { name, description, contributors };
}

const rows = [
  createData(
    "Bug Tracker",
    "lorem ipsum och mera text som jag inte kan skriva kortkommando för",
    ["George", "John", "Paul", "Ringo"]
  ),
  createData(
    "Zombie Game",
    "lorem ipsum och mera text som jag inte kan skriva kortkommando för",
    ["George", "John", "Paul", "Ringo"]
  ),
  createData(
    "Call of Duty website",
    "lorem ipsum och mera text som jag inte kan skriva kortkommando för",
    ["George", "John", "Paul", "Ringo"]
  ),
  createData(
    "IKEA shit",
    "lorem ipsum och mera text som jag inte kan skriva kortkommando för",
    ["George", "John", "Paul", "Ringo"]
  ),
  createData(
    "Gingerbread store",
    "lorem ipsum och mera text som jag inte kan skriva kortkommando för",
    ["George", "John", "Paul", "Ringo"]
  ),
];

const ProjectTable: React.FC = () => {
  const [open, setOpen] = useState(false);
  const handleModalClick = () => {
    setOpen(!open);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 250 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="subtitle1" component="h6">
                <strong>Projects</strong>
              </Typography>
            </TableCell>
            <TableCell align="right" colSpan={2}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<PostAddIcon />}
                onClick={handleModalClick}
              >
                New Project
              </Button>
              <NewProjectModal
                open={open}
                handleModalClick={handleModalClick}
              />
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          <TableRow sx={{ backgroundColor: "#d4d8d8" }}>
            <TableCell>Project</TableCell>
            <TableCell align="left">Description</TableCell>
            <TableCell align="left">Contributors</TableCell>
          </TableRow>

          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="left">{row.description}</TableCell>
              <TableCell align="left">{row.contributors}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default ProjectTable;
