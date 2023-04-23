import { useTheme } from "@emotion/react";
import { Box, Typography } from "@mui/material";

const Error = () => {
    const theme = useTheme()
    return (
      <Box
        component="span"
        sx={{
          backgroundColor: theme.palette.error.light,
          px: "8px",
          py: "4px",
          borderRadius: "4px",
        }}
      >
        <Typography
          sx={{
            color: theme.palette.error.main,
            fontSize: theme.typography.fontSize,
            fontWeight: "400",
          }}
        >
          Error
        </Typography>
      </Box>
    );
}

export default Error