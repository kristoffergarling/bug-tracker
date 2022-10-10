import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteProject } from "../../redux/slices/projectsSlice";
import { ProjectState } from "../../redux/types";
import {
  selectProjectsState,
  fetchProjects,
} from "../../redux/slices/projectsSlice";
import Link from "next/link";
import { formatDateTime } from "../../utils/helperFunctions";

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
  IconButton,
} from "@mui/material";
import PostAddIcon from "@mui/icons-material/PostAdd";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import getBreakpoints from "../../utils/getBreakpoints";
import Dashboard from "../../components/Dashboard/Dashboard";
import ProjectsTableDesktop from "../../components/Projects/ProjectsTableDesktop";
import ProjectsTableMobile from "../../components/Projects/ProjectsTableMobile";

const Index: React.FC = () => {
  const { md } = getBreakpoints();
  const dispatch = useDispatch();
  const { projects } = useSelector(selectProjectsState);

  const [openModal, setOpenModal] = useState(false);
  const handleModalClick = () => {
    setOpenModal(!openModal);
  };

  useEffect(() => {
    dispatch(fetchProjects());
  }, [openModal]);

  return (
    <Dashboard title="Projects">
      {md ? (
        <ProjectsTableMobile
          projects={projects}
          handleModalClick={handleModalClick}
          openModal={openModal}
        />
      ) : (
        <ProjectsTableDesktop
          projects={projects}
          handleModalClick={handleModalClick}
          openModal={openModal}
        />
      )}
    </Dashboard>
  );
};

export default Index;
