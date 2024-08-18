import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button/button";
import DatePickerDropdown from "../../components/dropdown/datePickerDropdown";
import DropDown from "../../components/dropdown/selectDropdown";
import Input from "../../components/inputs/input";
import Container from "../../components/mainContainer/container";
import Heading from "../../components/pageHeading/heading";
import { RootState, server } from "../../redux/store";

// Importing Icons
import { CiUser, CiViewTable } from "react-icons/ci";
import { HiOutlineMail } from "react-icons/hi";
import { TbFileInvoice } from "react-icons/tb";

// For Image Uploading
import ReactImagePickerEditor, {
  ImagePickerConf,
} from "react-image-picker-editor";
import "react-image-picker-editor/dist/index.css";

// importing Types
import toast from "react-hot-toast";
import { genderArray, printerArray } from "../../assets/data";
import PhoneNumber from "../../components/dropdown/phoneNumber";
import SkeletonLoader from "../../components/loader/skeletonLoader";
import { FileToString } from "../../features/images/fileToString";
import { registerUserSchema } from "../../features/schema/signInSchema";
import { useGetAllRolesQuery } from "../../redux/api/roleApi";
import { useGetAllBranchesQuery } from "../../redux/api/branch";
import {
  useRegisterMutation,
  useUpdateMyProfileMutation,
  useUpdateUserProfileMutation,
} from "../../redux/api/userApi";
import { deleteLocalUser } from "../../redux/reducers/userReducer";
import { NewUserData } from "../../types/apiTypes";
import { RoleDropDown, ShopDropDown } from "../../types/types";

const RegisterUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [register] = useRegisterMutation();
  const [updatemyProfile] = useUpdateMyProfileMutation();
  const [updateUserProfile] = useUpdateUserProfileMutation();
  const [imageSrc, setImageSrc] = useState("");
  const [loadingData, setLoadingData] = useState(true);
  const [shopDropDown, setShopDropDown] = useState<ShopDropDown[]>([]);
  const [roleDropDown, setRoleDropDown] = useState<RoleDropDown[]>([]);
  const [initialImage, setInitialImage] = useState("");
  const { isAuthenticated, user, loading, error } = useSelector(
    (state: RootState) => state.userReducer
  );
  const { loading: localUserLoading, user: localUser } = useSelector(
    (state: RootState) => state.UserDetailReducer
  );

  console.log(imageSrc);

  const { data, isLoading: isLoadingShop } = useGetAllBranchesQuery();
  const { data: RolesData, isLoading: isLoadingRole } = useGetAllRolesQuery();

  useEffect(() => {
    if (data) {
      const shopDopdownArray = data.data.map((item) => ({
        value: item._id,
        label: item.branchCode,
        color: `hsl(${Math.random() * 100 * 4},${Math.random() * 100}%,50%)`,
      }));

      setShopDropDown(shopDopdownArray);
    }
  }, [data]);
  useEffect(() => {
    if (RolesData) {
      const rolesDropDownArray = RolesData.data.map((item) => ({
        value: item._id,
        label: item.name,
        color: `hsl(${Math.random() * 100 * 4},${Math.random() * 100}%,50%)`,
      }));

      setRoleDropDown(rolesDropDownArray);
    }
  }, [RolesData]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (localUser !== null) {
          const encoding = await FileToString(
            `${server}/${localUser?.photo.url}`
          );
          setInitialImage(encoding as string);
          setFieldValue("name", localUser?.name);
          setFieldValue("email", localUser?.email);
          setFieldValue("password", localUser?.password);
          setFieldValue("photo", encoding as string);
          setFieldValue("dob", localUser?.dob);
          setFieldValue("role", localUser?.role);
          setFieldValue("gender", localUser?.gender);
          setFieldValue("phoneNo", localUser?.phoneNo);
          setFieldValue("whatsappNo", localUser?.whatsappNo);
          setFieldValue("printer", localUser?.printer);
          setFieldValue("tableRows", localUser?.tableRows?.toString());
          setFieldValue("shopNo", localUser?.shopNo);
          setFieldValue("posId", localUser?.posId);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle errors here
      } finally {
        // Once data fetching is complete, set loadingData to false
        setLoadingData(false);
      }
    };

    fetchData();

    return () => {
      dispatch(deleteLocalUser());
    };
  }, [localUser]);

  const config2: ImagePickerConf = {
    borderRadius: "50%",
    language: "en",
    width: "13rem",
    height: "13rem",
    objectFit: "cover",
    compressInitial: null,
    // hideAddBtn:  false,
    // hideDeleteBtn:false,
    // hideDownloadBtn:false,
    // hideEditBtn:false
  };

  const initialValues: NewUserData = {
    id: "",
    name: "",
    email: "",
    password: "",
    photo: {
      url: "",
      blurHash: "",
    },
    dob: "",
    role: "",
    gender: "",
    phoneNo: "",
    whatsappNo: "",
    printer: "",
    tableRows: "",
    shopNo: "",
    posId: "",
    active: true,
    pageAddress: "",
  };
  const handleSubmitUser = async (values: NewUserData) => {
    console.log(values);
    let response = await register(values);
    if ("data" in response) {
      toast.success(response.data.message);
      navigate("/dashboard");
    }
    if ("error" in response) {
      if ("data" in response.error) {
        toast.error((response.error.data as any).message);
      }
    }
  };
  const onUpdateMyProfile = async (values: NewUserData) => {
    let response = await updatemyProfile(values);
    if ("data" in response) {
      toast.success(response.data.message);
      navigate("/users");
    }
    if ("error" in response) {
      if ("data" in response.error) {
        toast.error((response.error.data as any).message);
      }
    }
  };
  const onUpdateUserProfile = async (values: NewUserData) => {
    if (localUser) {
      let response = await updateUserProfile({
        user: values,
        id: localUser?.id!,
      });
      // console.log(response);
      if ("data" in response) {
        toast.success(response.data.message);
        navigate("/users");
      }
      if ("error" in response) {
        if ("data" in response.error) {
          toast.error((response.error.data as any).message);
        }
      }
    } else {
      toast.error("Something went wrong");
    }
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
    validationSchema: registerUserSchema,
    validateOnChange: false,
    validateOnBlur: true,
    validateOnMount: true,
    //// By disabling validation onChange and onBlur formik will validate on submit.
    onSubmit: async (values) => {
      // console.log(values);
      try {
        // console.log("a");
        // console.log(localUser);
        if (localUser) {
          // console.log("b");
          if (localUser.pageAddress === "Update User Profile") {
            onUpdateUserProfile(values);
          } else if (localUser.pageAddress === "Update My Profile") {
            // console.log("c");
            onUpdateMyProfile(values);
          }
        } else {
          // console.log("d");
          handleSubmitUser(values);
        }
      } catch (err) {
        console.log(err);
      }
    },
  });

  const handleImage = (newDataUri: any) => {
    if (newDataUri) {
      setFieldValue("photo", {
        url: newDataUri,
        blurHash: "",
      });
    }
    if (newDataUri && handleChange) {
      handleChange({
        target: {
          name: "photo",
          value: {
            url: newDataUri,
            blurHash: "",
          },
        },
      } as any);
    }
  };

  // useEffect(() => {
  //   console.log(values);
  // }, [values]);

  // console.log(isLoadingRole);
  // console.log(isLoadingShop);
  // console.log(isAuthenticated);
  // console.log(user);
  // console.log(!loading);
  // console.log(!error);
  // console.log(localUserLoading);

  return (
    <Container>
      {isAuthenticated &&
      user &&
      !loading &&
      !error &&
      !isLoadingShop &&
      !isLoadingRole &&
      localUserLoading &&
      !loadingData &&
      shopDropDown &&
      roleDropDown &&
      genderArray &&
      printerArray ? (
        <section className="registerContainer">
          <Heading
            name={(localUser && localUser.pageAddress) || "Register User"}
          />
          <form onSubmit={handleSubmit}>
            <section className="registerInnerContainer">
              <aside className="leftRegister">
                <div className="personalDetails">
                  <section
                    className="imageContainer"
                    style={{ alignItems: "unset", marginBottom: "4rem" }}
                  >
                    <ReactImagePickerEditor
                      config={config2}
                      imageSrcProp={initialImage}
                      imageChanged={(newDataUri: any) => {
                        // console.log("Image changed", newDataUri);
                        handleImage(newDataUri);
                        setImageSrc(newDataUri);
                      }}
                    />
                    {touched.photo && errors.photo && (
                      <p className="error">{String(errors.photo)}</p>
                    )}
                  </section>
                  <section className="extraInfo">
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
                      icon={<CiUser />}
                    />
                    <Input
                      label="Email"
                      className="w-80"
                      type="email"
                      placeholder="Please Enter Your Email"
                      name="email"
                      autoComplete="off"
                      maxLength="40"
                      required={false}
                      value={values.email || ""}
                      onKeyDown={null}
                      isDisabled={false}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      touched={touched?.email}
                      errors={errors?.email}
                      icon={<HiOutlineMail />}
                    />
                    <div className="personal">
                      <div className="personalContainer">
                        <h3>Gender</h3>
                        <DropDown
                          options={genderArray}
                          isMulti={false}
                          name="gender"
                          handleChange={handleChange}
                          handleBlur={handleBlur}
                          touched={touched?.gender}
                          errors={errors?.gender}
                          value={values.gender || ""}
                          setFieldValues={setFieldValue}
                          defaultValue={
                            localUser && localUser.gender
                              ? genderArray.find(
                                  (option: any) =>
                                    option.value.toString() ===
                                    localUser?.gender?.toString()
                                ) || null // Provide null as fallback if find() returns undefined
                              : null
                          }
                        />
                      </div>
                      <div className="personalContainer">
                        <h3>Role</h3>
                        <DropDown
                          options={roleDropDown}
                          isMulti={false}
                          name="role"
                          handleChange={handleChange}
                          handleBlur={handleBlur}
                          touched={touched?.role}
                          errors={errors?.role}
                          value={values.role || ""}
                          setFieldValues={setFieldValue}
                          defaultValue={
                            localUser && localUser.role
                              ? roleDropDown.find(
                                  (option: any) =>
                                    option.value.toString() ===
                                    localUser.role.toString()
                                ) || null
                              : null
                          }
                        />
                      </div>
                    </div>
                  </section>
                </div>
              </aside>

              <aside className="rightRegister">
                <div className="phoneContainer">
                  <div className="seperatePhone">
                    <h3>Ph Number</h3>
                    <PhoneNumber
                      completePhoneNumber={values.phoneNo || ""}
                      errors={errors.phoneNo}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      maxLength="13"
                      name="phoneNo"
                      touched={touched?.phoneNo}
                      setFieldValues={setFieldValue}
                      defaultValue={localUser && localUser.phoneNo}
                    />
                  </div>
                  <div className="seperatePhone">
                    <h3>Whatsapp Number</h3>
                    <PhoneNumber
                      completePhoneNumber={values.whatsappNo || ""}
                      errors={errors.whatsappNo}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      maxLength="13"
                      name="whatsappNo"
                      touched={touched?.whatsappNo}
                      setFieldValues={setFieldValue}
                      defaultValue={localUser && localUser.phoneNo}
                    />
                  </div>
                </div>
                <div className="shopContainer">
                  <h3>Assosiated Shop</h3>
                  <DropDown
                    options={shopDropDown}
                    isMulti={false}
                    name="shopNo"
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    touched={touched?.shopNo}
                    errors={errors?.shopNo}
                    value={values.shopNo || ""}
                    setFieldValues={setFieldValue}
                    defaultValue={
                      localUser && localUser.shopNo
                        ? shopDropDown.find(
                            (option: any) =>
                              option.value.toString() ==
                              localUser?.shopNo?.toString()
                          ) || null
                        : null
                    }
                  />
                </div>
                <div className="dobpos">
                  <div className="dob">
                    <h3>DOB</h3>
                    <DatePickerDropdown
                      errors={errors.dob}
                      touched={touched.dob}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      value={values.dob}
                      name="dob"
                      defaultValue={
                        localUser && localUser.dob ? localUser.dob : null
                      }
                    />
                  </div>
                  <div className="pos">
                    <Input
                      label="POS ID"
                      className="w-80"
                      type="text"
                      placeholder="Enter POS ID"
                      name="posId"
                      autoComplete="off"
                      maxLength="40"
                      required={false}
                      value={values.posId || ""}
                      onKeyDown={null}
                      isDisabled={false}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      touched={touched?.posId}
                      errors={errors?.posId}
                      icon={<TbFileInvoice />}
                    />
                  </div>
                </div>
                <div className="printerTable">
                  <div className="printer">
                    <h3>Printer</h3>
                    <DropDown
                      options={printerArray}
                      isMulti={false}
                      name="printer"
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      touched={touched?.printer}
                      errors={errors?.printer}
                      value={values.printer || ""}
                      setFieldValues={setFieldValue}
                      defaultValue={
                        localUser && localUser.printer
                          ? printerArray.find(
                              (option: any) =>
                                option.value.toString() ==
                                localUser?.printer?.toString()
                            ) || null
                          : null
                      }
                    />
                  </div>
                  <div className="table">
                    <Input
                      label="Table Rows"
                      className="w-80"
                      type="text"
                      placeholder="Enter Table Rows"
                      name="tableRows"
                      autoComplete="off"
                      maxLength="40"
                      required={false}
                      value={values.tableRows || ""}
                      onKeyDown={null}
                      isDisabled={false}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      touched={touched?.tableRows}
                      errors={errors?.tableRows}
                      icon={<CiViewTable />}
                    />
                  </div>
                </div>
                <div className="password">
                  {!localUser && (
                    <Input
                      label="Password"
                      className="w-80"
                      type="password"
                      placeholder="Please Enter User Password"
                      name="password"
                      autoComplete="off"
                      maxLength="40"
                      required={false}
                      value={values.password || ""}
                      onKeyDown={null}
                      isDisabled={false}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      touched={touched?.password}
                      errors={errors?.password}
                      // icon={<HiOutlineMail />}
                    />
                  )}
                </div>
                <div className="actionButton">
                  <Button
                    className="filled"
                    text="Register User"
                    type="submit"
                  />
                </div>
              </aside>
            </section>
          </form>
        </section>
      ) : (
        <SkeletonLoader length={20} />
      )}
    </Container>
  );
};

export default RegisterUser;
