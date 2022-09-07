import React from "react";

import Navbar from "../components/Navbar/Navbar";
import AuthForm from "../components/AuthForm/AuthForm";

const SignUp: React.FC = () => {
  return (
    <>
      <AuthForm type="signup" />
    </>
  );
};
export default SignUp;
