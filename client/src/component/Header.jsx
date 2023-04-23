import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useState } from "react";
import { useTheme } from "@emotion/react";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { logoutRedux } from "../state/reducer";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getData = useSelector((state) => state);
  const [anchorEl, setAnchorEl] = useState(null);

  const userId = getData.user.user._id;
  const email = getData.user.user.email;
  const fname = getData.user.user.fname.toLowerCase();
  const profilePhoto = getData.user.user.image;
  const cartItems = getData.cart.cartItem;

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="fixed"
      width="100%"
      sx={{ backgroundColor: theme.palette.background.default, boxShadow: 3, px: 5 }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          py: 1.4,
        }}
      >
        <Box>
          <Link to="/">
            <Typography
              sx={{
                color: theme.palette.grey[700],
                fontSize: theme.typography.h4.fontSize,
                fontWeight: "600",
                letterSpacing: 0.8,
              }}
            >
              Mobile Store
            </Typography>
          </Link>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 4,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 3,
            }}
          >
            <Link to="/contact">
              <Typography
                sx={{
                  color: theme.palette.grey[700],
                  fontSize: theme.typography.h6.fontSize,
                  fontWeight: "500",
                  textTransform: "capitalize",
                  ":hover": {
                    color: theme.palette.grey[500],
                  },
                }}
              >
                Contact
              </Typography>
            </Link>
            <Link to="/about">
              <Typography
                sx={{
                  color: theme.palette.grey[700],
                  fontSize: theme.typography.h6.fontSize,
                  fontWeight: "500",
                  textTransform: "capitalize",
                  ":hover": {
                    color: theme.palette.grey[500],
                  },
                }}
              >
                About
              </Typography>
            </Link>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 3,
            }}
          >
            <IconButton
              size="large"
              sx={{
                position: "relative",
                backgroundColor: theme.palette.background.alt,
                ":hover": {
                  backgroundColor: theme.palette.background.alt,
                },
              }}
              onClick={() => navigate("/cart")}
            >
              <ShoppingCartOutlinedIcon
                sx={{
                  color: theme.palette.grey.main,
                  fontSize: theme.typography.h3.fontSize,
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  backgroundColor: theme.palette.error.main,
                  top: -6,
                  right: -7,
                }}
              >
                <Typography
                  sx={{
                    fontSize: "13px",
                    color: theme.palette.background.default,
                    textAlign: "center",
                    mt: "0.5px",
                  }}
                >
                  {cartItems.length}
                </Typography>
              </Box>
            </IconButton>
            {!userId ? (
              <IconButton
                size="large"
                onClick={handleMenu}
                sx={{
                  backgroundColor: theme.palette.background.alt,
                  ":hover": {
                    backgroundColor: theme.palette.background.alt,
                  },
                }}
              >
                <AccountCircleOutlinedIcon
                  sx={{
                    color: theme.palette.grey.main,
                    fontSize: theme.typography.h3.fontSize,
                  }}
                />
              </IconButton>
            ) : !profilePhoto ? (
              <Box
                component="img"
                src="https://xsgames.co/randomusers/avatar.php?g=pixel"
                alt="profile"
                width="48px"
                height="48px"
                onClick={handleMenu}
                sx={{ borderRadius: "50%", cursor: "pointer" }}
              />
            ) : (
              <Box
                component="img"
                src={profilePhoto}
                alt="profile"
                height="48px"
                width="48px"
                borderRadius="50%"
                onClick={handleMenu}
                sx={{ objectFit: "cover", cursor: "pointer"  }}
              />
            )}

            {userId ? (
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem
                  onClick={() => {
                    setTimeout(() => {
                      if (email === process.env.REACT_APP_ADMIN_EMAIL) {
                        navigate(`/admin/${fname}/dashboard`);
                      } else {
                        navigate(`/user/${fname}/profile`);
                      }
                    }, 1500);
                  }}
                  sx={{
                    color: theme.palette.grey[700],
                    fontSize: theme.typography.h6.fontSize,
                    fontWeight: "400",
                    textTransform: "capitalize",
                    ":hover": {
                      backgroundColor: theme.palette.secondary.light,
                    },
                  }}
                >
                  Dashboard
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    dispatch(logoutRedux());
                    toast("Logout successfully");
                    setTimeout(() => {
                      navigate("/");
                    }, 1500);
                  }}
                  sx={{
                    color: theme.palette.grey[700],
                    fontSize: theme.typography.h6.fontSize,
                    fontWeight: "400",
                    textTransform: "capitalize",
                    ":hover": {
                      backgroundColor: theme.palette.secondary.light,
                    },
                  }}
                >
                  Log out
                </MenuItem>{" "}
              </Menu>
            ) : (
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem
                  onClick={() => navigate("/login")}
                  sx={{
                    color: theme.palette.grey[700],
                    fontSize: theme.typography.h6.fontSize,
                    fontWeight: "400",
                    textTransform: "capitalize",
                    ":hover": {
                      backgroundColor: theme.palette.secondary.light,
                    },
                  }}
                >
                  Log in
                </MenuItem>
              </Menu>
            )}
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
