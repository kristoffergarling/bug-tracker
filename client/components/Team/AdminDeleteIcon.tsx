import { ColouredAvatar } from "../../styles/customStyles";
import DeleteIcon from "@mui/icons-material/Delete";

interface AdminDeleteIconParameters {
  signedInUserIsAdmin: boolean;
  userIsAdmin: boolean;
}

const AdminDeleteIcon: React.FC<AdminDeleteIconParameters> = ({
  signedInUserIsAdmin,
  userIsAdmin,
}) => {
  if (signedInUserIsAdmin) {
    return userIsAdmin ? (
      <ColouredAvatar
        sx={{
          backgroundColor: "grey !important",
          ml: 2,
          width: 30,
          height: 30,
        }}
      >
        <DeleteIcon />
      </ColouredAvatar>
    ) : (
      <ColouredAvatar
        sx={{
          ml: 2,
          width: 30,
          height: 30,
        }}
      >
        <DeleteIcon />
      </ColouredAvatar>
    );
  }
};

export default AdminDeleteIcon;
