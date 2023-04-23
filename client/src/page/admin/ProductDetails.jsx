import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Image } from "mui-image";
import { Box, Typography } from "@mui/material";
import NotFound from "../404";
import { useTheme } from "@emotion/react";
import CircularProgress from "@mui/material/CircularProgress";

const ProductDetails = () => {
  const theme = useTheme();
  const [product, setProduct] = useState({});
  const storeData = useSelector((state) => state);
  const { adminname, productid } = useParams();

  const fname = storeData.user.user.fname.toLowerCase();

  useEffect(() => {
    const fetchProduct = async () => {
      const fetchData = await fetch(
        `${process.env.REACT_APP_SERVER_DOMAIN}/admin/find/${productid}`
      );
      const resData = await fetchData.json();
      setProduct(resData);
    };

    return () => fetchProduct();
  }, []);

  if (adminname !== fname) {
    return <NotFound />;
  }

  return (
    <Box
      component="div"
      width="100%"
      sx={{
        backgroundColor: theme.palette.primary.light,
        p: "20px",
        minHeight: "calc(100vh)",
      }}
    >
      {product.name ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-between",
            alignItems: "center",
            backgroundColor: theme.palette.background.default,
            borderRadius: "16px",
            p: 4,
            boxShadow: 2,
          }}
        >
          <Box
            sx={{
              alignSelf: "flex-start",
              border: "1px dashed",
              borderRadius: "8px",
              borderColor: "#000",
              maxWidth: "350px",
              minWidth: "290px",
              height: "350px",
              maxHeight: "350px",
              overflow: "hidden",
              margin: "25px",
              p: "12px",
            }}
          >
            <Image
              src={product.image}
              alt={product.name}
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
              alignSelf: "flex-start",
              margin: "25px",
            }}
          >
            {product.quantity === 0 ? (
              <Box
                component="span"
                sx={{
                  display: "inline-block",
                  backgroundColor: theme.palette.error.light,
                  px: "6px",
                  py: "3px",
                  borderRadius: "4px",
                  mb: "6px",
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
                  px: "6px",
                  py: "3px",
                  borderRadius: "4px",
                  mb: "6px",
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
            )}
            <Typography
              sx={{
                fontSize: theme.typography.h3.fontSize,
                color: theme.palette.grey[900],
                fontWeight: "600",
                mb: "8px",
              }}
            >
              {product.name}
            </Typography>
            <Typography
              sx={{
                fontSize: theme.typography.h5.fontSize,
                color: theme.palette.grey[700],
                fontWeight: "500",
                mb: "10px",
              }}
            >
              {`${product.brand}`.charAt(0).toUpperCase() +
                `${product.brand}`.substring(1)}
            </Typography>
            <Typography
              sx={{
                fontSize: theme.typography.h6.fontSize,
                color: theme.palette.neutral.main,
                fontWeight: "500",
                mb: "12px",
              }}
            >
              {`$${product.price.toFixed(2)}`}
            </Typography>
            <Typography
              sx={{
                fontSize: theme.typography.h6.fontSize,
                color: theme.palette.neutral.main,
                fontWeight: "400",
                lineHeight: "28px",
              }}
            >
              {product.description}
            </Typography>
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "12px",
            minHeight: "calc(100vh)",
            backgroundColor: theme.palette.background.default,
            borderRadius: "16px",
            p: 4,
            boxShadow: 2,
          }}
        >
          <CircularProgress />
          <Typography sx={{ fontSize: theme.typography.h6.fontSize }}>
            Loading
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default ProductDetails;
