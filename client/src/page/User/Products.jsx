import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import NotFound from "../404";
import { Box, Divider, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import { useEffect, useState } from "react";
import { setUserProduct } from "../../state/userOrders";
import { DataGrid } from "@mui/x-data-grid";

const UserProducts = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { username } = useParams();
  const [loading, setLoading] = useState(true);
  const getData = useSelector((state) => state);

  const fname = getData.user.user.fname.toLowerCase();
  const userId = getData.user.user._id;
  const productList = getData.userOrder.products.reduce((c, v) => c.concat(v), []).map((product) => product);
  console.log(productList);

  useEffect(() => {
    const fetchOrders = async () => {
      const orderData = await fetch(
        `${process.env.REACT_APP_SERVER_DOMAIN}/user/getorderdetails/${userId}`
      );
      const resData = await orderData.json();
      dispatch(setUserProduct(resData));
      setLoading(false);
    };

    return () => fetchOrders();
  }, []);

  if (username !== fname) {
    return <NotFound />;
  }

  const rows =
    productList &&
    productList.map((product) => {
      return {
        id: product._id,
        name:
          `${product.name}`.charAt(0).toUpperCase() +
          `${product.name}`.slice(1),
        brand:
          `${product.brand}`.charAt(0).toUpperCase() +
          `${product.brand}`.slice(1),
        price: `$${product.price.toFixed(2)}`,
        quantity: product.quantity,
        total: `$${(product.quantity * product.price).toFixed(2)}`,
      };
    });

  const columns = [
    { field: "id", headerName: "Product ID", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "brand", headerName: "Brand", flex: 0.5 },
    { field: "price", headerName: "Price", flex: 0.5 },
    { field: "quantity", headerName: "Quantity", flex: 0.5 },
    { field: "total", headerName: "Total", flex: 0.5 },
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
          Product list
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

export default UserProducts;
