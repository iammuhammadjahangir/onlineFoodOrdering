import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaRegAddressCard } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { pakistan } from "../../../assets/pakistanData";
import Breadcrumb from "../../../components/breadcrumb/breadcrumb";
import Button from "../../../components/button/button";
import DropDown from "../../../components/dropdown/selectDropdown";
import Input from "../../../components/inputs/input";
import Heading from "../../../components/pageHeading/heading";
import UserSideBar from "../../../components/sidebar/userSidebar";
import {
  getCustomer,
  useUpdateCustomerMutation,
} from "../../../redux/api/customerApi";
import {
  customerExist,
  customerNotExist,
} from "../../../redux/reducers/customerReducer";
import { addressSchema } from "../../../schema/userSchema";
import { MessageResponse } from "../../../types/apiTypes";
import { CustomerReducerInitialState } from "../../../types/reducerType";
import { Address, dropdownType } from "../../../types/types";

interface NewAddressProps {
  isNewAddressModel: boolean;
  closeNewAddress: () => void;
}

const NewAddress = ({
  isNewAddressModel = false,
  closeNewAddress,
}: NewAddressProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //getting inital customer Data
  const { customer } = useSelector(
    (state: { customerReducer: CustomerReducerInitialState }) =>
      state.customerReducer
  );

  // Genral UseStates for setting and filtering dropdown Values
  const [cities, setCities] = useState<dropdownType[]>([]);
  const [areas, setAreas] = useState<dropdownType[]>([]);
  const [updateCustomer] = useUpdateCustomerMutation();

  //   use effect to render provines initially on page load
  useEffect(() => {
    const selectedProvinceData = pakistan["pakistan" as keyof typeof pakistan];
    if (selectedProvinceData && Array.isArray(selectedProvinceData)) {
      const citiesData = selectedProvinceData.map(
        (cityObj) => Object.keys(cityObj)[0]
      );
      console.log(citiesData);
      setCities(
        citiesData.map((cities) => ({
          label: cities,
          value: cities,
          color: `hsl(${Math.random() * 100 * 4},${Math.random() * 100}%,50%)`, // Fix syntax error here
        }))
      );
    }
  }, []);

  //   formik Initial States
  const initialValues: Address = {
    addressDetail: "",
    city: "",
    area: "",
  };

  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    touched,
    setFieldValue,
  } = useFormik({
    initialValues,
    validationSchema: addressSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values) => {
      // Merge the new address with existing addresses
      const mergedAddresses = customer?.address
        ? [...customer.address, values]
        : [values];
      const updatedValues = {
        id: customer?._id,
        address: mergedAddresses,
      };
      const res = await updateCustomer(updatedValues as any);
      if ("data" in res) {
        const data = await getCustomer(customer?._id!);
        dispatch(customerExist(data.customer));
        toast.success(res.data.message);

        if (isNewAddressModel) {
          console.log("Eneted");
          closeNewAddress();
          console.log("after Eneted");
        } else {
          navigate("/addressBook");
        }
      } else {
        dispatch(customerNotExist());
        const error = res.error as FetchBaseQueryError;
        const message = (error.data as MessageResponse).message;
        toast.error(message);
      }
    },
  });

  //   use Effect for filter area after changing in cities
  useEffect(() => {
    if (values.city) {
      const selectedProvinceData =
        pakistan["pakistan" as keyof typeof pakistan];
      const selectedCityData: any = selectedProvinceData?.find((cityObj) =>
        cityObj.hasOwnProperty(values.city)
      );
      if (selectedCityData) {
        const areasData = selectedCityData[values.city];
        const areasOptions = areasData.map((area: string) => ({
          label: area,
          value: area,
          color: `hsl(${Math.random() * 100 * 4},${Math.random() * 100}%,50%)`,
        }));
        setAreas(areasOptions);
      }
    } else {
      setAreas([]);
    }
  }, [values.city]);

  return (
    <div className="userContainer">
      {!isNewAddressModel && <UserSideBar />}
      <main className="newAddressContainer">
        <Breadcrumb />
        <Heading name="Add new Address" />
        <section className="newAddressContainerSection">
          <form onSubmit={handleSubmit}>
            <div className="rowContainer">
              {/* <Input
                label="Full Name"
                className="w-80"
                type="text"
                placeholder="Enter Full Name"
                name="reciverName"
                autoComplete="off"
                maxLength="40"
                required={false}
                value={values.reciverName}
                onKeyDown={null}
                isDisabled={false}
                handleChange={handleChange}
                handleBlur={handleBlur}
                touched={touched?.reciverName}
                errors={errors?.reciverName}
              /> */}
              <Input
                label="Address"
                className="w-80"
                type="text"
                placeholder="House no. / building / street / area"
                name="addressDetail"
                autoComplete="off"
                maxLength="100"
                required={false}
                value={values.addressDetail}
                onKeyDown={null}
                isDisabled={false}
                handleChange={handleChange}
                handleBlur={handleBlur}
                touched={touched?.addressDetail}
                errors={errors?.addressDetail}
              />
            </div>

            <div className="rowContainer">
              <div className="leftContainer">
                <div className="City">
                  <h2>City</h2>
                  <DropDown
                    options={cities}
                    isMulti={false}
                    name="city"
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    touched={touched?.city}
                    errors={errors?.city}
                    value={values.city}
                    setFieldValues={setFieldValue}
                    defaultValue={""}
                  />
                </div>
                <div className="Area">
                  <h2>Area</h2>
                  <DropDown
                    options={areas}
                    isMulti={false}
                    name="area"
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    touched={touched?.area}
                    errors={errors?.area}
                    value={values.area}
                    setFieldValues={setFieldValue}
                    defaultValue={""}
                  />
                </div>
              </div>
            </div>

            {/* //Right */}
            <div className="actionButton">
              <Button
                className="filled"
                text="save"
                type="submit"
                icon={<FaRegAddressCard />}
              />
            </div>
          </form>
        </section>
      </main>
    </div>
  );
};

export default NewAddress;
