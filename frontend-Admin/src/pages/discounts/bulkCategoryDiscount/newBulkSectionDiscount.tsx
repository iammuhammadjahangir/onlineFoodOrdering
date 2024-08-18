import React, { useEffect, useState } from "react";
import { BulkDiscount, BulkDiscountInitialType } from "../../../types/apiTypes";
import { useFormik } from "formik";
import { useGetAllCategoryQuery } from "../../../redux/api/category";
import Heading from "../../../components/pageHeading/heading";
import { useTranslation } from "react-i18next";
import DropDown from "../../../components/dropdown/selectDropdown";
import Input from "../../../components/inputs/input";
import SingleDatePicker from "../../../components/dropdown/singleDatePicker";
import ModalButton from "../../../components/button/modalButtons";
import StatusToggle from "../../../components/switch/active/In-activeSwitch";
import { bulkCategoryDiscountSchema } from "../../../features/schema/discountsSchema";
import { useCreateNewBulkCategoryDiscountMutation } from "../../../redux/api/bulkCategoryDiscountApi";

interface newBannerProps {
  onClose: () => void;
}
const NewBulkSectionDiscount = ({ onClose }: newBannerProps) => {
  const { t } = useTranslation();
  const { data: categoryData } = useGetAllCategoryQuery();
  const [categoryiesDropDown, setCategoryiesDropDown] = useState([]);
  const [createBulkCategoryDiscount] =
    useCreateNewBulkCategoryDiscountMutation();

  const initialValues: BulkDiscountInitialType = {
    startDate: null,
    endDate: null,
    brandName: "",
    discountPercentage: 0,
    categories: [],
    disableCategoryAfterExpiry: false,
  };

  useEffect(() => {
    if (categoryData) {
      console.log(categoryData);
      const product = categoryData.allCategories.map((item) => ({
        value: item._id,
        label: `${item.name} `,
        color: `hsl(${Math.random() * 100 * 4},${Math.random() * 100}%,50%)`,
      }));

      setCategoryiesDropDown(product as never[]);
    }
  }, [categoryData]);

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
    validationSchema: bulkCategoryDiscountSchema,
    validateOnChange: false,
    validateOnBlur: true,
    validateOnMount: true,
    //// By disabling validation onChange and onBlur formik will validate on submit.
    onSubmit: async (values) => {
      console.log(values);
      createBulkCategoryDiscount(values);
      onClose();
      //   registerProduct(values);
    },
  });

  const handleDateChange = (dates: [Date, Date] | null) => {
    if (dates) {
      setFieldValue("startDate", dates[0]);
      setFieldValue("endDate", dates[1]);
    }
  };

  return (
    <section className="newBulkDiscount">
      <Heading name={t("newBulkDiscount")} />
      <form onSubmit={handleSubmit}>
        <div className="personalContainer">
          <h3>{t("categories")}</h3>
          <DropDown
            options={categoryiesDropDown}
            isMulti={true}
            name="categories"
            handleChange={handleChange}
            handleBlur={handleBlur}
            touched={touched?.categories}
            errors={errors?.categories as any}
            value={values.categories || ""}
            setFieldValues={setFieldValue}
            defaultValue={null}
          />
        </div>
        <SingleDatePicker
          name="Banner Validity"
          startDate={values.startDate}
          endDate={values.endDate}
          onChange={handleDateChange}
          error={
            touched.startDate && errors.startDate
              ? (errors.startDate as string)
              : ""
          }
          touched={!!(touched.startDate || touched.endDate)}
          // icon={<LuCalendarClock />}
        />
        <Input
          label={t("brandName")}
          className="w-80"
          type="text"
          placeholder={t("enterBrandName")}
          name="brandName"
          autoComplete="off"
          maxLength="100"
          required={false}
          value={values.brandName || ""}
          onKeyDown={null}
          isDisabled={false}
          handleChange={handleChange}
          handleBlur={handleBlur}
          touched={touched?.brandName}
          errors={errors?.brandName}
          //   icon={<MdOutlineLowPriority />}
        />
        <Input
          label={t("discountPercentage")}
          className="w-80"
          type="text"
          placeholder={t("enterDiscountPercentage")}
          name="discountPercentage"
          autoComplete="off"
          maxLength="100"
          required={false}
          value={values.discountPercentage || ""}
          onKeyDown={null}
          isDisabled={false}
          handleChange={handleChange}
          handleBlur={handleBlur}
          touched={touched?.discountPercentage}
          errors={errors?.discountPercentage}
          //   icon={<MdOutlineLowPriority />}
        />

        <div className="toogleStatus">
          <h3>{t("disableCategoryAfterExpiry")}</h3>
          <StatusToggle
            isChecked={values.disableCategoryAfterExpiry}
            enabledValueName="Yes"
            disabledValueName="No"
            handleChange={() => {
              setFieldValue(
                "disableCategoryAfterExpiry",
                !values.disableCategoryAfterExpiry
              );
            }}
            id="id"
          />
        </div>

        <div className="button-modal">
          <ModalButton
            onClick={onClose}
            type="button"
            color="white" // Icon color
            hoverColor="grey" // Hover background color
            activeColor="darkgrey" // Active background color
            textColor="black" // Text color
            backgroundColor="lightgrey" // Default background color
            beforeColor="rgba(0, 0, 0, 0.3)" // Semi-transparent color for the ::before pseudo-element
            icon={<span className="icon">✖️</span>}
          >
            Close
          </ModalButton>

          <ModalButton
            type="submit"
            color="white" // Icon color
            hoverColor="rgba(46, 204, 113, 1)" // Hover background color
            activeColor="navy" // Active background color
            textColor="white" // Text color
            backgroundColor="rgba(46, 204, 113,0.9)" // Default background color
            beforeColor="rgba(0, 0, 0, 0.1)" // Semi-transparent color for the ::before pseudo-element
            icon={<span className="icon">💾</span>}
          >
            Submit
          </ModalButton>
        </div>
      </form>
    </section>
  );
};

export default NewBulkSectionDiscount;
