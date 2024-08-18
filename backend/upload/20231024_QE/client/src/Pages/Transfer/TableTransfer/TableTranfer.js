import React from "react";
import { useEffect, useState } from "react";

import { Table } from "semantic-ui-react";
import { Link } from "react-router-dom";
import swal from "sweetalert2";
import { Button } from "semantic-ui-react";

const TableTransfer = () => {
  const [transferRecord, setTransferRecord] = useState();

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    getcolor();
  }, []);
  const getcolor = async () => {
    // let result = await fetch(link + "/transfer");
    // result = await result.json();
    // setTransferRecord(result);
  };

  const onSearchChange = async (e) => {
    const keyword = e.target.value;
    setSearchTerm(keyword);
    try {
      // const response = await fetch(`/search/${keyword}`);
      // const data = await response.json();
      // setSearchResults(data);
    } catch (err) {
      console.log(err);
    }
  };
  const dleteData = async (id) => {
    // console.log(id);
    // let dlete = await fetch(link + `/colors/${id}`, {
    //   method: "Delete",
    // });
    // dlete = await dlete.json();
    // if (dlete) {
    //   swal.fire({
    //     icon: "success",
    //     title: "Delete",
    //     text: "Record Deleted",
    //     showConfirmButton: false,
    //   });
    //history.push('/record');
    window.location.reload();
  };

  return (
    // <div>
    //    <input
    //     type="text"
    //     placeholder="Search..."
    //     value={searchTerm}
    //    onChange={onSearchChange}
    //   />
    //   <Table singleLine>
    //   <Table.Header>
    //     <Table.Row>
    //       <Table.HeaderCell>Transfer From</Table.HeaderCell>
    //       <Table.HeaderCell>Transfer To</Table.HeaderCell>
    //       <Table.HeaderCell>Product Code</Table.HeaderCell>
    //       <Table.HeaderCell>Product Name</Table.HeaderCell>
    //       <Table.HeaderCell>Product Company</Table.HeaderCell>
    //       <Table.HeaderCell>Product Color</Table.HeaderCell>
    //       <Table.HeaderCell>Product Quantity</Table.HeaderCell>
    //       <Table.HeaderCell>Transfer Time</Table.HeaderCell>
    //     </Table.Row>
    //   </Table.Header>
    //   <Table.Body>
    //     {searchResults?.map((item, index) => (
    //       <Table.Row>
    //         <Table.Cell>{item.transferFrom?.storageType}</Table.Cell>
    //         <Table.Cell>{item.transferTo}</Table.Cell>
    //         <Table.Cell>{item.productCode}</Table.Cell>
    //         <Table.Cell>{item.productName}</Table.Cell>
    //         <Table.Cell>{item.productCompany}</Table.Cell>
    //         <Table.Cell>{item.productColor}</Table.Cell>
    //         <Table.Cell>{item.productQuantity}</Table.Cell>
    //         <Table.Cell>{item.createdAt}</Table.Cell>

    //       </Table.Row>
    //     ))}
    //   </Table.Body>
    // </Table>
    <div>
      <h1 className="main_heading">Transfer Invoices</h1>
      <Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Transfer From</Table.HeaderCell>
            <Table.HeaderCell>Transfer To</Table.HeaderCell>
            <Table.HeaderCell>Product Code</Table.HeaderCell>
            <Table.HeaderCell>Product Name</Table.HeaderCell>
            <Table.HeaderCell>Product Company</Table.HeaderCell>
            <Table.HeaderCell>Product Color</Table.HeaderCell>
            <Table.HeaderCell>Product Quantity</Table.HeaderCell>
            <Table.HeaderCell>Transfer Time</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {transferRecord?.map((item, index) => (
            <Table.Row>
              <Table.Cell>{item.transferFrom?.storageType}</Table.Cell>
              <Table.Cell>{item.transferTo?.storageType}</Table.Cell>
              <Table.Cell>{item.productCode?.productCode}</Table.Cell>
              <Table.Cell>{item.productName?.productName}</Table.Cell>
              <Table.Cell>{item.productCompany?.companyName}</Table.Cell>
              <Table.Cell>{item.productColor?.colorName}</Table.Cell>
              <Table.Cell>{item.productQuantity}</Table.Cell>
              <Table.Cell>{item.createdAt}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default TableTransfer;
