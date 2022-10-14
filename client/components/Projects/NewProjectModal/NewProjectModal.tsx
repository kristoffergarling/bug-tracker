import React from "react";
import { Box, Typography, Modal, Button, TextField } from "@mui/material";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { createProject } from "../../../redux/slices/projectsSlice";

import InputController from "../../InputController";
import SelectContributors from "./SelectContributors";

const style = {
  position: "absolute" as "absolute",
  top: "34%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: 400 },
  bgcolor: "background.paper",
  border: "2px solid #395B64",
  boxShadow: 24,
  p: 4,
};

interface InputValues {
  title: string;
  description: string;
  contributors: string[];
  createdBy: string;
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
  const dispatch = useDispatch();
  const methods = useForm<InputValues>({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
    defaultValues: {
      title: "",
      description: "",
      contributors: [],
      createdBy: "",
    },
  });

  const submitHandler: SubmitHandler<InputValues> = (data: InputValues) => {
    data.createdBy = JSON.parse(data.contributors[0]).fullName;
    dispatch(createProject(data));
    handleModalClick();
    methods.reset();
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
            <Typography variant="h6">
              <strong>Create New Project</strong>
            </Typography>

            <InputController label="title" />
            <InputController label="description" />
            <SelectContributors />

            <Button sx={{ marginTop: 3 }} variant="contained" type="submit">
              Submit
            </Button>
          </form>
        </FormProvider>
      </Box>
    </Modal>
  );
};

export default NewProjectModal;
