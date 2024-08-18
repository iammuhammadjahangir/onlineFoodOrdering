import { useTranslation } from "react-i18next";
import { Fragment } from "react/jsx-runtime";
import ModalButton from "../../../components/button/modalButtons";
import { useMultiSteps } from "../multiPageSwapperHook";
import BranchAddressSection from "./branchAddressSection";
import BranchSettingSection from "./branchSettingSection";
import BranchTimingSection from "./branchTimingSection";

import { Step, Stepper } from "@material-tailwind/react";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getValidationSchema } from "../../../features/schema/branchesSchema";
import { useCreateNewBranchMutation } from "../../../redux/api/branch";
import { BranchFormValues, CustomError } from "../../../types/types";
import BranchWareHouseSection from "./branchWareHouseSection";
// import { NewBranchValidationSchema } from "../../../features/schema/branchesSchema";

interface newBranchProps {
  onClose: () => void;
}
const CreateBranchMain = ({ onClose }: newBranchProps) => {
  const { t } = useTranslation();
  const [validationStep, setValidationStep] = useState<number>(0);
  const [createBranch, { isLoading, isError, error }] =
    useCreateNewBranchMutation();

  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }

  const initialValues: BranchFormValues = {
    branchDescription: "",
    branchAddress: {
      latitude: 0,
      longitude: 0,
      houseNo: "",
      street: "",
      area: "",
      city: "",
      state: "",
      country: "",
      postalCode: "",
    },
    warehouseId: undefined,
    branchType: "branch",
    branchTiming: {
      days: [],
      firstHalfOpenTime: "",
      firstHalfCloseTime: "",
      secondHalfOpenTime: "",
      secondHalfCloseTime: "",
    },
    branchSettings: {
      asapOnly: false,
      preOrderOnly: false,
      sameDayPreOrder: false,
      otherSettings: {
        swsDeliveryModule: false,
        taxPercentage: 0,
      },
      minPreOrderTime: 1,
      maxPreOrderTime: 24,
    },
    customerSupport: {
      contactEmail: "",
      contactNumber: "",
    },
    activityStatus: true,
  };

  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    touched,
    setFieldValue,
    validateForm,
  } = useFormik({
    initialValues,
    validationSchema: getValidationSchema(validationStep),
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values) => {
      console.log(values);
      const updatedValues = {
        ...values,
        branchTiming: {
          ...values.branchTiming,
          firstHalfOpenTime: `${new Date(
            values.branchTiming.firstHalfOpenTime!
          ).getHours()}:${new Date(
            values.branchTiming.firstHalfOpenTime!
          ).getMinutes()}`,
          firstHalfCloseTime: `${new Date(
            values.branchTiming.firstHalfCloseTime!
          ).getHours()}:${new Date(
            values.branchTiming.firstHalfCloseTime!
          ).getMinutes()}`,
          secondHalfOpenTime: `${new Date(
            values.branchTiming.secondHalfOpenTime!
          ).getHours()}:${new Date(
            values.branchTiming.secondHalfOpenTime!
          ).getMinutes()}`,
          secondHalfCloseTime: `${new Date(
            values.branchTiming.secondHalfCloseTime!
          ).getHours()}:${new Date(
            values.branchTiming.secondHalfCloseTime!
          ).getMinutes()}`,
        },
      };
      createBranch(updatedValues).then(() => {
        toast.success("New Branch created successfully");
        onClose();
      });

      // setIsSubmitting(true);
      // console.log("submitted");
      // await Promise.all(
      //   values.productDetails.map(async (productDetails) => {
      //     registerProductDetails(productDetails);
      //   })
      // );
      // localStorage.removeItem("skuList");
      // localStorage.removeItem("skuListLocal");
    },
  });

  console.log(errors);
  const {
    back,
    isFirstStep,
    isLastStep,
    next,
    step,
    currentStepIndex,
    // goTo,
    // setIsFirstStep,
    // setIsLastStep,
  } = useMultiSteps([
    <BranchWareHouseSection
      values={values}
      handleBlur={handleBlur}
      handleChange={handleChange}
      errors={errors}
      touched={touched}
      setFieldValue={setFieldValue}
      defaultWarehouseId={null}
    />,
    <BranchAddressSection
      values={values}
      handleBlur={handleBlur}
      handleChange={handleChange}
      errors={errors}
      touched={touched}
      setFieldValue={setFieldValue}
    />,
    <BranchSettingSection
      values={values}
      handleBlur={handleBlur}
      handleChange={handleChange}
      errors={errors}
      touched={touched}
      setFieldValue={setFieldValue}
      defaultNumber={null}
    />,
    <BranchTimingSection
      values={values}
      handleBlur={handleBlur}
      handleChange={handleChange}
      errors={errors}
      touched={touched}
      setFieldValue={setFieldValue}
    />,
  ]);

  const handleBackClick = async () => {
    if (!isFirstStep) {
      back();
    }
  };
  const handleNextPage = async () => {
    const isValid = await validateForm();
    console.log("Current Step:", currentStepIndex);
    console.log("Is Last Step:", isLastStep);

    if (Object.keys(isValid).length === 0) {
      if (isLastStep) {
        handleSubmit(); // Submit the form only if it's the last step
      } else {
        next(); // Proceed to the next step
      }
    } else {
      toast.error("Please Fill the details");
    }
  };

  console.log(isLastStep);

  console.log(validationStep);
  useEffect(() => {
    console.log(currentStepIndex);
    setValidationStep(currentStepIndex);
  }, [currentStepIndex, isLastStep, isFirstStep]);

  console.log(values);
  console.log(errors);

  return (
    <Fragment>
      <section className="createBranchContainer">
        <form onSubmit={handleSubmit}>
          <div className="w-full py-4 px-8">
            <Stepper
              activeStep={currentStepIndex}
              // isLastStep={(value) => setIsLastStep(value)}
              // isFirstStep={(value) => setIsFirstStep(value)}
              placeholder={""}
            >
              <Step
                // onClick={() => goTo(0)}
                placeholder={""}
                style={{
                  backgroundColor:
                    currentStepIndex >= 0 ? "#FFB604" : "#d3d3d3", // Dynamic background color
                  padding: "10px", // Add some padding
                  borderRadius: "50%", // To make it a circle
                }}
              >
                <img
                  width="30"
                  height="30"
                  src="https://img.icons8.com/3d-fluency/30/shop.png"
                  alt="shop"
                  style={{ margin: "auto" }}
                />
              </Step>
              <Step
                // onClick={() => goTo(1)}
                placeholder={""}
                style={{
                  backgroundColor:
                    currentStepIndex >= 1 ? "#f5b041" : "#d3d3d3", // Dynamic background color
                  padding: "10px", // Add some padding
                  borderRadius: "50%", // To make it a circle
                }}
              >
                <img
                  width="30"
                  height="30"
                  src="https://img.icons8.com/3d-fluency/30/order-delivered.png"
                  alt="order-delivered"
                  style={{ margin: "auto" }}
                />
              </Step>
              <Step
                // onClick={() => goTo(2)}
                placeholder={""}
                style={{
                  backgroundColor:
                    currentStepIndex >= 2 ? "#ff6946" : "#d3d3d3",
                  padding: "10px",
                  borderRadius: "50%",
                }}
              >
                <img
                  width="30"
                  height="30"
                  src="https://img.icons8.com/3d-fluency/30/gear--v1.png"
                  alt="gear--v1"
                  style={{ margin: "auto" }}
                />
              </Step>
              <Step
                // onClick={() => goTo(3)}
                placeholder={""}
                style={{
                  backgroundColor:
                    currentStepIndex >= 3 ? "#f5b041" : "#d3d3d3",
                  padding: "10px",
                  borderRadius: "50%",
                }}
              >
                <img
                  width="30"
                  height="30"
                  src="https://img.icons8.com/3d-fluency/30/clock.png"
                  alt="clock"
                  style={{ margin: "auto" }}
                />
              </Step>
            </Stepper>
          </div>
          <section className="content">{step}</section>
          <div className="button-modal">
            <ModalButton
              type="button"
              color="white" // Icon color
              hoverColor="grey" // Hover background color
              activeColor="darkgrey" // Active background color
              textColor="black" // Text color
              backgroundColor="lightgrey" // Default background color
              beforeColor="rgba(0, 0, 0, 0.3)" // Semi-transparent color for the ::before pseudo-element
              icon={<span className="icon">⬅️</span>}
              onClick={handleBackClick}
              isDisabled={isFirstStep ? true : false}
            >
              {t("back")}
            </ModalButton>

            <ModalButton
              type="button" // Always "button" here, we handle submission in the handleNextPage function
              color="white"
              hoverColor="rgba(46, 204, 113, 1)"
              activeColor="navy"
              textColor="white"
              backgroundColor="rgba(46, 204, 113,0.9)"
              beforeColor="rgba(0, 0, 0, 0.1)"
              icon={
                isLastStep ? (
                  <span className="icon">✅</span>
                ) : (
                  <span className="icon">➡️</span>
                )
              }
              isIconRight={true}
              onClick={handleNextPage}
              isDisabled={isLoading}
            >
              {isLastStep ? t("create") : t("next")}
            </ModalButton>
          </div>
        </form>
      </section>
    </Fragment>
  );
};

export default CreateBranchMain;
