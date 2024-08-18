import { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Column } from "react-table";
import Container from "../../components/mainContainer/container";
import Heading from "../../components/pageHeading/heading";
import TableHOC from "../../components/table/tableHOC";
import { RootState } from "../../redux/store";
import { statusProps } from "../../types/apiTypes";

interface selectedOrderStatusModal {
  status: statusProps[];
}

const columns: Column<statusProps>[] = [
  {
    Header: "Status Name",
    accessor: "statusName",
  },
  {
    Header: "Status Comment",
    accessor: "statusComment",
  },
  {
    Header: "Status Date",
    accessor: "statusDate",
  },
];

const OrderStatusDetails = ({ status }: selectedOrderStatusModal) => {
  const { t } = useTranslation();
  const { user } = useSelector((state: RootState) => state.userReducer);
  const [rows, setRows] = useState<any[]>([]);
  console.log("status", status);

  useEffect(() => {
    if (status) {
      setRows(
        status?.map((i) => ({
          statusName: i.statusName,
          statusComment: i.statusComment,
          statusDate: i.statusDate
            ? new Date(i.statusDate).toLocaleDateString("en-gb", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })
            : "",
        }))
      );
    }
  }, [status]);

  const Table = TableHOC<statusProps>(
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
            <Heading name={t("viewOrderStatus")} />
          </header>
          {Table}
        </section>
      </Container>
    </Fragment>
  );
};

export default OrderStatusDetails;
