import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
} from "@mui/material";

import PestControlIcon from "@mui/icons-material/PestControl";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

import HamburgerMenu from "./HamburgerMenu";

const Navbar: React.FC = () => {
  return (
    <Container sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "white" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex" }}>
            <PestControlIcon sx={{ mr: 1 }} fontSize="large" color="primary" />
            <Typography
              sx={{
                display: { xs: "none", sm: "block" },
                flexGrow: 1,
                alignSelf: "center",
              }}
              variant="h6"
              component="div"
              color="primary"
            >
              Bug Tracker
            </Typography>
          </Box>

          <Box sx={{ display: "flex" }}>
            <LoginIcon
              color="primary"
              sx={{ display: { xs: "none", sm: "block" }, alignSelf: "center" }}
            />
            <Button
              color="primary"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              Log In
            </Button>

            <PersonAddIcon
              color="primary"
              sx={{ display: { xs: "none", sm: "block" }, alignSelf: "center" }}
            />
            <Button
              color="primary"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              Sign Up
            </Button>
            <HamburgerMenu />
          </Box>
        </Toolbar>
      </AppBar>
    </Container>
  );
};
export default Navbar;
