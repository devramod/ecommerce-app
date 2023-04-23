import { Box, Typography } from "@mui/material";
import { Image } from "mui-image";
import { useTheme } from "@emotion/react";
import Buy from "./Buttons/Buy";
import AddtoCart from "./Buttons/AddtoCart";

const ProductCard = ({ id, image, name, price, brand, quantity }) => {
  const theme = useTheme();

  return (
    <Box
      component="div"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        backgroundColor: theme.palette.background.default,
        borderRadius: 2,
        boxShadow: 3,
        p: 2,
      }}
    >
      <Box
        sx={{
          margin: "auto",
          borderRadius: "8px",
          width: "250px",
          maxWidth: "250px",
          height: "250px",
          maxHeight: "250px",
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
            objectFit: "cover",
          }}
        />
      </Box>

      <Typography
        sx={{
          color: theme.palette.grey[900],
          fontSize: theme.typography.h6.fontSize,
          fontWeight: "500",
        }}
      >
        {name}
      </Typography>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1
      }}>
        <Buy name={name} />
        <AddtoCart
          id={id}
          name={name}
          image={image}
          price={price}
          brand={brand}
          quantity={quantity}
        />
      </Box>
    </Box>
  );
};

export default ProductCard;
