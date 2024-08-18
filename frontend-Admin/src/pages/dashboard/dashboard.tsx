import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { GoDotFill } from "react-icons/go";
import logo from "../../assets/logo.png";
import { DoughnutChart } from "../../components/charts/doughnutChart";
import { LineChart } from "../../components/charts/lineChart";
import {
  classes,
  formatNumber,
  formattedHighestOrderValue,
  generateColors,
  generateOffsets,
  getMonthName,
  gradientColors,
} from "../../features/utils";
import { useOrderSummaryQuery } from "../../redux/api/orderApi";
import { CustomError, liveDataSummaryProps } from "../../types/types";

// Socket IO
import { BsTabletLandscape } from "react-icons/bs";
import { FaCcMastercard, FaDesktop, FaMobileAlt } from "react-icons/fa";
import { GiCash } from "react-icons/gi";
import { TiDeviceTablet } from "react-icons/ti";
import { useSelector } from "react-redux";
import { Column } from "react-table";
import socketIOClient from "socket.io-client";
import { BarChart } from "../../components/charts/barChart";
import TableHOC from "../../components/table/tableHOC";
import { ENDPOINT } from "../../redux/axiosInstance";
import { RootState, server } from "../../redux/store";
import DashboardSkeleton from "./dashboardSkeleton";

