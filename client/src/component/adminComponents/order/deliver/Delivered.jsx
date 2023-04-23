import { useTheme } from "@emotion/react";
import { Box, Typography } from "@mui/material";

const Delivered = () => {
  const theme = useTheme()
  return (
    <Box
      component="span"
      sx={{
        backgroundColor: theme.palette.success.light,
        px: "8px",
        py: "4px",
        borderRadius: "4px",
      }}
    >
      <Typography
        sx={{
          color: theme.palette.success[700],
          fontSize: theme.typography.fontSize,
          fontWeight: "400",
        }}
      >
        Delivered
      </Typography>
    </Box>
  );
}

export default Delivered