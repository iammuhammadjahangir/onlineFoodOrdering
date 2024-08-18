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
import { generatePromoCode } from "../../../features/utils";
import { useGetAllCategoryQuery } from "../../../redux/api/category";
import { useGetAllProductsQuery } from "../../../redux/api/product";
import { useUpdatePromoCodeDiscountMutation } from "../../../redux/api/promoCodeApi";
import { useGetAllShopsQuery } from "../../../redux/api/shop";
import { PromoCode, PromoCodeInitialType } from "../../../types/apiTypes";
import { CustomError } from "../../../types/types";
import toast from "react-hot-toast";

interface newBannerProps {
  onClose: () => void;
  item: PromoCode;
}
const UpdatePromoCodeDiscount = ({ onClose, item }: newBannerProps) => {
  const { t } = useTranslation();
  const [updatePromoCode, { isError, error }] =
    useUpdatePromoCodeDiscountMutation();

  const [loading, setLoading] = useState(true);

  const { data: categoryData } = useGetAllCategoryQuery();
  const { data: itemData } = useGetAllProductsQuery();
  const { data: shopData } = useGetAllShopsQuery("");

  const [categoryiesDropDown, setCategoryiesDropDown] = useState([]);
  const [shopDropDownData, setShopDropDownData] = useState([]);
  const [productsDropDownData, setProductsDropDownData] = useState([]);

  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }

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
      const product = itemData.allProducts.map((item) => ({
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
      const shops = shopData.shops.map((shop) => ({
        value: shop._id,
        label: `${shop.shopAddress} (${shop.shopCode})`,
        color: `hsl(${Math.random() * 100 * 4},${Math.random() * 100}%,50%)`,
      }));

      setShopDropDownData(shops as never[]);
      setLoading(false);
    }
  }, [shopData]);

  const initialValues: PromoCodeInitialType = {
    promoCode: item.promoCode,
    startDate: item.startDate,
    endDate: item.endDate,
    forFirstTimeOnly: item.forFirstTimeOnly,
    maxCount: item.maxCount,
    maxCountPerUser: item.maxCountPerUser,
    discountType: item.discountType,
    discountAmount: item.discountAmount,
    minimumOrderAmount: item.minimumOrderAmount,
    orderType: item.orderType,
    branches: item.branches.map((b) => b?._id),
    applicableOnSections: item.applicableOnSections.map((sec) => sec?._id),
    freeProduct: item.freeProduct?._id,
    specificCustomer: item.specificCustomer?._id,
    applicableOn: item.applicableOn,
    usedCount: item.usedCount,
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
      updatePromoCode({ ...values, id: item._id });
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
  console.log(item);
  return (
    <>
      {!loading && (
        <section className="newPromoCodeDiscount">
          <Heading name={t("updatePromoCode")} />
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
                  defaultValue={
                    DiscountType.find(
                      (dis: any) => dis.value === item.discountType
                    ) || null
                  }
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
                  defaultValue={
                    OrderType.find(
                      (ord: any) => ord.value === item.orderType
                    ) || null
                  }
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
                defaultValue={shopDropDownData
                  .filter((shop: any) =>
                    item.branches.some(
                      (branch: any) => shop.value === branch._id
                    )
                  )
                  .map((filteredItem: any) => filteredItem)}
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
                defaultValue={categoryiesDropDown
                  .filter((cat: any) =>
                    item.applicableOnSections.some(
                      (sec: any) => cat.value === sec._id
                    )
                  )
                  .map((filteredItem: any) => filteredItem)}
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
                defaultValue={
                  productsDropDownData.find(
                    (prod: any) => prod.value === item.freeProduct?._id
                  ) || null
                }
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
                defaultValue={
                  applicableOnDropDown.find(
                    (app: any) => app.value === item.applicableOn
                  ) || null
                }
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
      )}
    </>
  );
};

export default UpdatePromoCodeDiscount;
