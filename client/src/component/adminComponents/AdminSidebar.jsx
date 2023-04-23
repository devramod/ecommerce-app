import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import { ChevronLeft, ChevronRightOutlined } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import navItems from "./NavItems";
import { useSelector } from "react-redux";

const AdminSidebar = ({
  nonMobile,
  drawerWidth,
  sidebarOpen,
  setSidebarOpen,
}) => {
  const navigate = useNavigate();
  const [active, setActive] = useState("");
  const { pathname } = useLocation();
  const theme = useTheme();
  const userData = useSelector((state) => state);

  const fname = userData.user.user.fname.toLowerCase();

  useEffect(() => {
    let lengthAdminName = fname.length;
    let a = pathname.substring(7);
    let b = a.substring(lengthAdminName);
    let c = b.substring(1);

    setActive(c);
  }, [pathname, fname.length]);

  return (
    <Box component="nav">
      {sidebarOpen && (
        <Drawer
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              backgroundColor: theme.palette.background.default,
              boxSixing: "border-box",
              borderWidth: nonMobile ? 0 : "2px",
              width: drawerWidth,
              borderRight: 1,
              borderRightColor: theme.palette.grey[200],
            },
          }}
        >
          <Box width="100%">
            <Box p="16px 0 10px 24px">
              <FlexBetween color={theme.palette.grey[700]}>
                <Box display="flex" alignItems="center" gap="0.5rem">
                  <Typography
                    sx={{ fontSize: theme.typography.h3.fontSize }}
                    fontWeight="600"
                  >
                    Mobile Store
                  </Typography>
                </Box>
                {!nonMobile && (
                  <IconButton onClick={() => setSidebarOpen(!sidebarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>
            <List sx={{ paddingTop: "4px" }}>
              {navItems.map(({ text, icon }) => {
                if (!icon) {
                  return (
                    <Typography
                      key={text}
                      sx={{
                        p: "0 0 0 24px",
                        m: "12px 0",
                        fontSize: theme.typography.fontSize,
                        color: theme.palette.neutral.main,
                      }}
                    >
                      {text}
                    </Typography>
                  );
                }
                const lcText = text.toLowerCase();

                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate(`/admin/${fname}/${lcText}`);
                        setTimeout(() => {
                          setActive(lcText);
                        }, 1);
                      }}
                      sx={{
                        p: "8px 16px 8px 28px",
                        backgroundColor:
                          active === lcText
                            ? theme.palette.secondary.light
                            : "transparent",
                        color:
                          active === lcText
                            ? theme.palette.secondary.main
                            : theme.palette.grey[900],
                        borderRight: active === lcText ? 2 : 0,
                        borderRightColor:
                          active === lcText
                            ? theme.palette.secondary.main
                            : "none",
                        ":hover": {
                          backgroundColor: theme.palette.secondary.light,
                          borderRight: 2,
                          borderRightColor: theme.palette.secondary.main,
                        },
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: "36px",

                          color:
                            active === lcText
                              ? theme.palette.secondary.main
                              : theme.palette.grey[900],
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={text}
                        primaryTypographyProps={{
                          fontSize: theme.typography.h6.fontSize,
                        }}
                      />
                      {active === lcText && (
                        <ChevronRightOutlined
                          sx={{
                            ml: "auto",
                            color: theme.palette.secondary.main,
                          }}
                        />
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default AdminSidebar;
