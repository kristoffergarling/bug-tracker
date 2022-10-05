import React, { useState, useEffect } from "react";
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

interface UsersName {
  id: string;
  firstName: string;
  lastName: string;
}

const SelectContributors: React.FC = () => {
  const dispatch = useDispatch();
  const userData = useSelector(selectUsersState);
  const user = storage.loadUser();
  const { firstName, lastName } = user.result;

  const [personName, setPersonName] = useState<string[]>([
    `${firstName} ${lastName}`,
  ]);
  const { control, setValue } = useFormContext();

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;

    // User can't remove themself from the list
    if (event.target.value[0] !== `${firstName} ${lastName}`) {
      return;
    }

    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  useEffect(() => {
    setValue("contributors", personName);
    dispatch(fetchUsers());
  }, [personName]);

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
            value={personName}
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
                    label={value}
                  />
                ))}
              </Box>
            )}
          >
            {userData.users.map((user: UsersName) => (
              <MenuItem
                key={user.id}
                value={`${user.firstName} ${user.lastName}`}
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
