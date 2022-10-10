import { Box, Button, Avatar } from "@mui/material";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { deleteProject } from "../../../redux/slices/projectsSlice";
import getBreakpoints from "../../../utils/getBreakpoints";
import { ColouredAvatar } from "../../../styles/customStyles";

import GroupIcon from "@mui/icons-material/Group";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import DeleteIcon from "@mui/icons-material/Delete";

const ButtonGroup: React.FC = () => {
  const { md } = getBreakpoints();
  const dispatch = useDispatch();
  const router = useRouter();
  const { projectId } = router.query;

  const deleteProjectHandler = () => {
    dispatch(deleteProject(projectId, router));
  };

  return (
    <>
      {!md ? (
        <Box sx={{ marginTop: 2 }}>
          <Button
            sx={{ marginRight: 1, marginBottom: 1, fontSize: 13 }}
            variant="outlined"
            color="primary"
            startIcon={<GroupIcon />}
          >
            View Contributors
          </Button>
          <Button
            sx={{ marginRight: 1, marginBottom: 1, fontSize: 13 }}
            variant="contained"
            color="primary"
            startIcon={<GroupAddIcon />}
          >
            Add Contributor
          </Button>
          <Button
            sx={{ marginRight: 1, marginBottom: 1, fontSize: 13 }}
            variant="contained"
            color="primary"
            startIcon={<DeleteIcon />}
            onClick={deleteProjectHandler}
          >
            Delete Project
          </Button>
        </Box>
      ) : (
        <Box sx={{ marginTop: 2, display: "flex" }}>
          <ColouredAvatar
            sx={{
              marginRight: 1,
            }}
            color="primary"
          >
            <GroupIcon />
          </ColouredAvatar>
          <ColouredAvatar
            sx={{
              marginRight: 1,
            }}
          >
            <GroupAddIcon />
          </ColouredAvatar>
          <ColouredAvatar
            sx={{
              marginRight: 1,
            }}
          >
            <DeleteIcon />
          </ColouredAvatar>
        </Box>
      )}
    </>
  );
};
export default ButtonGroup;
