import React from "react";
import { Box, Typography } from "@mui/material";
import PestControlIcon from "@mui/icons-material/PestControl";

const Logo: React.FC = () => {
  return (
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
  );
};
export default Logo;
