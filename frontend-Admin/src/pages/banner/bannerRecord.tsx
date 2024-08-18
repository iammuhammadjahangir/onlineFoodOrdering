import { Fragment, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { MdAdd, MdDeleteOutline, MdOutlineUpdate } from "react-icons/md";
import { useSelector } from "react-redux";
import { Column } from "react-table";
import Button from "../../components/button/button";
import SkeletonLoader from "../../components/loader/skeletonLoader";
import Container from "../../components/mainContainer/container";
import Modal from "../../components/model/animatedModal";
import Heading from "../../components/pageHeading/heading";
import StatusToggle from "../../components/switch/active/In-activeSwitch";
import TableHOC from "../../components/table/tableHOC";
import Tooltip from "../../components/tooltip/tooltip";
import {
  useGetAllBannerQuery,
  useUpdateBannerStatusMutation,
} from "../../redux/api/bannerApi";
import { RootState, server } from "../../redux/store";
import { Banner, BannerTableType } from "../../types/apiTypes";
import { CustomError } from "../../types/types";
import NewBanner from "./newBanner";
import UpdateBanner from "./updateBanner";

const columns: Column<BannerTableType>[] = [
  {
    Header: "Title",
    accessor: "title",
  },
  {
    Header: "App Banner",
    accessor: "appBannerImage",
    disableFilters: true,
  },
  {
    Header: "Web Banner",
    accessor: "webBannerImage",
    disableFilters: true,
  },
  {
    Header: "Priority",
    accessor: "priority",
  },
  {
    Header: "Linked Item",
    accessor: "linkedItem",
  },
  {
    Header: "Branches",
    accessor: "branches",
  },
  {
    Header: "Active/In-Active",
    accessor: "status",
  },
  {
    Header: "Action",
    accessor: "action",
    disableFilters: true,
  },
];

const BannerRecord = () => {
  const { t } = useTranslation();
  const { data, isError, error, isLoading } = useGetAllBannerQuery();
  const [updateStatus] = useUpdateBannerStatusMutation();
  const { user } = useSelector((state: RootState) => state.userReducer);
  const [rows, setRows] = useState<BannerTableType[]>([]);
  console.log(data);

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
  const [selectedBannerItem, setSelectedBannerItem] = useState<Banner>();

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
        data.data.map((i) => ({
          id: i._id,
          title: i.title,
          priority: i.priority,
          appBannerImage: (
            <div className="bannerImage">
              {typeof i.appBannerImage === "object" && (
                <img
                  key={i._id}
                  src={`${server}/${i.appBannerImage.url}`}
                  alt={i.title}
                />
              )}
            </div>
          ),
          webBannerImage: (
            <div className="bannerImage">
              {typeof i.webBannerImage === "object" && (
                <img
                  key={i._id}
                  src={`${server}/${i.webBannerImage.url}`}
                  alt={i.title}
                  className="bannerImage"
                />
              )}
            </div>
          ),
          branches: i.branches.map((b) => (
            <div key={b._id} className="multiColumnItem">
              <p>{b.shopCode}</p>
            </div>
          )),
          linkedItem: i.linkedItem === null ? " " : i.linkedItem.name,
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
              <Tooltip text="Delete" length="small" position="down">
                <MdDeleteOutline />
              </Tooltip>
            </div>
          ),
        }))
      );
    }
  }, [data]);

  const Table = TableHOC<BannerTableType>(
    columns,
    rows,
    "dashboardProductBox",
    "",
    rows.length > (user?.tableRows || 10)
  )();

  return (
    <Fragment>
      <Container>
        <section className="bannerContainer">
          <header>
            <Heading name={t("appBanner")} />
            <Button
              text={t("addBanner")}
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
        <NewBanner onClose={closeModal} />
      </Modal>
      <Modal
        isOpen={isUpdateBannerOpen}
        onClose={closeUpdateBannerModal}
        animation="bond"
        size="medium"
      >
        <UpdateBanner
          onClose={closeUpdateBannerModal}
          item={selectedBannerItem!}
        />
      </Modal>
    </Fragment>
  );
};

export default BannerRecord;
