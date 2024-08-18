import { useEffect, useState } from "react";
import Heading from "../../components/pageHeading/heading";

import { useSelector } from "react-redux";
import UserSideBar from "../../components/sidebar/userSidebar";
import { CustomerReducerInitialState } from "../../types/reducerType";

import { useNavigate } from "react-router-dom";
import Breadcrumb from "../../components/breadcrumb/breadcrumb";
import { getProductForWishList } from "../../redux/api/customerApi";
import { ItemsTypeCart } from "../../types/apiTypes";
import SearchCard from "../search/searchCard";

const MyWishList = () => {
  const navigate = useNavigate();
  const { customer } = useSelector(
    (state: { customerReducer: CustomerReducerInitialState }) =>
      state.customerReducer
  );
  const [wishList, setWishList] = useState<ItemsTypeCart[] | []>([]);
  const [itemsPerRow, setItemsPerRow] = useState(5); // Default to 3 items per row
  console.log(wishList);
  console.log(itemsPerRow);
  console.log(customer);

  useEffect(() => {
    if (!customer) navigate("/");
    const getWishListData = async () => {
      let wishListData: Promise<any>[] = []; // Initialize as an empty array
      if (customer?.wishList) {
        wishListData = customer.wishList.map(async (id) => {
          let wishListItem = await getProductForWishList(id);
          return wishListItem;
        });
      }
      Promise.all(wishListData).then((data) => setWishList(data));
    };

    getWishListData();
  }, [customer]);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      // setScreenWidth(width);
      if (width < 768) {
        setItemsPerRow(2); // Set items per row to 1 if screen width is less than 768px
      } else {
        setItemsPerRow(5); // Otherwise, set it to default (3)
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="userContainer">
      <UserSideBar />
      <main>
        <Breadcrumb />
        <Heading name="WishList" />
        <section className="categoryDivisionSection">
          {wishList.map((item) => (
            <SearchCard {...item} key={item._id} />
          ))}
        </section>
      </main>
    </div>
  );
};

export default MyWishList;

// import { useEffect, useState } from "react";
// import Heading from "../../components/pageHeading/heading";

// import { useSelector } from "react-redux";
// import { Column } from "react-table";
// import UserSideBar from "../../components/sidebar/userSidebar";
// import { CustomerReducerInitialState } from "../../types/reducerTypes";

// import { BsCartPlus } from "react-icons/bs";
// import { useNavigate } from "react-router-dom";
// import TableHOC from "../../components/table/tableHOC";
// import Tooltip from "../../components/tooltip/tooltip";
// import { addedToLocalStorageCart } from "../../features/addedLocalStorageCart";
// import { server } from "../../redux/store";
// import { CartItemType, ItemsType, VariationType } from "../../types/apiTypes";
// import { Color, Item } from "../../types/types";
// import Breadcrumb from "../../components/breadcrumb/breadcrumb";

// // columns for TableHOC
// const columns: Column<Item>[] = [
//   {
//     Header: "Photo",
//     accessor: "displayImage",
//   },
//   {
//     Header: "Name",
//     accessor: "name",
//   },
//   {
//     Header: "Description",
//     accessor: "description",
//   },
//   {
//     Header: "Category",
//     accessor: "category",
//   },
//   {
//     Header: "Variations",
//     accessor: "variations",
//   },
//   {
//     Header: "Action",
//     accessor: "action",
//   },
// ];

// const MyWishList = () => {
//   const navigate = useNavigate();
//   const { customer } = useSelector(
//     (state: { customerReducer: CustomerReducerInitialState }) =>
//       state.customerReducer
//   );
//   const [rows, setRows] = useState<any[]>([]);

