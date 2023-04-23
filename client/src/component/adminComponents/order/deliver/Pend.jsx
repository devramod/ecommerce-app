import { useTheme } from "@emotion/react";
import { Box, Typography } from "@mui/material";

const Pending = () => {
  const theme = useTheme();
  return (
    <Box
      component="span"
      sx={{
        backgroundColor: theme.palette.warning[50],
        px: "8px",
        py: "4px",
        borderRadius: "4px",
      }}
    >
      <Typography
        sx={{
          color: theme.palette.warning.main,
          fontSize: theme.typography.fontSize,
          fontWeight: "400",
        }}
      >
        Pending
      </Typography>
    </Box>
  );
};

export default Pending;
