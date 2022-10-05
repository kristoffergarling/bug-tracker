import { Box, Button } from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import DeleteIcon from "@mui/icons-material/Delete";

const ButtonGroup: React.FC = () => {
  return (
    <Box sx={{ marginTop: 2 }}>
      <Button
        sx={{ marginRight: 1, marginBottom: 1 }}
        variant="outlined"
        color="primary"
        startIcon={<GroupIcon />}
      >
        View Contributors
      </Button>
      <Button
        sx={{ marginRight: 1, marginBottom: 1 }}
        variant="contained"
        color="primary"
        startIcon={<GroupAddIcon />}
      >
        Add Contributor
      </Button>
      <Button
        sx={{ marginRight: 1, marginBottom: 1 }}
        variant="contained"
        color="primary"
        startIcon={<DeleteIcon />}
      >
        Delete Project
      </Button>
    </Box>
  );
};
export default ButtonGroup;
