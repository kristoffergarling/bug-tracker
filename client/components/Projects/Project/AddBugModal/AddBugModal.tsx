import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Modal,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { createBug } from "../../../../redux/slices/bugsSlice";
import { selectAuthState } from "../../../../redux/slices/authSlice";
import { BugPriority, BugPayload, User } from "../../../../redux/types";
import storage from "../../../../utils/localStorage";
import { firstLetterToUpperCase } from "../../../../utils/helperFunctions";

import InputController from "../../../InputController";

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

interface NewProjectModalProps {
  open: boolean;
  handleModalClick: () => void;
}

const getUser = () => {
  const { result } = storage.loadUser();
  return result as User;
};

const validationSchema = yup.object().shape({
  title: yup
    .string()
    .required("Bug Title is required")
    .min(3, "Must be at least 3 characters")
    .max(30, "Must be at most 30 characters"),
  description: yup
    .string()
    .required("Bug Description is required")
    .min(6, "Specify the bug in detail")
    .max(200, "Must be at most 200 characters"),
});

const NewProjectModal: React.FC<NewProjectModalProps> = ({
  open,
  handleModalClick,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { projectId } = router.query as { projectId: string };

  const [priority, setpriority] = useState<BugPriority>("low");
  const handleChange = (event: SelectChangeEvent) => {
    setpriority(event.target.value as BugPriority);
  };

  const methods = useForm<BugPayload>({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
    defaultValues: {
      title: "",
      description: "",
      priority: "low",
      createdBy: null,
    },
  });

  const submitHandler: SubmitHandler<BugPayload> = (data: BugPayload) => {
    data.createdBy = getUser();
    dispatch(createBug(data, projectId));
    handleModalClick();
    methods.reset();
  };

  useEffect(() => {
    methods.setValue("priority", priority);
  }, [priority]);

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
              <strong>Add New Bug</strong>
            </Typography>

            <InputController label="title" />
            <InputController label="description" />

            <FormControl fullWidth sx={{ marginTop: 3 }}>
              <InputLabel id="select-priority-label">Priority</InputLabel>
              <Select
                labelId="select-priority-label"
                id="select-priority"
                value={priority}
                label="Priority"
                onChange={handleChange}
              >
                <MenuItem value={"low"}>Low</MenuItem>
                <MenuItem value={"medium"}>Medium</MenuItem>
                <MenuItem value={"high"}>High</MenuItem>
              </Select>
            </FormControl>

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
