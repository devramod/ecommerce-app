import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { addCartItems } from "../../state/cartSlice";
import { useTheme } from "@emotion/react";

const AddtoCart = ({ id, image, name, price, brand, quantity }) => {
  const dispatch = useDispatch();
  const theme= useTheme()

  const addToCart = () => {
    dispatch(
      addCartItems({
        _id: id,
        name,
        brand,
        image,
        price,
        quantity,
      })
    );
  };

  return (
    <Button variant="contained" onClick={addToCart} sx={{
      fontWeight: 500,
      fontSize: theme.typography.h6.fontSize,
      textTransform: "capitalize",
      backgroundColor: theme.palette.secondary.main,
      ":hover": {
        backgroundColor: theme.palette.secondary[600],
      },
    }}>
      Add to cart
    </Button>
  );
};

export default AddtoCart;
