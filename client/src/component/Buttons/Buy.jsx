import { useTheme } from "@emotion/react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Buy = ({ name }) => {
  const navigate = useNavigate();
  const theme= useTheme()

  return (
    <Button
      variant="contained"
      onClick={() => navigate(`/product/${name}`)}
      sx={{
        fontWeight: 500,
        fontSize: theme.typography.h6.fontSize,
        textTransform: "capitalize",
        backgroundColor: theme.palette.secondary.main,
        ":hover": {
          backgroundColor: theme.palette.secondary[600],
        },
      }}
    >
      Buy
    </Button>
  );
};

export default Buy;