const columns: Column<liveDataSummaryProps>[] = [
  {
    Header: "Order Detail",
    accessor: "name",
  },
  {
    Header: "Total Orders",
    accessor: "totalOrders",
  },
  {
    Header: "Recieved",
    accessor: "Recieved",
  },
  {
    Header: "On Delivery",
    accessor: "OnDelivery",
  },
  {
    Header: "Delivered",
    accessor: "Delivered",
  },
  {
    Header: "Cancelled",
    accessor: "Cancelled",
  },
];
const dashboard = () => {
  const [currentVisitors, setCurrentVisitors] = useState(0);
  const { user } = useSelector((state: RootState) => state.userReducer);
  const [rows, setRows] = useState<liveDataSummaryProps[]>([]);
  const icons = [<FaDesktop />, <FaMobileAlt />, <TiDeviceTablet />];

  const { data, isLoading, isError, error } = useOrderSummaryQuery();

  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);

    // Request the current visitor count
    socket.emit("requestCurrentVisitors");

    socket.on("visitorUpdate", (count) => {
      setCurrentVisitors(count);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (data) {
      console.log(data);
      setRows(
        data.data.liveOrderSummary.map((i) => ({
          name: (
            <div className="dashBoardTableImageDetails">
              <img src={`${server}/${i.productImage}`} alt={""} />
              <div>
                <h3>{i.name}</h3>
                <h4>
                  <span>PKR:</span> {i.price}
                </h4>
              </div>
            </div>
          ),
          totalOrders: i.totalOrders,
          Recieved: i.statuses.Recieved,
          OnDelivery: (
            <span
              style={{
                color: "#fcc174",
              }}
            >
              {i.statuses["On-Delivery"]}
            </span>
          ),
          Delivered: (
            <span
              style={{
                color: "#5ecc80",
              }}
            >
              {i.statuses.Delivered}
            </span>
          ),
          Cancelled: (
            <span
              style={{
                color: "#ee5356",
              }}
            >
              {i.statuses.Cancelled}
            </span>
          ),
          Process: i.statuses.Process,
        }))
      );
    }
  }, [data]);

  const Table = TableHOC<liveDataSummaryProps>(
    columns,
    rows,
    "dashboardProductBox",
    "",
    rows.length > (user?.tableRows || 10),
    false
  )();

  // for customer Data transform
  // const transformFunc = (entry: any) => {
  //   const x =
  //     entry.year && entry.month
  //       ? `${entry.year}-${entry.month.toString().padStart(2, "0")}`
  //       : "";

  //   const y =
  //     entry.totalNewCustomers &&
  //     typeof entry.totalNewCustomers.totalNewCustomers === "number"
  //       ? entry.totalNewCustomers.totalNewCustomers
  //       : 0;

  //   return { x, y };
  // };

  return (
    <>
      {isLoading ? (
        <DashboardSkeleton />
      ) : (
        <div className="dashboardContainer">
          {/* Section No 1 */}
          <TimeAndBrandCard
            brandName={import.meta.env.VITE_BRANDNAME}
            brandImage={logo}
            liveVisitor={currentVisitors}
          />

          {/* Section No 2 */}
          <OrderSummaryValue
            totalOrdersToday={Number(
              data?.data.topBarSummary?.totalOrdersToday
            )}
            totalSaleToday={Number(data?.data.topBarSummary?.totalSaleToday)}
            totalOrderLast30Days={Number(
              data?.data.topBarSummary?.totalOrderLast30Days
            )}
            totalSaleLast30Days={Number(
              data?.data.topBarSummary?.totalSaleLast30Days
            )}
            totalOrderOverall={Number(
              data?.data.topBarSummary?.totalOrderOverall
            )}
            totalSaleOverall={Number(
              data?.data.topBarSummary?.totalSaleOverall
            )}
            averageOrderValueOverall={Number(
              data?.data.topBarSummary?.averageOrderValueOverall
            )}
            hightestOrderValueOverall={Number(
              data?.data?.topBarSummary?.highestOrderValueOverall
            )}
            totalCustomers={Number(data?.data.topBarSummary?.totalCustomers)}
            totalMenus={Number(data?.data.topBarSummary?.totalMenus)}
          />

          {/* Section No 3 */}

          <div className="graphsData">
            <div className="newCustomers">
              <LineChart
                data={
                  data?.data.newCustomersThisYear.map(
                    (cust) => cust.totalNewCustomers.totalNewCustomers
                  ) || []
                }
                backgroundColor={"rgba(255, 182, 4, 0.4)"}
                borderColor={"rgba(255, 182, 4, 1)"}
                label="New Customers"
                text="Customer Map"
                labels={
                  data?.data.newCustomersThisYear.map((cust) =>
                    getMonthName(Number(cust.month))
                  ) || []
                }
              />
            </div>
            <div className="paymentTypeSummary">
              <h2 className="headingGraphData">Payment Type</h2>
              <section>
                {data?.data.paymentTypeSummary.map((payment, index) => {
                  const color = index % 2 === 0 ? "#f5b041" : "#ff6946"; // Alternates between the two colors
                  const icon =
                    index % 2 === 0 ? <GiCash /> : <FaCcMastercard />;
                  const className = index % 2 === 0 ? "yellow" : "orange";

                  const maxValue = data?.data.paymentTypeSummary.reduce(
                    (acc, red) => acc + Number(red.totalSales.totalSales),
                    0
                  );

                  console.log(maxValue);

                  console.log(payment);
                  return (
                    <PaymentTypeSummary
                      key={index}
                      color={color}
                      value={Number(payment.totalSales.totalSales)}
                      heading={payment.paymentType}
                      maxValue={Number(maxValue)}
                      icon={icon}
                      className={className}
                    />
                  );
                })}
              </section>
            </div>
            <div className="orderSummary">
              <h2 className="headingGraphData">Order Summary</h2>
              <section className="topBar">
                <article>
                  <p>
                    {formatNumber(
                      data?.data.orderStatusSummary[1].totalValue.totalSales ||
                        0
                    )}
                  </p>
                  <h1>{data?.data.orderStatusSummary[1].status}</h1>
                </article>
                <article>
                  <p>
                    {formatNumber(
                      data?.data.orderStatusSummary[2].totalValue.totalSales ||
                        0
                    )}
                  </p>
                  <h1>{data?.data.orderStatusSummary[2].status}</h1>
                </article>
                <article>
                  <p>
                    {formatNumber(
                      data?.data.orderStatusSummary[3].totalValue.totalSales ||
                        0
                    )}
                  </p>
                  <h1>{data?.data.orderStatusSummary[3].status}</h1>
                </article>
                <article>
                  <p>
                    {formatNumber(
                      data?.data.orderStatusSummary[4].totalValue.totalSales ||
                        0
                    )}
                  </p>
                  <h1>{data?.data.orderStatusSummary[4].status}</h1>
                </article>
              </section>
              <section className="highlightedValues">
                <article>
                  <section className="greenContainer">
                    <h1>{data?.data.orderStatusSummary[0].status}</h1>
                    <p>
                      {formatNumber(
                        data?.data.orderStatusSummary[0].totalValue
                          .totalSales || 0
                      )}
                    </p>
                  </section>
                  <h4>View All</h4>
                </article>
                <article>
                  <section className="orangeContainer">
                    <h1>{data?.data.orderStatusSummary[3].status}</h1>
                    <p>
                      {formatNumber(
                        data?.data.orderStatusSummary[3].totalValue
                          .totalSales || 0
                      )}
                    </p>
                  </section>
                  <h4>View All</h4>
                </article>
              </section>
            </div>
          </div>

          {/* Section No 4 */}

          <div className="liveDataDetails">
            <section className="liveOrderManagement">
              <h1 className="headingGraphData">Live Data</h1>
              {Table}
            </section>
            <section className="dailyTrendingMenus">
              <h1 className="headingGraphData">Daily Trending Menus</h1>
              <div className="dailyTrendingMainContainer">
                {data?.data.todayTopSaleItems.map((menu, index: any) => (
                  <DailyTrendingMenuCart
                    key={index}
                    image={menu.productDetails.productImage.url}
                    name={menu.productName}
                    totalOrders={menu.totalOrders}
                    value={menu.totalRevenue}
                    index={index}
                  />
                ))}
              </div>
            </section>
          </div>

          {/* Section No 5 */}
          <div className="section5">
            <div className="deviceType">
              <h2 className="headingGraphData">Device Type</h2>
              <section>
                {data?.data.deviceType.map((deviceType, index) => {
                  const color = gradientColors[index % gradientColors.length];
                  const icon = icons[index % icons.length];
                  const className = classes[index % classes.length];

                  const maxValue = data?.data.deviceType.reduce(
                    (acc, red) => acc + Number(red.totalOrders.totalOrders),
                    0
                  );

                  return (
                    <PaymentTypeSummary
                      key={index}
                      color={color}
                      value={Number(deviceType.totalOrders.totalOrders)}
                      heading={deviceType.deviceType}
                      maxValue={Number(maxValue)}
                      icon={icon}
                      className={className}
                    />
                  );
                })}
              </section>
            </div>
            <div className="dailyOrderValue">
              <h1 className="headingGraphData">Order Chart</h1>
              <BarChart
                title_1="Revenue"
                data_1={
                  data?.data.dailySalesAndOrders.map((value) =>
                    Number(value.totalSales)
                  ) || []
                }
                bgColor_1={"rgba(255, 182, 4, 0.4)"}
                // ={"rgba(255, 182, 4, 1)"}
                // ="Daily Order Value"
                // text="Order Value"
                labels={
                  data?.data.dailySalesAndOrders.map((value) => value.date) ||
                  []
                }
                bgColor_2="#ff6a4a"
                title_2="Orders"
                heading="Order Chart"
                data_2={
                  data?.data.dailySalesAndOrders.map((value) =>
                    Number(value.totalOrders)
                  ) || []
                }
              />
            </div>
          </div>

          {/* Section No 6 */}
          <section className="section6">
            <section className="deliveryType">
              <h1 className="headingGraphData">Delivery Type</h1>
              <section>
                {data?.data.deliveryTypeSummary.map((deliveryType, index) => {
                  const color = gradientColors[index % gradientColors.length];
                  const icon = <BsTabletLandscape />;
                  const className = classes[index % classes.length];

                  const maxValue = data?.data.deliveryTypeSummary.reduce(
                    (acc, red) => acc + Number(red.totalOrders.totalSales),
                    0
                  );

                  return (
                    <PaymentTypeSummary
                      key={index}
                      color={color}
                      value={Number(deliveryType.totalOrders.totalSales)}
                      heading={deliveryType.deliveryType}
                      maxValue={Number(maxValue)}
                      icon={icon}
                      className={className}
                    />
                  );
                })}
              </section>
            </section>
            <section className="topProducts">
              <h1 className="headingGraphData">Trending Items (OverAll)</h1>
              <DoughnutChart
                labels={data?.data.topItems.map((value) => value.name) || []}
                data={
                  data?.data.topItems.map((value) => value.totalQuantity) || []
                }
                backgroundColor={generateColors(
                  "rgba(255, 182, 4, 1)",
                  data?.data.topItems.length || 0
                )}
                legends={true}
                offset={generateOffsets(data?.data.topItems.length || 0)}
              />
            </section>
          </section>

          {/* <div className="topProducts">
        <h1>Trending Items</h1>
        <DoughnutChart
          labels={data?.data.topItems.map((value) => value.name) || []}
          data={data?.data.topItems.map((value) => value.totalQuantity) || []}
          backgroundColor={generateColors(
            "rgba(255, 182, 4, 1)",
            data?.data.topItems.length || 0
          )}
          legends={true}
          offset={generateOffsets(data?.data.topItems.length || 0)}
        />
      </div> */}

          {/* <DoughnutChart data={data?.data.topItems}  /> */}
          {/* <PieChart
        labels={
          data?.data.newCustomersThisYear.map((cust) =>
            getMonthName(Number(cust.month))
          ) || []
        }
        data={
          data?.data.newCustomersThisYear.map(
            (cust) => cust.totalNewCustomers.totalNewCustomers
          ) || []
        }
        backgroundColor={generateColors(
          "rgba(255, 182, 4, 1)",
          data?.data.topItems.length || 0
        )}
        offset={generateOffsets(data?.data.topItems.length || 0)}
      /> */}
          {/* <PieChart
        labels={data?.data.topItems.map((value) => value.name) || []}
        data={data?.data.topItems.map((value) => value.totalQuantity) || []}
        backgroundColor={generateColors(
          "rgba(255, 182, 4, 1)",
          data?.data.topItems.length || 0
        )}
        offset={generateOffsets(data?.data.topItems.length || 0)}
      /> */}

          {/* <LazyloadImage
        blurhash="UrRMG3.AVrt3.AVrW?tR--jqa~V?x]xaayWX"
        url="https://images.unsplash.com/photo-1712111841532-fe0661e0c985?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Lazy loaded image"
        width={1000}
        height={1000}
      /> */}
        </div>
      )}
    </>
  );
};

