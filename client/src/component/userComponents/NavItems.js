import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

const navItems = [
  {
    text: "Account Settings",
    icon: null,
  },
  {
    text: "Profile",
    icon: <PersonOutlineOutlinedIcon />,
  },
  {
    text: "Edit Profile",
    icon: <ManageAccountsOutlinedIcon />,
  },
  {
    text: "Dashboard",
    icon: null,
  },
  {
    text: "Orders",
    icon: <ShoppingBagOutlinedIcon />,
  },
  {
    text: "Products",
    icon: <ShoppingCartOutlinedIcon />,
  },
];

export default navItems;
