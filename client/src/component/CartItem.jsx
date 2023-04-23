import { Box, IconButton, Typography } from "@mui/material";
import { Image } from "mui-image";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import CloseIcon from "@mui/icons-material/Close";
import {
  deleteCartItems,
  increaaseQuantity,
  decreaseQuantity,
} from "../state/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { useTheme } from "@emotion/react";
import { useNavigate } from "react-router-dom";

const CartItem = ({
  id,
  name,
  image,
  brand,
  price,
  purchaseQuantity,
  total,
}) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const navigate = useNavigate();
  const getData = useSelector((state) => state);

  const isDisable = getData.cart.disable;

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "1fr 2fr 1.3fr 0.7fr 0.7fr 0.3fr",
        columnGap: 2,
        alignItems: "center",
        borderBottom: "1px solid",
        borderBottomColor: theme.palette.grey[200],
        py: 3,
      }}
    >
      <Box
        sx={{
          width: "100px",
          maxWidth: "100px",
          height: "100px",
          maxHeight: "100px",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <Image
          src={image}
          alt={name}
          sx={{
            borderRadius: "8px",
            width: "100%",
            height: "100%",
            display: "block",
            objectFit: "cover",
          }}
        />
      </Box>
      <Box sx={{}}>
        <Typography
          sx={{
            color: theme.palette.grey[500],
            fontSize: theme.typography.h6.fontSize,
            fontWeight: "400",
          }}
        >
          {brand.charAt(0).toUpperCase() + brand.slice(1)}
        </Typography>
        <Typography
          onClick={() => navigate(`/product/${name}`)}
          sx={{
            cursor: 'pointer',
            color: theme.palette.grey[900],
            fontSize: theme.typography.h6.fontSize,
            fontWeight: "400",
            ":hover": {
              color: theme.palette.grey[700],
            }
          }}
        >
          {name}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 1.5,
        }}
      >
        <IconButton
          onClick={() => dispatch(decreaseQuantity(id))}
          sx={{
            backgroundColor: theme.palette.grey[100],
            borderRadius: "12px",
            ":hover": {
              backgroundColor: theme.palette.grey[100],
            },
          }}
        >
          <RemoveOutlinedIcon />
        </IconButton>
        <Typography>{purchaseQuantity}</Typography>
        <IconButton
          onClick={() => dispatch(increaaseQuantity(id))}
          disabled={isDisable}
          sx={{
            backgroundColor: theme.palette.grey[100],
            borderRadius: "12px",
            ":hover": {
              backgroundColor: theme.palette.grey[100],
            },
          }}
        >
          <AddOutlinedIcon />
        </IconButton>
      </Box>
      <Typography>
        ${price} x {purchaseQuantity}
      </Typography>
      <Typography
        sx={{
          color: theme.palette.grey[900],
          fontSize: theme.typography.h6.fontSize,
          fontWeight: "500",
        }}
      >
        ${total}
      </Typography>
      <IconButton
        onClick={() => {
          toast("Product successfully deleted");
          dispatch(deleteCartItems(id));
        }}
      >
        <CloseIcon />
      </IconButton>
    </Box>
  );
};

export default CartItem;
