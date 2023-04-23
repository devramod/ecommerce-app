import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import NotFound from "../404";
import { Box, Divider, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment";
import { setUserOrder } from "../../state/userOrders";
import Pending from "../../component/adminComponents/order/deliver/Pend";
import Delivered from "../../component/adminComponents/order/deliver/Delivered";
import Dispatched from "../../component/adminComponents/order/deliver/Dispatched";
import Error from "../../component/adminComponents/order/deliver/Error";

const UserOrders = () => {
  const theme = useTheme();
  const { username } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const getData = useSelector((state) => state);

  const fname = getData.user.user.fname.toLowerCase();
  const userId = getData.user.user._id;
  const orderList = getData.userOrder.orders;

  useEffect(() => {
    const fetchOrders = async () => {
      const orderData = await fetch(
        `${process.env.REACT_APP_SERVER_DOMAIN}/user/getorderdetails/${userId}`
      );
      const resData = await orderData.json();
      dispatch(setUserOrder(resData));
      setLoading(false);
    };

    return () => fetchOrders();
  }, []);

  if (username !== fname) {
    return <NotFound />;
  }

  const rows =
    orderList &&
    orderList.map((order) => {
      return {
        id: order._id,
        total: order.total,
        payment: order.payment_status,
        status: order.delivery_status,
        createdAtDate: moment(order.createdAt).fromNow(),
      };
    });

  const columns = [
    { field: "id", headerName: "Order ID", flex: 1 },
    {
      field: "total",
      headerName: "Total",
      flex: 0.5,
      renderCell: (params) => {
        return `$${(params.row.total / 100).toFixed(2)}`;
      },
    },
    {
      field: "payment",
      headerName: "Payment status",
      flex: 0.5,
      renderCell(params) {
        if (params.row.payment === "paid") {
          return (
            <Box
              component="span"
              sx={{
                backgroundColor: theme.palette.success.light,
                px: "8px",
                py: "4px",
                borderRadius: "4px",
              }}
            >
              <Typography
                sx={{
                  color: theme.palette.success[700],
                  fontSize: theme.typography.fontSize,
                  fontWeight: "400",
                }}
              >
                Paid
              </Typography>
            </Box>
          );
        } 
      },
    },
    {
      field: "status",
      headerName: "Delivery status",
      flex: 0.5,
      renderCell(params) {
        switch (params.row.status) {
          case "pending":
            return <Pending />;
            break;
          case "dispatched":
            return <Dispatched />;
            break;
          case "delivered":
            return <Delivered />;
            break;
          default:
            <Error />;
            break;
        }
      },
    },
    { field: "createdAtDate", headerName: "Date", flex: 0.5 },
  ];

  return (
    <Box
      width="100%"
      sx={{
        backgroundColor: theme.palette.primary.light,
        p: "20px",
        minHeight: "calc(100vh)",
      }}
    >
      <Box
        sx={{
          backgroundColor: theme.palette.background.default,
          borderRadius: "16px",
          p: 4,
          boxShadow: 2,
        }}
      >
        <Typography
          sx={{
            color: theme.palette.grey[900],
            fontWeight: "500",
            fontSize: theme.typography.h5.fontSize,
            mb: "26px",
          }}
        >
          Orders list
        </Typography>
        <Divider
          sx={{
            color: theme.palette.grey[900],
            mb: "24px",
          }}
        />
        <div style={{ height: 400, width: "100%", overflow: "auto" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            loading={loading}
            checkboxSelection
          />
        </div>
      </Box>
    </Box>
  );
};

export default UserOrders;
