import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import DashboardCustomizeOutlinedIcon from "@mui/icons-material/DashboardCustomizeOutlined";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import TravelExploreOutlinedIcon from "@mui/icons-material/TravelExploreOutlined";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

const navItems = [
  {
    text: "Navigation",
    icon: null,
  },
  {
    text: "Dashboard",
    icon: <DashboardCustomizeOutlinedIcon />,
  },
  {
    text: "Customer Facing",
    icon: null,
  },
  {
    text: "Products",
    icon: <ShoppingCartOutlinedIcon/>,
  },
  {
    text: "Customers",
    icon: <GroupsOutlinedIcon />,
  },
  {
    text: "Transactions",
    icon: <PaidOutlinedIcon />,
  },
  {
    text: "Geography",
    icon: <TravelExploreOutlinedIcon />,
  },
  {
    text: "Internal Facing",
    icon: null,
  },
  {
    text: "Add products",
    icon: <AddShoppingCartOutlinedIcon />,
  },
  {
    text: "Orders",
    icon: <ShoppingBagOutlinedIcon />,
  },
  {
    text: "Emails",
    icon: <EmailOutlinedIcon />,
  },
  {
    text: "Admin",
    icon: null,
  },
  {
    text: "Profile",
    icon: <ManageAccountsOutlinedIcon />,
  },
];

export default navItems;
