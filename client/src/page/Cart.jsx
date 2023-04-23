import { useSelector } from "react-redux";
import { Box, Divider, Typography } from "@mui/material";
import CartItem from "../component/CartItem";
import PayButton from "../component/PayButton";
import PayButton2 from "../component/PayButton2";
import { useTheme } from "@emotion/react";

const Cart = () => {
  const theme = useTheme();
  const getData = useSelector((state) => state);

  const userName = getData.user.user.fname;

  const cartItems = getData.cart.cartItem;
  const totalPrice = cartItems.reduce(
    (acc, curr) => acc + parseInt(curr.total),
    0
  );
  const totalQuantity = cartItems.reduce(
    (acc, curr) => acc + parseInt(curr.purchaseQuantity),
    0
  );
  const purchaseQuantity = cartItems.map((item) => item.purchaseQuantity);
  const updateCartItem = cartItems.map((item) => ({
    ...item,
    image: "",
    quantity: purchaseQuantity[0],
  }));

  console.log(userName);

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
          backgroundColor: theme.palette.background.default,
          p: 4,
          borderRadius: "16px",
          boxShadow: 2,
        }}
      >
        {cartItems[0] ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: 4,
            }}
          >
            <Box
              sx={{
                flexGrow: "0.5",
              }}
            >
              <Typography
                sx={{
                  color: theme.palette.grey[900],
                  fontSize: theme.typography.h3.fontSize,
                  fontWeight: "600",
                  mb: 3,
                }}
              >
                Shopping Cart
              </Typography>
              <Divider
                sx={{
                  borderColor: theme.palette.grey[200],
                }}
              />
              <Box>
                {cartItems.map(
                  (
                    {
                      _id,
                      name,
                      image,
                      brand,
                      price,
                      purchaseQuantity,
                      total,
                      quantity,
                    },
                    index
                  ) => (
                    <CartItem
                      key={index}
                      id={_id}
                      name={name}
                      image={image}
                      brand={brand}
                      price={price}
                      purchaseQuantity={purchaseQuantity}
                      quantity={quantity}
                      total={total}
                    />
                  )
                )}
              </Box>
            </Box>
            <Box
              sx={{
                flexGrow: "0.5",
                display: "flex",
                flexDirection: "column",
                gap: 4,
              }}
            >
              <Box>
                <Typography
                  sx={{
                    color: theme.palette.grey[700],
                    fontSize: theme.typography.h5.fontSize,
                    fontWeight: "600",
                    mt: 3.5,
                    mb: 1,
                  }}
                >
                  Summary
                </Typography>
                <Divider
                  sx={{
                    borderColor: theme.palette.grey[200],
                  }}
                />
              </Box>
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{
                      color: theme.palette.grey[900],
                      fontSize: theme.typography.h6.fontSize,
                      fontWeight: "500",
                      mb: 2,
                    }}
                  >
                    Total Quantity
                  </Typography>
                  <Typography
                    sx={{
                      color: theme.palette.grey[900],
                      fontSize: theme.typography.h6.fontSize,
                      fontWeight: "500",
                    }}
                  >
                    {totalQuantity}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{
                      color: theme.palette.grey[900],
                      fontSize: theme.typography.h6.fontSize,
                      fontWeight: "500",
                    }}
                  >
                    Total Price
                  </Typography>
                  <Typography
                    sx={{
                      color: theme.palette.grey[900],
                      fontSize: theme.typography.h6.fontSize,
                      fontWeight: "500",
                    }}
                  >
                    ${totalPrice}
                  </Typography>
                </Box>
              </Box>

              {!userName ? <PayButton2 /> : <PayButton products={updateCartItem} />}
            </Box>
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: 4,
            }}
          >
            <Box
              sx={{
                flexGrow: "5",
              }}
            >
              <Typography
                sx={{
                  color: theme.palette.grey[900],
                  fontSize: theme.typography.h3.fontSize,
                  fontWeight: "600",
                  mb: 3,
                }}
              >
                Shopping Cart
              </Typography>
              <Divider
                sx={{
                  borderColor: theme.palette.grey[200],
                }}
              />
            </Box>
            <Box
              sx={{
                flexGrow: "1",
                display: "flex",
                flexDirection: "column",
                gap: 4,
              }}
            >
              <Box>
                <Typography
                  sx={{
                    color: theme.palette.grey[700],
                    fontSize: theme.typography.h5.fontSize,
                    fontWeight: "600",
                    mt: 3.5,
                    mb: 1,
                  }}
                >
                  Summary
                </Typography>
                <Divider
                  sx={{
                    borderColor: theme.palette.grey[200],
                  }}
                />
              </Box>
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{
                      color: theme.palette.grey[900],
                      fontSize: theme.typography.h6.fontSize,
                      fontWeight: "500",
                      mb: 2,
                    }}
                  >
                    Total Quantity
                  </Typography>
                  <Typography
                    sx={{
                      color: theme.palette.grey[900],
                      fontSize: theme.typography.h6.fontSize,
                      fontWeight: "500",
                    }}
                  >
                    {totalQuantity}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{
                      color: theme.palette.grey[900],
                      fontSize: theme.typography.h6.fontSize,
                      fontWeight: "500",
                    }}
                  >
                    Total Price
                  </Typography>
                  <Typography
                    sx={{
                      color: theme.palette.grey[900],
                      fontSize: theme.typography.h6.fontSize,
                      fontWeight: "500",
                    }}
                  >
                    ${totalPrice}
                  </Typography>
                </Box>
              </Box>
              {!userName ? <PayButton2 /> : <PayButton products={updateCartItem} />}
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Cart;