//   const handleAddtoCart = (
//     // e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
//     item: ItemsType
//   ) => {
//     const isMultiColor = item.variations.some(
//       (v: VariationType) => v.colors.map((c: Color) => c._id).length > 1
//     );
//     // console.log(isMultiColor);
//     if (item.variations.length > 1 || isMultiColor) {
//       navigate(`/search/${item.name}`, { state: { item } });
//     } else {
//       //If there is Only one variation
//       const addtoCartItem: CartItemType = {
//         items: [
//           {
//             _id: item._id,
//             name: item.name,
//             description: item.description,
//             image: item.productImage,
//             category: item.category,
//             purchaseQuantity: 1,
//             totalPrice: 0,
//             variations: {
//               _id: item.variations.length > 0 ? item.variations[0]._id : "",
//               name: item.variations.length > 0 ? item.variations[0].name : "",
//               description:
//                 item.variations.length > 0
//                   ? item.variations[0].description
//                   : "",
//               actualPrice:
//                 item.variations.length > 0 ? item.variations[0].actualPrice : 0,
//               offerPrice:
//                 item.variations.length > 0 ? item.variations[0].offerPrice : 0,
//               colors: {
//                 _id:
//                   item.variations[0].colors.length > 0
//                     ? item.variations[0].colors[0]._id
//                     : "",
//                 details: {
//                   _id: item.variations[0].colors[0].details
//                     ? item.variations[0].colors[0].details._id
//                     : "",
//                   name: item.variations[0].colors[0].details
//                     ? item.variations[0].colors[0].details.name
//                     : "",
//                   hexCode: item.variations[0].colors[0].details
//                     ? item.variations[0].colors[0].details.hexCode
//                     : "",
//                   createdAt: item.variations[0].colors[0].details
//                     ? item.variations[0].colors[0].details.createdAt
//                     : "",
//                 },
//                 images:
//                   item.variations[0].colors.length > 0
//                     ? item.variations[0].colors[0].images
//                     : [],
//                 quantity:
//                   item.variations[0].colors.length > 0
//                     ? item.variations[0].colors[0].quantity
//                     : 0,
//                 /* assuming Color type is defined */
//               },
//               createdAt:
//                 item.variations.length > 0 ? item.variations[0].createdAt : "",
//             },
//           },
//         ],
//       };
//       addedToLocalStorageCart(addtoCartItem.items[0]);
//     }

//     // console.log(e);
//     // console.log(item);
//   };

//   useEffect(() => {
//     if (customer && customer.wishList) {
//       console.log(customer.wishList);
//       setRows(
//         customer.wishList.map((i) => ({
//           _id: i._id,
//           displayImage: (
//             <img
//               key={i._id}
//               src={`${server}/${
//                 typeof i.productImage === "object" ? i.productImage[0].url : ""
//               }`}
//               alt={i.name}
//             />
//           ),
//           name: i.name,
//           description: i.description,
//           category: i.category ? (
//             Array.isArray(i.category) ? (
//               i.category.map((c: any) => (
//                 <Tooltip
//                   key={c._id}
//                   text={c?.name ? `${c.name}` : "No details found"}
//                   length="large"
//                   position="down"
//                 >
//                   <span
//                     className="multiColumnItem"
//                     style={{ cursor: "pointer" }}
//                   >
//                     {c.name}
//                   </span>
//                 </Tooltip>
//               ))
//             ) : null
//           ) : (
//             <p></p>
//           ),
//           variations: Array.isArray(i.variations)
//             ? i.variations.map((v: any) => (
//                 <Tooltip
//                   key={v._id}
//                   text={
//                     v?.name
//                       ? `${v.name} (${v.colors.length} colors added)`
//                       : "No details found"
//                   }
//                   length="large"
//                   position="down"
//                 >
//                   <span
//                     className="multiColumnItem"
//                     style={{ cursor: "pointer" }}
//                   >
//                     {v.name}
//                   </span>
//                 </Tooltip>
//               ))
//             : null,
//           createdAt: i.createdAt
//             ? new Date(i.createdAt).toLocaleDateString("en-gb", {
//                 month: "long",
//                 day: "numeric",
//                 year: "numeric",
//               })
//             : "",
//           action: (
//             <div className="tableActions">
//               <Tooltip text="M" length="small" position="down">
//                 <BsCartPlus onClick={() => handleAddtoCart(i)} />
//               </Tooltip>
//             </div>
//           ),
//         }))
//       );
//     }
//   }, [customer]);

//   // creating the hoc with passing props to it
//   const Table = TableHOC<Item>(
//     columns,
//     rows,
//     "dashboardProductBox",
//     "",
//     rows.length > 10
//   )();

//   return (
//     <div className="userContainer">
//       <UserSideBar />
//       <main>
//         <Breadcrumb />
//         <Heading name="WishList" />
//         <section className="wishListContainer">{Table}</section>
//       </main>
//     </div>
//   );
// };

// export default MyWishList;
