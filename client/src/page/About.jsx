import { useTheme } from "@emotion/react";
import { Box, Divider, Typography } from "@mui/material";

const About = () => {
  const theme = useTheme();
  return (
    <Box
      width="100%"
      height="100%"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent",
        p: 4,
      }}
    >
      <Box
        width="100%"
        height="100%"
        sx={{
          backgroundColor: theme.palette.background.default,
          borderRadius: "16px",
          px: 4,
          py: 3,
          boxShadow: 2,
        }}
      >
        <Box
          sx={{
            mb: 3,
          }}
        >
          <Typography
            sx={{
              color: theme.palette.grey[900],
              fontSize: theme.typography.h3.fontSize,
              fontWeight: "600",
              mb: 3,
            }}
          >
            About
          </Typography>
          <Divider
            sx={{
              borderColor: theme.palette.grey[200],
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default About;
