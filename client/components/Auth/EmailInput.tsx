import React from "react";

import { InputAdornment } from "@mui/material";
import { StyledTextField } from "../../styles/customStyles";

import { useFormContext, Controller } from "react-hook-form";

import EmailIcon from "@mui/icons-material/Email";

const EmailInput: React.FC = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const errorMessage = errors.email
    ? (errors.email?.message as string)
    : ("" as string);

  return (
    <Controller
      name="email"
      control={control}
      defaultValue=""
      render={({ field }) => (
        <StyledTextField
          {...field}
          error={errors.email ? true : false}
          helperText={errorMessage}
          id="email"
          label="Email"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon color="primary" />
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  );
};
export default EmailInput;
