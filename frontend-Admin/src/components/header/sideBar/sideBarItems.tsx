import { ReactNode } from "react";
export interface MenuItemDetail {
  name: string;
  path: string;
  permission: string;
  icon?: ReactNode;
  cName?: string;
}

export interface MenuItem {
  name: string;
  icon: ReactNode;
  cName?: string;
  roles: string[];
  items: MenuItemDetail[];
}
export const menuItems: MenuItem[] = [
  {
    name: `records`,
    icon: (
      <img
        width="20"
        height="20"
        src="https://img.icons8.com/3d-fluency/20/documents.png"
        alt="documents"
      />
    ),
    cName: "nav-text",
    roles: ["Admin", "Administrator", "superAdmin", "Salesman"],
    items: [
      {
        name: "items",
        path: "/products",
        permission: "View Product",
        icon: (
          <img
            width="20"
            height="20"
            src="https://img.icons8.com/fluency/20/fast-moving-consumer-goods.png"
            alt="fast-moving-consumer-goods"
          />
        ),
      },
      // {
      //   name: "variation",
      //   path: "/variation",
      //   permission: "View Product",
      //   icon: (
      //     <img
      //       width="20"
      //       height="20"
      //       src="https://img.icons8.com/fluency/20/variation.png"
      //       alt="variation"
      //     />
      //   ),
      // },
      // {
      //   name: "variationOptions",
      //   path: "/variationOption",
      //   permission: "View Product",
      //   icon: (
      //     <img
      //       width="20"
      //       height="20"
      //       src="https://img.icons8.com/fluency/20/diversity--v1.png"
      //       alt="diversity--v1"
      //     />
      //   ),
      // },
      {
        name: "category",
        path: "/category",
        permission: "View Product",
        icon: (
          <img
            width="20"
            height="20"
            src="https://img.icons8.com/nolan/20/sorting-answers.png"
            alt="sorting-answers"
          />
        ),
      },
    ],
  },
  {
    name: `user`,
    icon: (
      <img
        width="20"
        height="20"
        src="https://img.icons8.com/3d-fluency/20/user-group-woman-woman--v2.png"
        alt="user-group-woman-woman--v2"
      />
    ),
    cName: "nav-text",
    roles: ["Admin", "Administrator", "superAdmin", "Salesman"],
    items: [
      {
        name: "newUsers",
        path: "/manageUserProfile",
        permission: "View Product",
        icon: (
          <img
            width="20"
            height="20"
            src="https://img.icons8.com/fluency/20/add-user-male.png"
            alt="add-user-male"
          />
        ),
      },
      {
        name: "viewUsers",
        path: "/users",
        permission: "View Product",
        icon: (
          <img
            width="20"
            height="20"
            src="https://img.icons8.com/fluency/20/find-user-male.png"
            alt="find-user-male"
          />
        ),
      },
    ],
  },
  {
    name: `Discounts`,
    icon: (
      <img
        width="20"
        height="20"
        src="https://img.icons8.com/3d-fluency/20/discount.png"
        alt="discount"
      />
    ),
    cName: "nav-text",
    roles: ["Admin", "Administrator", "superAdmin", "Salesman"],
    items: [
      {
        name: "Bulk Section Discounts",
        path: "/bulkDiscount",
        permission: "View Product",
        icon: (
          <img
            width="20"
            height="20"
            src="https://img.icons8.com/fluency/20/online-shop-sale.png"
            alt="online-shop-sale"
          />
        ),
      },
      {
        name: "Promo Codes",
        path: "/promoCodes",
        permission: "View Product",
        icon: (
          <img
            width="20"
            height="20"
            src="https://img.icons8.com/fluency/20/redeem.png"
            alt="redeem"
          />
        ),
      },
    ],
  },
  {
    name: `Gallery`,
    icon: (
      <img
        width="20"
        height="20"
        src="https://img.icons8.com/3d-fluency/20/stack-of-photos.png"
        alt="stack-of-photos"
      />
    ),
    cName: "nav-text",
    roles: ["Admin", "Administrator", "superAdmin", "Salesman"],
    items: [
      {
        name: "Slider",
        path: "/sliderGallery",
        permission: "View Product",
        icon: (
          <img
            width="20"
            height="20"
            src="https://img.icons8.com/3d-fluency/20/switch-on.png"
            alt="switch-on"
          />
        ),
      },
    ],
  },
  {
    name: `Customers`,
    icon: (
      <img
        width="20"
        height="20"
        src="https://img.icons8.com/clouds/20/crowd--v1.png"
        alt="crowd--v1"
      />
    ),
    cName: "nav-text",
    roles: ["Admin", "Administrator", "superAdmin", "OrderManager"],
    items: [
      {
        name: "View Customers",
        path: "/customers",
        permission: "View Product",
        icon: (
          <img
            width="20"
            height="20"
            src="https://img.icons8.com/bubbles/20/view-file--v1.png"
            alt="view-file--v1"
          />
        ),
      },
    ],
  },
  {
    name: `Orders`,
    icon: (
      <img
        width="20"
        height="20"
        src="https://img.icons8.com/3d-fluency/94/shopping-basket.png"
        alt="shopping-basket"
      />
    ),
    cName: "nav-text",
    roles: ["Admin", "Administrator", "superAdmin", "OrderManager"],
    items: [
      {
        name: "View Orders",
        path: "/orders",
        permission: "View Product",
        icon: (
          <img
            width="20"
            height="20"
            src="https://img.icons8.com/fluency/20/view-delivery.png"
            alt="view-delivery"
          />
        ),
      },
    ],
  },
  {
    name: `Settings`,
    icon: (
      <img
        width="20"
        height="20"
        src="https://img.icons8.com/3d-fluency/94/gear--v2.png"
        alt="gear--v2"
      />
    ),
    cName: "nav-text",
    roles: ["Admin", "Administrator", "superAdmin", "OrderManager"],
    items: [
      {
        name: "In App/Web Banners",
        path: "/promotionBanner",
        permission: "View Product",
        icon: (
          <img
            width="20"
            height="20"
            src="https://img.icons8.com/3d-fluency/94/old-shop.png"
            alt="old-shop"
          />
        ),
      },
      {
        name: "Branches",
        path: "/branches",
        permission: "View Product",
        icon: (
          <img
            width="20"
            height="20"
            src="https://img.icons8.com/3d-fluency/20/shop.png"
            alt="shop"
          />
        ),
      },
    ],
  },
];

