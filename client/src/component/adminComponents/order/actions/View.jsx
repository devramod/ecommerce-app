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

const View = ({ orderId }) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState({});
  const getData = useSelector((state) => state);
  console.log(currentOrder);

  const orderList = getData.order.order;

  const handleClickOpen = () => {
    setOpen(true);

    let selectedOrder = orderList.find(({ _id }) => _id === orderId);

    setCurrentOrder(selectedOrder);
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
            Order Information
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
              Order Id: {currentOrder._id}
            </Typography>
            <Typography
              sx={{
                fontSize: theme.typography.h6.fontSize,
                color: theme.palette.grey[700],
                fontWeight: "500",
                mb: "6px",
              }}
            >
              Total: {`$${(Number(currentOrder.total) / 100).toFixed(2)}`}
            </Typography>
            <Typography
              sx={{
                fontSize: theme.typography.h6.fontSize,
                color: theme.palette.grey[700],
                fontWeight: "500",
                mb: "6px",
              }}
            >
              Delivery status:{" "}
              {`${currentOrder.delivery_status}`}
            </Typography>
            <Typography
              sx={{
                fontSize: theme.typography.h6.fontSize,
                color: theme.palette.grey[700],
                fontWeight: "500",
                mb: "6px",
              }}
            >
              Created at:{" "}
              {moment(currentOrder.createdAt).format("YYYY-MM-DD HH:mm:ss")}
            </Typography>
          </DialogContent>
        </Box>
      </Dialog>
    </>
  );
};

export default View;
