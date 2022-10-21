import React from "react";
import useAuthCheck from "../../hooks/useAuthCheck";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/authSlice";

import { Box, Toolbar } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

import LoadingScreen from "../../components/LoadingScreen";
import Header from "../../components/Dashboard/Header";
import Sidebar from "../../components/Dashboard/Sidebar";

const drawerWidth = 210;

interface DashboardProps {
  prevPage: string;
  href: string;
  children: React.ReactNode;
}

const Dashboard: React.FC<DashboardProps> = ({ href, prevPage, children }) => {
  const dispatch = useDispatch();
  const user = useAuthCheck();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  if (!user) {
    return <LoadingScreen />;
  }

  dispatch(setUser(user));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <Header
        prevPage={prevPage}
        href={href}
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
