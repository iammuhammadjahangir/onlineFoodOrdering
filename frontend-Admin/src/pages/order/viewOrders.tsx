import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { FaHouseUser } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdModeEdit, MdOutlinePayments } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Column } from "react-table";
import { statusDataPropDown } from "../../assets/data";
import SkeletonLoader from "../../components/loader/skeletonLoader";
import Container from "../../components/mainContainer/container";
import CustomModal from "../../components/model/customModel";
import Heading from "../../components/pageHeading/heading";
import { confirmationDialogue } from "../../components/swal/confirmDeny";
import TableHOC from "../../components/table/tableHOC";
import Tooltip from "../../components/tooltip/tooltip";
import { getPermissionsForRole } from "../../redux/api/assignTasks";
import {
  useProcessPaymentMutation,
  useSearchOrderQuery,
} from "../../redux/api/orderApi";
import { RootState } from "../../redux/store";
import { OrderResponse } from "../../types/apiTypes";
import { CustomError, OrderProps } from "../../types/types";
import OrderStatusDetails from "./orderStatusDetails";
import SelectedOrderCUstomer from "./selectedCustomer";
import SelectedOrderDetailsModal from "./selectedOrderDetailsModal";

// columns for TableHOC
const columns: Column<OrderProps>[] = [
  {
    Header: "Order ID",
    accessor: "orderID",
  },
  {
    Header: "Customer",
    accessor: "customer",
  },
  {
    Header: "Status",
    accessor: "orderStatus",
  },
  {
    Header: "Payment",
    accessor: "paymentStatus",
  },
  {
    Header: "Total",
    accessor: "orderTotal",
  },

  {
    Header: "cust Shipping",
    accessor: "customerShipping",
  },
  {
    Header: "owner Shipping",
    accessor: "ownerShipping",
  },
  // {
  //   Header: "Discount",
  //   accessor: "discount",
  // },
  {
    Header: "items",
    accessor: "itemsCount",
  },
  {
    Header: "Destination",
    accessor: "deliveryAddress",
  },
  // {
  //   Header: "Tracking",
  //   accessor: "TrackingNumber",
  // },
  {
    Header: "Placed On",
    accessor: "createdAt",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

const ViewOrders = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [maxPrice, setMaxPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [pages, setPages] = useState(1);
  const [canViewOrder, setCanViewOrder] = useState(false);
  const [canUpdateOrder, setCanUpdateOrder] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [isCustomerModal, setIsCustomerModal] = useState(false);
  const [selectedOrderItems, setSelectedOrderItems] = useState([]);
  const [selectedCustomerDetail, setSelectedCustomerDetail] = useState([]);
  const [selectedCustomerName, setSelectedCustomerName] = useState("");
  const [selectedOrderStatuses, setSelectedOrderStatuses] = useState([]);
  const [rows, setRows] = useState<OrderProps[]>([]);
  const [
    processPaymentStatus,
    {
      isError: processIsError,
      isSuccess: ProcessIsSuccess,
      error: ProcessError,
    },
  ] = useProcessPaymentMutation();
  const { user } = useSelector((state: RootState) => state.userReducer);

  const { isError, isLoading, data, error } = useSearchOrderQuery({
    category,
    page: pages,
    price: maxPrice,
    search,
    sort,
  });

  const closeDetailsModal = () => {
    setIsModalOpen(false);
  };
  const closeCustomerDetailsModal = () => {
    setIsCustomerModal(false);
  };
  const closeStatusModal = () => {
    setIsStatusModalOpen(false);
  };

  useEffect(() => {
    setCanViewOrder(false);
    setCanUpdateOrder(false);
    getPermission();
  }, []);
  async function getPermission() {
    try {
      const permissionForView = await getPermissionsForRole("View Order");
      setCanViewOrder(permissionForView);
      const permissionForUpdate = await getPermissionsForRole("Update Order");
      setCanUpdateOrder(permissionForUpdate);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

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

  if (processIsError) {
    const err = ProcessError as CustomError;
    toast.error(err.data.message);
  }

  console.log(data);

  const manageOrder = (item: OrderResponse) => {
    console.log(item);
    navigate("/ProcessOrder", {
      state: {
        id: item._id,
        statusName: item.status[item.status.length - 1].statusName,
        statusComment: item.status[item.status.length - 1].statusComment,
        items: item.items,
      },
    });
  };

  const viewOrderStatus = (e: any, item: OrderResponse) => {
    e.stopPropagation();
    setSelectedOrderStatuses(item?.status as any);
    setIsStatusModalOpen(true);
  };

  const handleRowClick = (i: any) => {
    console.log(i);
    setSelectedOrderItems(i?.items);
    setIsModalOpen(true);

    // navigate("/productDetail", { state: { item: i } });
  };
  const handleRowClickCustomer = (e: any, i: any) => {
    console.log(i);
    e.stopPropagation();
    console.log(i);
    const deliveryAddresses: any = i?.deliveryAddress
      ? [i.deliveryAddress]
      : [];
    console.log(deliveryAddresses);

    setSelectedCustomerDetail(deliveryAddresses);
    setSelectedCustomerName(i?.customerId?.name);
    setIsCustomerModal(true);
    // navigate("/productDetail", { state: { item: i } });
  };

  // creating the hoc with passing props to it
  const Table = TableHOC<OrderProps>(
    columns,
    rows,
    "dashboardProductBox",
    "",
    rows.length > (user?.tableRows || 10)
  )();

  const getStatusColor = (statusName: string) => {
    const status = statusDataPropDown.find((s: any) => s.value === statusName);
    return status ? status.color : "hsl(0, 0%, 50%)"; // Default color if status not found
  };

  const processPayment = (e: any, item: OrderResponse) => {
    e.stopPropagation();
    console.log(item);
    confirmationDialogue(
      () => processPaymentStatus({ id: item._id, paymentStatus: "Paid" }),
      t("processPaymentConfirmationBox"),
      t("processButtonText"),
      t("cancelButtonText"),
      t("savedButtonText"),
      t("statusPaymentNotChanged")
    );

    if (ProcessIsSuccess) toast.success("Payment status updated");
  };

  useEffect(() => {
    console.log("ddss");

    if (data) {
      console.log(data);
      // set rows for table

      setRows(
        data.Items.map((i) => ({
          _id: i._id,
          orderID: (
            <span onClick={() => handleRowClick(i)} className="ancharName">
              <Tooltip text={i?.orderId} length="large" position="down">
                {i?.orderId}
              </Tooltip>
            </span>
          ),
          customer: i.customerId?.name,
          orderStatus: (
            <span
              style={{
                backgroundColor: getStatusColor(
                  i.status[i?.status?.length - 1]?.statusName
                ),
                color: "white", // or any other contrasting color
                padding: "5px 10px",
                borderRadius: "5px",
              }}
            >
              {i?.status[i?.status?.length - 1]?.statusName}
            </span>
          ),
          paymentStatus: (
            <span
              style={{
                backgroundColor:
                  i.paymentStatus.toLowerCase() === "pending" ? "red" : "green",
                color: "white", // or any other contrasting color
                padding: "5px 10px",
                borderRadius: "5px",
              }}
            >
              {i?.paymentStatus}
            </span>
          ),
          orderTotal: i.grandTotalPrice,
          customerShipping: i.customerShippingFee,
          ownerShipping: i.ownerShippingFee,
          discount: i.discountPrice,
          itemsCount: i.items && i.items.length,
          createdAt: i.createdAt
            ? new Date(i.createdAt).toLocaleDateString("en-gb", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })
            : "",
          // TrackingNumber: i.TrackingNumber,
          deliveryAddress: i.deliveryAddress.city,
          action: (
            <div className="tableActions">
              {canUpdateOrder && (
                <Tooltip text="Change Status" length="small" position="down">
                  <MdModeEdit onClick={() => manageOrder(i)} />
                </Tooltip>
              )}
              <Tooltip text="View Status" length="small" position="down">
                <TbTruckDelivery onClick={(e) => viewOrderStatus(e, i)} />
              </Tooltip>

              {i.paymentStatus.toLowerCase() === "pending" && (
                <Tooltip text="Process Payment" length="small" position="down">
                  <MdOutlinePayments onClick={(e) => processPayment(e, i)} />
                </Tooltip>
              )}
              <Tooltip text="View Status" length="small" position="down">
                <FaHouseUser onClick={(e) => handleRowClickCustomer(e, i)} />
              </Tooltip>
            </div>
          ),
          onClick: () => handleRowClick(i),
        }))
      );
    }
  }, [data, canViewOrder, canUpdateOrder]);

  return (
    <>
      {isLoading ? (
        <SkeletonLoader length={20} />
      ) : (
        <>
          {true && (
            <Container>
              <section className="orderContainer">
                <header className="orderHeading">
                  <IoMdArrowRoundBack
                    onClick={() => {
                      navigate(-1);
                    }}
                  />
                  <Heading name="Orders" />
                </header>
                {isLoading ? <SkeletonLoader length={20} /> : Table}
                <div className="pagination">
                  {data && data.totalPage > 1 && (
                    <article>
                      <button
                        onClick={() => {
                          window.scroll(0, 0);
                          setPages((prev) => prev - 1);
                        }}
                        disabled={pages < 2}
                      >
                        Prev
                      </button>
                      <span>
                        {pages} of {data.totalPage}
                      </span>
                      <button
                        onClick={() => {
                          window.scroll(0, 0);
                          setPages((prev) => prev + 1);
                        }}
                        disabled={pages > data.totalPage - 1}
                      >
                        Next
                      </button>
                    </article>
                  )}
                </div>
              </section>
            </Container>
          )}
        </>
      )}
      {isModalOpen && (
        <CustomModal isOpen={isModalOpen} onClose={closeDetailsModal}>
          <SelectedOrderDetailsModal items={selectedOrderItems} />
        </CustomModal>
      )}
      {isCustomerModal && (
        <CustomModal
          isOpen={isCustomerModal}
          onClose={closeCustomerDetailsModal}
        >
          <SelectedOrderCUstomer
            customer={selectedCustomerDetail}
            name={selectedCustomerName}
          />
        </CustomModal>
      )}
      {isStatusModalOpen && (
        <CustomModal isOpen={isStatusModalOpen} onClose={closeStatusModal}>
          <OrderStatusDetails status={selectedOrderStatuses} />
        </CustomModal>
      )}
    </>
  );
};

export default ViewOrders;
