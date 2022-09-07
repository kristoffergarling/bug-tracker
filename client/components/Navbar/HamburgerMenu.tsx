import React, { useState } from "react";
import Link from "next/link";

import { IconButton, Menu, MenuItem, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const HamburgerMenu: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: { xs: "block", sm: "none" } }}>
      <IconButton
        color="primary"
        id="menu-button"
        size="large"
        aria-label="menu"
        aria-controls={open ? "hamburger-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="hamburger-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "menu-button",
        }}
      >
        <Link href="signin">
          <MenuItem onClick={handleClose}>
            <LoginIcon sx={{ mr: 1 }} /> Log In
          </MenuItem>
        </Link>

        <Link href="signup">
          <MenuItem onClick={handleClose}>
            <PersonAddIcon sx={{ mr: 1 }} />
            Sign Up
          </MenuItem>
        </Link>
      </Menu>
    </Box>
  );
};
export default HamburgerMenu;
