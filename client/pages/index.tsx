import Head from "next/head";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectProjectsState,
  fetchProjects,
} from "../redux/slices/projectsSlice";

import getBreakpoints from "../utils/getBreakpoints";
import Dashboard from "../components/Dashboard/Dashboard";
import ProjectsTableDesktop from "../components/Projects/ProjectsTableDesktop";
import ProjectsTableMobile from "../components/Projects/ProjectsTableMobile";

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
    <Dashboard prevPage="Dashboard" href="">
      <Head>
        <title>Projects | Bug Tracker by K. Garling</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
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
