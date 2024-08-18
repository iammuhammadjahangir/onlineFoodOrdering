import { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Column } from "react-table";
import Container from "../../components/mainContainer/container";
import Heading from "../../components/pageHeading/heading";
import TableHOC from "../../components/table/tableHOC";
import Tooltip from "../../components/tooltip/tooltip";
import { RootState, server } from "../../redux/store";
import { Item } from "../../types/types";

interface selectedOrderDetailsModal {
  items: Item[];
}

const columns: Column<Item>[] = [
  {
    Header: "Image",
    accessor: "productImage",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Price",
    accessor: "offerPrice",
  },
  {
    Header: "Variations",
    accessor: "variations",
  },
  // {
  //   Header: "Compare Price",
  //   accessor: "comparePrice",
  // },
  // {
  //   Header: "Stock Quantity",
  //   accessor: "stockQuantity",
  // },
  // {
  //   Header: "purchase Quantity",
  //   accessor: "va",
  // },
  // {
  //   Header: "Total Price",
  //   accessor: "totalPrice",
  // },
  // {
  //   Header: "Weight",
  //   accessor: "weight",
  // },
];

const SelectedOrderDetailsModal = ({ items }: selectedOrderDetailsModal) => {
  const { t } = useTranslation();
  const { user } = useSelector((state: RootState) => state.userReducer);
  const [rows, setRows] = useState<any[]>([]);

  useEffect(() => {
    if (items) {
      setRows(
        items?.map((i) => ({
          image: (
            <img
              key={i._id}
              src={`${server}/${
                typeof i.productImage === "object"
                  ? i.productImage.url
                  : i.productImage
              }`}
              alt={i._id}
            />
          ),
          name: i.name,
          offerPrice: i.offerPrice,
          variations: Array.isArray(i.variations)
            ? i.variations.map((v: any) => (
                <Tooltip
                  key={v._id}
                  text={
                    v?.variationOptions
                      ? `${v.variationOptions.length}  options available.`
                      : "No option available"
                  }
                  length="large"
                  position="down"
                >
                  <span
                    className="multiColumnItem"
                    style={{ cursor: "pointer" }}
                    // onClick={() => {
                    //   handleVariationClick(v);
                    // }}
                  >
                    {v.name}
                  </span>
                </Tooltip>
              ))
            : null,
        }))
      );
    }
  }, [items]);

  const Table = TableHOC<Item>(
    columns,
    rows,
    "dashboardProductBox",
    "",
    rows.length > (user?.tableRows || 10)
  )();
  console.log(items);
  return (
    <Fragment>
      <Container>
        <section className="variationContainer">
          <header>
            <Heading name={t("orderItems")} />
          </header>
          {Table}
        </section>
      </Container>
    </Fragment>
  );
};

export default SelectedOrderDetailsModal;
