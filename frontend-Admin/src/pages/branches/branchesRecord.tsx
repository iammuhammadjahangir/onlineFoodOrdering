import { Fragment, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { MdAdd, MdOutlineUpdate } from "react-icons/md";
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
  useGetAllBranchesQuery,
  useUpdateBranchStatusMutation,
} from "../../redux/api/branch";
import { RootState } from "../../redux/store";
import { BranchTableType, newBranchType } from "../../types/apiTypes";
import { CustomError } from "../../types/types";
import CreateBranchMain from "./newBranch/createBranchMain";
import UpdateBranchMain from "./updateBranch/updateBranchMain";

const columns: Column<BranchTableType>[] = [
  {
    Header: "Branch ID",
    accessor: "BranchID",
    width: 15,
  },
  {
    Header: "Branch Name",
    accessor: "branchName",
    disableFilters: true,
    width: 70,
  },
  {
    Header: "WareHouse",
    accessor: "warehouseId",
    disableFilters: true,
    width: 70,
  },
  {
    Header: "Days",
    accessor: "days",
    disableFilters: true,
    width: 70,
  },
  {
    Header: "Delivery Status",
    accessor: "status",
    disableFilters: true,
    width: 15,
  },
  {
    Header: "Action",
    accessor: "action",
    disableFilters: true,
    width: 15,
  },
];

const BranchesRecord = () => {
  const { t } = useTranslation();
  const { data, isError, error, isLoading } = useGetAllBranchesQuery();
  const [updateStatus] = useUpdateBranchStatusMutation();
  const { user } = useSelector((state: RootState) => state.userReducer);
  const [rows, setRows] = useState<BranchTableType[]>([]);

  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }

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
  const [selectedBannerItem, setSelectedBannerItem] = useState<newBranchType>();

  const openUpdateBannerModal = () => {
    setIsUpdateBannerOpen(true);
  };

  const closeUpdateBannerModal = () => {
    setIsUpdateBannerOpen(false);
  };
  // For update Banner

  console.log(data);

  useEffect(() => {
    if (data) {
      console.log(data.data);
      data.data.map((i) => {
        console.log(i);
      });
      setRows(
        data.data.map((i) => ({
          id: i.branchCode,
          BranchID: <span className="branchCode">{i.branchCode}</span>,
          branchName: (
            <section className="addressDetails">
              <p>{i.branchDescription}</p>
              <p>
                <b>Address:</b>
                {i.branchAddress.area}
              </p>
              <p>
                <b>City:</b>
                {i.branchAddress.city}
              </p>
            </section>
          ),
          warehouseId: i.warehouseId ? (
            <section className="multiColumnItem">
              <p>{i.warehouseId.wareHouseCode}</p>
            </section>
          ) : (
            <span></span>
          ),
          days: (
            <Fragment>
              {/* {i.branchTiming.days.map((day, index) => ( */}
              <section className="multiColumnItem">
                <p>{i.branchTiming.days.length} Day's</p>
              </section>
              {/* ))} */}
            </Fragment>
          ),
          status: (
            <StatusToggle
              isChecked={Boolean(i.activityStatus)}
              handleChange={() => {
                console.log(i);
                console.log(data.data);
                updateStatus({
                  id: i._id,
                  status: Boolean(i.activityStatus) === true ? false : true,
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
        }))
      );
    }
  }, [data]);

  const Table = TableHOC<BranchTableType>(
    columns,
    rows,
    "dashboardProductBox",
    "",
    rows.length > (user?.tableRows || 10)
  )();

  return (
    <Fragment>
      <Container>
        <section className="branchContainer">
          <header>
            <Heading name={t("branches")} />
            <Button
              text={t("addNewBranch")}
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
      <Modal isOpen={isOpen} onClose={closeModal} animation="bond" size="large">
        <CreateBranchMain onClose={closeModal} />
      </Modal>
      <Modal
        isOpen={isUpdateBannerOpen}
        onClose={closeUpdateBannerModal}
        animation="bond"
        size="large"
      >
        <UpdateBranchMain
          onClose={closeUpdateBannerModal}
          item={selectedBannerItem!}
        />
      </Modal>
    </Fragment>
  );
};

export default BranchesRecord;
