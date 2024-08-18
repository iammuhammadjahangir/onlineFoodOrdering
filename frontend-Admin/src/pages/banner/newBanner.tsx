import { useFormik } from "formik";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { MdOutlineLowPriority } from "react-icons/md";
import ModalButton from "../../components/button/modalButtons";
import { ImageType } from "../../components/dragDrop/dragDropImages";
import ImageComponent from "../../components/dragDrop/imageComponent";
import DropDown from "../../components/dropdown/selectDropdown";
import SingleDatePicker from "../../components/dropdown/singleDatePicker";
import Input from "../../components/inputs/input";
import Heading from "../../components/pageHeading/heading";
import { bannerSchema } from "../../features/schema/bannerSchema";
import { useCreateNewBannerMutation } from "../../redux/api/bannerApi";
import { useGetAllProductsQuery } from "../../redux/api/product";
import { useGetAllBranchesQuery } from "../../redux/api/branch";
import { NewBannerType } from "../../types/apiTypes";
import { CustomError } from "../../types/types";

interface newBannerProps {
  onClose: () => void;
}

const NewBanner = ({ onClose }: newBannerProps) => {
  const { t } = useTranslation();
  const { data: itemData } = useGetAllProductsQuery();
  const { data: shopData } = useGetAllBranchesQuery();
  const [productsDropDownData, setProductsDropDownData] = useState([]);
  const [shopDropDownData, setShopDropDownData] = useState([]);
  const [newBanner, { isLoading, error, isError }] =
    useCreateNewBannerMutation();

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
    }
  }, [shopData]);

  const initialValues: NewBannerType = {
    title: "",
    startDate: null,
    endDate: null,
    appBannerImage: null,
    webBannerImage: null,
    priority: 1,
    linkedItem: null,
    branches: [],
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
      console.log(values);
      newBanner(values);
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
            defaultValue={null}
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
            defaultValue={null}
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
          defaultImageUrl={null}
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
          defaultImageUrl={null}
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
            Submit
          </ModalButton>
        </div>
      </form>
    </section>
  );
};

export default NewBanner;
