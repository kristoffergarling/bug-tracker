import React from "react";

import { InputAdornment } from "@mui/material";
import { StyledTextField } from "../../styles/customStyles";

import { useFormContext, Controller } from "react-hook-form";

import LockIcon from "@mui/icons-material/Lock";
import EnhancedEncryptionIcon from "@mui/icons-material/EnhancedEncryption";

interface PasswordInputProps {
  label: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ label }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const errorMessage =
    label === "password"
      ? errors.password
        ? (errors.password?.message as string)
        : ("" as string)
      : errors.confirmPassword
      ? (errors.confirmPassword?.message as string)
      : ("" as string);

  return (
    <Controller
      name={label}
      control={control}
      defaultValue=""
      render={({ field }) => (
        <StyledTextField
          {...field}
          error={
            label === "password"
              ? errors.password
                ? true
                : false
              : errors.confirmPassword
              ? true
              : false
          }
          helperText={errorMessage}
          type="password"
          id={label}
          label={label === "password" ? "Password" : "Confirm Password"}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                {label === "password" ? (
                  <LockIcon color="primary" />
                ) : (
                  <EnhancedEncryptionIcon color="primary" />
                )}
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  );
};
export default PasswordInput;
