import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import Heading from "../../../components/pageHeading/heading";
import UserSideBar from "../../../components/sidebar/userSidebar";
import { updateProfileSchema } from "../../../schema/userSchema";

//For Query
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useDispatch, useSelector } from "react-redux";

//for Toast
import toast from "react-hot-toast";
import {
  getCustomer,
  useUpdateCustomerMutation,
} from "../../../redux/api/customerApi";
import {
  customerExist,
  customerNotExist,
} from "../../../redux/reducers/customerReducer";
import { server } from "../../../redux/store";
import { MessageResponse } from "../../../types/apiTypes";
import { CustomerReducerInitialState } from "../../../types/reducerType";

// For Image Uploading
import ReactImagePickerEditor, {
  ImagePickerConf,
} from "react-image-picker-editor";
import "react-image-picker-editor/dist/index.css";

//component Import
import { genderArray } from "../../../assets/data";
import Button from "../../../components/button/button";
import DatePickerDropdown from "../../../components/dropdown/datePickerDropdown";
import DropDown from "../../../components/dropdown/selectDropdown";
import Input from "../../../components/inputs/input";
import Breadcrumb from "../../../components/breadcrumb/breadcrumb";

const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //general UseStates
  const [imageChanged, setImageChanged] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [updateCustomer] = useUpdateCustomerMutation();

  //getting inital customer Data
  const { customer } = useSelector(
    (state: { customerReducer: CustomerReducerInitialState }) =>
      state.customerReducer
  );

  //only for setting image change to false initially
  useEffect(() => {
    setImageChanged(false);
  }, []);

  //For Image Only
  const config2: ImagePickerConf = {
    borderRadius: "50%",
    language: "en",
    width: "13rem",
    height: "13rem",
    objectFit: "cover",
    compressInitial: null,
    hideDeleteBtn: true,
  };

  const handleImage = (newDataUri: any) => {
    //image change value variable is only placed because this function will run on component mount and set value in avatar .. but i dont want that so i initially set it false so it can not run first time
    setImageChanged(true);
    console.log(newDataUri);
    console.log(imageChanged);
    if (true) {
      if (newDataUri) {
        setFieldValue("avatar", newDataUri);
      }
      if (newDataUri && handleChange) {
        handleChange({
          target: {
            name: "avatar",
            value: newDataUri,
          },
        } as any);
      }
    }
  };

  //handle form Data Using Formik
  const initialValues = {
    name: customer?.name,
    email: customer?.email,
    dob: customer?.dob,
    gender: customer?.gender,
    avatar: "",
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
    validationSchema: updateProfileSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values) => {
      if (isSubmit) {
        setIsSubmit(false);
        const updatedValues = {
          id: customer?._id,
          ...values,
        };
        console.log(updatedValues);
        const res = await updateCustomer(updatedValues as any);
        if ("data" in res) {
          const data = await getCustomer(customer?._id!);
          dispatch(customerExist(data.customer));
          toast.success(res.data.message);
          navigate("/profile");
        } else {
          dispatch(customerNotExist());
          const error = res.error as FetchBaseQueryError;
          const message = (error.data as MessageResponse).message;
          toast.error(message);
        }
      }
    },
  });

  const handleBtnClick = () => {
    setIsSubmit(true);
  };

  return (
    <div className="userContainer">
      <UserSideBar />
      <main>
        <Breadcrumb />
        <Heading name="Edit Profile" />
        <form onSubmit={handleSubmit} className="editProfileForm">
          <aside className="leftSide">
            <section
              className="imageContainer"
              style={{ alignItems: "unset", marginBottom: "4rem" }}
            >
              <ReactImagePickerEditor
                config={config2}
                imageSrcProp={
                  customer?.avatar && customer?.avatar.startsWith("http")
                    ? customer?.avatar
                    : `${server}/${customer?.avatar}`
                }
                imageChanged={(newDataUri: any) => {
                  handleImage(newDataUri);
                }}
              />
              {touched.avatar && errors.avatar && (
                <p className="error">{String(errors.avatar)}</p>
              )}
            </section>
          </aside>
          <aside className="rightSide">
            <div className="extraDetails">
              <div className="section">
                <Input
                  label="Name"
                  className="w-80"
                  type="text"
                  placeholder="Please Enter Your Name"
                  name="name"
                  autoComplete="off"
                  maxLength="40"
                  required={false}
                  value={values.name || ""}
                  onKeyDown={null}
                  isDisabled={false}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  touched={touched?.name}
                  errors={errors?.name}
                />
                <Input
                  label="Email Address"
                  className="w-80"
                  type="text"
                  placeholder="Please Enter Your Email Address"
                  name="email"
                  autoComplete="off"
                  maxLength="40"
                  required={false}
                  value={values.email || ""}
                  onKeyDown={null}
                  isDisabled={true}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  touched={touched?.email}
                  errors={errors?.email}
                />
              </div>
              <div className="section">
                <div className="dob">
                  <h2>DOB</h2>
                  <DatePickerDropdown
                    errors={errors.dob}
                    touched={touched.dob}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    value={values?.dob ? String(values?.dob) : undefined}
                    name="dob"
                    defaultValue={values?.dob ? String(values?.dob) : ""}
                  />
                </div>
                <div className="gender">
                  <h2>Gender</h2>
                  <DropDown
                    options={genderArray}
                    isMulti={false}
                    name="gender"
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    touched={touched?.gender}
                    errors={errors?.gender}
                    value={values.gender}
                    setFieldValues={setFieldValue}
                    defaultValue={
                      customer && customer.gender
                        ? genderArray.find(
                            (option: any) =>
                              option.value.toString() ==
                              customer?.gender?.toString()
                          ) || null
                        : null
                    }
                  />
                </div>
              </div>
            </div>

            <Button
              className="filled"
              text="Edit Profile"
              type="submit"
              handleClick={handleBtnClick}
            />
          </aside>
        </form>
      </main>
    </div>
  );
};

export default EditProfile;
