import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { TextField } from "@mui/material";

interface InputControllerProps {
  label: string;
}

const InputController: React.FC<InputControllerProps> = ({ label }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      name={label}
      control={control}
      defaultValue=""
      render={({ field }) => (
        <TextField
          sx={{ marginTop: 3 }}
          {...field}
          error={
            label === "title"
              ? errors.title
                ? true
                : false
              : errors.description
              ? true
              : false
          }
          helperText={
            label === "title"
              ? errors.title
                ? errors.title.message
                : ""
              : errors.description
              ? errors.description.message
              : ""
          }
          id={label}
          label={label.charAt(0).toUpperCase() + label.slice(1)}
          fullWidth
          multiline
          rows={label === "description" ? 4 : 1}
        />
      )}
    />
  );
};
export default InputController;
