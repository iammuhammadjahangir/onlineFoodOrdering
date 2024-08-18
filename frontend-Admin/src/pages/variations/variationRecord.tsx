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
  useDeleteVariationMutation,
  useGetAllVariationQuery,
} from "../../redux/api/variation";
import { RootState } from "../../redux/store";
import { CustomError, Variation } from "../../types/types";
import { confirmationDialogue } from "../../components/swal/confirmDeny";
import CreateVariation from "./createVariation";
import UpdateVariation from "./updateVariation";
import Modal from "../../components/model/animatedModal";

const columns: Column<Variation>[] = [
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Description",
    accessor: "description",
  },
  {
    Header: "Required",
    accessor: "isRequired",
  },
  {
    Header: "Variation Options",
    accessor: "variationOptions",
  },
  {
    Header: "Created At",
    accessor: "createdAt",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

const VariationRecord = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { data, isError, isLoading, error } = useGetAllVariationQuery();
  const [deleteVariation] = useDeleteVariationMutation();
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
  const [selectedBannerItem, setSelectedBannerItem] = useState<Variation>();

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

  const handleUpdate = (variation: Variation) => {
    navigate("/updateVariation", { state: { variation } });
  };
  const handleDelete = (variation: Variation) => {
    confirmationDialogue(
      () => deleteVariation(variation._id),
      t("deleteConfirmationText"),
      t("deleteButtonText"),
      t("cancelButtonText"),
      t("savedButtonText"),
      t("cancelDialogueText")
    );
  };

  useEffect(() => {
    if (data) {
      setRows(
        data.allCategories.map((i) => ({
          _id: i._id,
          name: i.name,
          description: i.description,
          isRequired:
            i.isRequired === true ? (
              <span className="red">Required</span>
            ) : (
              <span className="green">Not Required</span>
            ),
          variationOptions: i.variationOptions.map((v) => (
            <Tooltip
              key={v._id}
              text={"price: " + v.price.toString()}
              length="large"
              position="down"
            >
              <span className="multiColumnItem">{v.name}</span>
            </Tooltip>
          )),
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
                <MdOutlineUpdate
                  onClick={() => {
                    openUpdateBannerModal();
                    setSelectedBannerItem(i);
                  }}
                />
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

  const Table = TableHOC<Variation>(
    columns,
    rows,
    "dashboardProductBox",
    "",
    rows.length > (user?.tableRows || 10)
  )();

  return (
    <Fragment>
      <Container>
        <section className="variationContainer">
          <header>
            <Heading name={t("variations")} />
            <Button
              text={t("addVariations")}
              type="button"
              handleClick={() => {
                // navigate("/createVariation");
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
        <CreateVariation onClose={closeModal} />
      </Modal>
      <Modal
        isOpen={isUpdateBannerOpen}
        onClose={closeUpdateBannerModal}
        animation="bond"
        size="medium"
      >
        <UpdateVariation
          onClose={closeUpdateBannerModal}
          item={selectedBannerItem!}
        />
      </Modal>
    </Fragment>
  );
};

export default VariationRecord;
