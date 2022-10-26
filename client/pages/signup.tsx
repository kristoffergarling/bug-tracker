import { useDispatch, useSelector } from "react-redux";
import {
  signUp,
  clearAuthError,
  setAuthError,
  selectAuthState,
} from "../redux/slices/authSlice";

import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/router";
import useAuthCheck from "../hooks/useAuthCheck";

import { Alert, AlertTitle } from "@mui/material";
import { AuthFormContainer, NameInputBox } from "../styles/customStyles";

import HeadTag from "../components/HeadTag";
import LoadingScreen from "../components/LoadingScreen";
import Navbar from "../components/Auth/Navbar/Navbar";
import AuthHeader from "../components/Auth/AuthHeader";
import NameInput from "../components/Auth/NameInput";
import EmailInput from "../components/Auth/EmailInput";
import PasswordInput from "../components/Auth/PasswordInput";
import SubmitButton from "../components/Auth/SubmitButton";
import WrongPage from "../components/Auth/WrongPage";

interface InputValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

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
    .required("Confirm Password is required")
    .min(6, "Must be at least 6 characters")
    .max(30, "Must be at most 30 characters"),
});

const SignUp: React.FC = () => {
  const user = useAuthCheck();
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading, error } = useSelector(selectAuthState);

  const methods = useForm<InputValues>({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
  });

  const submitHandler: SubmitHandler<InputValues> = (data: InputValues) => {
    if (data.password !== data.confirmPassword) {
      return dispatch(setAuthError("Both passwords need to match"));
    }
    dispatch(signUp(data, router));
  };

  if (user) {
    router.push("/");
    return <LoadingScreen />;
  }

  return (
    <>
      <HeadTag title="Sign Up | Bug Tracker by K. Garling" />
      <Navbar />
      <AuthFormContainer sx={{ marginTop: { xs: 5, md: 10 } }} maxWidth="xs">
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

            <SubmitButton label="SIGN UP" loading={loading} />
          </form>
        </FormProvider>

        <WrongPage type="signup" />

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
      </AuthFormContainer>
    </>
  );
};
export default SignUp;
