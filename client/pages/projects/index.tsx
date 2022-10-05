import React from "react";
import Dashboard from "../../components/Dashboard/Dashboard";
import ProjectTable from "../../components/Projects/ProjectTable";

const Index: React.FC = () => {
  return (
    <Dashboard title="Projects">
      <ProjectTable />
    </Dashboard>
  );
};

export default Index;
