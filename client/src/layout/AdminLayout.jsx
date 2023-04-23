import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import AdminNavbar from "../component/adminComponents/AdminNavbar";
import { useState } from "react";
import AdminSidebar from "../component/adminComponents/AdminSidebar";
import { Toaster } from "react-hot-toast";

const AdminLayout = () => {
  const nonMobile = useMediaQuery("(min-width: 600px)");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <>
      <Toaster />
      <Box
        width="100%"
        height="100%"
        sx={{
          display: nonMobile ? "flex" : "block",
        }}
      >
        <AdminSidebar
          nonMobile={nonMobile}
          drawerWidth="250px"
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        <Box flexGrow={1}>
          <AdminNavbar
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
          <Outlet />
        </Box>
      </Box>
    </>
  );
};

export default AdminLayout;
