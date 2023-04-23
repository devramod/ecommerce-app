import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box, Divider, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import NotFound from "../404";
import { setTransactions } from "../../state/transactionSlice";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

const Transactions = () => {
  const theme = useTheme();
  const { adminname } = useParams();
  const [loading, setLoading] = useState(true);
  const getData = useSelector((state) => state);
  const dispatch = useDispatch();

  const fname = getData.user.user.fname.toLowerCase();
  const transactionData = getData.transactions.transaction;
  console.log(transactionData);

  useEffect(() => {
    const fetchTransactions = async () => {
      const transactionData = await fetch(
        `${process.env.REACT_APP_SERVER_DOMAIN}/admin/gettransactiondata`
      );
      const resData = await transactionData.json();
      dispatch(setTransactions(resData));
      setLoading(false);
    };

    return () => fetchTransactions();
  }, []);

  if (adminname !== fname) {
    return <NotFound />;
  }

  const rows =
    transactionData &&
    transactionData.map((transaction) => {
      return {
        id: transaction._id,
        userId: transaction.userId,
        products: [...transaction.products],
        total: transaction.total,
        createdAtDate: transaction.createdAt,
        createdAtTime: transaction.createdAt,
      };
    });

  const columns = [
    { field: "id", headerName: "Transaction ID", flex: 1 },
    { field: "userId", headerName: "User ID", flex: 1 },
    {
      field: "products",
      headerName: "Products",
      flex: 0.5,
      renderCell: (params) => {
        return params.row.products.length;
      },
    },
    {
      field: "total",
      headerName: "Total",
      flex: 0.5,
      renderCell: (params) => {
        return `$${(params.row.total / 100).toFixed(2)}`;
      },
    },
    {
      field: "createdAtDate",
      headerName: "Date",
      flex: 0.5,
      renderCell: (params) => {
        const date = new Date(params.row.createdAtDate);
        return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
      },
    },
    {
      field: "createdAtTime",
      headerName: "Time",
      flex: 0.5,
      renderCell: (params) => {
        const date = new Date(params.row.createdAtTime);
        const timeString = `${String(date.getHours())}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds())}`;
        const timeString12hr = new Date(
          "1970-01-01T" + timeString + "Z"
        ).toLocaleTimeString("en-US", {
          timeZone: "UTC",
          hour12: true,
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
        });
        return timeString12hr
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
          Transactions
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

export default Transactions;
