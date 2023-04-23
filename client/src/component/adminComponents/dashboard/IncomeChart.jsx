import { useTheme } from "@emotion/react";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const IncomeChart = () => {
  const theme = useTheme();
  const getData = useSelector((state) => state);

  const last7DayIncomeData = getData.last7Days.last7DaysIncome;

  const newData = last7DayIncomeData.map((item) => {
    const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return {
      Day: DAYS[item._id - 1],
      Earnings: item.total / 100,
      Units: item.units,
    };
  });

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.default,
        borderRadius: "16px",
        p: "19px",
        boxShadow: 3,
      }}
    >
      <Box>
        <Typography
          sx={{
            color: theme.palette.grey[900],
            fontSize: theme.typography.h4.fontSize,
            fontWeight: 600,
            mb: 3,
          }}
        >
          Last 7 days growth
        </Typography>
      </Box>

      <Box height="290px">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart width={500} height={400} data={newData}>
            <XAxis dataKey="Day" tick="#212121" />
            <YAxis hide={true} />
            <Tooltip
              wrapperStyle={{ outline: "none" }}
              contentStyle={{
                backgroundColor: "#000000",
                border: "none",
                borderRadius: "8px",
                opacity: "0.7",
              }}
              itemStyle={{ color: "#ffffff" }}
              labelStyle={{ color: "#ffffff" }}
            />
            <Legend verticalAlign="top" align="right" height={48} />
            <CartesianGrid vertical={false} />
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#90caf9" stopOpacity={0.9} />
                <stop offset="95%" stopColor="#90caf9" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#b39ddb" stopOpacity={0.9} />
                <stop offset="95%" stopColor="#b39ddb" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="Earnings"
              stackId="1"
              stroke="#2196f3"
              strokeWidth={2}
              strokeOpacity={0.6}
              fillOpacity={1}
              fill="url(#colorUv)"
            />
            <Area
              type="monotone"
              dataKey="Units"
              stackId="1"
              stroke="#673ab7"
              strokeWidth={2}
              strokeOpacity={0.6}
              fillOpacity={1}
              fill="url(#colorPv)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default IncomeChart;
