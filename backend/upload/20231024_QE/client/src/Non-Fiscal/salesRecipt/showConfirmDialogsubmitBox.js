import React, { useContext, useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { Statee } from "./context/stateContext";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
 
  Modal,

} from "semantic-ui-react";
import { useTranslation } from "react-i18next";
import Stack from '@mui/material/Stack';
import AddTaskIcon from '@mui/icons-material/AddTask';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { getTemppSale } from "../actions/tempSaleAction";
export default function DeleteModal({ id }) {
  const {
    setShowModalconfirm,
    deleteRow,
    handleSubmit,
    list,
    quantityidset,
    PurchaseQuantity,
    setQuantityidset,
    locationsetid,
    Discount,
    setDiscount,
    setLocationsetid,
    fetchingListData,
    setFetchingListData,
  } = useContext(Statee);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { t } = useTranslation();
  const [buttonClicked, setButtonClicked] = useState(false);

  useEffect(() => {
    setButtonClicked(false);
    // console.log(quantityidset);
    // console.log(locationsetid);
    setDiscount(Discount * PurchaseQuantity);
  }, []);
  const handleSubmite = () => {
    setFetchingListData(true);
    setButtonClicked(true);
    handleSubmit();
    dispatch(getTemppSale())
    setShowModalconfirm(false);
    
    navigate("/saleproduct");
  };

  return (
    <>
     <Modal
        open
        dimmer="inverted"
        size="tiny"
        closeIcon="close">
       
      <div className="flex items-center justify-center fixed left-0 right-0 bottom-0 top-0 z-20 ">
      <Stack backgroundColor="#ECECEC">
      <Stack padding={3}>
        <div className="w-full h-full max-w-2xl bg-white p-8 rounded shadow">
          {/* <h2 className="text-3xl mb-4">Danger Zone!</h2> */}
          <p
            style={{
              fontSize: "2.5rem",
              fontWeight: "bold",
              paddingTop: "30px",
            }}
            className="flex flex-wrap gap-6 items-center justify-center text-center text-slate-600 mb-5 "
          >
            {t("purConfirmMessage")}
          </p>

          <form onClick={handleSubmite}>
            <ul
              style={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <li>
                <button
                  type="submit"
                  disabled={buttonClicked}
                  className="flex items-center justify-center gap-2 bg-emerald-500 py-2 px-4 rounded text-white hover:ring-4 hover:ring-emerald-300 hover:bg-emerald-600 transition-all duration-150"
                  style={{
                    minWidth: "120px",
                    marginTop: "35px",
                  }}
                >
                  {t("yes")}&nbsp;&nbsp;<AddTaskIcon />
                </button>
              </li>
            </ul>
          </form>
          <button
            type="button"
            onClick={() => setShowModalconfirm(false)}
            className="flex items-center justify-center gap-2 bg-emerald-500 py-2 px-4 rounded text-white hover:ring-4 hover:ring-emerald-300 hover:bg-emerald-600 transition-all duration-150"
            style={{ minWidth: "120px", marginTop: "-35px" }}
          >
             <ArrowBackIcon />&nbsp;{t("no")}
          </button>
        </div>
        </Stack>
        </Stack>
      </div>
      </Modal>
    </>
  );
}
