import { Fragment, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Column } from "react-table";
import SkeletonLoader from "../../components/loader/skeletonLoader";
import Container from "../../components/mainContainer/container";
import Heading from "../../components/pageHeading/heading";
import TableHOC from "../../components/table/tableHOC";
import { useAllCustomerQuery } from "../../redux/api/customerApi";
import { RootState, server } from "../../redux/store";
import { Customer } from "../../types/apiTypes";
import { CustomError } from "../../types/types";

const columns: Column<Customer>[] = [
  {
    Header: "Avatar",
    accessor: "avatar",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Phone No",
    accessor: "phoneNo",
  },
  {
    Header: "Gender",
    accessor: "gender",
  },
  {
    Header: "DOB",
    accessor: "dob",
  },
  {
    Header: "Address",
    accessor: "address",
  },
  {
    Header: "Created At",
    accessor: "createdAt",
  },
];
const CustomerRecord = () => {
  const { t } = useTranslation();
  const { user } = useSelector((state: RootState) => state.userReducer);
  const { data, isLoading, error, isError } = useAllCustomerQuery("");
  const [rows, setRows] = useState<Customer[]>([]);

  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }

  useEffect(() => {
    if (data) {
      setRows(
        data.users.map((i: any) => ({
          _id: i._id,
          avatar: (
            <img
              key={i._id}
              src={
                i?.avatar
                  ? i?.avatar!.startsWith("http")
                    ? i?.avatar
                    : `${server}/${i?.avatar}`
                  : ""
              }
              alt={i.name}
            />
          ),
          name: i.name,
          email: i.email,
          phoneNo: i.phoneNo,
          gender: i.gender,
          dob: i.dob
            ? new Date(i.dob).toLocaleDateString("en-gb", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })
            : "",
          address: i.address?.length,
          createdAt: i.createdAt
            ? new Date(i.createdAt).toLocaleDateString("en-gb", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })
            : "",
        }))
      );
    }
  }, [data]);

  const Table = TableHOC<Customer>(
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
            <Heading name={t("customer")} />
          </header>
          {isLoading ? <SkeletonLoader length={20} /> : Table}
        </section>
      </Container>
    </Fragment>
  );
};

export default CustomerRecord;
