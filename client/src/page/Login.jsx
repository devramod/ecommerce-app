import { useTheme } from "@emotion/react";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { toast } from "react-hot-toast";
import { loginRedux } from "../state/reducer";
import { useDispatch } from "react-redux";

const Login = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = userData;

    if (email && password) {
      const fetchData = await fetch(
        `${process.env.REACT_APP_SERVER_DOMAIN}/login`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );
      const resData = await fetchData.json();

      if (resData.alert) {
        dispatch(loginRedux(resData.data));
        toast(resData.message);
        setTimeout(() => {
          if (resData.data.email === process.env.REACT_APP_ADMIN_EMAIL) {
            const adminName = resData.data.fname.toLowerCase();
            navigate(`/admin/${adminName}/dashboard`);
          } else {
            const userName = resData.data.fname.toLowerCase();
            navigate(`/user/${userName}/profile`);
          }
        }, 2000);
      } else {
        setError(resData.message);
      }
    } else {
      setError("Please Enter required fields");
    }
  };

  return (
    <Box
      width="100%"
      sx={{
        minHeight: "calc(100vh)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent",
      }}
    >
      <Box
        sx={{
          width: "450px",
          maxWidth: "450px",
          backgroundColor: theme.palette.background.default,
          borderRadius: "16px",
          px: 4,
          py: 3,
          boxShadow: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 3,
            width: "100%",
          }}
        >
          <Typography
            sx={{
              color: theme.palette.grey[700],
              fontWeight: "500",
              fontSize: theme.typography.h4.fontSize,
              textAlign: "center",
            }}
          >
            Log in
          </Typography>
          {error ? (
            <Typography
              sx={{
                color: theme.palette.error.main,
                fontWeight: "400",
                fontSize: theme.typography.h6.fontSize,
                textAlign: "center",
              }}
            >
              {error}
            </Typography>
          ) : (
            ""
          )}
          <Box
            component="form"
            width="100%"
            onSubmit={(e) => handleSubmit(e)}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: 3,
              width: "100%",
              "& .MuiTextField-root": {},
            }}
          >
            <TextField
              type="email"
              label="Email address"
              name="email"
              value={userData.email}
              onChange={(e) => {
                setUserData((pre) => {
                  return {
                    ...pre,
                    email: e.target.value,
                  };
                });
              }}
            />
            <Box
              sx={{
                position: "relative",
              }}
            >
              <TextField
                type={showPassword ? "text" : "password"}
                label="Password"
                name="password"
                value={userData.password}
                onChange={(e) => {
                  setUserData((pre) => {
                    return {
                      ...pre,
                      password: e.target.value,
                    };
                  });
                }}
                sx={{ width: "100%" }}
              />
              <IconButton
                onClick={() => setShowPassword((preve) => !preve)}
                sx={{ position: "absolute", top: 10, right: 4 }}
              >
                {showPassword ? (
                  <VisibilityOutlinedIcon />
                ) : (
                  <VisibilityOffOutlinedIcon />
                )}
              </IconButton>
            </Box>
            <Button
              type="submit"
              variant="contained"
              sx={{
                py: 1.5,
                fontWeight: 500,
                fontSize: theme.typography.h6.fontSize,
                textTransform: "capitalize",
                backgroundColor: theme.palette.secondary.main,
                ":hover": {
                  backgroundColor: theme.palette.secondary[600],
                },
              }}
            >
              Log in
            </Button>
          </Box>
          <Typography
            sx={{
              color: theme.palette.grey[700],
              fontWeight: "400",
              fontSize: theme.typography.h6.fontSize,
              textAlign: "center",
            }}
          >
            Don't have an account?{" "}
            <Box
              component="span"
              onClick={() => navigate("/register")}
              sx={{
                cursor: "pointer",
                color: theme.palette.secondary.main,
                ":hover": {
                  color: theme.palette.secondary[200],
                },
              }}
            >
              Register
            </Box>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
