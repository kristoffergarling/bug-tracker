import React from "react";
import { Typography } from "@mui/material";
import { CenteredFlexBox } from "../../styles/customStyles";

import PestControlIcon from "@mui/icons-material/PestControl";

const AuthHeader: React.FC = () => {
  return (
    <CenteredFlexBox>
      <PestControlIcon sx={{ fontSize: 100, mt: 2 }} color="primary" />
    </CenteredFlexBox>
  );
};
export default AuthHeader;
