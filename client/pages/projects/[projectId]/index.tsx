import { useState, useEffect } from "react";
import { NextPage, NextPageContext } from "next";
import { useSelector, useDispatch } from "react-redux";
import {
  selectProjectById,
  fetchProjects,
} from "../../../redux/slices/projectsSlice";
import {
  fetchBugsByProjectId,
  selectBugsByProjectId,
} from "../../../redux/slices/bugsSlice";
import { RootState } from "../../../redux/store";
import getBreakpoints from "../../../utils/getBreakpoints";

import HeadTag from "../../../components/HeadTag";
import Dashboard from "../../../components/Dashboard/Dashboard";
import ProjectHeader from "../../../components/Projects/Project/ProjectHeader";
import ProjectBugsDesktop from "../../../components/Projects/Project/ProjectBugsDesktop";
import ProjectBugsMobile from "../../../components/Projects/Project/ProjectBugsMobile";
import LoadingSkeleton from "../../../components/UI/LoadingSkeleton";

interface ProjectProps {
  projectId: string;
}

const Project: NextPage<ProjectProps> = ({ projectId }) => {
  const { md } = getBreakpoints();
  const dispatch = useDispatch();
  const [openAddBugModal, setOpenAddBugModal] = useState(false);

  const project = useSelector((state: RootState) =>
    selectProjectById(state, projectId)
  );

  const bugs = useSelector((state: RootState) =>
    selectBugsByProjectId(state, projectId)
  );

  useEffect(() => {
    dispatch(fetchProjects());
    dispatch(fetchBugsByProjectId(projectId));
    dispatch(fetchBugsByProjectId(projectId));
    dispatch(fetchBugsByProjectId(projectId));
  }, [openAddBugModal]);

  return (
    <Dashboard prevPage="Home" href="/">
      {!project ? (
        <LoadingSkeleton />
      ) : (
        <>
          <HeadTag title={`${project.title} | Bug Tracker by K. Garling`} />
          <ProjectHeader project={project} />
          {!md ? (
            <ProjectBugsDesktop
              bugs={bugs}
              openModal={openAddBugModal}
              setOpenModal={setOpenAddBugModal}
            />
          ) : (
            <ProjectBugsMobile
              bugs={bugs}
              openModal={openAddBugModal}
              setOpenModal={setOpenAddBugModal}
            />
          )}
        </>
      )}
    </Dashboard>
  );
};

Project.getInitialProps = async (ctx: NextPageContext) => {
  const { query } = ctx;
  const { projectId } = query as { projectId: string };
  return { projectId };
};

export default Project;
