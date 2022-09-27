import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { CenteredFlexBox } from "../../styles/customStyles";

const LoadingSkeleton: React.FC = () => {
  return (
    <CenteredFlexBox sx={{ marginTop: 30 }}>
      <CircularProgress color="primary" />
    </CenteredFlexBox>
  );
};
export default LoadingSkeleton;
