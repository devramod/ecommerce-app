import { useTheme } from "@emotion/react";
import {
  Box,
  Button,
  IconButton,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { toast } from "react-hot-toast";
import { Country, State, City } from "country-state-city";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const Register = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    fname: "",
    lname: "",
    email: "",
    country: "",
    city: "",
    state: "",
    phone: "",
    occupation: "",
    password: "",
    confirmpassword: "",
    image: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const contries = Country.getAllCountries();
  const regEx = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      fname,
      lname,
      email,
      country,
      city,
      state,
      phone,
      occupation,
      password,
      confirmpassword,
      image,
    } = userData;

    if (
      fname &&
      lname &&
      email &&
      country &&
      city &&
      state &&
      phone &&
      occupation &&
      password &&
      confirmpassword
    ) {
      if (password === confirmpassword) {
        if (password.match(regEx) && confirmpassword.match(regEx)) {
          const fetchData = await fetch(
            `${process.env.REACT_APP_SERVER_DOMAIN}/register`,
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
            toast(resData.message);
            setTimeout(() => {
              navigate("/login");
            }, 1500);
          } else {
            setError(resData.message);
          }
        } else {
          setError(
            "Password should contain at least 8 characters, one upper case letter, one lower case letter,one number, and one special character"
          );
        }
      } else {
        setError("Password and confirm password should equal");
      }
    } else {
      setError("Please Enter required fields");
    }
  };

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
        sx={{
          width: "650px",
          maxWidth: "650px",
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
            Create account
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
              display: "grid",
              gridTemplateRows: "5",
              gridTemplateColumns: "2",
              gridTemplateAreas: `
            'a b'
            'c d'
            'e f'
            'g h'
            'i j'
             'k k'
           `,
              gap: "24px 24px",
              "& .MuiTextField-root": {},
            }}
          >
            <TextField
              type="text"
              label="First name"
              name="fname"
              value={userData.fname}
              onChange={(e) => {
                setUserData((pre) => {
                  return {
                    ...pre,
                    fname: e.target.value,
                  };
                });
              }}
              sx={{ gridArea: "a" }}
            />
            <TextField
              type="text"
              label="Last name"
              name="lname"
              value={userData.lname}
              onChange={(e) => {
                setUserData((pre) => {
                  return {
                    ...pre,
                    lname: e.target.value,
                  };
                });
              }}
              sx={{ gridArea: "b" }}
            />
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
              sx={{ gridArea: "c" }}
            />
            <TextField
              select
              label="Country"
              name="country"
              value={userData.country}
              onChange={(e) => {
                setUserData((pre) => {
                  return {
                    ...pre,
                    country: e.target.value,
                  };
                });
              }}
              sx={{ gridArea: "d" }}
            >
              <MenuItem value="">Select a country</MenuItem>
              {contries.map(({ name, isoCode }, index) => (
                <MenuItem key={index} value={isoCode}>
                  {name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label="State"
              name="state"
              value={userData.state}
              onChange={(e) => {
                setUserData((pre) => {
                  return {
                    ...pre,
                    state: e.target.value,
                  };
                });
              }}
              sx={{ gridArea: "e" }}
            >
              <MenuItem value="">Select a state</MenuItem>
              {State.getStatesOfCountry(userData.country).map(
                ({ name, isoCode }, index) => (
                  <MenuItem key={index} value={isoCode}>
                    {name}
                  </MenuItem>
                )
              )}
            </TextField>
            <TextField
              select
              label="City"
              name="city"
              value={userData.city}
              onChange={(e) => {
                setUserData((pre) => {
                  return {
                    ...pre,
                    city: e.target.value,
                  };
                });
              }}
              sx={{ gridArea: "f" }}
            >
              <MenuItem value="">Select a city</MenuItem>
              {City.getCitiesOfState(userData.country, userData.state).map(
                ({ name }, index) => (
                  <MenuItem key={index} value={name}>
                    {name}
                  </MenuItem>
                )
              )}
            </TextField>
            <Box sx={{ gridArea: "g" }}>
              <PhoneInput
                country={"us"}
                value={userData.phone}
                onChange={(phone) => setUserData({ ...userData, phone: phone })}
                inputProps={{
                  name: "phone",
                }}
                containerStyle={{ width: "100%", height: "100%" }}
                inputStyle={{ width: "100%", height: "100%" }}
                buttonStyle={{
                  backgroundColor: theme.palette.background.default,
                }}
                dropdownStyle={{
                  ":hover": {
                    backgroundColor: theme.palette.secondary.main,
                  },
                }}
              />
            </Box>
            <TextField
              type="text"
              label="Occupation"
              name="occupation"
              value={userData.occupation}
              onChange={(e) => {
                setUserData((pre) => {
                  return {
                    ...pre,
                    occupation: e.target.value,
                  };
                });
              }}
              sx={{ gridArea: "h" }}
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
                sx={{ gridArea: "i", width: "100%" }}
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
            <Box
              sx={{
                position: "relative",
              }}
            >
              <TextField
                type={showConfirmPassword ? "text" : "password"}
                label="Confirm password"
                name="confirmpassword"
                value={userData.confirmpassword}
                onChange={(e) => {
                  setUserData((pre) => {
                    return {
                      ...pre,
                      confirmpassword: e.target.value,
                    };
                  });
                }}
                sx={{ gridArea: "j", width: "100%" }}
              />
              <IconButton
                onClick={() => setShowConfirmPassword((preve) => !preve)}
                sx={{ position: "absolute", top: 10, right: 4 }}
              >
                {showConfirmPassword ? (
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
                gridArea: "k",
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
              Create account
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
            Already have an account?{" "}
            <Box
              component="span"
              onClick={() => navigate("/login")}
              sx={{
                cursor: "pointer",
                color: theme.palette.secondary.main,
                ":hover": {
                  color: theme.palette.secondary[200],
                },
              }}
            >
              Log in
            </Box>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Register;
