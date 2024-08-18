import React, { Fragment, useEffect, useState } from "react";
import moment from "moment";
import "moment-timezone";
import Container from "../../../components/mainContainer/container";
import Heading from "../../../components/pageHeading/heading";
import { useTranslation } from "react-i18next";
import Button from "../../../components/button/button";
import { MdAdd, MdDeleteOutline, MdOutlineUpdate } from "react-icons/md";
import SkeletonLoader from "../../../components/loader/skeletonLoader";
import { Column } from "react-table";
import { BulkDiscount, BulkDiscountTableType } from "../../../types/apiTypes";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import TableHOC from "../../../components/table/tableHOC";
import {
  useGetAllBulkCategoryDiscountQuery,
  useUpdateBulkCategoryStatusMutation,
} from "../../../redux/api/bulkCategoryDiscountApi";
import StatusToggle from "../../../components/switch/active/In-activeSwitch";
import Tooltip from "../../../components/tooltip/tooltip";
import { CustomError } from "../../../types/types";
import toast from "react-hot-toast";
import Modal from "../../../components/model/animatedModal";
import NewBulkSectionDiscount from "./newBulkSectionDiscount";
import UpdateBulkSectionDiscount from "./updateBulkSectionDiscount";

const columns: Column<BulkDiscountTableType>[] = [
  {
    Header: "Percent Off",
    accessor: "discountPercentage",
  },
  {
    Header: "Start Date",
    accessor: "startDate",
    disableFilters: true,
  },
  {
    Header: "End Date",
    accessor: "endDate",
    disableFilters: true,
  },
  {
    Header: "Start Time",
    accessor: "startTime",
    disableFilters: true,
  },
  {
    Header: "End Time",
    accessor: "endTime",
    disableFilters: true,
  },
  {
    Header: "Active/In-Active",
    accessor: "status",
    disableFilters: true,
  },
  {
    Header: "Action",
    accessor: "action",
    disableFilters: true,
  },
];

const BulkSectionRecord = () => {
  const { t } = useTranslation();
  const { data, isError, error, isLoading } =
    useGetAllBulkCategoryDiscountQuery();
  const [updateStatus] = useUpdateBulkCategoryStatusMutation();
  const { user } = useSelector((state: RootState) => state.userReducer);
  const [rows, setRows] = useState<BulkDiscountTableType[]>([]);

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
  const [selectedBannerItem, setSelectedBannerItem] = useState<BulkDiscount>();

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

  useEffect(() => {
    if (data) {
      console.log(data.data);
      data.data.map((i) => {
        console.log(i);
      });
      setRows(
        data.data.map((i) => {
          const timezone = "Asia/Karachi"; // Set your desired timezone

          const startDate = moment(i.startDate)
            .tz(timezone)
            .format("YYYY-MM-DD");
          const endDate = moment(i.endDate).tz(timezone).format("YYYY-MM-DD");
          const startTime = moment(i.startDate).tz(timezone).format("HH:mm:ss");
          const endTime = moment(i.endDate).tz(timezone).format("HH:mm:ss");
          return {
            discountPercentage: i.discountPercentage,
            startDate,
            endDate,
            startTime,
            endTime,
            status: (
              <StatusToggle
                isChecked={Boolean(i.status)}
                handleChange={() => {
                  console.log(i);
                  console.log(data.data);
                  updateStatus({
                    id: i._id,
                    status: Boolean(i.status) === true ? false : true,
                  });
                }}
                id={i._id}
              />
            ),
            action: (
              <div
                className="tableActions"
                style={{ display: "flex", gap: "8px" }}
              >
                <Tooltip text="Update" length="small" position="down">
                  <MdOutlineUpdate
                    onClick={() => {
                      openUpdateBannerModal();
                      setSelectedBannerItem(i);
                    }}
                  />
                </Tooltip>
                {/* <Tooltip text="Delete" length="small" position="down">
                  <MdDeleteOutline />
                </Tooltip> */}
              </div>
            ),
          };
        })
      );
    }
  }, [data]);

  const Table = TableHOC<BulkDiscountTableType>(
    columns,
    rows,
    "dashboardProductBox",
    "",
    rows.length > (user?.tableRows || 10)
  )();
  return (
    <Fragment>
      <Container>
        <section className="bulkSectionContainer">
          <header>
            <Heading name={t("bulkDiscount")} />
            <Button
              text={t("addBulkDiscount")}
              type="button"
              handleClick={() => {
                // navigate("/createBanner");
                openModal();
              }}
              icon={<MdAdd />}
              className="outlined"
            />
          </header>
          {isLoading ? <SkeletonLoader length={20} /> : Table}
        </section>
      </Container>
      <Modal isOpen={isOpen} onClose={closeModal} animation="bond" size="small">
        <NewBulkSectionDiscount onClose={closeModal} />
      </Modal>
      <Modal
        isOpen={isUpdateBannerOpen}
        onClose={closeUpdateBannerModal}
        animation="bond"
        size="small"
      >
        <UpdateBulkSectionDiscount
          onClose={closeUpdateBannerModal}
          item={selectedBannerItem!}
        />
      </Modal>
    </Fragment>
  );
};

export default BulkSectionRecord;
