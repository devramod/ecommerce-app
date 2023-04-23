import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import CircularProgress from "@mui/material/CircularProgress";
import NotFound from "../404";
import MonthIncome from "../../component/adminComponents/dashboard/MonthIncome";
import MonthUsers from "../../component/adminComponents/dashboard/MonthUsers";
import MonthOrders from "../../component/adminComponents/dashboard/MonthOrders";
import IncomeChart from "../../component/adminComponents/dashboard/IncomeChart";
import TotalData from "../../component/adminComponents/dashboard/TotalData";
import {
  setMonUsers,
  setUserPercentage,
  setMonOrders,
  setOrderPercentage,
  setMonIncome,
  setIncomePercentage,
} from "../../state/month";
import { setlast7DaysIncome } from "../../state/last7Days";
import {
  setTotalCustomers,
  setTotalOrders,
  setTotalEarnings,
} from "../../state/totalData";
import { setIncome, setOrders, setCustomers } from "../../state/last30Days";

const Dashboard = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { adminname } = useParams();
  const userData = useSelector((state) => state);
  const [loading, setLoading] = useState(true);

  const fname = userData.user.user.fname.toLowerCase();

  useEffect(() => {
    // Current month and previous month customers
    const fetchMonthCustomers = async () => {
      const monthCustomersData = await fetch(
        `${process.env.REACT_APP_SERVER_DOMAIN}/admin/getuserstatistics`
      );
      const resData = await monthCustomersData.json();
      const sortResData = resData.sort((a, b) => {
        if (a._id < b._id) {
          return 1;
        } else if (a._id > b._id) {
          return -1;
        } else {
          return 0;
        }
      });
      dispatch(setMonUsers(sortResData));
      const userPercentage =
        ((resData[0].total - resData[1].total) / resData[1].total) * 100;
      dispatch(setUserPercentage(userPercentage));
    };

    // Current month and previous month orders
    const fetchMonthOrders = async () => {
      const monthOrdersData = await fetch(
        `${process.env.REACT_APP_SERVER_DOMAIN}/admin/getordestatistics`
      );
      const resData = await monthOrdersData.json();
      const sortResData = resData.sort((a, b) => {
        if (a._id < b._id) {
          return 1;
        } else if (a._id > b._id) {
          return -1;
        } else {
          return 0;
        }
      });

      dispatch(setMonOrders(sortResData));
      const orderPercentage =
        ((resData[0].total - resData[1].total) / resData[1].total) * 100;
      dispatch(setOrderPercentage(orderPercentage));
    };

    // Current month and previous month income
    const fetchMonthIncome = async () => {
      const monthIncomeData = await fetch(
        `${process.env.REACT_APP_SERVER_DOMAIN}/admin/getincometatistics`
      );
      const resData = await monthIncomeData.json();
      const sortResData = resData.sort((a, b) => {
        if (a._id < b._id) {
          return 1;
        } else if (a._id > b._id) {
          return -1;
        } else {
          return 0;
        }
      });

      dispatch(setMonIncome(sortResData));
      const incomePercentage =
        ((resData[0].total - resData[1].total) / resData[1].total) * 100;
      dispatch(setIncomePercentage(incomePercentage));
    };

    // Last 7 days income
    const fetchLast7DayIncome = async () => {
      const last7DayIncomeData = await fetch(
        `${process.env.REACT_APP_SERVER_DOMAIN}/admin/getincomelast7days`
      );
      const resData = await last7DayIncomeData.json();
      dispatch(setlast7DaysIncome(resData));
    };

    // Get all customers
    const fetchCustomers = async () => {
      const customerData = await fetch(
        `${process.env.REACT_APP_SERVER_DOMAIN}/admin/getcustomers`
      );
      const resData = await customerData.json();
      dispatch(setTotalCustomers(resData));
    };

    // Get all orders
    const fetchOrders = async () => {
      const orderData = await fetch(
        `${process.env.REACT_APP_SERVER_DOMAIN}/admin/getorders`
      );
      const resData = await orderData.json();
      dispatch(setTotalOrders(resData));
    };

    // Get all earnings
    const fetchEarnings = async () => {
      const orderData = await fetch(
        `${process.env.REACT_APP_SERVER_DOMAIN}/admin/getearnings`
      );
      const resData = await orderData.json();
      dispatch(setTotalEarnings(resData));
    };

    // Last 30 days income
    const fetchLast30DayIncome = async () => {
      const last30DayIncomeData = await fetch(
        `${process.env.REACT_APP_SERVER_DOMAIN}/admin/getincomelast30days`
      );
      const resData = await last30DayIncomeData.json();
      dispatch(setIncome(resData));
    };

    // Last 30 days customers
    const fetchLast30DayCustomers = async () => {
      const last30DayCustomerData = await fetch(
        `${process.env.REACT_APP_SERVER_DOMAIN}/admin/getcustomerslast30days`
      );
      const resData = await last30DayCustomerData.json();
      dispatch(setCustomers(resData));
    };

    // Last 30 days orders
    const fetchLast30DayOrders = async () => {
      const last30DayOrderData = await fetch(
        `${process.env.REACT_APP_SERVER_DOMAIN}/admin/getorderslast30days`
      );
      const resData = await last30DayOrderData.json();
      dispatch(setOrders(resData));
    };
    setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => {
      fetchMonthCustomers();
      fetchMonthOrders();
      fetchMonthIncome();
      fetchLast7DayIncome();
      fetchCustomers();
      fetchOrders();
      fetchEarnings();
      fetchLast30DayIncome();
      fetchLast30DayCustomers();
      fetchLast30DayOrders();
    };
  }, []);

  if (adminname !== fname) {
    return <NotFound />;
  }
  return (
    <Box
      width="100%"
      sx={{
        backgroundColor: theme.palette.primary.light,
        p: "20px",
        minHeight: "calc(100vh)",
      }}
    >
      {loading ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "12px",
            minHeight: "calc(100vh)",
            backgroundColor: theme.palette.background.default,
            borderRadius: "16px",
            p: 4,
            boxShadow: 2,
          }}
        >
          <CircularProgress />
          <Typography sx={{ fontSize: theme.typography.h6.fontSize }}>
            Loading
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateRows: "2",
            gridTemplateColumns: "repeat(3, 1fr)",
            gridTemplateAreas: `"a b c"
          "d d e"
          `,
            gap: "24px",
            backgroundColor: "transparent",
            borderRadius: "16px",
          }}
        >
          <Box
            sx={{
              gridArea: "a",
            }}
          >
            <MonthIncome />
          </Box>
          <Box
            sx={{
              gridArea: "b",
            }}
          >
            <MonthOrders />
          </Box>
          <Box
            sx={{
              gridArea: "c",
            }}
          >
            <MonthUsers />
          </Box>
          <Box
            sx={{
              gridArea: "d",
            }}
          >
            <IncomeChart />
          </Box>
          <Box
            sx={{
              gridArea: "e",
            }}
          >
            <TotalData />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Dashboard;
