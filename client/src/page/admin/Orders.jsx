import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import NotFound from "../404";
import { useTheme } from "@emotion/react";
import { Box, Divider, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import moment from "moment";
import { setOrder } from "../../state/orders";
import { DataGrid } from "@mui/x-data-grid";
import Pending from "../../component/adminComponents/order/deliver/Pend";
import Delivered from "../../component/adminComponents/order/deliver/Delivered";
import Dispatched from "../../component/adminComponents/order/deliver/Dispatched";
import Error from "../../component/adminComponents/order/deliver/Error";
import Deliver from "../../component/adminComponents/order/actions/Deliver";
import Dispatch from "../../component/adminComponents/order/actions/Dispatched";
import View from "../../component/adminComponents/order/actions/View";

const Orders = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { adminname } = useParams();
  const [loading, setLoading] = useState(true);
  const getData = useSelector((state) => state);

  const fname = getData.user.user.fname.toLowerCase();
  const orderList = getData.order.order;

  useEffect(() => {
    const fetchOrders = async () => {
      const orderData = await fetch(
        `${process.env.REACT_APP_SERVER_DOMAIN}/admin/getorderdetails`
      );
      const resData = await orderData.json();
      dispatch(setOrder(resData));
      setLoading(false);
    };

    return () => fetchOrders();
  }, []);

  if (adminname !== fname) {
    return <NotFound />;
  }

  const rows =
    orderList &&
    orderList.map((order) => {
      return {
        id: order._id,
        total: order.total,
        shipping: order.shipping.name,
        status: order.delivery_status,
        createdAtDate: moment(order.createdAt).fromNow(),
      };
    });

  const columns = [
    { field: "id", headerName: "Order ID", flex: 0.7 },
    {
      field: "total",
      headerName: "Total",
      flex: 0.3,
      renderCell: (params) => {
        return `$${(params.row.total / 100).toFixed(2)}`;
      },
    },
    {
      field: "shipping",
      headerName: "Customer",
      flex: 0.5,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 0.4,
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
    { field: "createdAtDate", headerName: "Date", flex: 0.4 },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      flex: 1,
      renderCell(params) {
        return (
          <Box
            component="div"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Deliver orderId={params.row.id} status={"delivered"} />
            <Dispatch orderId={params.row.id} status={"dispatched"} />
            <View orderId={params.row.id} />
          </Box>
        );
      },
    },
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

export default Orders;
