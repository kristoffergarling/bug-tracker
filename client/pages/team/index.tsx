import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, selectUsersState } from "../../redux/slices/usersSlice";
import storage from "../../utils/localStorage";
import getBreakpoints from "../../utils/getBreakpoints";

import Dashboard from "../../components/Dashboard/Dashboard";
import TeamDesktop from "../../components/Team/TeamDesktop";
import TeamMobile from "../../components/Team/TeamMobile";

const Index: React.FC = () => {
  const dispatch = useDispatch();
  const { result } = storage.loadUser();
  const { users } = useSelector(selectUsersState);
  const { md } = getBreakpoints();

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  return (
    <Dashboard title="Team">
      {md ? (
        <TeamMobile users={users} user={result} />
      ) : (
        <TeamDesktop users={users} user={result} />
      )}
    </Dashboard>
  );
};

export default Index;
