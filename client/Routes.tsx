import React, { useEffect } from "react";
import { useRouter } from "next/router";

import { useSelector } from "react-redux";
import { selectAuthState } from "./redux/slices/authSlice";
import storage from "./utils/localStorage";

const Routes = (props: React.FC) => {
  const { user } = useSelector(selectAuthState);
  const router = useRouter();

  const isLoggedIn = storage.loadUser() || user;

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/signin");
    }
  }, [isLoggedIn]);

  if (!user) {
    return <p>Loading...</p>;
  }

  return <p>Jadå</p>;
};
