import React from "react";
import { useDispatch } from "react-redux";

import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { AuthFormContainer, NameInputBox } from "../styles/customStyles";

import AuthHeader from "../components/Auth/AuthHeader";
import NameInput from "../components/Auth/NameInput";
import EmailInput from "../components/Auth/EmailInput";
import PasswordInput from "../components/Auth/PasswordInput";
import SubmitButton from "../components/Auth/SubmitButton";
import WrongPage from "../components/Auth/WrongPage";

const validationSchema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  email: yup.string().email("Email is invalid").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Must be at least 6 characters")
    .max(30, "Must be at most 30 characters"),
  confirmPassword: yup
    .string()
    .required("Password Confirmation is required")
    .min(6, "Must be at least 6 characters")
    .max(30, "Must be at most 30 characters"),
});

interface InputValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUp: React.FC = () => {
  const dispatch = useDispatch();

  const methods = useForm<InputValues>({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
  });

  const submitHandler: SubmitHandler<InputValues> = (data: InputValues) => {
    // dispatch(registerUser(data));
  };

  return (
    <AuthFormContainer sx={{ marginTop: { xs: 5, md: 15 } }} maxWidth="xs">
      <AuthHeader />
      <FormProvider {...methods}>
        <form
          style={{ margin: "auto 20px auto 20px" }}
          onSubmit={methods.handleSubmit(submitHandler)}
        >
          <NameInputBox>
            <NameInput label="firstName" />
            <NameInput label="lastName" />
          </NameInputBox>

          <EmailInput />

          <PasswordInput label="password" />
          <PasswordInput label="confirmPassword" />

          <SubmitButton label="SIGN UP" />
        </form>
      </FormProvider>

      <WrongPage type="signup" />
    </AuthFormContainer>
  );
};
export default SignUp;
