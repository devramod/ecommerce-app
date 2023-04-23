import { Route, BrowserRouter, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material";

import Layout from "./layout/Layout";
import Home from "./page/Home";
import About from "./page/About";
import Contact from "./page/Contact";
import Login from "./page/Login";
import UserProfile from "./page/User/Profile"
import Register from "./page/Register";
import ProtectedRoute from "./ProtectedRoute";
import AdminLayout from "./layout/AdminLayout";
import Dashboard from "./page/admin/Dashboard";
import NotFound from "./page/404";
import AddProducts from "./page/admin/AddProducts";
import Products from "./page/admin/Products";
import { themeSettings } from "./theme";
import { setDataProduct } from "./state/productSlice";
import ProductPage from "./page/ProductPage";
import CheckoutSuccess from "./page/CheckoutSuccess";
import ProductDetails from "./page/admin/ProductDetails";
import Geography from "./page/admin/Geography";
import Customers from "./page/admin/Customers";
import Transactions from "./page/admin/Transactions";
import { isLoading } from "./state/productSlice";
import Orders from "./page/admin/Orders";
import Cart from "./page/Cart";
import Emails from "./page/admin/Emails";
import Profile from "./page/admin/Profile";
import UserLayout from "./layout/UserLayout";
import UserProfileInfo from "./page/User/UserProfileInfo";
import UserOrders from "./page/User/Orders";
import UserProducts from "./page/User/Products";

function App() {
  const dispatch = useDispatch();
  const theme = createTheme(themeSettings());

  useEffect(() => {
    const fetchProductData = async () => {
      const productData = await fetch(
        `${process.env.REACT_APP_SERVER_DOMAIN}/product`
      );
      const resData = await productData.json();
      dispatch(setDataProduct(resData));
      dispatch(isLoading(false));
    };

    return () => fetchProductData();
  }, []);

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/product/:productName" element={<ProductPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout-success" element={<CheckoutSuccess />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route element={<UserLayout />}>
            <Route
              path={`/user/:username/orders`}
              element={<ProtectedRoute children={<UserOrders />} />}
            />
            <Route
              path={`/user/:username/products`}
              element={<ProtectedRoute children={<UserProducts />} />}
            />
            <Route
              path={`/user/:username/profile`}
              element={<ProtectedRoute children={<UserProfileInfo />} />}
            />
            <Route
              path={`/user/:username/edit profile`}
              element={<ProtectedRoute children={<UserProfile />} />}
            />
          </Route>
          <Route element={<AdminLayout />}>
            <Route
              path={`/admin/:adminname/dashboard`}
              element={<ProtectedRoute children={<Dashboard />} />}
            />
            <Route
              path={`/admin/:adminname/add products`}
              element={<ProtectedRoute children={<AddProducts />} />}
            />
            <Route
              path={`/admin/:adminname/products`}
              element={<ProtectedRoute children={<Products />} />}
            />
            <Route
              path={`/admin/:adminname/:productid`}
              element={<ProtectedRoute children={<ProductDetails />} />}
            />
            <Route
              path={`/admin/:adminname/geography`}
              element={<ProtectedRoute children={<Geography />} />}
            />
            <Route
              path={`/admin/:adminname/customers`}
              element={<ProtectedRoute children={<Customers />} />}
            />
            <Route
              path={`/admin/:adminname/transactions`}
              element={<ProtectedRoute children={<Transactions />} />}
            />
            <Route
              path={`/admin/:adminname/orders`}
              element={<ProtectedRoute children={<Orders />} />}
            />
            <Route
              path={`/admin/:adminname/emails`}
              element={<ProtectedRoute children={<Emails />} />}
            />
            <Route
              path={`/admin/:adminname/profile`}
              element={<ProtectedRoute children={<Profile />} />}
            />
          </Route>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
