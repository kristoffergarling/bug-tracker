import { useState, useEffect } from "react";
import {
  Box,
  OutlinedInput,
  InputLabel,
  MenuItem,
  FormControl,
  Chip,
  Select,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import { useFormContext, Controller } from "react-hook-form";
import storage from "../../../utils/localStorage";
import { useSelector, useDispatch } from "react-redux";
import { selectUsersState, fetchUsers } from "../../../redux/slices/usersSlice";

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

const SelectContributors: React.FC = () => {
  const dispatch = useDispatch();
  const userData = useSelector(selectUsersState);

  const user = storage.loadUser();
  const createdBy = JSON.stringify({
    _id: user.result._id,
    fullName: `${user.result.firstName} ${user.result.lastName}`,
    email: user.result.email,
  });

  const [contributors, setContributors] = useState<string[]>([createdBy]);
  const { control, setValue } = useFormContext();

  const handleChange = (event: SelectChangeEvent<typeof contributors>) => {
    const {
      target: { value },
    } = event;

    const lastIndex = value.length - 1;

    //Creators can't remove themself from the contributors list
    if (value[lastIndex].includes(user.result._id) && value.length > 1) {
      return;
    }

    // On autofill we get a stringified value.
    setContributors(typeof value === "string" ? value.split(",") : value);
  };

  useEffect(() => {
    setValue("contributors", contributors);
    dispatch(fetchUsers());
  }, [contributors]);

  return (
    <FormControl sx={{ width: "100%", marginTop: 3 }}>
      <InputLabel id="contributors">Select Contributors</InputLabel>
      <Controller
        name="contributors"
        control={control}
        render={({ ...otherOptions }) => (
          <Select
            labelId="contributors"
            id="selectcontributors"
            multiple
            label="Select Contributors"
            value={contributors}
            onChange={handleChange}
            MenuProps={MenuProps}
            {...otherOptions}
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
                    key={value}
                    label={JSON.parse(value).fullName}
                  />
                ))}
              </Box>
            )}
          >
            {userData.users.map((user) => (
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
        )}
      />
    </FormControl>
  );
};

export default SelectContributors;
