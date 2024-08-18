import React, { useEffect, useState } from "react";
import SalesData from "./Data";
import { getPermissionForRoles } from "../Pages/user/rolesAssigned/RolesPermissionValidation";

const Salerecord = () => {
  const [viewSalesInvoicePermission, setViewSalesInvoicePermission] =
    useState(false);

  useEffect(() => {
    setViewSalesInvoicePermission(false);
    getPermission();
  }, []);
  async function getPermission() {
    try {
      const permissionForAdd = await getPermissionForRoles("View Sale Invoice");
      setViewSalesInvoicePermission(permissionForAdd);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  return (
    <div>
      {viewSalesInvoicePermission && (
        <>
          <SalesData />
          <br />
        </>
      )}
    </div>
  );
};

export default Salerecord;
