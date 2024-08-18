import { useTranslation } from "react-i18next";
import { Fragment } from "react/jsx-runtime";
import ModalButton from "../../../components/button/modalButtons";
import { useMultiSteps } from "../multiPageSwapperHook";
import BranchAddressSection from "../newBranch/branchAddressSection";
import BranchSettingSection from "../newBranch/branchSettingSection";
import BranchTimingSection from "../newBranch/branchTimingSection";

import { Step, Stepper } from "@material-tailwind/react";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getValidationSchema } from "../../../features/schema/branchesSchema";
import { convertTimeToCompleteDate } from "../../../features/utils";
import { useUpdateBranchMutation } from "../../../redux/api/branch";
import { newBranchType } from "../../../types/apiTypes";
import { BranchFormValues, CustomError } from "../../../types/types";
import BranchWareHouseSection from "../newBranch/branchWareHouseSection";
// import { NewBranchValidationSchema } from "../../../features/schema/branchesSchema";

interface newBranchProps {
  onClose: () => void;
  item: newBranchType;
}
const CreateBranchMain = ({ onClose, item }: newBranchProps) => {
  const { t } = useTranslation();
  const [validationStep, setValidationStep] = useState<number>(0);
  const [updateBranch, { isLoading, isError, error }] =
    useUpdateBranchMutation();

  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }

  const initialValues: BranchFormValues = {
    branchDescription: item.branchDescription,
    branchAddress: {
      latitude: item.branchAddress.latitude || 0,
      longitude: item.branchAddress.latitude || 0,
      houseNo: item.branchAddress.houseNo,
      street: item.branchAddress.street,
      area: item.branchAddress.area,
      city: item.branchAddress.city,
      state: item.branchAddress.state,
      country: item.branchAddress.country,
      postalCode: item.branchAddress.postalCode,
    },
    warehouseId: item.warehouseId?._id || undefined,
    branchType: "branch",
    branchTiming: {
      days: item.branchTiming.days,
      firstHalfOpenTime: convertTimeToCompleteDate(
        item.branchTiming.firstHalfOpenTime
      ),
      firstHalfCloseTime: convertTimeToCompleteDate(
        item.branchTiming.firstHalfCloseTime
      ),
      secondHalfOpenTime: convertTimeToCompleteDate(
        item.branchTiming?.secondHalfOpenTime
      ),
      secondHalfCloseTime: convertTimeToCompleteDate(
        item.branchTiming?.secondHalfCloseTime
      ),
    },
    branchSettings: {
      asapOnly: item.branchSettings.asapOnly,
      preOrderOnly: item.branchSettings.preOrderOnly,
      sameDayPreOrder: item.branchSettings.sameDayPreOrder,
      otherSettings: {
        swsDeliveryModule: item.branchSettings.otherSettings.swsDeliveryModule,
        taxPercentage: item.branchSettings.otherSettings.taxPercentage,
      },
      minPreOrderTime: item.branchSettings.minPreOrderTime,
      maxPreOrderTime: item.branchSettings.maxPreOrderTime,
    },
    customerSupport: {
      contactEmail: item.customerSupport.contactEmail,
      contactNumber: item.customerSupport.contactNumber,
    },
    activityStatus: item.activityStatus,
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
        id: item._id,
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
      updateBranch(updatedValues).then(() => {
        toast.success("Branch updated successfully");
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
    goTo,
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
      defaultWarehouseId={(item?.warehouseId?._id || null) as any}
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
      defaultNumber={item.customerSupport.contactNumber}
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
                onClick={() => goTo(0)}
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
                onClick={() => goTo(1)}
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
                onClick={() => goTo(2)}
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
                onClick={() => goTo(3)}
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
