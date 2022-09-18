import React from "react";

import { Button, Alert, AlertTitle } from "@mui/material";

import { CenteredFlexBox, AuthFormContainer } from "../styles/customStyles";
import AuthHeader from "../components/Auth/AuthHeader";
import WrongPage from "../components/Auth/WrongPage";
import SubmitButton from "../components/Auth/SubmitButton";

const SignIn: React.FC = () => {
  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
  };

  const usernameChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    console.log(event.target.value);
  };

  return (
    <AuthFormContainer sx={{ marginTop: { xs: 5, md: 10 } }} maxWidth="xs">
      <AuthHeader />

      <form style={{ margin: "auto 20px auto 20px" }}>
        <SubmitButton label="LOG IN" />
      </form>

      <CenteredFlexBox>
        <WrongPage type="signin" />
      </CenteredFlexBox>

      <Alert severity="info">
        <AlertTitle>
          <strong>Demo Account Credentials</strong>
        </AlertTitle>
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        Username: "username" & Password: "password"
      </Alert>
    </AuthFormContainer>
  );
};
export default SignIn;
