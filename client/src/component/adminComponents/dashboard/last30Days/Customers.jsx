import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Customers = () => {
  const getData = useSelector((state) => state);

  const last30DaysCustomers = getData.last30Days.customers;

  const data = last30DaysCustomers.map((item) => {
    return {
      Day: item._id,
      Customers: item.total,
    };
  });

  return (
    <Box>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart width={500} height={300} data={data}>
          <XAxis dataKey="Day" tick={false} hide />
          <YAxis tick={false} hide />
          <Tooltip
            wrapperStyle={{ width: 110, outline: "none" }}
            contentStyle={{
              backgroundColor: "#000000",
              border: "none",
              borderRadius: "8px",
              opacity: "0.7",
              padding: "6px 0px 0px 8px",
            }}
            itemStyle={{ color: "#ffffff" }}
            labelStyle={{ color: "#ffffff" }}
          />
          <Line
            type="monotone"
            dataKey="Customers"
            stroke="#ffffff"
            dot={false}
            activeDot={false}
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default Customers;
