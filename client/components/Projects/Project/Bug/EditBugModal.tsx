import { useState, useEffect } from "react";
import {
  Button,
  Modal,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import InputController from "../../../InputController";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { EditBugPayload, BugState, BugPriority } from "../../../../redux/types";
import {
  fetchBugsByProjectId,
  editBug,
} from "../../../../redux/slices/bugsSlice";

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

interface EditBugModalProps {
  bug: BugState;
}

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

const EditBugModal: React.FC<EditBugModalProps> = ({ bug }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const [priority, setpriority] = useState<BugPriority>(bug.priority);
  const handleChange = (event: SelectChangeEvent) => {
    setpriority(event.target.value as BugPriority);
  };

  const methods = useForm<EditBugPayload>({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
    defaultValues: {
      title: bug.title,
      description: bug.description,
      priority: bug.priority,
    },
  });
  console.log(2);

  const submitHandler: SubmitHandler<EditBugPayload> = (
    data: EditBugPayload
  ) => {
    dispatch(editBug(data, bug.projectId, bug?._id));
    //Temp solution 03/11/2022
    dispatch(fetchBugsByProjectId(bug.projectId));
    dispatch(fetchBugsByProjectId(bug.projectId));
    dispatch(fetchBugsByProjectId(bug.projectId));
    dispatch(fetchBugsByProjectId(bug.projectId));
    handleClick();
    methods.reset();
  };

  useEffect(() => {
    methods.setValue("priority", priority);
  }, [priority]);

  return (
    <>
      <EditIcon
        onClick={handleClick}
        color="primary"
        sx={{ cursor: "pointer" }}
      />
      <Modal
        open={open}
        onClose={handleClick}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(submitHandler)}>
              <Typography variant="h6">
                <strong>Edit "{bug.title}" Info</strong>
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
    </>
  );
};

export default EditBugModal;
