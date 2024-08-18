import { Fragment, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { IoMdAdd } from "react-icons/io";
import { MdAdd, MdDeleteOutline, MdEdit } from "react-icons/md";
import { useSelector } from "react-redux";
import { Column } from "react-table";
import Button from "../../components/button/button";
import SkeletonLoader from "../../components/loader/skeletonLoader";
import Container from "../../components/mainContainer/container";
import Modal from "../../components/model/animatedModal";
import Heading from "../../components/pageHeading/heading";
import { confirmationDialogue } from "../../components/swal/confirmDeny";
import TableHOC from "../../components/table/tableHOC";
import Tooltip from "../../components/tooltip/tooltip";
import {
  useDeleteProductMutation,
  useGetAllProductsQuery,
} from "../../redux/api/product";
import { RootState, server } from "../../redux/store";
import { CustomError, Item, ItemTableType } from "../../types/types";
import CreateProduct from "./createProduct";
import UpdateProduct from "./updateProduct";
import SubOption from "./subOptions/subOption";
import {
  useDeleteSubOptionMutation,
  useGetAllSubOptionsQuery,
  useGetSearchedSubOptionQuery,
} from "../../redux/api/subOptionAPI";

const columns: Column<ItemTableType>[] = [
  {
    Header: "Image",
    accessor: "Image",
    disableFilters: true,
    Cell: ({ value }: any) => (
      <img
        src={`${server}/${value}`}
        className="centerImage"
        alt="Category"
        style={{
          width: "auto",
          height: 50,
          objectFit: "contain",
          borderRadius: "5px",
        }}
      />
    ),
  },
  {
    Header: "Details",
    accessor: "Details",
  },
  {
    Header: (
      <div style={{ whiteSpace: "normal", textAlign: "center" }}>
        SKU/POS Mapping ID
        <br />
        (Delivery/TakeAway)
      </div>
    ),
    accessor: "SKUPOS",
  },
  {
    Header: "Price",
    accessor: "Price",
  },
  {
    Header: "Priority",
    accessor: "Priority",
  },
  {
    Header: "Action",
    accessor: "action",
    disableFilters: true,
  },
];

const ProductsRecord = () => {
  const { t } = useTranslation();
  const { user } = useSelector((state: RootState) => state.userReducer);
  const { data, isError, isLoading, error } = useGetAllProductsQuery();
  const { data: subOptionData } = useGetAllSubOptionsQuery();
  const [deleteSubOption] = useDeleteSubOptionMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const [rows, setRows] = useState<ItemTableType[]>([]);

  console.log(subOptionData);

  // For New Banner
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  // For New Banner

  // For update Banner
  const [isUpdateBannerOpen, setIsUpdateBannerOpen] = useState(false);
  const [selectedBannerItem, setSelectedBannerItem] = useState<Item>();

  const openUpdateBannerModal = () => {
    setIsUpdateBannerOpen(true);
  };

  const closeUpdateBannerModal = () => {
    setIsUpdateBannerOpen(false);
  };
  // For update Banner

  // For Sub Option
  const [isSubOptionOpen, setISubOptionOpen] = useState(false);
  const [selectedItemID, setSelectedItemID] = useState<string>();

  const openUpdateSubOptionModal = () => {
    setISubOptionOpen(true);
  };

  const closeUpdateSubOptionModal = () => {
    setISubOptionOpen(false);
  };
  // For update Banner

  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }

  const handleUpdate = (item: Item) => {
    // navigate("/updateProduct", { state: { item } });
    openUpdateBannerModal();
    setSelectedBannerItem(item);
  };

  const handleSubOption = (id: string) => {
    // navigate("/updateProduct", { state: { item } });
    openUpdateSubOptionModal();
    setSelectedItemID(id);
  };

  const handleDelete = (item: Item) => {
    confirmationDialogue(
      () => deleteProduct(item._id),
      t("deleteConfirmationText"),
      t("deleteButtonText"),
      t("cancelButtonText"),
      t("savedButtonText"),
      t("cancelDialogueText")
    );
  };

  const handleDeleteSubOption = (subOptionId: string) => {
    // Call your delete API or mutation here
    // Example:
    deleteSubOption(subOptionId)
      .then(() => {
        toast.success("Sub-option deleted successfully!");
      })
      .catch((error) => {
        toast.error("Error deleting sub-option");
      });

    console.log("Delete sub-option with ID:", subOptionId);
  };

  useEffect(() => {
    if (data && subOptionData) {
      setRows(
        data.allItems.map((i) => ({
          _id: i._id,
          Image: i.productImage.url,
          Details: (
            <section>
              <h4>{i.name}</h4>
              <p>{i.description}</p>
              <p className="subOptionContainer">
                {subOptionData.subOptions
                  .filter((sub) => sub.itemID?._id === i._id)
                  .map((sub) => (
                    <div className="subOptionItem" key={sub._id}>
                      <span>{sub.name}</span>
                      <span
                        className="cross"
                        onClick={() => handleDeleteSubOption(sub._id)}
                      >
                        X
                      </span>
                    </div>
                  ))}
              </p>
            </section>
          ),
          SKUPOS: (
            <section>
              <p>
                POS Mapping ID{" "}
                {i.deliveryBy === "customer" ? "(Takeaway)" : "(Delivery)"}
              </p>
              <h4>{i.skuPosMappingId}</h4>
            </section>
          ),
          Price: (
            <section>
              {i.priceType === "starting from" ? (
                <div>
                  <span>Starting from</span>
                  <span>
                    <strong>PKR</strong>
                    {i.price.toFixed(2)}
                  </span>
                </div>
              ) : (
                <div>
                  {i.discountPrice ? (
                    <div>
                      <span
                        style={{
                          textDecoration: "line-through",
                          marginRight: "10px",
                        }}
                      >
                        <strong>PKR</strong>
                        {i.price.toFixed(2)}
                      </span>
                      <span>
                        <strong>PKR</strong>
                        {i?.discountPrice?.toFixed(2)}
                      </span>
                    </div>
                  ) : (
                    <div>
                      <strong>PKR</strong>
                      {i?.price?.toFixed(2)}
                    </div>
                  )}
                </div>
              )}
            </section>
          ),
          Priority: i.priority.toString(),
          action: (
            <div className="tableActions">
              <Tooltip text="Update" length="small" position="down">
                <MdEdit onClick={() => handleUpdate(i)} />
              </Tooltip>
              <Tooltip text="Delete" length="small" position="down">
                <MdDeleteOutline onClick={() => handleDelete(i)} />
              </Tooltip>
              <Tooltip text="Delete" length="small" position="down">
                <IoMdAdd onClick={() => handleSubOption(i._id)} />
              </Tooltip>
            </div>
          ),
        }))
      );
    }
  }, [data, subOptionData]);

  const Table = TableHOC<ItemTableType>(
    columns,
    rows,
    "dashboardProductBox",
    "",
    rows.length > (user?.tableRows || 10)
  )();

  return (
    <Fragment>
      <Container>
        <section className="productContainer">
          <header>
            <Heading name={t("products")} />
            <Button
              text={t("addProducts")}
              type="button"
              handleClick={() => {
                openModal();
              }}
              icon={<MdAdd />}
              className="outlined"
            />
          </header>
          {isLoading ? <SkeletonLoader length={20} /> : Table}
        </section>
      </Container>
      <Modal isOpen={isOpen} onClose={closeModal} animation="bond" size="large">
        <CreateProduct onClose={closeModal} />
      </Modal>
      <Modal
        isOpen={isUpdateBannerOpen}
        onClose={closeUpdateBannerModal}
        animation="bond"
        size="large"
      >
        <UpdateProduct
          onClose={closeUpdateBannerModal}
          item={selectedBannerItem!}
        />
      </Modal>
      <Modal
        isOpen={isSubOptionOpen}
        onClose={closeUpdateSubOptionModal}
        animation="bond"
        size="medium"
      >
        <SubOption
          onClose={closeUpdateSubOptionModal}
          itemID={selectedItemID!}
        />
      </Modal>
    </Fragment>
  );
};

export default ProductsRecord;
