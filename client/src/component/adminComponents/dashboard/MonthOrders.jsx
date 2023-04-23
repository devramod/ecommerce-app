import { Box, IconButton, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import Orders from "./last30Days/Orders";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import { useTheme } from "@emotion/react";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";

const MonthOrders = () => {
  const theme = useTheme();
  const getData = useSelector((state) => state);

  const orders = getData.month.monthOrders;
  const { total } = orders[0];
  const percentage = getData.month.orderPercentage;

  return (
    <Box
      width="100%"
      height="190px"
      sx={{
        position: "relative",
        overflow: "hidden",
        display: "flex",
        backgroundColor: theme.palette.primary.main,
        borderRadius: "16px",
        p: "19px",
        gap: 1,
        zIndex: 10,
        boxShadow: 3,
        "&:after": {
          content: '""',
          position: "absolute",
          width: 210,
          height: 210,
          background: theme.palette.primary[800],
          borderRadius: "50%",
          zIndex: 1,
          top: -80,
          right: -90,
          opacity: 0.9,
        },
        "&:before": {
          content: '""',
          position: "absolute",
          width: 210,
          height: 210,
          background: theme.palette.primary[800],
          borderRadius: "50%",
          zIndex: 1,
          top: -125,
          right: -15,
          opacity: 0.5,
        },
      }}
    >
      <Box
        sx={{
          py: "12px",
          flexGrow: '1'
        }}
      >
        <IconButton
          size="large"
          sx={{
            backgroundColor: theme.palette.primary[800],
            borderRadius: "8px",
            ":hover": {
              backgroundColor: theme.palette.primary[800],
            },
          }}
        >
          <LocalMallOutlinedIcon
            sx={{ color: theme.palette.background.default }}
          />
        </IconButton>
        <Typography
          sx={{
            color: theme.palette.background.default,
            fontSize: theme.typography.h1.fontSize,
            fontWeight: "600",
            mt: "4px",
          }}
        >
          {total ? total : ""}
        </Typography>
        <Typography
          sx={{
            color: theme.palette.primary[200],
            fontSize: theme.typography.h6.fontSize,
            fontWeight: "500",
          }}
        >
          Monthly Orders
        </Typography>
      </Box>
      <Box
        sx={{
          flexGrow: '0.5',
          display: "flex",
          flexDirection: "column",
          zIndex: 10,
        }}
      >
        <Box
          sx={{
            alignSelf: "flex-end",
          }}
        >
          {percentage > 0 ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "5px",
              }}
            >
              <Typography
                sx={{
                  color: theme.palette.success[400],
                  fontSize: theme.typography.h6.fontSize,
                  fontWeight: "400",
                }}
              >
                {percentage}%
              </Typography>
              <IconButton
                sx={{
                  backgroundColor: theme.palette.success[400],
                  borderRadius: "8px",
                  p: "1px",
                  ":hover": {
                    backgroundColor: theme.palette.success[400],
                  },
                }}
              >
                <KeyboardArrowUpOutlinedIcon
                  sx={{
                    fontSize: theme.typography.h4.fontSize,
                    color: theme.palette.success[700],
                  }}
                />
              </IconButton>
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "5px",
              }}
            >
              <Typography
                sx={{
                  color: theme.palette.error[200],
                  fontSize: theme.typography.h6.fontSize,
                  fontWeight: "400",
                }}
              >
                {percentage}%
              </Typography>
              <IconButton
                sx={{
                  backgroundColor: theme.palette.error[200],
                  borderRadius: "8px",
                  p: "1px",
                  ":hover": {
                    backgroundColor: theme.palette.error[200],
                  },
                }}
              >
                <KeyboardArrowDownOutlinedIcon
                  sx={{
                    fontSize: theme.typography.h4.fontSize,
                    color: theme.palette.error[800],
                  }}
                />
              </IconButton>
            </Box>
          )}
        </Box>
        <Box
          sx={{
            display: "grid",
            gridTemplateRows: "1",
            gridTemplateColumns: "1",
            flexGrow: "1",
            py: 1,
          }}
        >
          <Orders />
        </Box>
      </Box>
    </Box>
  );
};

export default MonthOrders;
