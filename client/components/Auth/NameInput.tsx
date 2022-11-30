import React from "react";

import { InputAdornment } from "@mui/material";
import { StyledNameTextField } from "../../styles/customStyles";

import { useFormContext, Controller } from "react-hook-form";

import PersonIcon from "@mui/icons-material/Person";

interface NameInputProps {
  label: string;
}

const NameInput: React.FC<NameInputProps> = ({ label }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const errorMessage =
    label === "firstName"
      ? errors.firstName
        ? (errors.firstName?.message as string)
        : ("" as string)
      : errors.lastName
      ? (errors.lastName?.message as string)
      : ("" as string);

  return (
    <Controller
      name={label}
      control={control}
      defaultValue=""
      render={({ field }) => (
        <StyledNameTextField
          {...field}
          error={
            label === "firstName"
              ? errors.firstName
                ? true
                : false
              : errors.lastName
              ? true
              : false
          }
          helperText={errorMessage}
          id={label}
          label={label === "firstName" ? "First Name" : "Last Name"}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon color="primary" />
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  );
};
export default NameInput;
