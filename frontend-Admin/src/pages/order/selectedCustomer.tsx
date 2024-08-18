import { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Column } from "react-table";
import Container from "../../components/mainContainer/container";
import Heading from "../../components/pageHeading/heading";
import TableHOC from "../../components/table/tableHOC";
import { RootState } from "../../redux/store";
import { Address } from "../../types/apiTypes";

interface CustomerDetailsType {
  customer: Address[];
  name: string;
}

const columns: Column<Address>[] = [
  {
    Header: "Address",
    accessor: "addressDetail",
  },
  // {
  //   Header: "Compare Price",
  //   accessor: "comparePrice",
  // },
  // {
  //   Header: "Stock Quantity",
  //   accessor: "stockQuantity",
  // },
  {
    Header: "City",
    accessor: "city",
  },
  {
    Header: "Area",
    accessor: "area",
  },
];

const SelectedOrderCustomer = ({ customer, name }: CustomerDetailsType) => {
  console.log(customer);
  const { t } = useTranslation();
  const { user } = useSelector((state: RootState) => state.userReducer);
  const [rows, setRows] = useState<any[]>([]);

  useEffect(() => {
    if (customer) {
      setRows(
        customer?.map((i: any) => ({
          reciverName: i.reciverName,
          phoneNo: i.phoneNo,
          addressDetail: i.addressDetail,
          province: i.province,
          city: i.city,
          area: i.area,
          addressType: i.addressType,
        }))
      );
    }
  }, [customer]);

  const Table = TableHOC<Address>(
    columns,
    rows,
    "dashboardProductBox",
    "",
    rows.length > (user?.tableRows || 10)
  )();
  console.log(customer);

  return (
    <Fragment>
      <Container>
        <section className="variationContainer">
          <header>
            <Heading name={t("customer")} />
          </header>
          <h1>Name: {name}</h1>
          {Table}
        </section>
      </Container>
    </Fragment>
  );
};

export default SelectedOrderCustomer;
