import {
  Table,
  TableHead,
  TableCell,
  Typography,
  Input,
  InputLabel,
  FormControl,
  TableRow,
  InputAdornment,
} from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
import { Comment, CommentPayload } from "../../../../redux/types";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface CommentsProps {
  comments: Comment[];
  userFullName: string;
  bugId: string;
}

const validationSchema = yup.object().shape({
  text: yup
    .string()
    .required("Text is required")
    .min(3, "Must be at least 3 characters")
    .max(30, "Must be at most 30 characters"),
});

const Comments: React.FC<CommentsProps> = ({
  comments,
  userFullName,
  bugId,
}) => {
  const methods = useForm<CommentPayload>({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
    defaultValues: {
      text: "",
      createdBy: userFullName,
      bugId: bugId,
    },
  });

  const submitHandler: SubmitHandler<CommentPayload> = (
    data: CommentPayload
  ) => {
    console.log(data);
    methods.reset();
  };

  return (
    <Table sx={{ minWidth: 300 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>
            <Typography variant="h6" component="h3">
              <strong>Comments</strong>
            </Typography>
          </TableCell>
        </TableRow>
      </TableHead>
      {comments
        ? comments.map((comment) => (
            <TableRow>
              <TableCell>
                <Typography variant="subtitle1" component="p">
                  <strong>FirstName LastName: </strong> This is a great bug!
                </Typography>
              </TableCell>
            </TableRow>
          ))
        : null}

      <TableRow>
        <TableCell>
          <FormControl {...methods} sx={{ width: "100%" }} variant="standard">
            <InputLabel
              sx={{ color: "black" }}
              htmlFor="input-with-icon-adornment"
            >
              Write a Comment
            </InputLabel>
            <Input
              id="input-with-icon-adornment"
              startAdornment={
                <InputAdornment position="start">
                  <CommentIcon color="primary" />
                </InputAdornment>
              }
            />
          </FormControl>
        </TableCell>
      </TableRow>
    </Table>
  );
};
export default Comments;
