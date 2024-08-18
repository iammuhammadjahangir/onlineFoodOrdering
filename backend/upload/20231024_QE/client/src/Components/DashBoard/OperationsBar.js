import React, { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

//Import Components
import PagesButton from "./pagesButton/PagesButton";

//Import Icons
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import PaymentsIcon from "@mui/icons-material/Payments";
import MoveUpIcon from "@mui/icons-material/MoveUp";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";

import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";

import { useTranslation } from "react-i18next";

const OperationsBar = () => {
  const { t } = useTranslation();
  const [colorTheme, setColorTheme] = useState();
  useEffect(() => {
    const currentColorTheme = localStorage.getItem("theme-color");
    if (currentColorTheme) {
      setColorTheme(currentColorTheme);
    }
  }, [colorTheme]);
  //to set the status of the user
  const isSalesman = JSON.parse(localStorage.getItem("isSalesman"));
  const isAdmin = JSON.parse(localStorage.getItem("isAdmin"));
  const isAdministrator = JSON.parse(localStorage.getItem("isAdministrator"));
  const isSuperAdmin = JSON.parse(localStorage.getItem("isSuperAdmin"));
  return (
    <>
      <div>
        {isAdmin || isSalesman || isSuperAdmin ? (
          <div className="operation-section">
            <span className="operationTxt">{t("dashOperation")}</span>
            <div className="section-content">
              <PagesButton
                props={{
                  linkName: t("dashSales"),
                  linkIcon: <LocalOfferOutlinedIcon />,
                  linkNavigation: "/saleproduct",
                }}
              />
              {isAdmin || isSuperAdmin ? (
                <>
                  <PagesButton
                    props={{
                      linkName: t("dashPurchase"),
                      linkIcon: <PaymentsIcon />,
                      linkNavigation: "/PurchaseRecipt",
                    }}
                  />

                  <PagesButton
                    props={{
                      linkName: t("dashTransfer"),
                      linkIcon: <MoveUpIcon />,
                      linkNavigation: "/TransferRecordd",
                    }}
                  />
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        ) : null}

        {(isAdministrator || isSuperAdmin || isAdmin || isSalesman) && (
          <div className={`invoices-section ${colorTheme}`}>
            <span className="operationTxt">{t("dashInvoices")}</span>
            <div className="section-content">
              {(isAdmin || isAdministrator || isSalesman || isSuperAdmin) && (
                <PagesButton
                  props={{
                    linkName: t("dashSales"),
                    linkIcon: <LocalOfferOutlinedIcon />,
                    linkNavigation: "/Salerecord",
                  }}
                />
              )}
              {(isAdmin || isAdministrator || isSuperAdmin) && (
                <PagesButton
                  props={{
                    linkName: t("dashPurchase"),
                    linkIcon: <PaymentsIcon />,
                    linkNavigation: "/purchaseRecord",
                  }}
                />
              )}
              {(isAdmin || isAdministrator || isSuperAdmin) && (
                <PagesButton
                  props={{
                    linkName: t("dashTransfer"),
                    linkIcon: <MoveUpIcon />,
                    linkNavigation: "/TranferPreview",
                  }}
                />
              )}
              {(isAdmin || isAdministrator || isSuperAdmin) && (
                <PagesButton
                  props={{
                    linkName: t("dashExpense"),
                    linkIcon: <MonetizationOnOutlinedIcon />,
                    linkNavigation: "/expenseInvoice",
                  }}
                />
              )}
            </div>
          </div>
        )}

        {(isAdmin || isAdministrator || isSuperAdmin) && (
          <div className="consolidated-section">
            <span className="operationTxt">{t("dashConsolidated")}</span>
            <div className="section-content">
              <PagesButton
                props={{
                  linkName: t("dashSales"),
                  linkIcon: <LocalOfferOutlinedIcon />,
                  linkNavigation: "/consolidatedSalesReport",
                }}
              />
              <PagesButton
                props={{
                  linkName: t("dashPurchase"),
                  linkIcon: <PaymentsIcon />,
                  linkNavigation: "//consolidatedPuchaseReport",
                }}
              />
              <PagesButton
                props={{
                  linkName: t("dashTransfer"),
                  linkIcon: <MoveUpIcon />,
                  linkNavigation: "/consolidatedTransferReport",
                }}
              />
              <PagesButton
                props={{
                  linkName: t("dashExpense"),
                  linkIcon: <MonetizationOnOutlinedIcon />,
                  linkNavigation: "/consolidatedExpenseReport",
                }}
              />
            </div>
          </div>
        )}

        {(isAdmin || isAdministrator || isSalesman || isSuperAdmin) && (
          <div className={`user-management-section ${colorTheme}`}>
            <span className="operationTxt">{t("dashUserManagement")}</span>
            <div className="section-content">
              {isAdministrator && (
                <PagesButton
                  props={{
                    linkName: t("dashAddUser"),
                    linkIcon: <PersonAddAltOutlinedIcon />,
                    linkNavigation: "/newUserForm",
                  }}
                />
              )}
              {(isAdministrator || isSuperAdmin || isAdmin || isSalesman) && (
                <PagesButton
                  props={{
                    linkName: t("dashChangePassword"),
                    linkIcon: <AccountCircleOutlinedIcon />,
                    linkNavigation: "/updateUserProfile",
                  }}
                />
              )}
              {isAdministrator ||
                (isSuperAdmin && (
                  <PagesButton
                    props={{
                      linkName: t("dashChangeStatus"),
                      linkIcon: <PeopleOutlineOutlinedIcon />,
                      linkNavigation: "/usersList",
                    }}
                  />
                ))}
              {isAdministrator ||
                (isSuperAdmin && (
                  <PagesButton
                    props={{
                      linkName: t("dashViewUser"),
                      linkIcon: <RemoveRedEyeOutlinedIcon />,
                      linkNavigation: "/usersList",
                    }}
                  />
                ))}
            </div>
          </div>
        )}

        {(isAdmin || isAdministrator || isSalesman || isSuperAdmin) && (
          <div className="commission-section">
            {/* <Typography variant="h6" color="#393939" className="section-title"> */}
            <span className="operationTxt">{t("dashBoardCommission")}</span>
            {/* </Typography> */}
            <div className="section-content">
              {(isAdministrator || isAdmin || isSalesman || isSuperAdmin) && (
                <PagesButton
                  props={{
                    linkName: t("dashBoardCommissionView"),
                    linkIcon: <AccountCircleOutlinedIcon />,
                    linkNavigation: "/ProfitSalesman",
                  }}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </>

    // <Stack
    //   sx={{
    //     width: "100%",
    //     height: "100%",
    //     backgroundColor: "white",
    //     padding: "10px",
    //     marginLeft: "5px",
    //     flex: "1",
    //     borderRadius: "0 0 0 0 ",
    //     gap: "10px",
    //   }}
    // >
    //   {/* Stack for operation */}
    //   {(isAdmin || isSalesman) && (
    //     <Stack sx={{ paddingLeft: "40px" }}>
    //       <Typography
    //         variant="h6"
    //         color="#393939"
    //         sx={{ fontSize: "25px", fontWeight: "bold" }}
    //       >
    //         {t("dashOperation")}
    //       </Typography>
    //       <Stack sx={{ flexDirection: "row", gap: "30px" }}>
    //         <PagesButton
    //           props={{
    //             linkName: t("dashSales"),
    //             linkIcon: <LocalOfferOutlinedIcon />,
    //             linkNavigation: "/saleproduct",
    //           }}
    //         />
    //         {isAdmin && (
    //           <PagesButton
    //             props={{
    //               linkName: t("dashPurchase"),
    //               linkIcon: <PaymentsIcon />,
    //               linkNavigation: "/PurchaseRecipt",
    //             }}
    //           />
    //         )}
    //         {isAdmin && (
    //           <PagesButton
    //             props={{
    //               linkName: t("dashTransfer"),
    //               linkIcon: <MoveUpIcon />,
    //               linkNavigation: "/TransferRecordd",
    //             }}
    //           />
    //         )}
    //       </Stack>
    //     </Stack>
    //   )}

    //   {/* Stack for Invoices */}
    //   {(isAdministrator || isSuperAdmin || isAdmin || isSalesman) && (
    //     <Stack
    //       sx={{
    //         paddingLeft: "40px",
    //         backgroundColor: "#fff7f6",
    //         borderRadius: "70px 0 0 0",
    //       }}
    //     >
    //       <Typography
    //         variant="h6"
    //         color="#393939"
    //         sx={{ fontSize: "25px", fontWeight: "bold" }}
    //       >
    //         {t("dashInvoices")}
    //       </Typography>
    //       <Stack sx={{ flexDirection: "row", gap: "30px" }}>
    //         {(isAdmin || isAdministrator || isSalesman) && (
    //           <PagesButton
    //             props={{
    //               linkName: t("dashSales"),
    //               linkIcon: <LocalOfferOutlinedIcon />,
    //               linkNavigation: "/purchaseRecord",
    //             }}
    //           />
    //         )}
    //         {(isAdmin || isAdministrator || isSuperAdmin) && (
    //           <PagesButton
    //             props={{
    //               linkName: t("dashPurchase"),
    //               linkIcon: <PaymentsIcon />,
    //               linkNavigation: "/Salerecord",
    //             }}
    //           />
    //         )}
    //         {(isAdmin || isAdministrator || isSuperAdmin) && (
    //           <PagesButton
    //             props={{
    //               linkName: t("dashTransfer"),
    //               linkIcon: <MoveUpIcon />,
    //               linkNavigation: "/TranferPreview",
    //             }}
    //           />
    //         )}
    //         {(isAdmin || isAdministrator || isSuperAdmin) && (
    //           <PagesButton
    //             props={{
    //               linkName: t("dashExpense"),
    //               linkIcon: <MonetizationOnOutlinedIcon />,
    //               linkNavigation: "/expenseInvoice",
    //             }}
    //           />
    //         )}
    //       </Stack>
    //     </Stack>
    //   )}
    //   {/* Stack for Consolidated */}
    //   {(isAdmin || isAdministrator || isSuperAdmin) && (
    //     <Stack sx={{ paddingLeft: "40px" }}>
    //       <Typography
    //         variant="h6"
    //         color="#393939"
    //         sx={{ fontSize: "25px", fontWeight: "bold" }}
    //       >
    //         {t("dashConsolidated")}
    //       </Typography>
    //       <Stack sx={{ flexDirection: "row", gap: "30px" }}>
    //         <PagesButton
    //           props={{
    //             linkName: t("dashSales"),
    //             linkIcon: <LocalOfferOutlinedIcon />,
    //             linkNavigation: "/consolidatedSalesReport",
    //           }}
    //         />
    //         <PagesButton
    //           props={{
    //             linkName: t("dashPurchase"),
    //             linkIcon: <PaymentsIcon />,
    //             linkNavigation: "//consolidatedPuchaseReport",
    //           }}
    //         />
    //         <PagesButton
    //           props={{
    //             linkName: t("dashTransfer"),
    //             linkIcon: <MoveUpIcon />,
    //             linkNavigation: "/consolidatedTransferReport",
    //           }}
    //         />
    //         <PagesButton
    //           props={{
    //             linkName: t("dashExpense"),
    //             linkIcon: <MonetizationOnOutlinedIcon />,
    //             linkNavigation: "/consolidatedExpenseReport",
    //           }}
    //         />
    //       </Stack>
    //     </Stack>
    //   )}

    //   {/* Stack for User Management */}
    //   {(isAdmin || isAdministrator || isSalesman || isSuperAdmin) && (
    //     <Stack sx={{ paddingLeft: "40px", backgroundColor: "#fff7f6" }}>
    //       <Typography
    //         variant="h6"
    //         color="#393939"
    //         sx={{ fontSize: "25px", fontWeight: "bold" }}
    //       >
    //         {t("dashUserManagement")}
    //       </Typography>
    //       <Stack sx={{ flexDirection: "row", gap: "30px" }}>
    //         {isAdministrator && (
    //           <PagesButton
    //             props={{
    //               linkName: t("dashAddUser"),
    //               linkIcon: <PersonAddAltOutlinedIcon />,
    //               linkNavigation: "/newUserForm",
    //             }}
    //           />
    //         )}
    //         {(isAdministrator || isSuperAdmin || isAdmin || isSalesman) && (
    //           <PagesButton
    //             props={{
    //               linkName: t("dashChangePassword"),
    //               linkIcon: <AccountCircleOutlinedIcon />,
    //               linkNavigation: "/updateUserProfile",
    //             }}
    //           />
    //         )}
    //         {isAdministrator ||
    //           (isSuperAdmin && (
    //             <PagesButton
    //               props={{
    //                 linkName: t("dashChangeStatus"),
    //                 linkIcon: <PeopleOutlineOutlinedIcon />,
    //                 linkNavigation: "/usersList",
    //               }}
    //             />
    //           ))}
    //         {isAdministrator ||
    //           (isSuperAdmin && (
    //             <PagesButton
    //               props={{
    //                 linkName: t("dashViewUser"),
    //                 linkIcon: <RemoveRedEyeOutlinedIcon />,
    //                 linkNavigation: "/usersList",
    //               }}
    //             />
    //           ))}
    //       </Stack>
    //     </Stack>
    //   )}
    //   {(isAdmin || isAdministrator || isSalesman || isSuperAdmin) && (
    //     <>
    //       <Stack sx={{ paddingLeft: "40px", backgroundColor: "#fff7f6" }}>
    //         <Typography
    //           variant="h6"
    //           color="#393939"
    //           sx={{ fontSize: "25px", fontWeight: "bold" }}
    //         >
    //           {t("dashBoardCommission")}
    //         </Typography>
    //         <Stack sx={{ flexDirection: "row", gap: "30px" }}>
    //           {(isAdministrator || isAdmin || isSalesman || isSuperAdmin) && (
    //             <PagesButton
    //               props={{
    //                 linkName: t("dashBoardCommissionView"),
    //                 linkIcon: <AccountCircleOutlinedIcon />,
    //                 linkNavigation: "/ProfitSalesman",
    //               }}
    //             />
    //           )}
    //         </Stack>
    //       </Stack>
    //     </>
    //   )}
    // </Stack>
  );
};

export default OperationsBar;