interface BrandProps {
  brandName: string;
  brandImage: string;
  liveVisitor: number;
}

const TimeAndBrandCard = ({
  brandName,
  brandImage,
  liveVisitor,
}: BrandProps) => {
  const [timezone, setTimezone] = useState("");

  useEffect(() => {
    const getTimeZoneOffset = () => {
      const now = new Date();
      const offsetMinutes = now.getTimezoneOffset();
      const offsetHours = Math.abs(offsetMinutes / 60);
      const sign = offsetMinutes > 0 ? "-" : "+";
      const formattedOffset = `UTC ${sign}${String(offsetHours).padStart(
        2,
        "0"
      )}:00`;

      return formattedOffset;
    };

    const currentOffset = getTimeZoneOffset();
    const currentTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const formattedTimezone = `${currentOffset} --${currentTimezone}`;

    setTimezone(formattedTimezone);
    localStorage.setItem("timezone", formattedTimezone);
  }, []);

  return (
    <div className="topDashBoardContainer">
      <div className="timezoneContainer">
        <input
          className={`custom-input `}
          type={"text"}
          placeholder={""}
          value={timezone as string}
          disabled
        />
      </div>
      <div className="brandContainer">
        <div>
          <span>
            <GoDotFill className="green" /> &nbsp;
            {liveVisitor} live Visitors
          </span>
          {/* <p></p> */}
          <h3>{brandName}</h3>
        </div>
        <img
          src={brandImage}
          alt={`${brandName} logo`}
          style={{ width: "50px", height: "50px", marginRight: "10px" }}
        />
      </div>
    </div>
  );
};

