import Link from "next/link";

import { Toolbar, AppBar, IconButton, Button, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface HeaderProps {
  prevPage: string;
  href: string;
  drawerWidth: number;
  handleDrawerToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({
  drawerWidth,
  handleDrawerToggle,
  prevPage,
  href,
}) => {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        {prevPage !== "Dashboard" ? (
          <Link href={href}>
            <Button
              startIcon={<ArrowBackIcon />}
              sx={{ color: "white", fontSize: 15 }}
              variant="outlined"
            >
              {prevPage}
            </Button>
          </Link>
        ) : (
          <Typography variant="h6" component="h3">
            Home
          </Typography>
        )}
      </Toolbar>
    </AppBar>
  );
};
export default Header;
