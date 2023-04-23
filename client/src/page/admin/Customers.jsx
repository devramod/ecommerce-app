import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import NotFound from "../404";
import { Box, Divider, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import { useEffect, useState } from "react";
import { setCustomers } from "../../state/customerSlice";
import { DataGrid } from "@mui/x-data-grid";

const Customers = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { adminname } = useParams();
  const [loading, setLoading] = useState(true);
  const getData = useSelector((state) => state);

  const fname = getData.user.user.fname.toLowerCase();
  const customerList = getData.customers.customers;

  useEffect(() => {
    const fetchCustomers = async () => {
      const customerData = await fetch(
        `${process.env.REACT_APP_SERVER_DOMAIN}/admin/getcustomers`
      );
      const resData = await customerData.json();
      dispatch(setCustomers(resData));
      setLoading(false)
    };

    return () => fetchCustomers();
  }, []);

  if (adminname !== fname) {
    return <NotFound />;
  }
  

  const rows =
    customerList &&
    customerList.map((customer) => {
      return {
        id: customer._id,
        fullName: `${customer.fname
          .charAt(0)
          .toUpperCase()}${customer.fname.slice(1)} ${customer.lname
          .charAt(0)
          .toUpperCase()}${customer.lname.slice(1)}`,
        email: customer.email,
        occupation: customer.occupation,
        country: customer.country,
        phone: customer.phone,
      };
    });

  const columns = [
    { field: "id", headerName: "Customer ID", flex: 1 },
    { field: "fullName", headerName: "Name", flex: 0.6 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "occupation", headerName: "Occupation", flex: 0.7 },
    { field: "country", headerName: "Country", flex: 0.5 },
    {
      field: "phone",
      headerName: "Phone",
      flex: 0.8,
      renderCell: (params) => {
        return params.row.phone.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3");
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
          Customers
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

export default Customers;
