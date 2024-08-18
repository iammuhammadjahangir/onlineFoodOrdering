import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { GiCardRandom } from "react-icons/gi";
import {
  applicableOnDropDown,
  DiscountType,
  OrderType,
} from "../../../assets/data";
import ModalButton from "../../../components/button/modalButtons";
import DropDown from "../../../components/dropdown/selectDropdown";
import SingleDatePicker from "../../../components/dropdown/singleDatePicker";
import Input from "../../../components/inputs/input";
import Heading from "../../../components/pageHeading/heading";
import StatusToggle from "../../../components/switch/active/In-activeSwitch";
import { promoCodeSchema } from "../../../features/schema/discountsSchema";
import { useGetAllCategoryQuery } from "../../../redux/api/category";
import { useGetAllProductsQuery } from "../../../redux/api/product";
import { useGetAllBranchesQuery } from "../../../redux/api/branch";
import { PromoCodeInitialType } from "../../../types/apiTypes";
import { generatePromoCode } from "../../../features/utils";
import { useCreateNewPromoCodeDiscountMutation } from "../../../redux/api/promoCodeApi";

interface newBannerProps {
  onClose: () => void;
}

const NewPromoCodeDiscount = ({ onClose }: newBannerProps) => {
  const { t } = useTranslation();
  const [createNewPromoCode] = useCreateNewPromoCodeDiscountMutation();

  const { data: categoryData } = useGetAllCategoryQuery();
  const { data: itemData } = useGetAllProductsQuery();
  const { data: shopData } = useGetAllBranchesQuery();

  const [categoryiesDropDown, setCategoryiesDropDown] = useState([]);
  const [shopDropDownData, setShopDropDownData] = useState([]);
  const [productsDropDownData, setProductsDropDownData] = useState([]);

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

  useEffect(() => {
    if (itemData) {
      console.log(itemData);
      const product = itemData.allItems.map((item) => ({
        value: item._id,
        label: `${item.name} `,
        color: `hsl(${Math.random() * 100 * 4},${Math.random() * 100}%,50%)`,
      }));

      setProductsDropDownData(product as never[]);
    }
  }, [itemData]);

  useEffect(() => {
    if (shopData) {
      console.log(shopData);
      const shops = shopData.data.map((shop) => ({
        value: shop._id,
        label: `${shop.branchAddress.area} (${shop.branchCode})`,
        color: `hsl(${Math.random() * 100 * 4},${Math.random() * 100}%,50%)`,
      }));

      setShopDropDownData(shops as never[]);
    }
  }, [shopData]);

  const initialValues: PromoCodeInitialType = {
    promoCode: "",
    startDate: null,
    endDate: null,
    forFirstTimeOnly: false,
    maxCount: 0,
    maxCountPerUser: 0,
    discountType: "Flat",
    discountAmount: 0,
    minimumOrderAmount: 0,
    orderType: "Delivery",
    branches: [],
    applicableOnSections: [],
    freeProduct: null,
    specificCustomer: "",
    applicableOn: null,
    usedCount: 0,
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
    validationSchema: promoCodeSchema,
    validateOnChange: false,
    validateOnBlur: true,
    validateOnMount: true,
    //// By disabling validation onChange and onBlur formik will validate on submit.
    onSubmit: async (values) => {
      console.log(values);
      createNewPromoCode(values);
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
    <section className="newPromoCodeDiscount">
      <Heading name={t("newPromoCode")} />
      <form onSubmit={handleSubmit}>
        <div className="promoCode">
          <Input
            label={t("promoCode")}
            className="w-80"
            type="text"
            placeholder={t("enterPromoCode")}
            name="promoCode"
            autoComplete="off"
            maxLength="100"
            required={false}
            value={values.promoCode || ""}
            onKeyDown={null}
            isDisabled={false}
            handleChange={handleChange}
            handleBlur={handleBlur}
            touched={touched?.promoCode}
            errors={errors?.promoCode}
            //   icon={<MdOutlineLowPriority />}
          />
          <GiCardRandom
            onClick={(e: any) => {
              const randomCode = generatePromoCode(e);
              setFieldValue("promoCode", randomCode);
            }}
          />
        </div>
        <SingleDatePicker
          name={t("promoValidity")}
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
        <div className="toogleStatus swich">
          <h3>{t("forFirstTimeUserOnly")}</h3>
          <StatusToggle
            isChecked={values.forFirstTimeOnly}
            enabledValueName="Yes"
            disabledValueName="No"
            handleChange={() => {
              setFieldValue("forFirstTimeOnly", !values.forFirstTimeOnly);
            }}
            id="id"
          />
        </div>
        <section className="maxCount">
          <Input
            label={t("maxCount")}
            className="w-80"
            type="text"
            placeholder={t("enterMaxCount")}
            name="maxCount"
            autoComplete="off"
            maxLength="100"
            required={false}
            value={values.maxCount || ""}
            onKeyDown={null}
            isDisabled={false}
            handleChange={handleChange}
            handleBlur={handleBlur}
            touched={touched?.maxCount}
            errors={errors?.maxCount}
            //   icon={<MdOutlineLowPriority />}
          />
          <Input
            label={t("maxCountPerUser")}
            className="w-80"
            type="text"
            placeholder={t("enterMaxCountPerUser")}
            name="maxCountPerUser"
            autoComplete="off"
            maxLength="100"
            required={false}
            value={values.maxCountPerUser || ""}
            onKeyDown={null}
            isDisabled={false}
            handleChange={handleChange}
            handleBlur={handleBlur}
            touched={touched?.maxCountPerUser}
            errors={errors?.maxCountPerUser}
            //   icon={<MdOutlineLowPriority />}
          />
        </section>
        <section className="discount">
          <div className="personalContainer">
            <h3>{t("discountType")}</h3>
            <DropDown
              options={DiscountType}
              isMulti={false}
              name="discountType"
              handleChange={handleChange}
              handleBlur={handleBlur}
              touched={touched?.discountType}
              errors={errors?.discountType as any}
              value={values.discountType || ""}
              setFieldValues={setFieldValue}
              defaultValue={null}
            />
          </div>
          <Input
            label={t("discountAmount")}
            className="w-80"
            type="text"
            placeholder={t("enterDiscountAmount")}
            name="discountAmount"
            autoComplete="off"
            maxLength="100"
            required={false}
            value={values.discountAmount || ""}
            onKeyDown={null}
            isDisabled={false}
            handleChange={handleChange}
            handleBlur={handleBlur}
            touched={touched?.discountAmount}
            errors={errors?.discountAmount}
            //   icon={<MdOutlineLowPriority />}
          />
        </section>
        <section className="minimumOrderAmount">
          <Input
            label={t("minimumOrderAmount")}
            className="w-80"
            type="text"
            placeholder={t("enterMinimumOrderAmount")}
            name="minimumOrderAmount"
            autoComplete="off"
            maxLength="100"
            required={false}
            value={values.minimumOrderAmount || ""}
            onKeyDown={null}
            isDisabled={false}
            handleChange={handleChange}
            handleBlur={handleBlur}
            touched={touched?.minimumOrderAmount}
            errors={errors?.minimumOrderAmount}
            //   icon={<MdOutlineLowPriority />}
          />
          <div className="personalContainer">
            <h3>{t("orderType")}</h3>
            <DropDown
              options={OrderType}
              isMulti={false}
              name="orderType"
              handleChange={handleChange}
              handleBlur={handleBlur}
              touched={touched?.orderType}
              errors={errors?.orderType as any}
              value={values.orderType || ""}
              setFieldValues={setFieldValue}
              defaultValue={null}
            />
          </div>
        </section>
        <div className="personalContainer">
          <h3>{t("branches")}</h3>
          <DropDown
            options={shopDropDownData}
            isMulti={true}
            name="branches"
            handleChange={handleChange}
            handleBlur={handleBlur}
            touched={touched?.branches}
            errors={errors?.branches as any}
            value={values.branches || ""}
            setFieldValues={setFieldValue}
            defaultValue={null}
          />
        </div>
        <div className="personalContainer">
          <h3>{t("applicableOnSections")}</h3>
          <DropDown
            options={categoryiesDropDown}
            isMulti={true}
            name="applicableOnSections"
            handleChange={handleChange}
            handleBlur={handleBlur}
            touched={touched?.applicableOnSections}
            errors={errors?.applicableOnSections as any}
            value={values.applicableOnSections || ""}
            setFieldValues={setFieldValue}
            defaultValue={null}
          />
        </div>

        <div className="personalContainer">
          <h3>{t("freeProduct")}</h3>
          <DropDown
            options={productsDropDownData}
            isMulti={false}
            name="freeProduct"
            handleChange={handleChange}
            handleBlur={handleBlur}
            touched={touched?.freeProduct}
            errors={errors?.freeProduct}
            value={values.freeProduct || ""}
            setFieldValues={setFieldValue}
            defaultValue={null}
          />
        </div>
        <div className="personalContainer">
          <h3>{t("applicableOn")}</h3>
          <DropDown
            options={applicableOnDropDown}
            isMulti={false}
            name="applicableOn"
            handleChange={handleChange}
            handleBlur={handleBlur}
            touched={touched?.applicableOn}
            errors={errors?.applicableOn}
            value={values.applicableOn || ""}
            setFieldValues={setFieldValue}
            defaultValue={null}
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
export default NewPromoCodeDiscount;
