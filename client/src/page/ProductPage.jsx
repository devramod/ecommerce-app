import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import NotFound from "./404";
import PayButton from "../component/PayButton";
import PayButton2 from "../component/PayButton2";
import { Box, IconButton, Typography } from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import { useState } from "react";
import { useTheme } from "@emotion/react";
import { Image } from "mui-image";

const ProductPage = () => {
  const theme = useTheme();
  const { productName } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [disable, setDisable] = useState(false);
  const getData = useSelector((state) => state);

  const productData = getData.product.productList
  const userName = getData.user.user.fname;


  const thisProduct = productData.find(
    (product) => product.name === productName
  );

  if (!thisProduct) {
    return <NotFound />;
  }

  const updateProduct = {
    ...thisProduct,
    image: "",
    description: "product description",
    quantity: quantity,
  };

  const increaaseQuantity = () => {
    let qty = quantity;
    if (qty >= thisProduct.quantity) {
      setDisable(true);
    } else {
      setQuantity(++qty);
    }
  };

  const decreaseQuantity = () => {
    let qty = quantity;

    if (qty > 1) {
      setQuantity(--qty);
    }
    if (qty < thisProduct.quantity) {
      setDisable(false);
    }
  };

  const productList = [];
  productList.push(updateProduct);

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
          display: "grid",
          gridTemplateColumns: "1fr 2fr",
          columnGap: 4,
          backgroundColor: theme.palette.background.default,
          p: 4,
          borderRadius: "16px",
          boxShadow: 2,
        }}
      >
        <Box
          sx={{
            borderRadius: "8px",
            width: "450px",
            maxWidth: "450px",
            height: "450px",
            maxHeight: "450px",
            overflow: "hidden",
          }}
        >
          <Image
            src={thisProduct.image}
            alt={thisProduct.name}
            sx={{
              borderRadius: "8px",
              width: "100%",
              height: "100%",
              display: "block",
              objectFit: "cover",
            }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography
            sx={{
              color: theme.palette.grey[900],
              fontSize: theme.typography.h3.fontSize,
              fontWeight: "600",
            }}
          >
            {thisProduct.name}
          </Typography>
          <Typography
            sx={{
              color: theme.palette.grey[500],
              fontSize: theme.typography.h5.fontSize,
              fontWeight: "400",
            }}
          >
            Brand:{" "}
            <Box
              component="span"
              sx={{
                color: theme.palette.grey[700],
                fontSize: theme.typography.h5.fontSize,
                fontWeight: "500",
              }}
            >
              {thisProduct.brand.charAt(0).toUpperCase() +
                thisProduct.brand.slice(1)}
            </Box>
          </Typography>
          <Typography
            sx={{
              color: theme.palette.error.main,
              fontSize: theme.typography.h4.fontSize,
              fontWeight: "600",
            }}
          >
            ${Number(thisProduct.price).toFixed(2)}
          </Typography>
          <Box sx={{}}>
            {thisProduct.quantity === 0 ? (
              <Box
                component="span"
                sx={{
                  display: "inline-block",
                  backgroundColor: theme.palette.error.light,
                  px: "10px",
                  py: "5px",
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
                  Out of stock
                </Typography>
              </Box>
            ) : (
              <Box
                component="span"
                sx={{
                  display: "inline-block",
                  backgroundColor: theme.palette.success.light,
                  px: "10px",
                  py: "5px",
                  borderRadius: "4px",
                }}
              >
                <Typography
                  sx={{
                    color: theme.palette.success[700],
                    fontSize: theme.typography.fontSize,
                    fontWeight: "400",
                  }}
                >
                  In stock
                </Typography>
              </Box>
            )}{" "}
          </Box>
          <Typography
            sx={{
              color: theme.palette.grey[700],
              fontSize: theme.typography.h6.fontSize,
              fontWeight: "400",
              lineHeight: "28px",
            }}
          >
            {thisProduct.description}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <IconButton
              onClick={decreaseQuantity}
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
            <Typography>{quantity}</Typography>
            <IconButton
              onClick={increaaseQuantity}
              disabled={disable}
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
          <Typography
            sx={{
              color: theme.palette.grey.main,
              fontSize: theme.typography.h6.fontSize,
              fontWeight: "400",
              lineHeight: "28px",
            }}
          >
            Total:{" "}
            <Box
              component="span"
              sx={{
                color: theme.palette.grey[700],
                fontSize: theme.typography.h6.fontSize,
                fontWeight: "500",
                lineHeight: "28px",
              }}
            >
              ${Number(updateProduct.price * quantity).toFixed(2)}
            </Box>
          </Typography>
          {!userName ? <PayButton2 /> : <PayButton products={productList} />}
        </Box>
      </Box>
    </Box>
  );
};

export default ProductPage;
