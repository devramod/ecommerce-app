import { Button } from "@mui/material";
import { deleteEmail } from "../../../state/contact";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useTheme } from "@emotion/react";

const Delete = ({ emailId }) => {
  const dispatch = useDispatch()
  const theme = useTheme();

  const deleteProduct = async (id) => {
    const deleteData = await fetch(
      `${process.env.REACT_APP_SERVER_DOMAIN}/admin/find/${id}`,
      {
        method: "DELETE",
      }
    );
    const resData = await deleteData.json();
    toast(resData.message);
    dispatch(deleteEmail(resData.id));
  };

  return (
    <Button
      variant="contained"
      onClick={() => deleteProduct(emailId)}
      sx={{
        backgroundColor: theme.palette.error.main,
        color: theme.palette.background.default,
        textTransform: "capitalize",
        fontSize: theme.typography.fontSize,
        px: "10px",
        py: "5px",
        fontWeight: "400",
        ":hover": {
          backgroundColor: theme.palette.error.light,
        },
      }}
    >
      Delete
    </Button>
  );
};

export default Delete;
