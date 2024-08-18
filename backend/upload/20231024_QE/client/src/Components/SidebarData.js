import React from "react";
import * as iconss from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as IoIcons5 from "react-icons/io5";
import { BiTransfer } from "react-icons/bi";
import { FaUserTie } from "react-icons/fa";
import { SiExpensify, SiChakraui } from "react-icons/si";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { useTranslation } from "react-i18next";
import MoneyIcon from "@mui/icons-material/Money";
import {
  HiOutlineCurrencyDollar,
  HiOutlineOfficeBuilding,
} from "react-icons/hi";
import { RiProductHuntLine } from "react-icons/ri";
// import { BiStoreAlt } from "react-icons/gr";
import { BiStoreAlt } from "react-icons/bi";
import "./sidebar.css";
export const SidebarData = [
  {
    title: `records`,
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
    roles: ["Admin", "Administrator", "superAdmin"],
    subItems: [
      {
        title: "product",
        path: "/Record",
        icon: <AiIcons.AiFillHome />,
        cName: "nav-text",
        // roles: ["Admin", "Salesman", "superAdmin", "Administrator"],
        permission: "View Product",
      },
      {
        title: "Color",
        path: "/color",
        icon: <IoIcons5.IoColorPaletteSharp />,
        cName: "nav-text",
        // roles: ["superAdmin", "Administrator"],
        permission: "View Color",
      },
      {
        title: "Company",
        path: "/company",
        icon: <HiOutlineOfficeBuilding />,
        cName: "nav-text",
        // roles: ["superAdmin", "Administrator"],
        permission: "View Company",
      },
      {
        title: "Godowns",
        path: "/godownrecord",
        icon: <BiStoreAlt />,
        cName: "nav-text",
        // roles: ["superAdmin", "Administrator"],
        permission: "View Godown",
      },
      {
        title: "Shops",
        path: "/shopRecord",
        icon: <BiStoreAlt />,
        cName: "nav-text",
        // roles: ["superAdmin", "Administrator"],
        permission: "View Shop",
      },
      {
        title: "Product Type",
        path: "/recordType",
        icon: <RiProductHuntLine />,
        cName: "nav-text",
        // roles: [, "superAdmin", "Administrator"],
        permission: "View Product Type",
      },
      {
        title: "Product Location",
        path: "/recordLocation",
        icon: <RiProductHuntLine />,
        cName: "nav-text",
        // roles: ["superAdmin", "Administrator", "Admin"],
        permission: "View Product Location",
      },
    ],
  },
  {
    title: "products Activity",
    icon: <HiOutlineCurrencyDollar />,
    cName: "nav-text",
    roles: ["Admin", "Administrator", "Salesman"],

    subItems: [
      {
        title: "Purchase Product",
        path: "/PurchaseRecipt",
        icon: <HiOutlineCurrencyDollar />,
        cName: "nav-text",
        // roles: ["superAdmin", "Admin", "Administrator", "Salesman"],
        permission: "Can Purchase Product",
      },
      {
        title: "Sale Product",
        path: "/saleproduct",
        icon: <HiOutlineCurrencyDollar />,
        cName: "nav-text",
        // roles: ["superAdmin", "Admin", "Administrator", "Salesman"],
        permission: "Can Sale Product",
      },
      {
        title: "Transfer Product",
        path: "/TransferRecordd",
        icon: <BiTransfer />,
        cName: "nav-text",
        // roles: ["superAdmin", "Admin", "Administrator", "Salesman"],
        permission: "Can Transfer Product",
      },
    ],
  },

  {
    title: "Pendings",
    icon: <HiOutlineCurrencyDollar />,
    cName: "nav-text",
    roles: ["superAdmin", "Admin", "Administrator", "Salesman"],

    subItems: [
      {
        title: "Purchase Pendings",
        path: "/tempPurchasePendings",
        icon: <HiOutlineCurrencyDollar />,
        cName: "nav-text",
        // roles: ["Admin", "superAdmin", "Administrator"],
        permission: "View Pending Purchase",
      },
      {
        title: "Sale Pendings",
        path: "/tempSalePendings",
        icon: <HiOutlineCurrencyDollar />,
        cName: "nav-text",
        // roles: ["Admin", "superAdmin", "Administrator"],
        permission: "View Pending Sale",
      },
      {
        title: "Transfer Pendings",
        path: "/tempTransferPendings",
        icon: <HiOutlineCurrencyDollar />,
        cName: "nav-text",
        // roles: ["Admin", "superAdmin", "Administrator"],
        permission: "View Pending Transfer",
      },
    ],
  },

  {
    title: "Invoices",
    icon: <iconss.FaFileInvoice />,
    cName: "nav-text",
    roles: ["superAdmin", "Admin", "Administrator", "Salesman"],

    subItems: [
      {
        title: "Purchase Invoice",
        path: "/purchaseRecord",
        icon: <iconss.FaFileInvoice />,
        cName: "nav-text",
        // roles: ["Admin", "superAdmin", "Administrator"],
        permission: "View Purchase Invoice",
      },
      {
        title: "Sales Invoice",
        path: "/Salerecord",
        icon: <iconss.FaFileInvoice />,
        cName: "nav-text",
        // roles: ["Salesman", "Admin", "superAdmin", "Administrator"],
        permission: "View Sale Invoice",
      },
      {
        title: "Transfer Invoice",
        path: "/TranferPreview",
        icon: <iconss.FaFileInvoiceDollar />,
        cName: "nav-text",
        // roles: ["Admin", "superAdmin", "Administrator"],
        permission: "View Transfer Invoice",
      },
      {
        title: "Expense Invoice",
        path: "/expenseInvoice",
        icon: <LiaFileInvoiceDollarSolid />,
        cName: "nav-text",
        // roles: ["Admin", "superAdmin", "Administrator"],
        permission: "View Expense Invoice",
      },
      {
        title: "Commission Invoice",
        path: "/paidEmployeCommission",
        icon: <LiaFileInvoiceDollarSolid />,
        cName: "nav-text",
        // roles: ["Admin", "superAdmin", "Administrator"],
        permission: "View Commission Invoice",
      },
    ],
  },

  {
    title: "Expenses",
    icon: <SiExpensify />,
    cName: "nav-text",
    roles: ["Admin", "superAdmin", "Administrator"],

    subItems: [
      {
        title: "Expense",
        path: "/expensee",
        icon: <SiExpensify />,
        cName: "nav-text",
        // roles: ["Admin", "superAdmin", "Administrator"],
        permission: "Can Add Expense",
      },
      {
        title: "Expense Type",
        path: "/expense",
        icon: <SiChakraui />,
        cName: "nav-text",
        // roles: [, "superAdmin", "Administrator"],
        permission: "View Expense Type",
      },
    ],
  },
  {
    title: "Commission",
    icon: <MoneyIcon />,
    cName: "nav-text",
    roles: ["Admin", "Administrator", "superAdmin", "Salesman"],

    subItems: [
      {
        title: "Commission Report",
        path: "/ProfitSalesman",
        icon: <MoneyIcon />,
        cName: "nav-text",
        // roles: ["Admin", "Administrator", "superAdmin", "Salesman"],
        permission: "View Commission Report",
      },
    ],
  },
  {
    title: "Excel To Table",
    icon: <MoneyIcon />,
    cName: "nav-text",
    roles: ["superAdmin"],
    permission: "",

    subItems: [
      {
        title: "Colors",
        path: "/colorTableToExcel",
        icon: <MoneyIcon />,
        cName: "nav-text",
        // roles: ["superAdmin"],
        permission: "superAdmin",
      },
      {
        title: "Company",
        path: "/companyTableToExcel",
        icon: <MoneyIcon />,
        cName: "nav-text",
        // roles: ["superAdmin"],
        permission: "superAdmin",
      },
      {
        title: "Product Types",
        path: "/productTypeTableToExcel",
        icon: <MoneyIcon />,
        cName: "nav-text",
        // roles: ["superAdmin"],
        permission: "superAdmin",
      },
      {
        title: "Products",
        path: "/productsTableToExcel",
        icon: <MoneyIcon />,
        cName: "nav-text",
        // roles: ["superAdmin"],
        permission: "superAdmin",
      },
    ],
  },
  {
    title: "Consolidated",
    icon: <LiaFileInvoiceDollarSolid />,
    cName: "nav-text",
    roles: ["Admin", "superAdmin", "Administrator"],

    subItems: [
      {
        title: "Sales Invoices",
        path: "/consolidatedSalesReport",
        icon: <LiaFileInvoiceDollarSolid />,
        cName: "nav-text",
        // roles: ["Admin", "superAdmin", "Administrator"],
        permission: "View Consolidated Sale Invoice",
      },
      {
        title: "Purchase Invoices",
        path: "/consolidatedPuchaseReport",
        icon: <LiaFileInvoiceDollarSolid />,
        cName: "nav-text",
        // roles: ["Admin", "superAdmin", "Administrator"],
        permission: "View Consolidated Purchase Invoice",
      },
      {
        title: "Transfer Invoices",
        path: "/consolidatedTransferReport",
        icon: <LiaFileInvoiceDollarSolid />,
        cName: "nav-text",
        // roles: ["Admin", "superAdmin", "Administrator"],
        permission: "View Consolidated Transfer Invoice",
      },
      {
        title: "Expense Invoices",
        path: "/consolidatedExpenseReport",
        icon: <LiaFileInvoiceDollarSolid />,
        cName: "nav-text",
        // roles: ["Admin", "superAdmin", "Administrator"],
        permission: "View Consolidated Expense Invoice",
      },
    ],
  },
  {
    title: "User Settings",
    icon: <FaUserTie />,
    cName: "nav-text",
    roles: ["superAdmin", "Administrator"],

    subItems: [
      {
        title: "User Settings",
        path: "/usersList",
        icon: <FaUserTie />,
        cName: "nav-text",
        // roles: ["superAdmin", "Administrator"],
        permission: "View Users",
      },
    ],
  },
];
