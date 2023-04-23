import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import { Box, Divider, IconButton, MenuItem } from "@mui/material";
import toast from "react-hot-toast";
import { editItem } from "../../state/productSlice";
import EditIcon from "@mui/icons-material/Edit";
import { useTheme } from "@emotion/react";
import CloseIcon from "@mui/icons-material/Close";

async function ImagetoBase64(file) {
  const reader = new FileReader();
  reader.readAsDataURL(file);

  const data = new Promise((resolve, reject) => {
    reader.onload = () => resolve(reader.result);
    reader.onerror = (err) => reject(err);
  });

  return data;
}

const EditProduct = ({ productId }) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [productData, setProductData] = useState({
    name: "",
    brand: "",
    description: "",
    price: "",
    image: "",
    quantity: "",
  });
  const [currentProduct, setCurrentProduct] = useState({});
  const [previewImage, setPreviewImage] = useState("");
  const storeData = useSelector((state) => state);
  const dispatch = useDispatch();

  const productList = storeData.product.productList;

  const handleClickOpen = () => {
    setOpen(true);

    let selectedProduct = productList.filter(
      (product) => product._id === productId
    );

    selectedProduct = selectedProduct[0];

    setCurrentProduct(selectedProduct);
    setPreviewImage(selectedProduct.image);
    setProductData({
      ...productData,
      name: selectedProduct.name,
      brand: selectedProduct.brand,
      description: selectedProduct.description,
      price: selectedProduct.price,
      image: "",
      quantity: selectedProduct.quantity,
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    const { name, brand, description, price, quantity, image } = productData;

    if (name && brand && description && previewImage && quantity && price) {
      const fetchData = await fetch(
        `${process.env.REACT_APP_SERVER_DOMAIN}/admin/edit/${productId}`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            name,
            brand,
            description,
            price,
            image,
            previewImage,
            quantity,
          }),
        }
      );

      const fetchRes = await fetchData.json();

      toast(fetchRes.message);
      dispatch(editItem(fetchRes.data));
    } else {
      toast("Enter required Fields");
    }
  };

  return (
    <>
      <IconButton
        onClick={handleClickOpen}
        size="small"
        sx={{
          position: "relative",
          color: theme.palette.primary.main,
          ":hover": {
            color: theme.palette.background.default,
            backgroundColor: theme.palette.primary.main,
          },
        }}
      >
        <EditIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={"md"}
      >
        <Box sx={{ p: 3 }}>
          <DialogActions sx={{ position: "absolute", right: 0, top: 0 }}>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </DialogActions>
          <DialogTitle
            sx={{
              color: theme.palette.grey[900],
              fontWeight: "500",
              fontSize: theme.typography.h5.fontSize,
              p: 0,
              mb: "14px",
            }}
          >
            Edit Product
          </DialogTitle>
          <Divider
            sx={{
              color: theme.palette.grey[900],
              mb: "12px",
            }}
          />
          <DialogContent sx={{ px: 0 }}>
            <Box
              component="form"
              onSubmit={(e) => handleEdit(e)}
              width="100%"
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
                maxRows={4}
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
                height={300}
                width="100%"
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
                  onChange={async (e) => {
                    const data = await ImagetoBase64(e.target.files[0]);

                    setProductData((pre) => {
                      return {
                        ...pre,
                        image: data,
                      };
                    });
                    setPreviewImage(data);
                  }}
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
                Update Product
              </Button>
            </Box>
          </DialogContent>
        </Box>
      </Dialog>
    </>
  );
};

export default EditProduct;
