import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import UserSidebar from "../component/userComponents/UserSidebar";
import UserNavbar from "../component/userComponents/UserNavbar";

const UserLayout = () => {
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
        <UserSidebar
          nonMobile={nonMobile}
          drawerWidth="250px"
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        <Box flexGrow={1}>
          <UserNavbar
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
          <Outlet />
        </Box>
      </Box>
    </>
  );
};

export default UserLayout;
