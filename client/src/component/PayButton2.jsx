import { useTheme } from "@emotion/react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const PayButton2 = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Button
      variant="contained"
      onClick={() => navigate("/login")}
      sx={{
        py: 1.5,
        fontWeight: 500,
        fontSize: theme.typography.h6.fontSize,
        textTransform: "capitalize",
        backgroundColor: theme.palette.secondary.main,
        ":hover": {
          backgroundColor: theme.palette.secondary[600],
        },
      }}
    >
      Checkout
    </Button>
  );
};

export default PayButton2;
