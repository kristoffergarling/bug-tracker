import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { CenteredFlexBox } from "../../styles/customStyles";

interface LoadingSkeletonProps {
  loadingScreen?: boolean;
}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ loadingScreen }) => {
  return (
    <CenteredFlexBox sx={loadingScreen ? { mt: 20 } : { mt: 5, mb: 5 }}>
      <CircularProgress color="primary" />
    </CenteredFlexBox>
  );
};
export default LoadingSkeleton;
