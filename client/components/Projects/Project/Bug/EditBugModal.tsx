import { useState } from "react";
import { Button, Modal, Box, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import InputController from "../../../InputController";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { EditBugPayload, BugState } from "../../../../redux/types";
import { editProject } from "../../../../redux/slices/projectsSlice";

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
    .required("Project Title is required")
    .min(3, "Must be at least 3 characters")
    .max(30, "Must be at most 30 characters"),
  description: yup.string().required("Project Description is required"),
});

const EditBugModal: React.FC<EditBugModalProps> = ({ bug }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };
  const handleOpen = () => {
    setOpen(true);
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

  const submitHandler: SubmitHandler<EditBugPayload> = (
    data: EditBugPayload
  ) => {
    console.log(data);
    // dispatch(editBug(bug._id, data.title, data.description, data.priority));
    handleClick();
    methods.reset();
  };

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
