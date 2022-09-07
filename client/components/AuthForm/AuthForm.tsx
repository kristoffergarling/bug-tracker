import React from "react";
import {
  Container,
  Typography,
  Button,
  Alert,
  AlertTitle,
  Link,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import NextLink from "next/link";

import { CenteredFlexBox } from "../../styles/customStyles";

import AuthHeader from "./AuthHeader";
import UsernameInput from "./UsernameInput";
import PasswordInput from "./PasswordInput";

interface AuthFormProps {
  type: string;
}

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  return (
    <Container
      sx={{
        borderRadius: "5px",
        backgroundColor: "white",
        boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.2)",
        paddingBottom: "25px",
        marginTop: { xs: "auto", md: 10 },
      }}
      maxWidth="xs"
    >
      <AuthHeader titles={["LOGO", "The Logo is going to be here"]} />
      <form>
        <CenteredFlexBox>
          <UsernameInput />
        </CenteredFlexBox>

        <CenteredFlexBox>
          <PasswordInput label="Password" />
        </CenteredFlexBox>

        {type === "signup" && (
          <CenteredFlexBox>
            <PasswordInput label="Confirm Password" />
          </CenteredFlexBox>
        )}

        <CenteredFlexBox>
          <Button
            startIcon={type === "signin" ? <LoginIcon /> : <PersonAddIcon />}
            size="large"
            fullWidth
            variant="contained"
            color="primary"
          >
            {type === "signin" ? "LOG IN" : "SIGN UP"}
          </Button>
        </CenteredFlexBox>
      </form>

      <CenteredFlexBox>
        <Typography variant="subtitle1" component="p">
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          {type === "signin"
            ? "Don't have an account?"
            : "Already have an account?"}{" "}
          <strong>
            <NextLink href={type === "signin" ? "/signup" : "signin"}>
              <Link sx={{ cursor: "pointer", textDecoration: "none" }}>
                {type === "signin" ? "Sign Up" : "Log In"}
              </Link>
            </NextLink>
          </strong>
        </Typography>
      </CenteredFlexBox>

      {type === "signin" && (
        <Alert severity="info">
          <AlertTitle>
            <strong>Demo Account Credentials</strong>
          </AlertTitle>
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          Username: "username" & Password: "password"
        </Alert>
      )}
    </Container>
  );
};
export default AuthForm;
