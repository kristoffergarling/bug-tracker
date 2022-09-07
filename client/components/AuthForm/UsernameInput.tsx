import React from "react";

import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";

const UsernameInput: React.FC = () => {
  return (
    <FormControl fullWidth>
      <InputLabel htmlFor="outlined-adornment-password">Username</InputLabel>
      <OutlinedInput
        id="username"
        required
        startAdornment={
          <InputAdornment position="start">
            <PersonIcon color="primary" />
          </InputAdornment>
        }
        label="Username"
      />
    </FormControl>
  );
};
export default UsernameInput;
