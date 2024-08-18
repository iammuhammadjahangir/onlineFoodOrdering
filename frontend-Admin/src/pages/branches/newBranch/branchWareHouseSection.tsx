import { Fragment, useEffect, useState } from "react";
import {
  CustomError,
  MultipleColorsComponentProps,
} from "../../../types/types";
import { useGetAllWareHousesQuery } from "../../../redux/api/wareHouseApi";
import toast from "react-hot-toast";
import DropDown from "../../../components/dropdown/selectDropdown";
import { useTranslation } from "react-i18next";

// Extend the existing type to include defaultNumber
interface BranchWareHouseSectionProps extends MultipleColorsComponentProps {
  defaultWarehouseId: string | null;
}

const BranchWareHouseSection = ({
  errors,
  handleBlur,
  handleChange,
  setFieldValue,
  touched,
  values,
  defaultWarehouseId,
}: BranchWareHouseSectionProps) => {
  const { t } = useTranslation();
  console.log(values);
  const [isLoading, setIsLoading] = useState(true);
  const [hasWarehouse, setHasWarehouse] = useState<boolean | null>(
    defaultWarehouseId ? true : false
  );
  const [wareHouseDropDownData, setWareHouseDropDownData] = useState([]);
  const { data, isError, error } = useGetAllWareHousesQuery();
  console.log(data);

  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }
  useEffect(() => {
    if (data) {
      const product = data.wareHouses.map((item) => ({
        value: item._id,
        label: `${item.wareHouseAddress} (${item.wareHouseCode}) `,
        color: `hsl(${Math.random() * 100 * 4},${Math.random() * 100}%,50%)`,
      }));

      setWareHouseDropDownData(product as never[]);
      setIsLoading(false);
    }
  }, [data]);

  console.log(wareHouseDropDownData);

  const handleWarehouseSelection = (value: boolean) => {
    setFieldValue("warehouseId", null);
    setHasWarehouse(value);
  };

  return (
    <Fragment>
      {!isLoading && (
        <section className="branchWareHouseContainer">
          {/* Warehouse selection section */}
          <div className="warehouseSelection">
            <button
              type="button"
              className={`toggle-button ${
                hasWarehouse === true ? "selected" : ""
              }`}
              onClick={() => handleWarehouseSelection(true)}
            >
              <img
                width="100"
                height="100"
                src="https://img.icons8.com/isometric/100/warehouse.png"
                alt="warehouse"
              />
              Does this branch have a warehouse?
            </button>
            <button
              type="button"
              className={`toggle-button ${
                hasWarehouse === false ? "selected" : ""
              }`}
              onClick={() => handleWarehouseSelection(false)}
            >
              <img
                width="100"
                height="100"
                src="https://img.icons8.com/3d-fluency/100/delete-sign.png"
                alt="delete-sign"
              />
              This branch does not have a warehouse
            </button>
          </div>

          {/* Conditionally render BranchWareHouseSection based on the selection */}
          {hasWarehouse && (
            <div className="personalContainer">
              <h3>{t("branches")}</h3>
              <DropDown
                options={wareHouseDropDownData}
                isMulti={false}
                name="warehouseId"
                handleChange={handleChange}
                handleBlur={handleBlur}
                touched={touched?.warehouseId}
                errors={errors?.warehouseId as any}
                value={values.warehouseId || ""}
                setFieldValues={setFieldValue}
                defaultValue={
                  wareHouseDropDownData.find(
                    (wh: any) => wh.value === defaultWarehouseId
                  ) || null
                }
              />
            </div>
          )}
        </section>
      )}
    </Fragment>
  );
};

export default BranchWareHouseSection;
