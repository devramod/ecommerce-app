import { useDispatch, useSelector } from "react-redux";
import MenuOpenOutlinedIcon from "@mui/icons-material/MenuOpenOutlined";
import { Search } from "@mui/icons-material";
import { useTheme } from "@emotion/react";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import FlexBetween from "./FlexBetween";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logoutRedux } from "../../state/reducer";

const AdminNavbar = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();

  const userData = useSelector((state) => state);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const isOpen = Boolean(anchorEl);
  const fname = userData.user.user.fname.toLowerCase();
  const profilePhoto = userData.user.user.image;

  return (
    <AppBar
      sx={{
        position: "static",
        background: "none",
        boxShadow: "none",
        borderBottom: 1,
        borderBottomColor: theme.palette.grey[200],
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
          "@media (min-width: 600px)": {
            p: "0 20px",
          },
        }}
      >
        <FlexBetween sx={{ gap: "12px" }}>
          <IconButton
            onClick={() => setSidebarOpen(!sidebarOpen)}
            size="small"
            sx={{
              color: theme.palette.secondary.main,
              backgroundColor: theme.palette.secondary.light,
              borderRadius: "10px",
              ":hover": {
                borderRadius: "10px",
                color: theme.palette.secondary.light,
                backgroundColor: theme.palette.secondary.main,
              },
            }}
          >
            <MenuOpenOutlinedIcon
              sx={{ fontSize: theme.typography.h3.fontSize }}
            />
          </IconButton>
          <FlexBetween sx={{ position: "relative" }}>
            <InputBase
              placeholder="Search"
              sx={{
                backgroundColor: theme.palette.background.alt,
                borderRadius: "10px",
                border: "1px solid",
                borderColor: theme.palette.grey[200],
                p: "4px 48px 2px 40px",
              }}
            />
            <Search
              sx={{
                color: theme.palette.neutral.main,
                position: "absolute",
                left: 14,
                fontSize: theme.typography.h5.fontSize,
              }}
            />
          </FlexBetween>
        </FlexBetween>

        <FlexBetween sx={{ mr: "12px" }}>
          <FlexBetween>
            <Button
              onClick={handleClick}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItem: "center",
                textTransform: "none",
                gap: "16px",
                px: 2,
                ":hover": {
                  borderRadius: "10px",
                  backgroundColor: theme.palette.secondary.light,
                },
              }}
            >
              {profilePhoto ? (
                <Box
                  component="img"
                  src={profilePhoto}
                  alt="profile"
                  height="40px"
                  width="40px"
                  borderRadius="50%"
                  sx={{ objectFit: "cover" }}
                />
              ) : (
                <Box
                  component="img"
                  src="https://xsgames.co/randomusers/avatar.php?g=pixel"
                  alt="profile"
                  height="40px"
                  width="40px"
                  borderRadius="50%"
                  sx={{ objectFit: "cover" }}
                />
              )}

              <Box textAlign="left">
                <Typography
                  fontSize={theme.typography.h6.fontSize}
                  sx={{ color: theme.palette.grey[900], fontWeight: "500" }}
                >
                  {fname.charAt(0).toUpperCase() + fname.slice(1)}
                </Typography>
              </Box>
            </Button>
            <IconButton sx={{ display: "none" }}>
              <Menu
                anchorEl={anchorEl}
                open={isOpen}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              >
                <MenuItem
                  onClick={() => navigate("/")}
                  sx={{
                    fontSize: theme.typography.h6.fontSize,
                    color: theme.palette.grey[900],
                    ":hover": {
                      backgroundColor: theme.palette.secondary.light,
                    },
                  }}
                >
                  HomePage
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    dispatch(logoutRedux());
                    toast("Logout successfully");
                    setTimeout(() => {
                      navigate("/");
                    }, 50);
                  }}
                  sx={{
                    fontSize: theme.typography.h6.fontSize,
                    color: theme.palette.grey[900],
                    ":hover": {
                      backgroundColor: theme.palette.secondary.light,
                    },
                  }}
                >
                  Logout
                </MenuItem>
              </Menu>
            </IconButton>
          </FlexBetween>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};

export default AdminNavbar;
