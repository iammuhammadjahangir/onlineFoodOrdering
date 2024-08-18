import React, { useEffect, useState } from "react";
import { Container, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { getPermissionForRoles } from "../Pages/user/rolesAssigned/RolesPermissionValidation";

import TableTransfer from "./purData";

const Purchaserecord = () => {
  const [viewPurchaseInvoicePermission, setViewPurchaseInvoicePermission] =
    useState(false);

  useEffect(() => {
    setViewPurchaseInvoicePermission(false);
    getPermission();
  }, []);
  async function getPermission() {
    try {
      const permissionForAdd = await getPermissionForRoles(
        "View Purchase Invoice"
      );
      setViewPurchaseInvoicePermission(permissionForAdd);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  return (
    <div>
      {viewPurchaseInvoicePermission && (
        <>
          <TableTransfer />

          <br />
        </>
      )}
    </div>
  );
};

export default Purchaserecord;
