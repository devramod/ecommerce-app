import { useTheme } from "@emotion/react";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box component="footer" sx={{}}>
      <Box
        sx={{ display: "flex", justifyContent: "space-between", px: 8, py: 4 }}
      >
        <Box>
          <Typography
            onClick={() => navigate("/")}
            sx={{
              color: theme.palette.grey[700],
              fontSize: theme.typography.h4.fontSize,
              fontWeight: "600",
              letterSpacing: 0.8,
              cursor: "pointer",
            }}
          >
            Mobile Store
          </Typography>
        </Box>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
          }}
        >
          <Box>
            <Typography
              onClick={() => navigate("/contact")}
              sx={{
                color: theme.palette.grey[900],
                fontSize: theme.typography.h6.fontSize,
                fontWeight: "400",
                lineHeight: "28px",
                cursor: "pointer",
                ":hover": {
                  color: theme.palette.grey[500],
                },
              }}
            >
              Contact
            </Typography>
            <Typography
              onClick={() => navigate("/about")}
              sx={{
                color: theme.palette.grey[900],
                fontSize: theme.typography.h6.fontSize,
                fontWeight: "400",
                lineHeight: "28px",
                cursor: "pointer",
                ":hover": {
                  color: theme.palette.grey[500],
                },
              }}
            >
              About
            </Typography>
          </Box>
          <Box
            component="address"
            sx={{
              color: theme.palette.grey[900],
              fontSize: theme.typography.h6.fontSize,
              fontWeight: "400",
              lineHeight: "28px",
            }}
          >
            Mr Smith
            <br />
            813 Howard Street
            <br />
            Oswego NY 13126
            <br />
            USA
          </Box>
        </Box>
      </Box>
      <Box>
        <Typography
          sx={{
            backgroundColor: "#2b3445",
            color: theme.palette.background.default,
            fontSize: theme.typography.h6.fontSize,
            fontWeight: "400",
            textAlign: "center",
            py: 2,
          }}
        >
          © 2023 Mobile Store | All Right Reserved
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
