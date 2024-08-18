import React from "react";
import { useEffect, useState } from "react";
import { Table } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";
import { useParams, useNavigate } from "react-router-dom";
import swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import "../../../Styling/AllStyle.css"

const Rolestable = (props) => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const [products, setProducts] = useState();

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    let result = await fetch(link + "/roles");
    result = await result.json();
    setProducts(result);
  };

  const dleteData = async (id) => {
    // console.log(id);
    let dlete = await fetch(link + `/roles/${id}`, {
      method: "Delete",
    });
    dlete = await dlete.json();
    if (dlete) {
      swal.fire({
        icon: "success",
        title: t("titleDeleted"),
        text: t("textRecordDeleted"),
        showConfirmButton: false,
        customClass: {
          popup: 'custom-swal-popup', // This is the custom class you're adding
        }
      });
      //history.push('/record');
      window.location.reload();
    }
  };
  const deleteProduct = async (id) => {
    swal
      .fire({
        icon: "warning",
        title: t("titleMessage"),
        text: t("textRevertWarning"),
        showCancelButton: true,
        confirmButtonText: "Delete",
        cancelButtonText: "Cancel",
        customClass: {
          popup: 'custom-swal-popup', // This is the custom class you're adding
        }
      })
      .then((result) => {
        if (result.value) {
          // let dlete = await fetch(`http://localhost:3001/product/${id}`, {
          //   method: "Delete",
          // });
          //   dlete = await dlete.json();
          dleteData(id);
          // swal.fire({
          //   icon: 'warning',
          //   title: 'Are you Sure You want to Delete',
          //   text: 'You won\'t be able to revert data',
          //   showConfirmButton: true,
          //  })
        }
      });
  };

  return (
    <Table singleLine>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Role Name</Table.HeaderCell>
          <Table.HeaderCell>Role Description</Table.HeaderCell>
          <Table.HeaderCell>Actions</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {products?.map((item, index) => (
          <Table.Row>
            <Table.Cell>{item.roleName}</Table.Cell>
            <Table.Cell>{item.roleDescription}</Table.Cell>

            <Table.Cell>
              <Button color={"green"} onClick={() => {deleteProduct(item._id)
               navigate(`/updaterole/${item._id}`)}} >
                Delete
              </Button>
              <Button color={"yellow"}>Update
              </Button>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default Rolestable;
