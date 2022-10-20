import { Grid, Box, Typography, List } from "@mui/material";
import AddContributorsDialog from "./AddContributorsDialog";
import DeleteContributor from "./DeleteContributor";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthState } from "../../../../redux/slices/authSlice";

interface ContributorListProps {
  projectId: string;
  contributors: string[];
}

const ContributorList: React.FC<ContributorListProps> = ({
  projectId,
  contributors,
}) => {
  const user = useSelector(selectAuthState).user;
  return (
    <Grid>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" component="div">
          <strong>Contributors:</strong>
        </Typography>
        <AddContributorsDialog projectId={projectId} />
      </Box>
      <Box>
        <List>
          {contributors.map((contributor) => (
            <DeleteContributor
              userIsAdmin={user?.isAdmin}
              projectId={projectId}
              contributors={contributors}
              contributor={contributor}
            />
          ))}
        </List>
      </Box>
    </Grid>
  );
};

export default ContributorList;
