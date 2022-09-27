import React from "react";
import { Box, Typography, Modal, Button, TextField } from "@mui/material";
import {
  useForm,
  SubmitHandler,
  FormProvider,
  useFormContext,
  Controller,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const style = {
  position: "absolute" as "absolute",
  top: "25%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #395B64",
  boxShadow: 24,
  p: 4,
};

interface InputValues {
  title: string;
  description: string;
}

interface NewProjectModalProps {
  open: boolean;
  handleModalClick: () => void;
}

const validationSchema = yup.object().shape({
  title: yup
    .string()
    .required("Project Name is required")
    .min(3, "Must be at least 3 characters")
    .max(30, "Must be at most 30 characters"),
  description: yup.string().required("Project Description is required"),
});

const NewProjectModal: React.FC<NewProjectModalProps> = ({
  open,
  handleModalClick,
}) => {
  const methods = useForm<InputValues>({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const {
    control,
    formState: { errors },
  } = useFormContext();

  const submitHandler: SubmitHandler<InputValues> = (data: InputValues) => {
    console.log(data);
  };

  return (
    <Modal
      open={open}
      onClose={handleModalClick}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(submitHandler)}>
            <Typography variant="h6">Create a new project</Typography>

            <Controller
              name="title"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  error={errors.title ? true : false}
                  label="Project Name"
                  helperText={errors.title?.message}
                  id="title"
                  fullWidth
                />
              )}
            />

            <Button variant="contained" type="submit">
              Submit
            </Button>
          </form>
        </FormProvider>
      </Box>
    </Modal>
  );
};

export default NewProjectModal;
