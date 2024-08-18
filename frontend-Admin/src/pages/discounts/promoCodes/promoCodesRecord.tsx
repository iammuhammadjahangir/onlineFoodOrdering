import React, { Fragment, useEffect, useState } from "react";
import moment from "moment";
import "moment-timezone";
import Container from "../../../components/mainContainer/container";
import { Column } from "react-table";
import { PromoCode, promoCodeTypeTable } from "../../../types/apiTypes";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import {
  useGetAllPromoCodeDiscountQuery,
  useUpdatePromoCodeStatusMutation,
} from "../../../redux/api/promoCodeApi";
import { CustomError } from "../../../types/types";
import toast from "react-hot-toast";
import TableHOC from "../../../components/table/tableHOC";
import Tooltip from "../../../components/tooltip/tooltip";
import { MdAdd, MdOutlineUpdate } from "react-icons/md";
import StatusToggle from "../../../components/switch/active/In-activeSwitch";
import Heading from "../../../components/pageHeading/heading";
import SkeletonLoader from "../../../components/loader/skeletonLoader";
import Button from "../../../components/button/button";
import Modal from "../../../components/model/animatedModal";
import NewPromoCodeDiscount from "./newPromoCodeDiscount";
import UpdatePromoCodeDiscount from "./updatePromoCodeDiscount";

const columns: Column<promoCodeTypeTable>[] = [
  {
    Header: "Promo Code",
    accessor: "name",
  },
  {
    Header: "APP/WEB/BOTH",
    accessor: "applicableOn",
    disableFilters: true,
  },
  {
    Header: "Used Count",
    accessor: "usedCount",
    disableFilters: true,
  },
  {
    Header: "Max Count",
    accessor: "maxCount",
    disableFilters: true,
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

const PromoCodesRecord = () => {
  const { t } = useTranslation();
  const { data, isError, error, isLoading } = useGetAllPromoCodeDiscountQuery();
  const [updateStatus] = useUpdatePromoCodeStatusMutation();
  const { user } = useSelector((state: RootState) => state.userReducer);
  const [rows, setRows] = useState<promoCodeTypeTable[]>([]);

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
  const [selectedBannerItem, setSelectedBannerItem] = useState<PromoCode>();

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

  console.log(data);

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
            .format("YYYY-MM-DD HH:mm:ss");
          const endDate = moment(i.endDate)
            .tz(timezone)
            .format("YYYY-MM-DD HH:mm:ss");
          return {
            name: i.promoCode,
            applicableOn: (
              <span className="flex justify-center">
                {i.applicableOn === "App" ? (
                  <img
                    width="50"
                    height="50"
                    src="https://img.icons8.com/3d-fluency/50/smartphone.png"
                    alt="smartphone"
                  />
                ) : i.applicableOn === "Web" ? (
                  <img
                    width="50"
                    height="50"
                    src="https://img.icons8.com/fluency/50/web.png"
                    alt="web"
                  />
                ) : (
                  <>
                    <img
                      width="50"
                      height="50"
                      src="https://img.icons8.com/3d-fluency/50/smartphone.png"
                      alt="smartphone"
                    />
                    <img
                      width="50"
                      height="50"
                      src="https://img.icons8.com/fluency/50/web.png"
                      alt="web"
                    />
                  </>
                )}
              </span>
            ),
            usedCount: i.usedCount.toString(),
            maxCount: i.maxCount.toString(),
            startDate,
            endDate,
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
                <Tooltip text="Update" length="medium" position="down">
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

  const Table = TableHOC<promoCodeTypeTable>(
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
            <Heading name={t("promoCode")} />
            <Button
              text={t("addPromoCode")}
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
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        animation="bond"
        size="medium"
      >
        <NewPromoCodeDiscount onClose={closeModal} />
      </Modal>
      <Modal
        isOpen={isUpdateBannerOpen}
        onClose={closeUpdateBannerModal}
        animation="bond"
        size="medium"
      >
        <UpdatePromoCodeDiscount
          onClose={closeUpdateBannerModal}
          item={selectedBannerItem!}
        />
      </Modal>
    </Fragment>
  );
};

export default PromoCodesRecord;
