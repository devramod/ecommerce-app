import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Divider, MenuItem, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import toast from "react-hot-toast";
import NotFound from "../404";
import { useTheme } from "@emotion/react";

async function ImagetoBase64(file) {
  const reader = new FileReader();
  reader.readAsDataURL(file);

  const data = new Promise((resolve, reject) => {
    reader.onload = () => resolve(reader.result);
    reader.onerror = (err) => reject(err);
  });

  return data;
}

const AddProducts = () => {
  const theme = useTheme();
  const [productData, setProductData] = useState({
    name: "",
    brand: "",
    description: "",
    price: "",
    image: "",
    quantity: "",
  });

  const { adminname } = useParams();
  const userData = useSelector((state) => state);

  const fname = userData.user.user.fname.toLowerCase();

  if (adminname !== fname) {
    return <NotFound />;
  }

  const handleUploadImage = async (e) => {
    const data = await ImagetoBase64(e.target.files[0]);

    setProductData((pre) => {
      return {
        ...pre,
        image: data,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, brand, description, price, image, quantity } = productData;

    if (name && brand && description && image && quantity && price) {
      const fetchData = await fetch(
        `${process.env.REACT_APP_SERVER_DOMAIN}/admin/uploadProduct`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            name,
            brand,
            description,
            price,
            image,
            quantity,
          }),
        }
      );

      const fetchRes = await fetchData.json();

      toast(fetchRes.message);

      setProductData(() => {
        return {
          name: "",
          brand: "",
          description: "",
          price: "",
          image: "",
          quantity: "",
        };
      });
    } else {
      toast("Enter required Fields");
    }
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
          Add a product
        </Typography>
        <Divider
          sx={{
            color: theme.palette.grey[900],
            mb: "24px",
          }}
        />
        <Box
          component="form"
          onSubmit={(e) => handleSubmit(e)}
          sx={{
            display: "grid",
            gridTemplateRows: "4",
            gridTemplateColumns: "2",
            gridTemplateAreas: `
            'a b'
            'c c'
            'd e'
            'f f'
            'g g'
            'h h'
           `,
            gap: "24px 24px",
            "& .MuiTextField-root": {},
          }}
        >
          <TextField
            label="Product name"
            name="productName"
            value={productData.name}
            onChange={(e) => {
              setProductData((pre) => {
                return {
                  ...pre,
                  name: e.target.value,
                };
              });
            }}
            sx={{ gridArea: "a" }}
          />

          <TextField
            select
            label="Select a brand"
            name="brand"
            value={productData.brand}
            onChange={(e) => {
              setProductData((pre) => {
                return {
                  ...pre,
                  brand: e.target.value,
                };
              });
            }}
            sx={{ gridArea: "b" }}
          >
            <MenuItem value="apple">Apple</MenuItem>
            <MenuItem value="samsung">Samsung</MenuItem>
            <MenuItem value="huawei">Huawei</MenuItem>
          </TextField>

          <TextField
            multiline
            maxRows={6}
            label="Product description"
            name="inputDescription"
            value={productData.description}
            onChange={(e) => {
              setProductData((pre) => {
                return {
                  ...pre,
                  description: e.target.value,
                };
              });
            }}
            sx={{ gridArea: "c" }}
          />
          <TextField
            label="Price"
            name="productPrice"
            type="number"
            value={productData.price}
            onChange={(e) => {
              setProductData((pre) => {
                return {
                  ...pre,
                  price: e.target.value,
                };
              });
            }}
            sx={{ gridArea: "d" }}
          />

          <TextField
            label="Quantity"
            name="productQuantity"
            type="number"
            value={productData.quantity}
            onChange={(e) => {
              setProductData((pre) => {
                return {
                  ...pre,
                  quantity: e.target.value,
                };
              });
            }}
            sx={{ gridArea: "e" }}
          />
          <Box
            height={400}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              border: "1px solid",
              borderColor: "#bbbbbb",
              borderRadius: "4px",
              overflow: "hidden",
              px: 36,
              gridArea: "f",
            }}
          >
            {productData.image ? (
              <Box
                component="img"
                src={productData.image}
                alt="product image"
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "block",
                  objectFit: "cover",
                }}
              />
            ) : (
              <CloudUploadOutlinedIcon
                sx={{
                  color: "#bbbbbb",
                  fontSize: theme.typography.h1.fontSize,
                }}
              />
            )}
          </Box>
          <Button
            color="primary"
            aria-label="upload picture"
            component="label"
            sx={{
              gridArea: "g",
              py: 1.5,
              fontWeight: 500,
              color: theme.palette.secondary.main,
              backgroundColor: theme.palette.secondary.light,
              fontSize: theme.typography.h6.fontSize,
              textTransform: "capitalize",
              ":hover": {
                color: theme.palette.background.default,
                backgroundColor: theme.palette.secondary[200],
              },
            }}
          >
            Upload image
            <input
              hidden
              accept="image/*"
              type="file"
              name="productImage"
              onChange={handleUploadImage}
            />
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{
              gridArea: "h",
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
            Add Product
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AddProducts;
