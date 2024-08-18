import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import SkeletonLoader from "../../../components/loader/skeletonLoader";
import Heading from "../../../components/pageHeading/heading";
import UserSideBar from "../../../components/sidebar/userSidebar";
import { useSearchOrderQuery } from "../../../redux/api/orderApi";
import { server } from "../../../redux/store";
import { CustomError } from "../../../types/apiTypes";
import { CustomerReducerInitialState } from "../../../types/reducerType";
import Breadcrumb from "../../../components/breadcrumb/breadcrumb";
import { extractFirstTag } from "../../../features/utils";
import parse from "html-react-parser";

import noOrder from "../../../assets/noOrder.png";

const MyOrders = () => {
  const { customer } = useSelector(
    (state: { customerReducer: CustomerReducerInitialState }) =>
      state.customerReducer
  );
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [maxPrice, setMaxPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [pages, setPages] = useState(1);

  console.log(customer);

  const { isError, isLoading, data, error } = useSearchOrderQuery({
    category,
    page: pages,
    price: maxPrice,
    search,
    sort,
    customerId: customer?._id,
  });

  console.log(data);

  useEffect(() => {
    setSort("");
    setMaxPrice(0);
    setCategory("");
    setSearch("");
  }, []);

  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }

  console.log(data);

  return (
    <>
      {isLoading ? (
        <SkeletonLoader length={20} />
      ) : (
        <div className="userContainer">
          <UserSideBar />
          <main className="myordersContainer">
            <Breadcrumb />
            <Heading name="My Orders" />
            <section className="detailOrderContainer">
              {data && data.Items && data.Items.length > 0 ? (
                data.Items.map((item: any, index: any) => (
                  <div className="itemContainer" key={index}>
                    <section className="mainDetailContainer">
                      <h1>
                        Order ID: <span>{item.orderId}</span>
                      </h1>
                      <p>
                        Placed on:&nbsp;
                        {new Date(item.placedOn).toLocaleString()}
                      </p>
                    </section>
                    {item.items.map((product: any, index: any) => (
                      <div className="productsContainer" key={index}>
                        <div className="mainDetails">
                          <img
                            src={`${server}/${product?.productImage?.url}`}
                            alt={product.name}
                          />
                          <section className="productDetail">
                            <h1>{product.name}</h1>
                            <p>{parse(extractFirstTag(product.description))}</p>
                            <div className="variations">
                              {product?.variationRequired?.map(
                                (required: any, index: number) => (
                                  <div key={index}>
                                    <h5>{required.variationName}</h5>
                                    <p>1 X {required.name}</p>
                                  </div>
                                )
                              )}
                              {product?.variationOptions?.map(
                                (option: any, index: number) => (
                                  <div key={index}>
                                    <h5>{option.varName}</h5>
                                    {option.variation.map((opt: any) => (
                                      <p>1 X {opt.name}</p>
                                    ))}
                                  </div>
                                )
                              )}
                            </div>
                            {/* <p>Price: {product.offerPrice}</p> */}
                          </section>
                        </div>
                        <div className="secondaryDetails">
                          <section className="purchasesItems">
                            <h1>
                              Qty: <span>{product.quantity}</span>
                            </h1>
                          </section>
                          {item.status && (
                            <section
                              className={`statusName ${
                                item.status[item.status.length - 1]
                                  .statusName === "PENDING"
                                  ? "red"
                                  : "green"
                              }`}
                            >
                              <h1>
                                {item.status[
                                  item.status.length - 1
                                ].statusName.toLowerCase() === "recieved"
                                  ? "In Progress"
                                  : item.status[item.status.length - 1]
                                      .statusName}
                              </h1>
                            </section>
                          )}

                          {item.status && (
                            <section className="statusDate">
                              <h1>
                                {item.status[item.status.length - 1].statusName}{" "}
                                on{" "}
                                {new Date(
                                  item.status[item.status.length - 1].statusDate
                                ).toLocaleDateString()}
                              </h1>
                            </section>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ))
              ) : (
                <section className="noOrder">
                  <img src={noOrder} alt="" />
                  {/* <noOrder /> */}
                  <h1>No Orders Have Been Placed Yet</h1>
                </section>
              )}

              <div className="pagination">
                {data && data.totalPage > 1 && (
                  <article>
                    <button
                      onClick={() => setPages((prev) => prev - 1)}
                      disabled={pages < 2}
                    >
                      Prev
                    </button>
                    <span>
                      {pages} of {data.totalPage}
                    </span>
                    <button
                      onClick={() => setPages((prev) => prev + 1)}
                      disabled={pages > data.totalPage - 1}
                    >
                      Next
                    </button>
                  </article>
                )}
              </div>
            </section>
          </main>
        </div>
      )}
    </>
  );
};

export default MyOrders;
