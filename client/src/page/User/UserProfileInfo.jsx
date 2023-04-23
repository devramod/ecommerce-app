import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import NotFound from "../404";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import { useEffect } from "react";
import { setDashboardOrder } from "../../state/userOrders";

const UserProfileInfo = () => {
  const theme = useTheme();
  const { username } = useParams();
  const dispatch = useDispatch();
  const getData = useSelector((state) => state);

  const fname = getData.user.user.fname.toLowerCase();
  const lname = getData.user.user.lname.toLowerCase();
  const email = getData.user.user.email;
  const phone = getData.user.user.phone;
  const occupation = getData.user.user.occupation;
  const userId = getData.user.user._id;
  const profilePhoto = getData.user.user.image;

  const allOrders = getData.userOrder.orders.length;
  const quantityArr = getData.userOrder.products
    .reduce((c, v) => c.concat(v), [])
    .map(({ quantity }) => quantity);
  const allProducts = quantityArr.reduce((c, v) => c + v, 0);

  useEffect(() => {
    const fetchOrders = async () => {
      const orderData = await fetch(
        `${process.env.REACT_APP_SERVER_DOMAIN}/user/getorderdetails/${userId}`
      );
      const resData = await orderData.json();
      dispatch(setDashboardOrder(resData));
    };

    return () => fetchOrders();
  }, []);

  if (username !== fname) {
    return <NotFound />;
  }

  return (
    <Box
      width="100%"
      sx={{
        backgroundColor: theme.palette.primary.light,
        p: "20px",
        minHeight: "calc(100vh)",
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateRows: "2",
          rowGap: 4,
          backgroundColor: "transparent",
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "0.5fr 0.5fr 0.5fr 0.5fr 1fr 1fr",
            alignItems: "center",
            backgroundColor: theme.palette.background.default,
            p: 3,
            boxShadow: 2,
            borderRadius: "16px",
          }}
        >
          {profilePhoto ? (
            <Box
              component="img"
              src={profilePhoto}
              alt="profile"
              height="80px"
              width="80px"
              borderRadius="50%"
              sx={{ objectFit: "cover" }}
            />
          ) : (
            <Box
              component="img"
              src="https://xsgames.co/randomusers/avatar.php?g=pixel"
              alt="profile"
              height="80px"
              width="80px"
              borderRadius="50%"
              sx={{ objectFit: "cover" }}
            />
          )}
          <Box>
            <Typography
              sx={{
                fontSize: theme.typography.h6.fontSize,
                color: theme.palette.grey[500],
                fontWeight: "500",
                mb: 1,
              }}
            >
              First name
            </Typography>
            <Typography
              sx={{
                fontSize: theme.typography.h5.fontSize,
                color: theme.palette.grey[900],
                fontWeight: "400",
              }}
            >
              {fname.charAt(0).toUpperCase() + fname.slice(1)}
            </Typography>
          </Box>
          <Box>
            <Typography
              sx={{
                fontSize: theme.typography.h6.fontSize,
                color: theme.palette.grey[500],
                fontWeight: "500",
                mb: 1,
              }}
            >
              Last name
            </Typography>
            <Typography
              sx={{
                fontSize: theme.typography.h5.fontSize,
                color: theme.palette.grey[900],
                fontWeight: "400",
              }}
            >
              {lname.charAt(0).toUpperCase() + lname.slice(1)}
            </Typography>
          </Box>
          <Box>
            <Typography
              sx={{
                fontSize: theme.typography.h6.fontSize,
                color: theme.palette.grey[500],
                fontWeight: "500",
                mb: 1,
              }}
            >
              Occupation
            </Typography>
            <Typography
              sx={{
                fontSize: theme.typography.h5.fontSize,
                color: theme.palette.grey[900],
                fontWeight: "400",
              }}
            >
              {occupation}
            </Typography>
          </Box>
          <Box>
            <Typography
              sx={{
                fontSize: theme.typography.h6.fontSize,
                color: theme.palette.grey[500],
                fontWeight: "500",
                mb: 1,
              }}
            >
              Email
            </Typography>
            <Typography
              sx={{
                fontSize: theme.typography.h5.fontSize,
                color: theme.palette.grey[900],
                fontWeight: "400",
              }}
            >
              {email}
            </Typography>
          </Box>
          <Box>
            <Typography
              sx={{
                fontSize: theme.typography.h6.fontSize,
                color: theme.palette.grey[500],
                fontWeight: "500",
                mb: 1,
              }}
            >
              Phone
            </Typography>
            <Typography
              sx={{
                fontSize: theme.typography.h5.fontSize,
                color: theme.palette.grey[900],
                fontWeight: "400",
              }}
            >
              {phone.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3")}
            </Typography>
          </Box>
          
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            backgroundColor: "transparent",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Box
            sx={{
              backgroundColor: theme.palette.background.default,
              p: 3,
              boxShadow: 2,
              borderRadius: "16px",
            }}
          >
            <Typography
              sx={{
                fontSize: theme.typography.h6.fontSize,
                color: theme.palette.grey[500],
                fontWeight: "500",
                mb: 1,
                textAlign: "center",
              }}
            >
              All orders
            </Typography>
            <Typography
              sx={{
                fontSize: theme.typography.h5.fontSize,
                color: theme.palette.grey[900],
                fontWeight: "400",
                textAlign: "center",
              }}
            >
              {allOrders}
            </Typography>
          </Box>
          <Box
            sx={{
              backgroundColor: theme.palette.background.default,
              p: 3,
              boxShadow: 2,
              borderRadius: "16px",
            }}
          >
            <Typography
              sx={{
                fontSize: theme.typography.h6.fontSize,
                color: theme.palette.grey[500],
                fontWeight: "500",
                mb: 1,
                textAlign: "center",
              }}
            >
              All products
            </Typography>
            <Typography
              sx={{
                fontSize: theme.typography.h5.fontSize,
                color: theme.palette.grey[900],
                fontWeight: "400",
                textAlign: "center",
              }}
            >
              {allProducts}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default UserProfileInfo;
