import { useTheme } from "@emotion/react";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";

const PayButton = ({ products }) => {
  const theme = useTheme();
  const userId = useSelector((state) => state.user.user._id);

  const handleCheckout = async (e) => {
    e.preventDefault();
    const fetchData = await fetch(
      `${process.env.REACT_APP_SERVER_DOMAIN}/create-checkout-session`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ products, userId }),
      }
    );
    const resData = await fetchData.json();
    if (resData.url) {
      window.location.href = resData.url;
    }
  };

  return (
    <Button
      variant="contained"
      onClick={(e) => handleCheckout(e)}
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

export default PayButton;
