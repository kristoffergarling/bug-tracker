import { useEffect } from "react";
import {
  Table,
  TableHead,
  TableCell,
  TableBody,
  Typography,
  Input,
  InputLabel,
  FormControl,
  TableRow,
  InputAdornment,
  Button,
  Box,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import CommentIcon from "@mui/icons-material/Comment";
import SendIcon from "@mui/icons-material/Send";
import { CommentPayload } from "../../../../redux/types";
import {
  createComment,
  fetchCommentsByBugId,
  selectCommentsByBugId,
} from "../../../../redux/slices/commentsSlice";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { formatDateTime } from "../../../../utils/helperFunctions";
import { RootState } from "../../../../redux/store";
import DeleteCommentDialog from "./DeleteCommentDialog";

interface CommentsProps {
  userFullName: string;
  bugId: string;
}

const validationSchema = yup.object().shape({
  text: yup.string().required("Text is required"),
});

const Comments: React.FC<CommentsProps> = ({ userFullName, bugId }) => {
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

  const comments = useSelector((state: RootState) =>
    selectCommentsByBugId(state, bugId)
  );

  const submitHandler: SubmitHandler<CommentPayload> = (
    data: CommentPayload
  ) => {
    dispatch(createComment(data));
    dispatch(fetchCommentsByBugId(bugId));
    dispatch(fetchCommentsByBugId(bugId));
    dispatch(fetchCommentsByBugId(bugId));
    dispatch(fetchCommentsByBugId(bugId));
    dispatch(fetchCommentsByBugId(bugId));
    methods.reset();
  };

  useEffect(() => {
    dispatch(fetchCommentsByBugId(bugId));
  }, []);

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

      <TableBody>
        {comments
          ? comments.map((comment) => (
              <TableRow key={JSON.parse(comment).createdAt}>
                <TableCell
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Box>
                    <Typography variant="body2" component="p">
                      {JSON.parse(comment).createdAt
                        ? formatDateTime(JSON.parse(comment).createdAt as Date)
                        : "Just now"}
                    </Typography>
                    <Typography variant="subtitle1" component="p">
                      <strong>{JSON.parse(comment).createdBy}: </strong>
                      {JSON.parse(comment).text}
                    </Typography>
                  </Box>
                  <DeleteCommentDialog comment={comment} />
                </TableCell>
              </TableRow>
            ))
          : null}
      </TableBody>

      <TableRow>
        <TableCell>
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(submitHandler)}
              style={{ display: "flex" }}
            >
              <FormControl variant="standard">
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
