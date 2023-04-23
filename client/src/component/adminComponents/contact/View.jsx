import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";
import { useTheme } from "@emotion/react";
import { useState } from "react";
import moment from "moment";

const View = ({ emailId }) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [currentEmail, setCurrentEmail] = useState({});
  const getData = useSelector((state) => state);

  const emailList = getData.contact.contact;

  const handleClickOpen = () => {
    setOpen(true);

    let selectedEmail = emailList.find(({ _id }) => _id === emailId);

    setCurrentEmail(selectedEmail);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        sx={{
          backgroundColor: theme.palette.secondary.main,
          color: theme.palette.background.default,
          textTransform: "capitalize",
          fontSize: theme.typography.fontSize,
          px: "10px",
          py: "5px",
          fontWeight: "400",
          ":hover": {
            backgroundColor: theme.palette.secondary[200],
          },
        }}
      >
        View
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={"md"}
      >
        <Box sx={{ p: 3 }}>
          <DialogActions sx={{ position: "absolute", right: 0, top: 0 }}>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </DialogActions>
          <DialogTitle
            sx={{
              color: theme.palette.grey[900],
              fontWeight: "500",
              fontSize: theme.typography.h5.fontSize,
              p: 0,
              mb: "14px",
            }}
          >
            Email Information
          </DialogTitle>
          <Divider
            sx={{
              color: theme.palette.grey[900],
              mb: "12px",
            }}
          />
          <DialogContent sx={{ px: 0 }}>
            <Typography
              sx={{
                fontSize: theme.typography.h6.fontSize,
                color: theme.palette.grey[700],
                fontWeight: "500",
                mb: "6px",
              }}
            >
              Email Id: {currentEmail._id}
            </Typography>
            <Typography
              sx={{
                fontSize: theme.typography.h6.fontSize,
                color: theme.palette.grey[700],
                fontWeight: "500",
                mb: "6px",
              }}
            >
              Created at: {currentEmail.createdAt}
            </Typography>
            <Typography
              sx={{
                fontSize: theme.typography.h6.fontSize,
                color: theme.palette.grey[700],
                fontWeight: "500",
                mb: "6px",
              }}
            >
              Name: {currentEmail.name}
            </Typography>
            <Typography
              sx={{
                fontSize: theme.typography.h6.fontSize,
                color: theme.palette.grey[700],
                fontWeight: "500",
                mb: "6px",
              }}
            >
              Email: {currentEmail.email}
            </Typography>
            <Typography
              sx={{
                fontSize: theme.typography.h6.fontSize,
                color: theme.palette.grey[700],
                fontWeight: "500",
                mb: "6px",
              }}
            >
              Message: {currentEmail.message}
            </Typography>
          </DialogContent>
        </Box>
      </Dialog>
    </>
  );
};

export default View;
