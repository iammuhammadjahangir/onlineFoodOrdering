const DashboardSkeleton = () => {
  const renderDivHeading = () => {
    return (
      <div
        className="skeleton-text"
        style={{
          width: "40%",
          height: "1.5rem",
          margin: "0 auto",
          //   marginBottom: "0.5rem",
        }}
      ></div>
    );
  };
  const renderOrderSummaryItems = () => {
    return Array.from({ length: 10 }).map((_, index) => (
      <div key={index} className="orderSummaryItem">
        <div
          className="skeleton-text skeleton-loader"
          style={{ width: "80%" }}
        ></div>
        <div
          className="skeleton-rect skeleton-loader"
          style={{ width: "90%" }}
        ></div>
        <div
          className="skeleton-text skeleton-loader"
          style={{ width: "70%" }}
        ></div>
      </div>
    ));
  };

  const renderLineGraphSkeleton = () => {
    return (
      <div className="lineGraphSkeleton">
        <div className="lineGraphSkeleton-verticals">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="skeleton-line-vertical skeleton-loader"
            ></div>
          ))}
        </div>
        <div className="lineGraphSkeleton-horizontals">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="skeleton-line-horizontal skeleton-loader"
            ></div>
          ))}
        </div>
        <div className="lineGraphSkeleton-line">
          {Array.from({ length: 30 }).map((_, index) => (
            <div
              key={index}
              className="skeleton-line-point skeleton-loader"
            ></div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="dashboardContainer">
      <div className="topDashBoardContainer">
        <div className="timezoneContainer">
          <div
            className="skeleton-text"
            style={{
              width: "220px",
              height: "3rem",
              marginLeft: "1rem",
              borderRadius: "5px",
            }}
          ></div>
        </div>
        <div className="brandContainer">
          <div>
            <div
              className="skeleton-text"
              style={{ width: "100px", height: "1.5rem" }}
            ></div>
            <div
              className="skeleton-text"
              style={{ width: "50px", height: "0.9rem" }}
            ></div>
            <div
              className="skeleton-text"
              style={{ width: "80px", height: "1.2rem" }}
            ></div>
          </div>
          <div className="skeleton-circle"></div>
        </div>
      </div>

      <div className="orderSummaryContainer" style={{ height: "6rem" }}>
        {renderOrderSummaryItems()}
      </div>

      <div className="graphsData">
        <div className="newCustomers skeleton-rect">
          {renderDivHeading()}
          {renderLineGraphSkeleton()}
        </div>
        <div
          className="paymentTypeSummary skeleton-rect"
          style={{ paddingBottom: 0, justifyContent: "flex-start" }}
        >
          {renderDivHeading()}
          <div className="paymentTypeSummarySkeleton">
            {Array.from({ length: 2 }).map((_, index) => (
              <div key={index} className="paymentTypeContainerSkeleton">
                <div>
                  <div className="skeleton-icon skeleton-loader"></div>
                  <div className="paymentTypeContentSkeleton">
                    <div
                      className="skeleton-text skeleton-loader"
                      style={{ width: "100px" }}
                    ></div>
                    <div
                      className="skeleton-text skeleton-loader"
                      style={{ width: "70px" }}
                    ></div>
                  </div>
                  <div className="skeleton-barContainer">
                    <div className="skeleton-bar skeleton-loader"></div>
                  </div>
                </div>
                {/* <section
                  className="skeleton-barContainerLoading"
                  style={{ height: "10px " }}
                >
                  <div className="skeleton-bar skeleton-loader"></div>
                </section> */}
              </div>
            ))}
          </div>
        </div>
        <div
          className="orderSummary skeleton-rect"
          style={{
            padding: 0,
          }}
        >
          <div className="orderSummarySkeleton">
            {renderDivHeading()}
            <section className="topBarSkeleton">
              {Array.from({ length: 4 }).map((_, index) => (
                <article key={index} className="topBarItemSkeleton">
                  <div
                    className="skeleton-text skeleton-loader"
                    style={{ width: "70px" }}
                  ></div>
                  <div
                    className="skeleton-text skeleton-loader"
                    style={{ width: "100px" }}
                  ></div>
                </article>
              ))}
            </section>
            <section className="highlightedValuesSkeleton">
              {Array.from({ length: 2 }).map((_, index) => (
                <article key={index} className="highlightedItemSkeleton">
                  <section
                    className={`highlightedContainerSkeleton ${
                      index === 0 ? "green" : "orange"
                    }`}
                  >
                    <div
                      className="skeleton-text skeleton-loader"
                      style={{ width: "120px" }}
                    ></div>
                    <div
                      className="skeleton-text skeleton-loader"
                      style={{ width: "80px" }}
                    ></div>
                  </section>
                  <div
                    className="skeleton-text skeleton-loader"
                    style={{ width: "60px" }}
                  ></div>
                </article>
              ))}
            </section>
          </div>
        </div>
      </div>

      <div className="liveDataDetails">
        <div className="liveOrderManagement">
          {renderDivHeading()}
          <div className="mainTableContainer">
            <table>
              <thead>
                <tr>
                  <th>{renderDivHeading()}</th>
                  <th>{renderDivHeading()}</th>
                  <th>{renderDivHeading()}</th>
                  <th>{renderDivHeading()}</th>
                  <th>{renderDivHeading()}</th>
                  <th>{renderDivHeading()}</th>
                  <th>{renderDivHeading()}</th>
                  {/* <th>{renderDivHeading()}</th> */}
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 3 }).map((_) => (
                  <tr className="skeletonRow">
                    <td>
                      <div className="dashBoardTableImageDetails">
                        <div className="skeleton-image"></div>
                        <div>
                          <div
                            className="skeleton-text"
                            style={{ width: "80%", height: "15px" }}
                          ></div>
                          <div
                            className="skeleton-text"
                            style={{ width: "80%", height: "10px" }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div
                        className="skeleton-text"
                        style={{
                          width: "80%",
                          height: "40px",
                          borderRadius: "10px",
                        }}
                      ></div>
                    </td>
                    <td>
                      <div
                        className="skeleton-text"
                        style={{
                          width: "80%",
                          height: "40px",
                          borderRadius: "10px",
                        }}
                      ></div>
                    </td>
                    <td>
                      <div
                        className="skeleton-text"
                        style={{
                          width: "80%",
                          height: "40px",
                          borderRadius: "10px",
                        }}
                      ></div>
                    </td>
                    <td>
                      <div
                        className="skeleton-text"
                        style={{
                          width: "80%",
                          height: "40px",
                          borderRadius: "10px",
                        }}
                      ></div>
                    </td>
                    <td>
                      <div
                        className="skeleton-text"
                        style={{
                          width: "80%",
                          height: "40px",
                          borderRadius: "10px",
                        }}
                      ></div>
                    </td>
                    <td>
                      <div
                        className="skeleton-text"
                        style={{
                          width: "80%",
                          height: "40px",
                          borderRadius: "10px",
                        }}
                      ></div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="dailyTrendingMenus">
          <section className="dailyTrendingMenusSkeleton">
            {renderDivHeading()}
            <div className="dailyTrendingMainContainer">
              {Array.from({ length: 3 }).map((_, index) => (
                <div className="dailyTrendingMenuCart skeleton" key={index}>
                  <div className="skeleton-image"></div>
                  <div className="skeleton-text-container">
                    <div
                      className="skeleton-text"
                      style={{ width: "80%" }}
                    ></div>
                    <div
                      className="skeleton-text"
                      style={{ width: "60%" }}
                    ></div>
                  </div>
                  <div className="skeleton-index">
                    <div
                      className="skeleton-text"
                      style={{ width: "40%" }}
                    ></div>
                    <div
                      className="skeleton-text"
                      style={{ width: "60%" }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default DashboardSkeleton;