interface orderSummaryValue {
  totalOrdersToday: number;
  totalSaleToday: number;
  totalOrderLast30Days: number;
  totalSaleLast30Days: number;
  totalOrderOverall: number;
  totalSaleOverall: number;
  totalCustomers: number;
  totalMenus: number;

  hightestOrderValueOverall: number;
  averageOrderValueOverall: number;
}

const OrderSummaryValue = ({
  totalOrdersToday,
  totalSaleToday,
  totalOrderLast30Days,
  totalSaleLast30Days,
  totalOrderOverall,
  totalSaleOverall,
  averageOrderValueOverall,
  hightestOrderValueOverall,
  totalCustomers,
  totalMenus,
}: orderSummaryValue) => {
  return (
    <div className="orderSummaryContainer">
      <div className="orderSummaryItem">
        <h1>Total Order</h1>
        <p>{totalOrdersToday}</p>
        <h3>Today</h3>
      </div>
      <div className="orderSummaryItem">
        <h1>Total Sales</h1>
        <p>
          <span>PKR</span> {formattedHighestOrderValue(totalSaleToday)}
        </p>
        <h3>Today</h3>
      </div>
      <div className="orderSummaryItem">
        <h1>Total Order</h1>
        <p>{totalOrderLast30Days}</p>
        <h3>Last 30 Days</h3>
      </div>
      <div className="orderSummaryItem">
        <h1>Total Sales</h1>
        <p>
          <span>PKR</span>
          {formattedHighestOrderValue(totalSaleLast30Days)}
        </p>
        <h3>Last 30 Days</h3>
      </div>
      <div className="orderSummaryItem">
        <h1>Total Orders</h1>
        <p>{totalOrderOverall}</p>
        <h3>Overall</h3>
      </div>
      <div className="orderSummaryItem">
        <h1>Total Sales</h1>
        <p>{totalSaleOverall}</p>
        <h3>Overall</h3>
      </div>
      <div className="orderSummaryItem">
        <h1>Average Order</h1>
        <p>
          <span>PKR</span>
          {formattedHighestOrderValue(averageOrderValueOverall)}
        </p>
        <h3>Overall</h3>
      </div>
      <div className="orderSummaryItem">
        <h1>Highest Order</h1>
        <p>
          <span>PKR</span>
          {formattedHighestOrderValue(hightestOrderValueOverall)}
        </p>
        <h3>Overall</h3>
      </div>
      <div className="orderSummaryItem">
        <h1>Total Cusomers</h1>
        <p>{totalCustomers}</p>
        <h3>Overall</h3>
      </div>
      <div className="orderSummaryItem">
        <h1>Total Items</h1>
        <p>{totalMenus}</p>
        <h3>Overall</h3>
      </div>
    </div>
  );
};

