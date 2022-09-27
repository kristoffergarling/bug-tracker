import React from "react";
import { signOut } from "../../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import storage from "../../utils/localStorage";

import {
  Avatar,
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  ListItemButton,
  Button,
} from "@mui/material";
import { CenteredFlexBox } from "../../styles/customStyles";

import PestControlIcon from "@mui/icons-material/PestControl";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentIcon from "@mui/icons-material/Assignment";
import LogoutIcon from "@mui/icons-material/Logout";

interface SidebarProps {
  drawerWidth: number;
  handleDrawerToggle: () => void;
  mobileOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({
  drawerWidth,
  handleDrawerToggle,
  mobileOpen,
}) => {
  const dispatch = useDispatch();
  const { firstName, lastName } = storage.loadUser().result;

  const drawer = (
    <div>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <PestControlIcon color="primary" sx={{ fontSize: 50 }} />
      </Toolbar>

      <Divider />

      <CenteredFlexBox
        sx={{
          marginTop: 2,
          marginBottom: 2,
          backgroundColor: "grey",
        }}
      >
        <Avatar sx={{ backgroundColor: "#395B64", marginBottom: 0.5 }}>
          {firstName.charAt(0)}
        </Avatar>
        <Typography variant="subtitle1">{`${firstName} ${lastName}`}</Typography>
      </CenteredFlexBox>

      <Divider />

      <List>
        {["Dashboard", "Projects", "Create Bug"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <DashboardIcon /> : <AssignmentIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider />

      <CenteredFlexBox sx={{ marginTop: 2 }}>
        <Button
          variant="contained"
          color="error"
          size="small"
          startIcon={<LogoutIcon />}
          onClick={() => {
            dispatch(signOut());
          }}
        >
          LOG OUT
        </Button>
      </CenteredFlexBox>
    </div>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
};
export default Sidebar;