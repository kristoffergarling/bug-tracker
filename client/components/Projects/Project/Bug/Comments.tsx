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
  Button,
} from "@mui/material";
import { useDispatch } from "react-redux";
import CommentIcon from "@mui/icons-material/Comment";
import SendIcon from "@mui/icons-material/Send";
import { Comment, CommentPayload } from "../../../../redux/types";
import { createComment } from "../../../../redux/slices/commentsSlice";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface CommentsProps {
  comments: Comment[];
  userFullName: string;
  bugId: string;
}

const validationSchema = yup.object().shape({
  text: yup.string().required("Text is required"),
});

const Comments: React.FC<CommentsProps> = ({
  comments,
  userFullName,
  bugId,
}) => {
  const dispatch = useDispatch();
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
    dispatch(createComment(data));
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
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(submitHandler)}
              style={{ display: "flex" }}
            >
              <FormControl sx={{ width: "100%" }} variant="standard">
                <InputLabel
                  sx={{ color: "black" }}
                  htmlFor="input-with-icon-adornment"
                >
                  Write a Comment
                </InputLabel>
                <Input
                  {...methods.register("text")}
                  id="input-with-icon-adornment"
                  startAdornment={
                    <InputAdornment position="start">
                      <CommentIcon color="primary" />
                    </InputAdornment>
                  }
                />
              </FormControl>
              <Button endIcon={<SendIcon />} type="submit">
                Send
              </Button>
            </form>
          </FormProvider>
        </TableCell>
      </TableRow>
    </Table>
  );
};
export default Comments;
