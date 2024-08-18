//Material Icons
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import { AiTwotoneGold } from "react-icons/ai";
import { RiCustomerService2Line } from "react-icons/ri";
import { BiSolidReport, BiLogoDailymotion } from "react-icons/bi";
import { TbReportMoney, TbReport } from "react-icons/tb";
import { FiUsers } from "react-icons/fi";
import { HiOutlineDocumentReport } from "react-icons/hi";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

export const sideBarData = [
  {
    title: "Purchase",
    path: "/purchase",
    icon: <ShoppingCartIcon />,
    cName: "nav-text",
    // roles: ["admin", "user", "Administrator"],
    permission: "Purchase Gold",
  },
  {
    title: "Trade",
    path: "/trade",
    icon: <TrendingDownIcon />,
    cName: "nav-text",
    // roles: ["admin", "user", "Administrator"],
    permission: "Trade Gold",
  },
  {
    title: "Purchase Report",
    path: "/admin/report/true",
    icon: <TbReportMoney />,
    cName: "nav-text",
    // roles: ["admin", "user", "Administrator"],
    permission: "View Purchase Report",
  },
  {
    title: "Trade Report",
    path: "/admin/report/false",
    icon: <TbReport />,
    cName: "nav-text",
    // roles: ["admin", "user", "Administrator"],
    permission: "View Trade Report",
  },
  // {
  //   title: "Gold Excess/Less",
  //   path: "/goldExcessLess",
  //   icon: <AiTwotoneGold />,
  //   cName: "nav-text",
  //   roles: ["admin", "user"],
  // },
  // {
  //   title: "Customer",
  //   path: "/customer",
  //   icon: <RiCustomerService2Line />,
  //   cName: "nav-text",
  //   roles: ["admin", "user"],
  // },
  {
    title: "Customer Records",
    path: "/customerReport",
    icon: <BiSolidReport />,
    cName: "nav-text",
    // roles: ["admin", "user", "Administrator"],
    permission: "View Customer Report",
  },
  {
    title: "Dailly Entry Record",
    path: "/dailyEntryReport",
    icon: <HiOutlineDocumentReport />,
    cName: "nav-text",
    // roles: ["admin", "user", "Administrator"],
    permission: "View Daily Entry Report",
  },

  // {
  //   title: "Dailly Entry",
  //   path: "/thermalPrintComponent",
  //   icon: <BiLogoDailymotion />,
  //   cName: "nav-text",
  //   roles: ["admin", "user"],
  // },

  {
    title: "Users List",
    path: "admin/unverifiedUserList",
    icon: <FiUsers />,
    cName: "nav-text",
    // roles: ["admin", "user", "Administrator"],
    permission: "View User",
  },
  // {
  //   title: "roles",
  //   path: "/rolesTable",
  //   icon: <ManageAccountsIcon />,
  //   cName: "nav-text",
  //   roles: ["admin", "user", "Administrator"],
  // },
  // {
  //   title: "Tasks",
  //   path: "/taskTable",
  //   icon: <FiUsers />,
  //   cName: "nav-text",
  //   roles: ["admin", "user"],
  // },
];
