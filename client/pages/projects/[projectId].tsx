import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import {
  selectProjectById,
  fetchProjects,
} from "../../redux/slices/projectsSlice";
import { RootState } from "../../redux/store";

import Dashboard from "../../components/Dashboard/Dashboard";
import ProjectHeader from "../../components/Projects/Project/ProjectHeader";
import ProjectBugs from "../../components/Projects/Project/ProjectBugs";
import ErrorPage from "../../components/ErrorPage";

const Project: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { projectId } = router.query;
  const project = useSelector((state: RootState) =>
    selectProjectById(state, projectId)
  );

  useEffect(() => {
    dispatch(fetchProjects());
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
          <ProjectBugs />
        </>
      ) : (
        <ErrorPage />
      )}
    </Dashboard>
  );
};

export default Project;
