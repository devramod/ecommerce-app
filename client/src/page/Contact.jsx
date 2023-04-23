import { useTheme } from "@emotion/react";
import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { toast } from "react-hot-toast";

const Contact = () => {
  const theme = useTheme();
  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, message } = contactData;

    if (name && email && message) {
      const fetchData = await fetch(
        `${process.env.REACT_APP_SERVER_DOMAIN}/contact`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(contactData),
        }
      );
      const resData = await fetchData.json();
      toast(resData.message);
      setTimeout(() => {
        setContactData({
          name: "",
          email: "",
          message: "",
        });
      }, 1000);
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
            mb: 3,
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
            Get in Touch
          </Typography>
          <Divider
            sx={{
              borderColor: theme.palette.grey[200],
            }}
          />
        </Box>
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
            display: "flex",
            flexDirection: "column",
            gap: 3,
            "& .MuiTextField-root": {},
          }}
        >
          <TextField
            type="text"
            label="Name"
            name="name"
            value={contactData.name}
            onChange={(e) => {
              setContactData((pre) => {
                return {
                  ...pre,
                  name: e.target.value,
                };
              });
            }}
          />
          <TextField
            type="email"
            label="Email address"
            name="email"
            value={contactData.email}
            onChange={(e) => {
              setContactData((pre) => {
                return {
                  ...pre,
                  email: e.target.value,
                };
              });
            }}
          />
          <TextField
            multiline
            rows={8}
            maxRows={8}
            label="Message"
            name="message"
            value={contactData.message}
            onChange={(e) => {
              setContactData((pre) => {
                return {
                  ...pre,
                  message: e.target.value,
                };
              });
            }}
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
              ":hover": {
                backgroundColor: theme.palette.secondary[600],
              },
            }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Contact;
