import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import {
  selectProjectById,
  fetchProjects,
} from "../../redux/slices/projectsSlice";
import { fetchBugsByProjectId } from "../../redux/slices/bugsSlice";
import { BugState } from "../../redux/types";
import { RootState } from "../../redux/store";
import getBreakpoints from "../../utils/getBreakpoints";

import Dashboard from "../../components/Dashboard/Dashboard";
import ProjectHeader from "../../components/Projects/Project/ProjectHeader";
import ProjectBugsDesktop from "../../components/Projects/Project/ProjectBugsDesktop";
import ProjectBugsMobile from "../../components/Projects/Project/ProjectBugsMobile";
import ErrorPage from "../../components/ErrorPage";

const Project: React.FC = () => {
  const dispatch = useDispatch();
  const { md } = getBreakpoints();
  const router = useRouter();
  const { projectId } = router.query as { projectId: string };
  const project = useSelector((state: RootState) =>
    selectProjectById(state, projectId)
  );
  const [bugs, setBugs] = useState([] as any);

  useEffect(() => {
    dispatch(fetchProjects());

    setBugs(dispatch(fetchBugsByProjectId(projectId)));
  }, []);

  return (
    <Dashboard title="Project">
      {project ? (
        <>
          <ProjectHeader
            title={project.title}
            description={project.description}
            createdBy={project.createdBy}
            createdAt={`${new Date(project.createdAt).toLocaleDateString(
              "en-GB",
              { timeZone: "UTC" }
            )} `}
          />
          {!md ? (
            <ProjectBugsDesktop bugs={bugs} />
          ) : (
            <ProjectBugsMobile bugs={bugs} />
          )}
        </>
      ) : (
        <ErrorPage />
      )}
    </Dashboard>
  );
};

export default Project;
