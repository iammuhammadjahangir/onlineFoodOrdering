import { useContext } from "react";
// import { State } from "./context/stateContext";
import { getStorage } from "../../../Api";
import { useEffect, useState } from "react";
let StorageAddress
export default function SecondHeader( {props} ) {
    const [productType, setProductType] = useState(props.productType)
    const [producttCompany, setProductCompany] = useState(props.productCompany)
    const [storeSorting, setStoreSorting] = useState(props.storeSorting)
    const [data, setdata] = useState(props.data)
  return (
    <>
    <table style={{whiteSpace:"nowrap",justifyContent: "center", marginTop: "20px", marginLeft: "100px"}}  >
        <tbody>
          <tr> 
            {
              props.producttCompany && props.productType && props.storeSorting ? (
                <td>
                    list of Record for&nbsp; <span className="font-bold td1" >{props.producttCompany}&nbsp;{props.productType}</span> in <span className="font-bold td1" >{props.storeSorting}</span>
                </td>
              ):(
                props.producttCompany && props.storeSorting ? (
                    <td>
                    list of Record for&nbsp; <span className="font-bold td1" >{props.producttCompany}</span> in <span className="font-bold td1" >{props.storeSorting}</span>
                </td>
                   ):(
                    props.productType && props.storeSorting ? ( <td>
                      list of Record for&nbsp; <span className="font-bold td1" >{props.productType}</span> in <span className="font-bold td1" >{props.storeSorting}</span>
                  </td>) : (
                    props.producttCompany && props.productType && !JSON.parse(localStorage.getItem("isAdministrator")) ?  (
                      <td>
                    list of Record for&nbsp; <span className="font-bold td1" >{props.producttCompany}&nbsp;{props.productType}</span> in <span className="font-bold td1" >{data && (data[0]?.productAvalibility?.storageCode)}</span>
                </td>
                    ) : (
                        props.producttCompany && props.productType ? (
                        <td>
                        list of Record for&nbsp; <span className="font-bold td1" >{props.producttCompanyy}&nbsp;{props.productType}</span>
                    </td>
                      ) : (
                        props.storeSorting ? (
                        <td>list of Record in <span className="font-bold td1" >{props.storeSorting}</span></td>
                      ) : (
                        props.productType ? (
                          <td>
                          list of Record for&nbsp; <span className="font-bold td1" >{props.productType}</span>
                      </td>
                        ) : (
                            props.producttCompany && (
                            <td>
                            list of Record for&nbsp; <span className="font-bold td1" >{props.producttCompany}</span>
                        </td>
                          )
                        )
                      )
                      )
                    )
                  )
                   )
              )
            }
            <td>
              <span className="font-bold td1" style={{ marginLeft: "80px"}}>Total Records:&nbsp;&nbsp;</span> {`${props.data?.length}`}
            </td>
          </tr>
        </tbody>
      </table>
    </>
  )
}