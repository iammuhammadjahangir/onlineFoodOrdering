import { Fragment, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { MdAdd, MdDeleteOutline, MdOutlineUpdate } from "react-icons/md";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Column } from "react-table";
import Button from "../../components/button/button";
import SkeletonLoader from "../../components/loader/skeletonLoader";
import Container from "../../components/mainContainer/container";
import Heading from "../../components/pageHeading/heading";
import TableHOC from "../../components/table/tableHOC";
import Tooltip from "../../components/tooltip/tooltip";
import {
  useDeleteCategoryMutation,
  useGetAllCategoryQuery,
} from "../../redux/api/category";
import { RootState, server } from "../../redux/store";
import { CategoryTableType, CustomError, category } from "../../types/types";
import { confirmationDialogue } from "../../components/swal/confirmDeny";
import { formatTime } from "../../features/utils";
import Modal from "../../components/model/animatedModal";
import CreateCategory from "./createCategory";
import UpdateCategory from "./updateCategory";

const columns: Column<CategoryTableType>[] = [
  {
    Header: "Image",
    accessor: "image",
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
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Description",
    accessor: "description",
  },
  {
    Header: "Priority",
    accessor: "priority",
  },
  {
    Header: "Avalible From",
    accessor: "availableFrom",
    Cell: ({ value }: any) => (
      <div className="timeContainer">
        <div className="timeValue">{formatTime(value)}</div>
      </div>
    ),
  },
  {
    Header: "Avalible To",
    accessor: "availableTo",
    Cell: ({ value }: any) => (
      <div className="timeContainer">
        <div className="timeValue">{formatTime(value)}</div>
      </div>
    ),
  },
  {
    Header: "Status",
    accessor: "status",
    Cell: ({ value }: any) => (
      <div className="multiColumnContainer">
        {value.map((b: any) => (
          <div key={b._id} className="multiColumnItem">
            <p>{b}</p>
          </div>
        ))}
      </div>
    ),
  },
  {
    Header: "Published On",
    accessor: "createdAt",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

const CategoryRecord = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { data, isError, isLoading, error } = useGetAllCategoryQuery();
  const [deleteCategory] = useDeleteCategoryMutation();
  const { user } = useSelector((state: RootState) => state.userReducer);
  const [rows, setRows] = useState<any[]>([]);

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
  const [selectedBannerItem, setSelectedBannerItem] = useState<category>();

  const openUpdateBannerModal = () => {
    setIsUpdateBannerOpen(true);
  };

  const closeUpdateBannerModal = () => {
    setIsUpdateBannerOpen(false);
  };
  // For update Banner

  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }

  const handleUpdate = (category: category) => {
    // navigate("/updateCategory", { state: { category } });
    openUpdateBannerModal();
    setSelectedBannerItem(category);
  };
  const handleDelete = (category: category) => {
    confirmationDialogue(
      () => deleteCategory(category._id),
      t("deleteConfirmationText"),
      t("deleteButtonText"),
      t("cancelButtonText"),
      t("savedButtonText"),
      t("cancelDialogueText")
    );
  };

  console.log(data);
  useEffect(() => {
    if (data) {
      setRows(
        data.allCategories.map((i) => ({
          _id: i._id,
          name: i.name,
          description: i.description,
          image: i.image.url, // Ensure this matches the column definition
          priority: i.priority,
          availableFrom: i.availableFrom,
          availableTo: i.availableTo,
          status: i.status,
          createdAt: i.createdAt
            ? new Date(i.createdAt).toLocaleDateString("en-gb", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })
            : "",
          action: (
            <div className="tableActions">
              <Tooltip text="Update" length="small" position="down">
                <MdOutlineUpdate onClick={() => handleUpdate(i)} />
              </Tooltip>
              <Tooltip text="Delete" length="small" position="down">
                <MdDeleteOutline onClick={() => handleDelete(i)} />
              </Tooltip>
            </div>
          ),
        }))
      );
    }
  }, [data]);

  const Table = TableHOC<CategoryTableType>(
    columns,
    rows,
    "dashboardProductBox",
    "",
    rows.length > (user?.tableRows || 10)
  )();

  return (
    <Fragment>
      <Container>
        <section className="categoryContainer">
          <header>
            <Heading name={t("categories")} />
            <Button
              text={t("addCategory")}
              type="button"
              handleClick={() => {
                // navigate("/createCategory");
                openModal();
              }}
              icon={<MdAdd />}
              className="outlined"
            />
          </header>
          {isLoading ? <SkeletonLoader length={20} /> : Table}
        </section>
      </Container>
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        animation="bond"
        size="medium"
      >
        <CreateCategory onClose={closeModal} />
      </Modal>
      <Modal
        isOpen={isUpdateBannerOpen}
        onClose={closeUpdateBannerModal}
        animation="bond"
        size="medium"
      >
        <UpdateCategory
          onClose={closeUpdateBannerModal}
          item={selectedBannerItem!}
        />
      </Modal>
    </Fragment>
  );
};

export default CategoryRecord;
