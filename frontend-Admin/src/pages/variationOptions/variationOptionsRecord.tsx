import { Fragment } from "react/jsx-runtime";
import Button from "../../components/button/button";
import Container from "../../components/mainContainer/container";
import Heading from "../../components/pageHeading/heading";

// Icon
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { MdAdd, MdDeleteOutline, MdOutlineUpdate } from "react-icons/md";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Column } from "react-table";
import SkeletonLoader from "../../components/loader/skeletonLoader";
import { confirmationDialogue } from "../../components/swal/confirmDeny";
import TableHOC from "../../components/table/tableHOC";
import Tooltip from "../../components/tooltip/tooltip";
import {
  useDeleteVariationOptionMutation,
  useGetAllVariationOptionsQuery,
} from "../../redux/api/variationOptions";
import { RootState } from "../../redux/store";
import { CustomError, variationOptions } from "../../types/types";

const columns: Column<variationOptions>[] = [
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Price",
    accessor: "price",
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

const VariationOptionsRecord = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user } = useSelector((state: RootState) => state.userReducer);
  const { data, isError, isLoading, error } = useGetAllVariationOptionsQuery();
  const [deleteVariationOption] = useDeleteVariationOptionMutation();
  const [rows, setRows] = useState<variationOptions[]>([]);

  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }

  const handleUpdate = (variationOption: variationOptions) => {
    navigate("/updateVariationOptions", { state: { variationOption } });
  };

  const handleDelete = async (variationOption: variationOptions) => {
    confirmationDialogue(
      () => deleteVariationOption(variationOption._id),
      t("deleteConfirmationText"),
      t("deleteButtonText"),
      t("cancelButtonText"),
      t("savedButtonText"),
      t("cancelDialogueText")
    );
    // Swal.fire({
    //   title: "Do you want delete variation Option?",
    //   showDenyButton: true,
    //   // showCancelButton: true,
    //   confirmButtonText: "Delete",
    //   denyButtonText: `Cancel`,
    // }).then(async (result) => {
    //   if (result.isConfirmed) {
    //     const response = await deleteVariationOption(variationOption._id);
    //     if ("data" in response) {
    //       Swal.fire("Saved!", "", "success");
    //     }
    //     if ("error" in response) {
    //       if ("data" in response.error) {
    //         Swal.fire((response.error.data as any).message, "", "error");
    //       }
    //     }
    //   } else if (result.isDenied) {
    //     Swal.fire("Changes are not saved", "", "info");
    //   }
    // });
  };

  useEffect(() => {
    if (data) {
      setRows(
        data.allCategories.map((i) => ({
          _id: i._id,
          name: i.name,
          price: i.price,
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

  const Table = TableHOC<variationOptions>(
    columns,
    rows,
    "dashboardProductBox",
    "",
    rows.length > (user?.tableRows || 10)
  )();

  return (
    <Fragment>
      <Container>
        <section className="variationOptionContainer">
          <header>
            <Heading name={t("variationOptions")} />
            <Button
              text={t("addOptions")}
              type="button"
              handleClick={() => {
                navigate("/createVariationOptions");
              }}
              icon={<MdAdd />}
              className="outlined"
            />
          </header>
          {isLoading ? <SkeletonLoader length={20} /> : Table}
        </section>
      </Container>
    </Fragment>
  );
};

export default VariationOptionsRecord;
