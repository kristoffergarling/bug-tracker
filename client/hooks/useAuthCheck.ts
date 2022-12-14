import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, selectAuthState } from "../redux/slices/authSlice";
import { useRouter } from "next/router";
import storage from "../utils/localStorage";

export default function useAuthCheck() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useSelector(selectAuthState);

  useEffect(() => {
    if (!user || !user.firstName) {
      const isLoggedIn = storage.loadUser();
      if (!isLoggedIn) {
        if (router.pathname === "/signup") {
          return;
        }
        router.push("/signin");
        return;
      }

      dispatch(setUser(isLoggedIn.result));
    }
  }, [user]);

  return user;
}
