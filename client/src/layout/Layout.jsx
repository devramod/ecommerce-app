import { Outlet } from "react-router-dom";
import Header from "../component/Header";
import { Toaster } from "react-hot-toast";
import { Box, } from "@mui/material";
import { useTheme } from "@emotion/react";
import Footer from "../component/Footer";

const Layout = () => {
  const theme = useTheme();

  return (
    <>
      <Toaster />
      <Box
        width="100%"
        height="100%"
        sx={{    
        }}
      >
        <Header />
        <main
          style={{
            width: "100%",
            backgroundColor: theme.palette.primary.light,
            minHeight: "calc(100vh)",
            paddingTop: "71px",
          }}
        >
          <Outlet />
        </main>
        <Footer />
      </Box>
    </>
  );
};

export default Layout;
