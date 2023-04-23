import { useTheme } from "@emotion/react";
import { Box, Typography } from "@mui/material";

const Dispatched = () => {
  const theme = useTheme()
  return (
    <Box
      component="span"
      sx={{
        backgroundColor: theme.palette.primary.light,
        px: "8px",
        py: "4px",
        borderRadius: "4px",
      }}
    >
      <Typography
        sx={{
          color: theme.palette.primary.main,
          fontSize: theme.typography.fontSize,
          fontWeight: "400",
        }}
      >
        Dispatched
      </Typography>
    </Box>
  );
}

export default Dispatched