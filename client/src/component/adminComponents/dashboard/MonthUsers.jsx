import { Box, IconButton, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import Customers from "./last30Days/Customers";
import { useTheme } from "@emotion/react";
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";

const MonthUsers = () => {
  const theme = useTheme();
  const getData = useSelector((state) => state);

  const customers = getData.month.monthUsers;
  const { total } = customers[0]
  const percentage = getData.month.userPercentage;

  return (
    <Box
      width="100%"
      height="190px"
      sx={{
        position: "relative",
        overflow: "hidden",
        display: "flex",
        backgroundColor: theme.palette.warning.light,
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
          background: theme.palette.warning[500],
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
          background: theme.palette.warning[500],
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
            backgroundColor: theme.palette.warning[500],
            borderRadius: "8px",
            ":hover": {
              backgroundColor: theme.palette.warning[500],
            },
          }}
        >
          <PeopleAltOutlinedIcon
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
          {total ? total-1 : ""}
        </Typography>
        <Typography
          sx={{
            color: theme.palette.warning[50],
            fontSize: theme.typography.h6.fontSize,
            fontWeight: "500",
          }}
        >
          Monthly Customers
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
          <Customers />
        </Box>
      </Box>
    </Box>
  );
};

export default MonthUsers;
