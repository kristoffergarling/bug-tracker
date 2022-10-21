import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, selectUsersState } from "../../redux/slices/usersSlice";
import storage from "../../utils/localStorage";
import getBreakpoints from "../../utils/getBreakpoints";
import { User } from "../../redux/types";

import Dashboard from "../../components/Dashboard/Dashboard";
import TeamDesktop from "../../components/Team/TeamDesktop";
import TeamMobile from "../../components/Team/TeamMobile";
import LoadingSkeleton from "../../components/UI/LoadingSkeleton";

const Index: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const dispatch = useDispatch();
  const { users } = useSelector(selectUsersState);
  const { md } = getBreakpoints();

  useEffect(() => {
    dispatch(fetchUsers());
    const { result } = storage.loadUser();
    setUser(result as User);
  }, []);

  return (
    <Dashboard prevPage="Home" href="/">
      {!user ? (
        <LoadingSkeleton />
      ) : md ? (
        <TeamMobile users={users} user={user} />
      ) : (
        <TeamDesktop users={users} user={user} />
      )}
    </Dashboard>
  );
};

export default Index;
