import { ReactFragment,useContext,useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    Message,
    Button,
    Dropdown,
    Form,
    Select,
    Modal,
    Dimmer,
    Loader,
    Image,
    Segment,
  } from "semantic-ui-react";
import swal from "sweetalert2";
import { Statte } from "./context/stateContext";  
import { useTranslation } from "react-i18next";
import { GetTempTransfer, deleteAllTempRecord, getProductLoc } from "../Api";
import { useCustomState } from "../Variables/stateVariables";
import "../Styling/AllStyle.css"
let tempProductResult=[];
function OptionTempDropDown() {
    const [transferFromm, setTransferFromm] = useState()
    const [haveItem, setHaveItem] = useState(false)
    let haveListItems="false"
    const [location, setLocation] = useState()
    const {
        transferFrom,
        setTransferFrom,
        transferTo,
        setTransferTo,
        setList,
        itemsAdded, 
        setItemsAdded, tempDeleteId, setTempDeleteId
        }=useContext(Statte)

    const {formClassName}=useCustomState()
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const handleprodCodeSelectChangefrom = (selectedValue) => {
        // console.log("Selected value:", selectedValue);
        setTransferFromm(selectedValue)
      };

    useEffect(() => {
        let currentLang = localStorage.getItem("lang");
        i18n.changeLanguage(currentLang);
      }, []);

    useEffect(() => {
        getProduct();
    }, [])
    
    const getProduct=async(params)=> {
        tempProductResult= await GetTempTransfer()
        setLocation(tempProductResult)
        console.log(tempProductResult)
    }

    const select=async()=>{
        let haveItem="false"
        let productLoc=await getProductLoc()
        if (transferFromm) {
            tempProductResult = tempProductResult?.reduce((filteredProducts, product) => {
              if (
                product?.transferFrom ===
                transferFromm
              ) {
                filteredProducts.push(product);
                haveItem="true"
              }
              return filteredProducts;
            }, []);
          }
        if(haveItem=="true")
        {
          setItemsAdded(true)
          setTempDeleteId(tempProductResult[0]._id)
          setTransferFrom(tempProductResult[0].transferFrom)
          setTransferTo(tempProductResult[0].transferTo)
          
          productLoc.map((locc)=>{
            tempProductResult.map((dataItems)=>
            {
              dataItems?.products?.map((product)=>
            {
              if(locc?.product?._id === product.quantityidset && locc?.productAvalibility?._id === product.locationsetid){
                console.log(product)
                console.log(locc?.productQuantity)
                console.log(product.PurchaseQuantity)
                if(locc?.productQuantity >= product.PurchaseQuantity){
                  {
                    haveListItems="true"
                    console.log(product.Code)
                    let Code=product.Code
                    let Color=product.Color
                    let Company=product.Company
                    let Namee=product.Namee
                    let PurchaseQuantity=parseInt(product.PurchaseQuantity)
                    let id=product.id
                    let quantityidset=product.quantityidset
                    let locationsetid=product.locationsetid

                    const newItems = {
                      id,
                      Namee,
                      Code,
                      PurchaseQuantity,
                      Color,
                      Company,
                      quantityidset,
                      locationsetid,
                    };
                    setList((prevList) => [...prevList, newItems]);
                    // setList([...list, newItems])
                    console.log(Code)

                }
              }
              }   
                  
            })
          
            })
          })
          if(haveListItems==="false"){
            swal.fire({
              icon: "warning",
              title: t("textAllItemSoldOut"),
              customClass: {
                popup: 'custom-swal-popup', // This is the custom class you're adding
              }
              // showCancelButton: true,
              // confirmButtonText: "Yes", // Customize the "Yes" button text
              // cancelButtonText: "No",
            })
            setTransferFrom("")
            setTransferTo("")
            deleteAllTempRecord(tempProductResult[0]._id)
          }
        }
        navigate("/TransferRecordd");
    }

    return(
    <>
      <Modal open dimmer="inverted" size="tiny" closeIcon="close">
        <Modal.Header>{t("Select Location")}</Modal.Header>
          <Modal.Content>
            <Form className={formClassName}>
              <Form.Group >
                <Dropdown
                  className="custom-dropdown"
                  style={{alignment: "center"}}
                  label={t("transferFrom")}
                  options={location?.map((element) => ({
                  key: element.transferFrom,
                  text: element.transferFrom,
                  value: element.transferFrom,
                  }))}
                  placeholder={t("enterTransferFrom")}
                  value={transferFromm}
                  onChange={(event, data) => {
                  handleprodCodeSelectChangefrom(data.value); // Pass the selected value as a parameter
                }}
                required
                />
              </Form.Group>
              <Button
                floated="right"
                style={{
                    backgroundColor: "#F1B248",
                    color: "white",
                    marginBottom: "30px",
                    }}
                onClick={select}
              >
              {"select"}
              </Button>
              <Button
                floated="left"
                style={{
                    backgroundColor: "#F1B248",
                    color: "white",
                    marginBottom: "30px",
                    }}
                onClick={() => {
                    setItemsAdded(true)
                navigate("/TransferRecordd");
                }}
              >
                {t("back")}
              </Button>
            </Form>
          </Modal.Content>
      </Modal>
    </>)
}

export default OptionTempDropDown;
