import { useState, useEffect } from "react";
import {
  Box,
  FormControl,
  OutlinedInput,
  InputLabel,
  MenuItem,
  Chip,
  Select,
  Dialog,
  DialogTitle,
  Divider,
  DialogActions,
  Button,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import {
  selectProjectById,
  addProjectContributor,
} from "../../../../redux/slices/projectsSlice";

import { useSelector, useDispatch } from "react-redux";
import {
  selectUsersState,
  fetchUsers,
} from "../../../../redux/slices/usersSlice";
import { User } from "../../../../redux/types";
import { RootState } from "../../../../redux/store";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface AddContributorsDialogProps {
  projectId: string;
  open: boolean;
  handleClose: () => void;
}

const AddContributorsDialog: React.FC<AddContributorsDialogProps> = ({
  projectId,
  open,
  handleClose,
}) => {
  const dispatch = useDispatch();
  const userData = useSelector(selectUsersState);
  const existingContributors = useSelector(
    (state: RootState) => selectProjectById(state, projectId)?.contributors
  );

  const [potentialContributors, setPotentialContributors] = useState<User[]>(
    []
  );

  const getPotentialContributors = () => {
    return userData.users.filter((user) => {
      return !existingContributors?.some((contributor) => {
        return contributor.includes(user._id);
      });
    });
  };

  const [contributors, setContributors] = useState<string[] | undefined>(
    existingContributors
  );

  const handleChange = (event: SelectChangeEvent<typeof contributors>) => {
    const {
      target: { value },
    } = event;

    // On autofill we get a stringified value.
    setContributors(typeof value === "string" ? value.split(",") : value);
  };

  const addProjectContributors = () => {
    if (contributors) {
      dispatch(addProjectContributor(projectId, contributors));
    }
  };

  useEffect(() => {
    dispatch(fetchUsers());
    setPotentialContributors(getPotentialContributors());
  }, [contributors]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        <strong>Add Contributors</strong>
      </DialogTitle>
      <Divider />

      <div>
        <FormControl sx={{ m: 1, mt: 2, width: 300 }}>
          <InputLabel id="add-contributors">Select Contributors</InputLabel>
          <Select
            labelId="add-contributors"
            id="addcontributors"
            multiple
            label="Select Contributors"
            value={contributors}
            onChange={handleChange}
            input={
              <OutlinedInput
                id="select-multiple-chip"
                label="Select Contributors"
              />
            }
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip
                    sx={{ backgroundColor: "#E7F6F2" }}
                    key={JSON.parse(value)._id}
                    label={JSON.parse(value).fullName}
                  />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {potentialContributors.map((user) => (
              <MenuItem
                key={user._id}
                value={JSON.stringify({
                  id: user._id,
                  fullName: `${user.firstName} ${user.lastName}`,
                  email: user.email,
                })}
              >
                {`${user.firstName} ${user.lastName}`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <DialogActions>
        <Button variant="outlined" autoFocus onClick={handleClose}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            addProjectContributors();
            handleClose();
          }}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddContributorsDialog;
