import { useSelector } from "react-redux";
import ProductCard from "../component/ProductCard";
import { Box, Button, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import LocalAtmOutlinedIcon from "@mui/icons-material/LocalAtmOutlined";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import HandshakeOutlinedIcon from "@mui/icons-material/HandshakeOutlined";
import { Image } from "mui-image";
import Hero from "../assests/hero.png";

const Home = () => {
  const theme = useTheme();
  const getData = useSelector((state) => state);

  const productData = getData.product.productList;

  const latestProducts = [...productData].reverse().slice(0, 4);
  console.log(latestProducts);

  return (
    <Box
      width="100%"
      height="100%"
      sx={{
        display: "grid",
        gridTemplateRows: "500px 100px auto auto",
        rowGap: 5,
      }}
    >
      <Box
        component="section"
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          backgroundColor: theme.palette.background.default,
          px: 8,
        }}
      >
        <Box
          sx={{
            alignSelf: "center",
          }}
        >
          <Typography
            sx={{
              color: "#2b3445",
              fontSize: "48px",
              fontWeight: "700",
              lineHeight: "60px",
              letterSpacing: "1px",
            }}
          >
            50% off For
          </Typography>
          <Typography
            sx={{
              color: "#2b3445",
              fontSize: "48px",
              fontWeight: "700",
              lineHeight: "60px",
              letterSpacing: "0.8px",
              mb: 1,
            }}
          >
            Your First Shopping
          </Typography>
          <Typography
            sx={{
              color: theme.palette.grey[700],
              fontSize: theme.typography.h6.fontSize,
              fontWeight: "400",
              lineHeight: "40px",
              mb: 3,
            }}
          >
            Get Free Shipping on all orders over $999.00
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: theme.palette.secondary.main,
              color: theme.palette.background.default,
              textTransform: "capitalize",
              fontSize: theme.typography.h5.fontSize,
              px: 4,
              py: 1,
              fontWeight: "500",
              ":hover": {
                backgroundColor: theme.palette.secondary[800],
              },
            }}
          >
            Shop now
          </Button>
        </Box>
        <Box
          sx={{
            alignSelf: "center",
            justifySelf: "center",
            width: "329px",
            maxWidth: "329px",
            height: "430px",
            maxHeight: "430px",
            overflow: "hidden",
          }}
        >
          <Image
            src={Hero}
            alt="hero"
            sx={{
              width: "100%",
              height: "100%",
              display: "block",
              objectFit: "cover",
            }}
          />
        </Box>
      </Box>
      <Box
        component="section"
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          columnGap: 3,
          backgroundColor: "transparent",
          px: 8,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
            backgroundColor: theme.palette.background.default,
            py: 2,
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <LocalShippingOutlinedIcon
            sx={{
              color: "#2b3445",
              fontSize: theme.typography.h1.fontSize,
            }}
          />
          <Box>
            <Typography
              sx={{
                color: theme.palette.grey[900],
                fontSize: theme.typography.h5.fontSize,
                fontWeight: "500",
              }}
            >
              Fast Delivery
            </Typography>
            <Typography
              sx={{
                color: theme.palette.grey[700],
                fontSize: theme.typography.h6.fontSize,
                fontWeight: "400",
              }}
            >
              Start from $10
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
            backgroundColor: theme.palette.background.default,
            py: 2,
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <HandshakeOutlinedIcon
            sx={{
              color: "#2b3445",
              fontSize: theme.typography.h1.fontSize,
            }}
          />
          <Box>
            <Typography
              sx={{
                color: theme.palette.grey[900],
                fontSize: theme.typography.h5.fontSize,
                fontWeight: "500",
              }}
            >
              Money Guarantee
            </Typography>
            <Typography
              sx={{
                color: theme.palette.grey[700],
                fontSize: theme.typography.h6.fontSize,
                fontWeight: "400",
              }}
            >
              7 Days Back
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
            backgroundColor: theme.palette.background.default,
            py: 2,
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <TimerOutlinedIcon
            sx={{
              color: "#2b3445",
              fontSize: theme.typography.h1.fontSize,
            }}
          />
          <Box>
            <Typography
              sx={{
                color: theme.palette.grey[900],
                fontSize: theme.typography.h5.fontSize,
                fontWeight: "500",
              }}
            >
              365 Days
            </Typography>
            <Typography
              sx={{
                color: theme.palette.grey[700],
                fontSize: theme.typography.h6.fontSize,
                fontWeight: "400",
              }}
            >
              For free return
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
            backgroundColor: theme.palette.background.default,
            py: 2,
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <LocalAtmOutlinedIcon
            sx={{
              color: "#2b3445",
              fontSize: theme.typography.h1.fontSize,
            }}
          />
          <Box>
            <Typography
              sx={{
                color: theme.palette.grey[900],
                fontSize: theme.typography.h5.fontSize,
                fontWeight: "500",
              }}
            >
              Payment
            </Typography>
            <Typography
              sx={{
                color: theme.palette.grey[700],
                fontSize: theme.typography.h6.fontSize,
                fontWeight: "400",
              }}
            >
              Secure system
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        component="section"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          px: 8,
        }}
      >
        <Typography
          sx={{
            color: theme.palette.grey[900],
            fontSize: theme.typography.h3.fontSize,
            fontWeight: "600",
          }}
        >
          Latest Products
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            columnGap: 3,
          }}
        >
          {latestProducts.map(
            ({ _id, image, name, price, brand, quantity }) => (
              <ProductCard
                key={_id}
                id={_id}
                image={image}
                name={name}
                price={price}
                brand={brand}
                quantity={quantity}
              />
            )
          )}
        </Box>
      </Box>
      <Box
        component="section"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          px: 8,
          mb: 6
        }}
      >
        <Typography
          sx={{
            color: theme.palette.grey[900],
            fontSize: theme.typography.h3.fontSize,
            fontWeight: "600",
          }}
        >
          All Products
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gridAutoFlow: 'row',
            columnGap: 3,
            rowGap: 3
          }}
        >
          {productData.map(({ _id, image, name, price, brand, quantity }) => (
            <ProductCard
              key={_id}
              id={_id}
              image={image}
              name={name}
              price={price}
              brand={brand}
              quantity={quantity}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
