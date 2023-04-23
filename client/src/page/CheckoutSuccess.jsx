import { useTheme } from "@emotion/react";
import { Box, Typography } from "@mui/material";

const CheckoutSuccess = () => {
  const theme = useTheme();

  return (
    <Box
      width="100%"
      sx={{
        minHeight: "calc(100vh)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent",
      }}
    >
      <Typography
        sx={{
          color: theme.palette.grey[700],
          fontWeight: "500",
          fontSize: theme.typography.h4.fontSize,
          textAlign: "center",
        }}
      >
        Checkout Success!
      </Typography>
    </Box>
  );
};

export default CheckoutSuccess;
