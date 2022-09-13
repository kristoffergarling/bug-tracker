import React from "react";
import { AppBar, Toolbar, Button, Container, Stack } from "@mui/material";
import Link from "next/link";

import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

import Logo from "./Logo";
import HamburgerMenu from "./HamburgerMenu";

const Navbar: React.FC = () => {
  return (
    <Container sx={{ flexGrow: 1, padding: 0 }}>
      <AppBar position="static" sx={{ backgroundColor: "white" }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Logo />

          <Stack direction="row" spacing={1}>
            <Link href="/signin">
              <Button
                startIcon={<LoginIcon />}
                color="primary"
                sx={{
                  display: { xs: "none", sm: "flex" },
                  border: "1px solid #395B64",
                }}
              >
                Log In
              </Button>
            </Link>

            <Link href="/signup">
              <Button
                startIcon={<PersonAddIcon />}
                color="primary"
                sx={{
                  display: { xs: "none", sm: "flex" },
                  border: "1px solid #395B64",
                }}
              >
                Sign Up
              </Button>
            </Link>

            <HamburgerMenu />
          </Stack>
        </Toolbar>
      </AppBar>
    </Container>
  );
};
export default Navbar;
