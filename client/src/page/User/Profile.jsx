import { useTheme } from "@emotion/react";
import {
  Box,
  Button,
  Divider,
  IconButton,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Country, State, City } from "country-state-city";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import NotFound from "../404";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../state/reducer";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { deleteUser } from "../../state/reducer";

async function ImagetoBase64(file) {
  const reader = new FileReader();
  reader.readAsDataURL(file);

  const data = new Promise((resolve, reject) => {
    reader.onload = () => resolve(reader.result);
    reader.onerror = (err) => reject(err);
  });

  return data;
}

const UserProfile = () => {
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
    image: "",
  });
  const [previewImage, setPreviewImage] = useState("");
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [error, setError] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const dispatch = useDispatch();
  const { username } = useParams();
  const getData = useSelector((state) => state);
  const contries = Country.getAllCountries();

  const user = getData.user.user;
  const fname = getData.user.user.fname.toLowerCase();
  const userId = getData.user.user._id;

  useEffect(() => {
    setUserData({
      fname: user.fname,
      lname: user.lname,
      email: user.email,
      country: user.country,
      city: user.city,
      state: user.state,
      phone: user.phone,
      occupation: user.occupation,
      image: "",
    });
    setPreviewImage(user.image);
  }, []);

  if (username !== fname) {
    return <NotFound />;
  }

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
      previewImage
    ) {
      const fetchData = await fetch(
        `${process.env.REACT_APP_SERVER_DOMAIN}/edit/${userId}`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );
      const resData = await fetchData.json();
      dispatch(updateUser(resData.data));
      toast(resData.message);
      setTimeout(() => {
        if (resData.data.email === process.env.REACT_APP_ADMIN_EMAIL) {
          const adminName = resData.data.fname.toLowerCase();
          navigate(`/admin/${adminName}/profile`);
        } else {
          const userName = resData.data.fname.toLowerCase();
          navigate(`/user/${userName}/profile`);
        }
      }, 100);
    } else {
      setError("Please Enter required fields");
    }
  };

  const updatePassword = async (e) => {
    e.preventDefault();
    const { oldPassword, newPassword } = passwordData;

    if (oldPassword && newPassword) {
      const fetchData = await fetch(
        `${process.env.REACT_APP_SERVER_DOMAIN}/edit/password/${userId}`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(passwordData),
        }
      );
      const resData = await fetchData.json();
      setPasswordData({
        oldPassword: "",
        newPassword: "",
      });
      toast(resData.message);
    } else {
      setErrorPassword("Please Enter required fields");
    }
  };

  const deleteAccount = async (id) => {
    const deleteData = await fetch(
      `${process.env.REACT_APP_SERVER_DOMAIN}/delete/user/${id}`,
      {
        method: "DELETE",
      }
    );
    const resData = await deleteData.json();
    toast(resData.message);
    dispatch(deleteUser());
    setTimeout(() => {
      navigate("/");
    }, 100);
  };

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
          backgroundColor: theme.palette.background.default,
          borderRadius: "16px",
          p: 4,
          boxShadow: 2,
        }}
      >
        <Typography
          sx={{
            color: theme.palette.grey[900],
            fontWeight: "500",
            fontSize: theme.typography.h5.fontSize,
            mb: "26px",
          }}
        >
          Profile
        </Typography>
        <Divider
          sx={{
            color: theme.palette.grey[900],
            mb: "24px",
          }}
        />
        {error ? (
          <Typography
            sx={{
              color: theme.palette.error.main,
              fontWeight: "400",
              fontSize: theme.typography.h6.fontSize,
              textAlign: "center",
              mb: 3,
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
            gridTemplateRows: "6",
            gridTemplateColumns: "repeat(2, 1fr)",
            gridTemplateAreas: `
            'p n'
            'a b'
            'c d'
            'e f'
            'g h'
             'k k'
           `,
            gap: "24px 24px",
            mb: 4,
            "& .MuiTextField-root": {},
          }}
        >
          <Box
            sx={{
              gridArea: "p",
              height: "190px",
              border: "none",
            }}
          >
            <Box
              sx={{
                justifySelf: "start",
                alignSelf: "center",
                width: "150px",
                height: "150px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: "1px solid",
                borderColor: "#bbbbbb",
                borderRadius: "50%",
                overflow: "hidden",
              }}
            >
              {previewImage ? (
                <Box
                  component="img"
                  src={previewImage}
                  alt="product image"
                  sx={{
                    width: "100%",
                    height: "100%",
                    display: "block",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <CameraAltOutlinedIcon
                  sx={{
                    color: "#bbbbbb",
                    fontSize: theme.typography.h1.fontSize,
                  }}
                />
              )}
            </Box>
            <Button
              color="primary"
              component="label"
              sx={{
                p: 0,
                ml: 3.5,
                mt: 1,
                fontWeight: 500,
                color: theme.palette.secondary.main,
                backgroundColor: theme.palette.background.default,
                fontSize: theme.typography.h6.fontSize,
                textTransform: "capitalize",
                ":hover": {
                  color: theme.palette.secondary[800],
                  backgroundColor: theme.palette.background.default,
                },
              }}
            >
              Upload photo
              <input
                hidden
                accept="image/*"
                type="file"
                name="productImage"
                onChange={async (e) => {
                  const data = await ImagetoBase64(e.target.files[0]);

                  setUserData((pre) => {
                    return {
                      ...pre,
                      image: data,
                    };
                  });
                  setPreviewImage(data);
                }}
              />
            </Button>
          </Box>

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
            defaultValue={userData.country}
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
            defaultValue={userData.state}
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
            defaultValue={userData.city}
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
              color: theme.palette.background.default,
              ":hover": {
                backgroundColor: theme.palette.secondary[600],
              },
            }}
          >
            Update account
          </Button>
        </Box>
        {errorPassword ? (
          <Typography
            sx={{
              color: theme.palette.error.main,
              fontWeight: "400",
              fontSize: theme.typography.h6.fontSize,
              textAlign: "center",
              mb: 3,
            }}
          >
            {errorPassword}
          </Typography>
        ) : (
          ""
        )}
        <Box
          component="form"
          width="100%"
          onSubmit={(e) => updatePassword(e)}
          sx={{
            display: "grid",
            gridTemplateRows: "1",
            gridTemplateColumns: "2",
            gridTemplateAreas: `
            'a b'
            'c c'
           `,
            gap: "24px 24px",
            mb: 4,
            "& .MuiTextField-root": {},
          }}
        >
          <Box
            sx={{
              position: "relative",
            }}
          >
            <TextField
              type={showOldPassword ? "text" : "password"}
              label="Old Password"
              name="oldpassword"
              value={passwordData.oldPassword}
              onChange={(e) => {
                setPasswordData((pre) => {
                  return {
                    ...pre,
                    oldPassword: e.target.value,
                  };
                });
              }}
              sx={{ gridArea: "a", width: "100%" }}
            />
            <IconButton
              onClick={() => setShowOldPassword((preve) => !preve)}
              sx={{ position: "absolute", top: 10, right: 4 }}
            >
              {showOldPassword ? (
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
              type={showNewPassword ? "text" : "password"}
              label="New password"
              name="newpassword"
              value={passwordData.newPassword}
              onChange={(e) => {
                setPasswordData((pre) => {
                  return {
                    ...pre,
                    newPassword: e.target.value,
                  };
                });
              }}
              sx={{ gridArea: "b", width: "100%" }}
            />
            <IconButton
              onClick={() => setShowNewPassword((preve) => !preve)}
              sx={{ position: "absolute", top: 10, right: 4 }}
            >
              {showNewPassword ? (
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
              gridArea: "c",
              py: 1.5,
              fontWeight: 500,
              fontSize: theme.typography.h6.fontSize,
              textTransform: "capitalize",
              backgroundColor: theme.palette.secondary.main,
              color: theme.palette.background.default,
              ":hover": {
                backgroundColor: theme.palette.secondary[600],
              },
            }}
          >
            Update password
          </Button>
        </Box>
        <Button
          variant="contained"
          onClick={() => deleteAccount(userId)}
          sx={{
            width: "100%",
            py: 1.5,
            fontWeight: 500,
            fontSize: theme.typography.h6.fontSize,
            textTransform: "capitalize",
            backgroundColor: theme.palette.error.main,
            color: theme.palette.background.default,
            ":hover": {
              backgroundColor: theme.palette.error[800],
            },
          }}
        >
          Delete account
        </Button>
      </Box>
    </Box>
  );
};

export default UserProfile;
