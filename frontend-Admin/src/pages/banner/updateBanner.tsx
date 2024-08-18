import { useFormik } from "formik";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { MdOutlineLowPriority } from "react-icons/md";
import ModalButton from "../../components/button/modalButtons";
import { ImageType } from "../../components/dragDrop/dragDropImages";
import ImageComponent from "../../components/imageComponent/imageComponent";
import DropDown from "../../components/dropdown/selectDropdown";
import SingleDatePicker from "../../components/dropdown/singleDatePicker";
import Input from "../../components/inputs/input";
import Heading from "../../components/pageHeading/heading";
import { bannerSchema } from "../../features/schema/bannerSchema";
import { useUpdateBannerMutation } from "../../redux/api/bannerApi";
import { useGetAllProductsQuery } from "../../redux/api/product";
import { useGetAllBranchesQuery } from "../../redux/api/branch";
import { Banner, NewBannerType } from "../../types/apiTypes";
import { CustomError } from "../../types/types";

interface newBannerProps {
  onClose: () => void;
  item: Banner;
}
const UpdateBanner = ({ onClose, item }: newBannerProps) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const { data: itemData } = useGetAllProductsQuery();
  const { data: shopData } = useGetAllBranchesQuery();
  const [productsDropDownData, setProductsDropDownData] = useState([]);
  const [shopDropDownData, setShopDropDownData] = useState([]);
  const [updateBanner, { error, isError }] = useUpdateBannerMutation();

  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }
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
      setLoading(false);
    }
  }, [shopData]);

  const initialValues: NewBannerType = {
    title: item.title,
    startDate: item.startDate,
    endDate: item.endDate,
    appBannerImage: null,
    webBannerImage: null,
    priority: Number(item.priority),
    linkedItem: item.linkedItem?._id as any,
    branches: item.branches.map((i) => i._id),
    // status: "",
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
    validationSchema: bannerSchema,
    validateOnChange: false,
    validateOnBlur: true,
    validateOnMount: true,
    //// By disabling validation onChange and onBlur formik will validate on submit.
    onSubmit: async (values) => {
      const updatedValues = {
        id: item._id,
        title: values.title,
        startDate: values.startDate,
        endDate: values.endDate,
        appBannerImage: values.appBannerImage,
        webBannerImage: values.webBannerImage,
        priority: values.priority,
        linkedItem: values.linkedItem,
        branches: values.branches,
      };
      console.log(updatedValues);
      updateBanner(updatedValues);
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

  const handleAppImageChange = (image: ImageType | null) => {
    setFieldValue("appBannerImage", image);
  };

  const handleWebImageChange = (image: ImageType | null) => {
    setFieldValue("webBannerImage", image);
  };

  console.log(values);
  return (
    <>
      {!loading && (
        <section className="newBanner">
          <Heading name={t("newBanner")} />
          <form onSubmit={handleSubmit}>
            <Input
              label={t("title")}
              className="w-80"
              type="text"
              placeholder={t("enterBannerTitle")}
              name="title"
              autoComplete="off"
              maxLength="100"
              required={false}
              value={values.title || ""}
              onKeyDown={null}
              isDisabled={false}
              handleChange={handleChange}
              handleBlur={handleBlur}
              touched={touched?.title}
              errors={errors?.title}
              //   icon={<MdOutlineLowPriority />}
            />
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
            <div className="personalContainer">
              <h3>{t("linkedItem")}</h3>
              <DropDown
                options={productsDropDownData}
                isMulti={false}
                name="linkedItem"
                handleChange={handleChange}
                handleBlur={handleBlur}
                touched={touched?.linkedItem}
                errors={errors?.linkedItem}
                value={values.linkedItem || ""}
                setFieldValues={setFieldValue}
                defaultValue={
                  productsDropDownData.find(
                    (prod: any) => prod.value === item.linkedItem?._id
                  ) || null
                }
              />
            </div>
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
                  .map(
                    (filteredItem: any) => filteredItem
                    // {
                    // value: filteredItem._id,
                    // label: `${filteredItem.name} (${
                    //   filteredItem.isRequired ? "required" : "optional"
                    // })`,
                    // color: `hsl(${Math.random() * 100 * 4},${
                    //   Math.random() * 100
                    // }%,50%)`,
                    // }
                  )}
              />
            </div>
            <Input
              label={t("priority")}
              className="w-80"
              type="text"
              placeholder={t("enterProductPriority")}
              name="priority"
              autoComplete="off"
              maxLength="100"
              required={false}
              value={values.priority || ""}
              onKeyDown={null}
              isDisabled={false}
              handleChange={handleChange}
              handleBlur={handleBlur}
              touched={touched?.priority}
              errors={errors?.priority}
              icon={<MdOutlineLowPriority />}
            />
            <ImageComponent
              name={t("appBannerImage")}
              maxHeight={362}
              maxWidth={800}
              maxSize={500 * 1024}
              initialImage={values.appBannerImage as any}
              onImageChange={handleAppImageChange}
              defaultImageUrl={item.appBannerImage.url}
              errors={errors.appBannerImage}
              touched={touched.appBannerImage}
            />
            <ImageComponent
              name={t("webBannerImage")}
              maxHeight={460}
              maxWidth={1520}
              maxSize={500 * 1024}
              initialImage={values.webBannerImage as any}
              onImageChange={handleWebImageChange}
              defaultImageUrl={item.webBannerImage.url}
              errors={errors.webBannerImage}
              touched={touched.webBannerImage}
            />
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
                Update
              </ModalButton>
            </div>
          </form>
        </section>
      )}
    </>
  );
};

export default UpdateBanner;
