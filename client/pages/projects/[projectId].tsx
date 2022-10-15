import { useState, useEffect } from "react";
import { NextPage, NextPageContext } from "next";
import { useSelector, useDispatch } from "react-redux";
import {
  selectProjectById,
  fetchProjects,
} from "../../redux/slices/projectsSlice";
import { ProjectState } from "../../redux/types";
import {
  fetchBugsByProjectId,
  selectBugsByProjectId,
} from "../../redux/slices/bugsSlice";
import { RootState } from "../../redux/store";
import getBreakpoints from "../../utils/getBreakpoints";
import { formatDateTime } from "../../utils/helperFunctions";

import Dashboard from "../../components/Dashboard/Dashboard";
import ProjectHeader from "../../components/Projects/Project/ProjectHeader";
import ProjectBugsDesktop from "../../components/Projects/Project/ProjectBugsDesktop";
import ProjectBugsMobile from "../../components/Projects/Project/ProjectBugsMobile";
import LoadingSkeleton from "../../components/UI/LoadingSkeleton";

interface ProjectProps {
  projectId: string;
}

const Project: NextPage<ProjectProps> = ({ projectId }) => {
  const { md } = getBreakpoints();
  const dispatch = useDispatch();

  const project = useSelector((state: RootState) =>
    selectProjectById(state, projectId)
  );

  const bugs = useSelector((state: RootState) =>
    selectBugsByProjectId(state, projectId)
  );

  useEffect(() => {
    dispatch(fetchProjects());
    dispatch(fetchBugsByProjectId(projectId));
  }, []);

  return (
    <Dashboard title="Project">
      {!project ? (
        <LoadingSkeleton />
      ) : (
        <>
          <ProjectHeader
            projectId={projectId}
            title={project.title}
            description={project.description}
            contributors={project.contributors}
            createdBy={project.createdBy}
            createdAt={formatDateTime(project.createdAt)}
          />
          {!md ? (
            <ProjectBugsDesktop bugs={bugs} />
          ) : (
            <ProjectBugsMobile bugs={bugs} />
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
