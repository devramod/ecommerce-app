import { Button } from "@mui/material";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { updateOrderStatus } from "../../../../state/orders";
import { useTheme } from "@emotion/react";

const Dispatch = ({ orderId, status }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const getData = useSelector((state) => state);

  const orderList = getData.order.order;
  const currentOrder = orderList.find((order) => order._id === orderId);

  const updateStatus = async (id) => {
    if (currentOrder.delivery_status === status) {
      toast("Order already delivered");
    } else {
      const updateData = await fetch(
        `${process.env.REACT_APP_SERVER_DOMAIN}/admin/find/${id}`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            delivery_status: status,
          }),
        }
      );
      const resData = await updateData.json();
      dispatch(updateOrderStatus(resData.data));
      toast(resData.message);
    }
  };
  return (
    <Button
      variant="contained"
      onClick={() => updateStatus(orderId)}
      sx={{
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.background.default,
        textTransform: "capitalize",
        fontSize: theme.typography.fontSize,
        px: "10px",
        py: "5px",
        fontWeight: "400",
        ":hover": {
          backgroundColor: theme.palette.primary[200],
        },
      }}
    >
      Dispatched
    </Button>
  );
};

export default Dispatch;