// import { ReactNode } from "react";
// import { CiGrid41 } from "react-icons/ci";
// import { BiCategory } from "react-icons/bi";
// import { CiBoxes, CiViewColumn } from "react-icons/ci";
// import { MdProductionQuantityLimits } from "react-icons/md";
// import { HiOutlineUserGroup } from "react-icons/hi";
// import { LuGalleryHorizontal, LuUserPlus, LuUsers } from "react-icons/lu";
// import { GrGallery } from "react-icons/gr";
// import { IoCartOutline } from "react-icons/io5";
// import { BsCartCheck } from "react-icons/bs";
// import { FaUser, FaUserFriends } from "react-icons/fa";
// export interface MenuItemDetail {
//   name: string;
//   path: string;
//   permission: string;
//   icon?: ReactNode;
//   cName?: string;
// }

// export interface MenuItem {
//   name: string;
//   icon: ReactNode;
//   cName?: string;
//   roles: string[];
//   items: MenuItemDetail[];
// }
// export const menuItems: MenuItem[] = [
//   {
//     name: `records`,
//     icon: <CiGrid41 />,
//     cName: "nav-text",
//     roles: ["Admin", "Administrator", "superAdmin", "Salesman"],
//     items: [
//       {
//         name: "items",
//         path: "/products",
//         permission: "View Product",
//         icon: <MdProductionQuantityLimits />,
//       },
//       {
//         name: "variation",
//         path: "/variation",
//         permission: "View Product",
//         icon: <CiBoxes />,
//       },
//       {
//         name: "variationOptions",
//         path: "/variationOption",
//         permission: "View Product",
//         icon: <CiViewColumn />,
//       },
//       {
//         name: "category",
//         path: "/category",
//         permission: "View Product",
//         icon: <BiCategory />,
//       },
//     ],
//   },
//   {
//     name: `user`,
//     icon: <LuUsers />,
//     cName: "nav-text",
//     roles: ["Admin", "Administrator", "superAdmin", "Salesman"],
//     items: [
//       {
//         name: "newUsers",
//         path: "/manageUserProfile",
//         permission: "View Product",
//         icon: <LuUserPlus />,
//       },
//       {
//         name: "viewUsers",
//         path: "/users",
//         permission: "View Product",
//         icon: <HiOutlineUserGroup />,
//       },
//     ],
//   },
//   {
//     name: `Gallery`,
//     icon: <GrGallery />,
//     cName: "nav-text",
//     roles: ["Admin", "Administrator", "superAdmin", "Salesman"],
//     items: [
//       {
//         name: "Slider",
//         path: "/sliderGallery",
//         permission: "View Product",
//         icon: <LuGalleryHorizontal />,
//       },
//     ],
//   },
//   {
//     name: `Customers`,
//     icon: <FaUser />,
//     cName: "nav-text",
//     roles: ["Admin", "Administrator", "superAdmin", "OrderManager"],
//     items: [
//       {
//         name: "View Customers",
//         path: "/customers",
//         permission: "View Product",
//         icon: <FaUserFriends />,
//       },
//     ],
//   },
//   {
//     name: `Orders`,
//     icon: <IoCartOutline />,
//     cName: "nav-text",
//     roles: ["Admin", "Administrator", "superAdmin", "OrderManager"],
//     items: [
//       {
//         name: "View Orders",
//         path: "/orders",
//         permission: "View Product",
//         icon: <BsCartCheck />,
//       },
//     ],
//   },
//   {
//     name: `Settings`,
//     icon: (
//       <img
//         width="20"
//         height="20"
//         src="https://img.icons8.com/3d-fluency/94/gear--v2.png"
//         alt="gear--v2"
//       />
//     ),
//     cName: "nav-text",
//     roles: ["Admin", "Administrator", "superAdmin", "OrderManager"],
//     items: [
//       {
//         name: "In App/Web Banners",
//         path: "/promotionBanner",
//         permission: "View Product",
//         icon: (
//           <img
//             width="20"
//             height="20"
//             src="https://img.icons8.com/3d-fluency/94/old-shop.png"
//             alt="old-shop"
//           />
//         ),
//       },
//     ],
//   },
// ];
