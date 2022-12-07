import React from "react";
import { Button } from "@mui/material";
import { CenteredFlexBox } from "../../styles/customStyles";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CircularProgress from "@mui/material/CircularProgress";

interface SubmitButtonProps {
  label: string;
  loading: boolean | undefined;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ label, loading }) => {
  return (
    <CenteredFlexBox sx={{ marginTop: "25px" }}>
      <Button
        startIcon={
          loading ? "" : label === "SIGN UP" ? <PersonAddIcon /> : <LoginIcon />
        }
        size="large"
        fullWidth
        variant="contained"
        color="primary"
        type="submit"
        disabled={loading}
      >
        {loading ? <CircularProgress color="inherit" size={30} /> : label}
      </Button>
    </CenteredFlexBox>
  );
};
export default SubmitButton;
