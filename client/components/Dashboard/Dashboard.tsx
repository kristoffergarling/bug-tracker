import React from "react";
import useAuthCheck from "../../hooks/useAuthCheck";

import { Box, Toolbar } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

import LoadingSkeleton from "../../components/UI/LoadingSkeleton";
import Header from "../../components/Dashboard/Header";
import Sidebar from "../../components/Dashboard/Sidebar";

const drawerWidth = 210;

interface DashboardProps {
  title: string;
  children: React.ReactNode;
}

const Dashboard: React.FC<DashboardProps> = ({ title, children }) => {
  const user = useAuthCheck();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  if (!user) {
    return <LoadingSkeleton />;
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <Header
        title={title}
        drawerWidth={drawerWidth}
        handleDrawerToggle={handleDrawerToggle}
      />

      <Sidebar
        drawerWidth={drawerWidth}
        handleDrawerToggle={handleDrawerToggle}
        mobileOpen={mobileOpen}
      />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default Dashboard;