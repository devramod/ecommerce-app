import { Box, IconButton, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import LocalAtmOutlinedIcon from "@mui/icons-material/LocalAtmOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import { useTheme } from "@emotion/react";

const TotalData = () => {
  const theme = useTheme();
  const getData = useSelector((state) => state);

  const { total } = getData.totalData.totalEarnings[0];
  const incomeWith2Decimals = (total / 100).toFixed(2);
  const totalOrders = getData.totalData.totalOrders;
  const totalCustomers = getData.totalData.totalCustomers.length;

  return (
    <Box
      width="100%"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRadius: "16px",
        gap: '24px',
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 3,
          borderRadius: "16px",
          p: 2,
          zIndex: 10,
          boxShadow: 3,
          backgroundColor: theme.palette.background.default,
          position: 'relative',
          overflow: 'hidden',
        "&:after": {
          content: '""',
          position: "absolute",
          width: 210,
          height: 210,
          background: theme.palette.secondary[200],
          borderRadius: "50%",
          zIndex: 1,
          top: -30,
          right: -180,
          opacity: 0.4,
        },
        "&:before": {
          content: '""',
          position: "absolute",
          width: 210,
          height: 210,
          background: theme.palette.secondary[200],
          borderRadius: "50%",
          zIndex: 1,
          top:-160,
          right: -120,
          opacity: 0.2,
        },
        }}
      >
        <IconButton
          size="large"
          sx={{
            backgroundColor: theme.palette.secondary[50],
            borderRadius: "8px",
            ":hover": {
              backgroundColor: theme.palette.secondary[50],
            },
          }}
        >
          <LocalAtmOutlinedIcon
          size="large"
            sx={{ color: theme.palette.secondary[800], }}
          />
        </IconButton>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: '1'
        }}>
          <Typography
            sx={{
              color: theme.palette.grey[900],
              fontSize: theme.typography.h4.fontSize,
              fontWeight: "600",
            }}
          >
            ${incomeWith2Decimals ? incomeWith2Decimals : ""}
          </Typography>
          <Typography
            sx={{
              color: theme.palette.grey[500],
              fontSize: theme.typography.h6.fontSize,
              fontWeight: "400",
            }}
          >
            Total Earnings
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: 3,
          borderRadius: "16px",
          p: 2,
          zIndex: 10,
          boxShadow: 3,
          backgroundColor: theme.palette.background.default,
          position: 'relative',
          overflow: 'hidden',
        "&:after": {
          content: '""',
          position: "absolute",
          width: 210,
          height: 210,
          background: theme.palette.primary[200],
          borderRadius: "50%",
          zIndex: 1,
          top: -30,
          right: -180,
          opacity: 0.4,
        },
        "&:before": {
          content: '""',
          position: "absolute",
          width: 210,
          height: 210,
          background: theme.palette.primary[200],
          borderRadius: "50%",
          zIndex: 1,
          top:-160,
          right: -120,
          opacity: 0.2,
        },
        }}
      >
        <IconButton
          size="large"
          sx={{
            backgroundColor: theme.palette.primary[50],
            borderRadius: "8px",
            ":hover": {
              backgroundColor: theme.palette.primary[50],
            },
          }}
        >
          <LocalMallOutlinedIcon
          size="large"
            sx={{ color: theme.palette.primary[800], }}
          />
        </IconButton>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: '1'
        }}>
          <Typography
            sx={{
              color: theme.palette.grey[900],
              fontSize: theme.typography.h4.fontSize,
              fontWeight: "600",
            }}
          >
            {totalOrders ? totalOrders : ""}
          </Typography>
          <Typography
            sx={{
              color: theme.palette.grey[500],
              fontSize: theme.typography.h6.fontSize,
              fontWeight: "400",
            }}
          >
            Total Orders
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: 3,
          borderRadius: "16px",
          p: 2,
          zIndex: 10,
          boxShadow: 3,
          backgroundColor: theme.palette.background.default,
          position: 'relative',
          overflow: 'hidden',
        "&:after": {
          content: '""',
          position: "absolute",
          width: 210,
          height: 210,
          background: theme.palette.warning.light,
          borderRadius: "50%",
          zIndex: 1,
          top: -30,
          right: -180,
          opacity: 0.4,
        },
        "&:before": {
          content: '""',
          position: "absolute",
          width: 210,
          height: 210,
          background: theme.palette.warning.light,
          borderRadius: "50%",
          zIndex: 1,
          top:-160,
          right: -120,
          opacity: 0.2,
        },
        }}
      >
        <IconButton
          size="large"
          sx={{
            backgroundColor: theme.palette.warning[50],
            borderRadius: "8px",
            ":hover": {
              backgroundColor: theme.palette.warning[50],
            },
          }}
        >
          <PeopleAltOutlinedIcon
          size="large"
            sx={{ color:theme.palette.warning.main, }}
          />
        </IconButton>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: '1'
        }}>
          <Typography
            sx={{
              color: theme.palette.grey[900],
              fontSize: theme.typography.h4.fontSize,
              fontWeight: "600",
            }}
          >
            {totalCustomers ? totalCustomers : ""}
          </Typography>
          <Typography
            sx={{
              color: theme.palette.grey[500],
              fontSize: theme.typography.h6.fontSize,
              fontWeight: "400",
            }}
          >
            Total Customers
          </Typography>
        </Box>
      </Box>
      
    
    </Box>
  );
};

export default TotalData;
