import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import { Image } from "mui-image";
import { Box, Divider, IconButton, Typography } from "@mui/material";
import toast from "react-hot-toast";
import NotFound from "../404";
import { deleteItem } from "../../state/productSlice";
import EditProduct from "../../component/adminComponents/EditProduct";
import { useTheme } from "@emotion/react";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";

const Products = () => {
  const { adminname } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const storeData = useSelector((state) => state);
  const theme = useTheme();

  const fname = storeData.user.user.fname.toLowerCase();
  const productList = storeData.product.productList;
  const loading = storeData.product.loading;
  
  if (adminname !== fname) {
    return <NotFound />;
  }

  const rows =
    productList &&
    productList.map((product) => {
      return {
        id: product._id,
        imageUrl: product.image,
        productName:
          `${product.name}`.charAt(0).toUpperCase() +
          `${product.name}`.slice(1),
        brand:
          `${product.brand}`.charAt(0).toUpperCase() +
          `${product.brand}`.slice(1),
        price: `$${product.price.toFixed(2)}`,
        quantity: product.quantity,
      };
    });

  const columns = [
    { field: "id", headerName: "Product ID", flex: 1 },
    {
      field: "imageUrl",
      headerName: "Image",
      flex: 0.5,
      renderCell: (params) => {
        return (
          <Box component="div" height="80px" width="80px">
            <Image src={params.row.imageUrl} sx={{ borderRadius: "8px" }} />
          </Box>
        );
      },
    },
    { field: "productName", headerName: "Name", flex: 1 },
    {
      field: "brand",
      headerName: "Brand",
      flex: 0.4,
    },
    {
      field: "price",
      headerName: "Price",
      flex: 0.4,
    },
    {
      field: "quantity",
      headerName: "Status",
      flex: 0.5,
      renderCell: (params) => {
        if (params.row.quantity === 0) {
          return (
            <Box
              component="span"
              sx={{
                backgroundColor: theme.palette.error.light,
                px: "8px",
                py: "4px",
                borderRadius: "4px",
              }}
            >
              <Typography
                sx={{
                  color: theme.palette.error.main,
                  fontSize: theme.typography.fontSize,
                  fontWeight: "400",
                }}
              >
                Out of stock
              </Typography>
            </Box>
          );
        } else {
          return (
            <Box
              component="span"
              sx={{
                backgroundColor: theme.palette.success.light,
                px: "8px",
                py: "4px",
                borderRadius: "4px",
              }}
            >
              <Typography
                sx={{
                  color: theme.palette.success[700],
                  fontSize: theme.typography.fontSize,
                  fontWeight: "400",
                }}
              >
                In stock
              </Typography>
            </Box>
          );
        }
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      flex: 0.6,
      renderCell: (params) => {
        return (
          <Box
            component="div"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <IconButton
              onClick={() => deleteProduct(params)}
              size="small"
              sx={{
                color: theme.palette.error.main,
                ":hover": {
                  color: theme.palette.background.default,
                  backgroundColor: theme.palette.error.main,
                },
              }}
            >
              <DeleteIcon />
            </IconButton>
            <EditProduct productId={params.row.id} />
            <IconButton
              onClick={() => navigate(`/admin/${fname}/${params.row.id}`)}
              size="small"
              sx={{
                color: theme.palette.neutral.main,
                ":hover": {
                  color: theme.palette.background.default,
                  backgroundColor: theme.palette.neutral.main,
                },
              }}
            >
              <VisibilityIcon />
            </IconButton>
          </Box>
        );
      },
    },
  ];

  const deleteProduct = async (params) => {
    const deleteData = await fetch(
      `${process.env.REACT_APP_SERVER_DOMAIN}/admin/find/${params.row.id}`,
      {
        method: "DELETE",
      }
    );
    const resData = await deleteData.json();
    toast(resData.message);
    dispatch(deleteItem(params.row.id));
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
          Product list
        </Typography>
        <Divider
          sx={{
            color: theme.palette.grey[900],
            mb: "24px",
          }}
        />
        <div style={{ height: 400, width: "100%", overflow: "auto" }}>
          <DataGrid
            rows={rows}
            rowHeight={100}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            loading={loading}
            checkboxSelection
          />
        </div>
      </Box>
    </Box>
  );
};

export default Products;