interface OrderSummary {
  status: string;
  totalOrders: number;
  totalValue: number;
}

const OrderSummary = ({ status, totalOrders, totalValue }: OrderSummary) => {
  return (
    <div className="orderSummaryItem">
      <h1>{status}</h1>
      <p>{totalOrders}</p>
      <h3>{totalValue}</h3>
    </div>
  );
};

// For Category Items
interface paymentTypeSummaryProps {
  color: string;
  value: number;
  heading: string;
  maxValue: number;
  icon: any;
  className: string;
}

const PaymentTypeSummary = ({
  color,
  value,
  heading,
  icon,
  className,
  maxValue,
}: paymentTypeSummaryProps) => {
  // Define a maximum width for the bar container (e.g., 200px)
  // const maxWidth = 200;

  // Define the maximum possible value for normalization (adjust as needed)
  // const maxValue = 50000; // Example: Adjust this to match the range of your data

  // Calculate the width percentage of the bar based on the value
  console.log(maxValue);
  console.log(Math.min((value / maxValue) * 100, 100));
  console.log((value / maxValue) * 100);
  const widthPercentage = Math.min((value / maxValue) * 100, 100); // Ensure it does not exceed 100%

  return (
    <div className="paymentTypeContainer">
      <section className={className}>
        {icon}
        <article>
          <h5>{heading}</h5>
          <span>Increase By {widthPercentage.toFixed(0)} %</span>{" "}
        </article>
        <span>{formatNumber(value)}</span>{" "}
      </section>

      <div style={{ width: `90%`, border: "1px solid #ddd" }}>
        <div
          style={{
            backgroundColor: color,
            width: `${widthPercentage}%`,
            transition: "width 0.3s ease-in-out", // Smooth transition effect
          }}
        ></div>
      </div>
      {/* Assuming you have the formatNumber function */}
    </div>
  );
};

interface dailyTrendingMenuCartProps {
  image: string;
  name: string;
  value: number;
  totalOrders: number;
  index: number;
  // totalValue: number;
}

const DailyTrendingMenuCart = ({
  image,
  index,
  name,
  totalOrders,
  value,
}: dailyTrendingMenuCartProps) => {
  return (
    <div className="dailyTrendingMenuCart">
      <img src={`${server}/${image}`} alt={name} />
      <div>
        <h3>{name}</h3>
        <span>PKR: {value}</span>
      </div>
      <section>
        <h1>#{Number(index) + 1}</h1>
        <p>Order {totalOrders}x </p>
      </section>
    </div>
  );
};

export default dashboard;

{
  /* {data && (
            <ApexCharts
              title="New Customers This Year"
              subtitle="Monthly New Customers"
              xAxisLabel="Month"
              yAxisLabel="Number of New Customers"
              data={data.data.newCustomersThisYear}
              transformFunc={transformFunc}
              chartType="line"
              color="#3C6E71"
              height={400}
              width="30vw"
              tooltipFormatter={(value) => `${value.toFixed(0)}`}
              xAxisType="category"
              yAxisFormatter={(value) => `${value}`}
            />
          )} */
}
