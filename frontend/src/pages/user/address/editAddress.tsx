import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaRegAddressCard } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
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

const EditAddress = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  console.log(location.state);
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
    addressDetail: location.state.addressDetail,
    city: location.state.city,
    area: location.state.area,
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
      let mergedAddresses: Address[] = [];

      if (customer?.address) {
        // Remove the existing address with the same ID as the edited one
        mergedAddresses = customer.address.filter(
          (address) => address._id !== location.state._id
        );
      }
      console.log("merged Address after filter", mergedAddresses);

      // Add the edited address to the merged list
      mergedAddresses.push(values);

      console.log("merged Address after Pushing latest Data", mergedAddresses);

      // // Update default settings if any of the new address fields are true
      // if (values.homeDefault || values.billingDefault) {
      //   // Create a new array of updated addresses
      //   const updatedAddresses = mergedAddresses.map((address) => {
      //     // Clone the address object to prevent mutation
      //     const updatedAddress = { ...address };
      //     console.log("updatedAddress: " + updatedAddress);

      //     // Update default billing setting if applicable
      //     if (values.billingDefault) {
      //       updatedAddress.billingDefault = address === values; // Set billing default to true only for the edited address
      //     }

      //     // Update default delivery setting if applicable
      //     if (values.homeDefault) {
      //       updatedAddress.homeDefault = address === values; // Set home default to false for all addresses except the edited one
      //     }
      //     return updatedAddress;
      //   });

      //   console.log("final updated address", updatedAddresses);

      //   // Replace the merged addresses with the updated ones
      //   mergedAddresses.splice(0, mergedAddresses.length, ...updatedAddresses);

      //   console.log("final merge address", mergedAddresses);
      // }

      const updatedValues = {
        id: customer?._id,
        address: mergedAddresses,
      };
      const res = await updateCustomer(updatedValues as any);
      if ("data" in res) {
        const data = await getCustomer(customer?._id!);
        dispatch(customerExist(data.customer));
        toast.success(res.data.message);
        navigate("/addressBook");
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
      <UserSideBar />
      <main className="newAddressContainer">
        <Breadcrumb />

        <Heading name="Edit Address" />
        <section className="newAddressContainerSection">
          <form onSubmit={handleSubmit}>
            <div className="rowContainer">
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
                    defaultValue={
                      values.city
                        ? {
                            label: values.city,
                            value: values.city,
                            color: `hsl(${Math.random() * 100 * 4},${
                              Math.random() * 100
                            }%,50%)`,
                          }
                        : ""
                    }
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
                    defaultValue={
                      values.area
                        ? {
                            label: values.area,
                            value: values.area,
                            color: `hsl(${Math.random() * 100 * 4},${
                              Math.random() * 100
                            }%,50%)`,
                          }
                        : ""
                    }
                  />
                </div>
              </div>
            </div>

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

export default EditAddress;
