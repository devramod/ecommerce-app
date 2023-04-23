import { Box, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";

const NotFound = () => {
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
        There's nothing here: 404!
      </Typography>
    </Box>
  );
}

export default NotFound;