import { useState, useEffect } from "react";
import {
  Button,
  Modal,
  Box,
  MenuItem,
  ListItemIcon,
  Typography,
  ListItemText,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import InputController from "../../InputController";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { EditProjectPayload } from "../../../redux/types";

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

interface EditTitleDialogProps {
  handleActionMenuClose: () => void;
  projectId: string;
  projectTitle: string;
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

const EditTitleDialog: React.FC<EditTitleDialogProps> = ({
  handleActionMenuClose,
  projectId,
  projectTitle,
}) => {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const methods = useForm<EditProjectPayload>({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const submitHandler: SubmitHandler<EditProjectPayload> = (
    data: EditProjectPayload
  ) => {
    handleClick();
    methods.reset();
  };

  return (
    <MenuItem onClick={handleOpen}>
      <ListItemIcon>
        <EditIcon fontSize="small" />
      </ListItemIcon>
      <ListItemText>Edit Title</ListItemText>

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
                <strong>Edit "{projectTitle}" Info</strong>
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
    </MenuItem>
  );
};

export default EditTitleDialog;
