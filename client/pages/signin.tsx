import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  signIn,
  clearAuthError,
  selectAuthState,
} from "../redux/slices/authSlice";
import { useRouter } from "next/router";

import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useAuthCheck from "../hooks/useAuthCheck";

import { Alert, AlertTitle } from "@mui/material";
import { CenteredFlexBox, AuthFormContainer } from "../styles/customStyles";

import LoadingScreen from "../components/LoadingScreen";
import Navbar from "../components/Auth/Navbar/Navbar";
import AuthHeader from "../components/Auth/AuthHeader";
import EmailInput from "../components/Auth/EmailInput";
import PasswordInput from "../components/Auth/PasswordInput";
import WrongPage from "../components/Auth/WrongPage";
import SubmitButton from "../components/Auth/SubmitButton";

interface InputValues {
  email: string;
  password: string;
}

const validationSchema = yup.object({
  email: yup.string().email("Email is invalid").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const SignIn: React.FC = () => {
  const user = useAuthCheck();
  const router = useRouter();
  const dispatch = useDispatch();
  const { loading, error } = useSelector(selectAuthState);

  const methods = useForm<InputValues>({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
  });

  const submitHandler: SubmitHandler<InputValues> = ({
    email,
    password,
  }: InputValues) => {
    email = email.toLowerCase();
    dispatch(signIn({ email, password }, router));
  };

  if (user) {
    router.push("/");
    return <LoadingScreen />;
  }

  return (
    <>
      <Navbar />
      <AuthFormContainer sx={{ marginTop: { xs: 5, md: 10 } }} maxWidth="xs">
        <AuthHeader />

        <FormProvider {...methods}>
          <form
            style={{ margin: "auto 20px auto 20px" }}
            onSubmit={methods.handleSubmit(submitHandler)}
          >
            <EmailInput />
            <PasswordInput label="password" />
            <SubmitButton label="LOG IN" loading={loading} />
          </form>
        </FormProvider>

        <CenteredFlexBox>
          <WrongPage type="signin" />
        </CenteredFlexBox>

        {error && (
          <Alert
            sx={{ marginTop: "15px" }}
            severity="error"
            onClose={() => {
              dispatch(clearAuthError());
            }}
          >
            <AlertTitle>
              <strong>Error</strong>
            </AlertTitle>
            {error}
          </Alert>
        )}

        <Alert severity="info" sx={{ marginTop: "15px" }}>
          <AlertTitle>
            <strong>Demo Account Credentials</strong>
          </AlertTitle>
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          Email: "demo@example.com"
          <br />
          Password: "demo123"
        </Alert>
      </AuthFormContainer>
    </>
  );
};

export default SignIn;
