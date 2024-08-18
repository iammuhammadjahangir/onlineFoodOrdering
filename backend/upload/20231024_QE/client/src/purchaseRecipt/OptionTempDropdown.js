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
  import { State } from "./context/stateContext";
  import { useTranslation } from "react-i18next";
import { GetTempPurchase } from "../Api";

let tempProductResult=[];
function OptionTempPurchaseDropdown(){
    const [haveItem, setHaveItem] = useState(false)
    const [shopNo, setShopNo] = useState()
    const [location, setLocation] = useState()
    const {clientName,
        setClientName,
        invoiceNumber,
        setInvoiceNumber,
        invoiceDate,
        setInvoiceDatelistpurchase,
        total,
        setListpurchase,setItemsAvailable,purchaseCompany,
        setPurchaseCompany,purchaseReceiptNumber,
        setPurchaseReceiptNumber,purchaseDate,
        setPurchaseDate,purchaseFor, itemsAdded, setItemsAdded, tempDeleteId, setTempDeleteId,
        setPurchaseFor}=useContext(State)
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();

    useEffect(() => {
        let currentLang = localStorage.getItem("lang");
        i18n.changeLanguage(currentLang);
      }, []);

    useEffect(() => {
        getProduct();
    }, [])

    const getProduct=async(params)=> {
        tempProductResult= await GetTempPurchase()
        setLocation(tempProductResult)
        console.log(tempProductResult)
    }

    const handleprodCodeSelectChangefrom = (selectedValue) => {
        // console.log("Selected value:", selectedValue);
        setShopNo(selectedValue)
      };

    const select=async()=>{
        let haveItem="false"
        if (shopNo) {
            tempProductResult = tempProductResult?.reduce((filteredProducts, product) => {
              if (
                product?.shopNo ===
                shopNo
              ) {
                filteredProducts.push(product);
                haveItem="true"
              }
              return filteredProducts;
            }, []);
          }
        if(haveItem){
          setItemsAvailable(false)
          setItemsAdded(true)
          setClientName(tempProductResult[0].clientName)
          const purDate=tempProductResult[0].purchaseDate
          setPurchaseDate(new Date(purDate))
          setPurchaseCompany(tempProductResult[0].purchaseCompany)
          setPurchaseReceiptNumber(tempProductResult[0].purchaseReceiptNumber)
          setTempDeleteId(tempProductResult[0]._id)
          setPurchaseFor(tempProductResult[0].shopNo)
          tempProductResult.map((dataItems)=>
          {
            const productLength=dataItems?.products?.length
            console.log(productLength)
            console.log(productLength)
            for (let j=0;  j< productLength; j++)
              {
                console.log(dataItems.products[j].Code)
                let Code=dataItems.products[j].Code
                let Color=dataItems.products[j].Color
                let Company=dataItems.products[j].Company
                let Namee=dataItems.products[j].Namee
                let PurchaseQuantity=parseInt(dataItems.products[j].PurchaseQuantity)
                let amount=dataItems.products[j].amount
                let expenseTotal=dataItems.products[j].expenseTotal
                let id=dataItems.products[j].id
                let locationsetid=dataItems.products[j].locationsetid
                let purchasePrice=dataItems.products[j].purchasePrice
                let CurrentPrice=dataItems.products[j].CurrentPrice;
                let purchaseProductPriceExcludeTax=dataItems.products[j].purchaseProductPriceExcludeTax
                let purchaseProductDiscount=dataItems.products[j].purchaseProductDiscount;
                let purchaseProductExpense=dataItems.products[j].purchaseProductExpense
                let purchaseProductTax=dataItems.products[j].purchaseProductTax
                let purchaseProductTotalAmount=dataItems.products[j].purchaseProductTotalAmount
                let purchaseQuantityPrice=dataItems.products[j].purchaseQuantityPrice
                let purchaseTotalAmount=dataItems.products[j].purchaseTotalAmount
                let purchaseTotalDiscount=dataItems.products[j].purchaseTotalDiscount
                let purchaseTotalTax=dataItems.products[j].purchaseTotalTax
                let quantityidset=dataItems.products[j].quantityidset
                const newItems = 
                {
                  id,
                  Namee,
                  Code,
                  PurchaseQuantity,
                  amount,
                  expenseTotal,
                  purchasePrice,
                  purchaseProductTotalAmount,
                  purchaseQuantityPrice,
                  purchaseTotalAmount,
                  purchaseTotalDiscount,
                  CurrentPrice,
                  purchaseProductPriceExcludeTax,
                  purchaseProductDiscount,
                  purchaseProductExpense,
                  purchaseProductTax,
                  purchaseTotalTax,
                  Color,
                  Company,
                  quantityidset,
                  locationsetid,
                };
                console.log(newItems)
                setListpurchase((prevlistpurchase) => [...prevlistpurchase, newItems]);
                console.log(Code)
              }
            
          })
        }
        navigate("/PurchaseRecipt");
    }

    return(<>
    <Modal open dimmer="inverted" size="tiny" closeIcon="close">
        <Modal.Header>{t("Select Location")} </Modal.Header>
            <Modal.Content>
                <Form>
                    <Form.Group>
                        <Dropdown
                            className="custom-dropdown"
                            style={{alignment: "center"}}
                            label={t("transferFrom")}
                            options={location?.map((element) => ({
                            key: element.shopNo,
                            text: element.shopNo,
                            value: element.shopNo,
                            }))}
                            placeholder={t("enterTransferFrom")}
                            value={shopNo}
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
                            navigate("/PurchaseRecipt");
                            }}
                        >
                            {t("back")}
                        </Button>
                </Form>
            </Modal.Content>
       
    </Modal>
    </>)
}
export default OptionTempPurchaseDropdown;