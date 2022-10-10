import { styled } from "@mui/system";
import { Box, Container, TextField, Avatar } from "@mui/material";

export const CenteredFlexBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

export const AuthFormContainer = styled(Container)({
  backgroundColor: "white",
  borderRadius: "5px",
  boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.2)",
  paddingBottom: "25px",
});

export const StyledTextField = styled(TextField)({
  marginTop: "25px",
});

export const StyledNameTextField = styled(TextField)({
  width: "48%",
});

export const NameInputBox = styled(Box)({
  marginTop: "25px",
  display: "flex",
  justifyContent: "space-between",
});

export const ColouredAvatar = styled(Avatar)({
  backgroundColor: "#395B64",
  boxShadow: "rgba(0, 0, 0, 0.35) 0px 2.5px 7.5px",
});
