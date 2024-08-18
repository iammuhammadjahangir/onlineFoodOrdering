import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Fragment } from "react/jsx-runtime";
import Heading from "../../components/pageHeading/heading";

// For Image Uploading
import { useFormik } from "formik";
import ReactImagePickerEditor, {
  ImagePickerConf,
} from "react-image-picker-editor";
import "react-image-picker-editor/dist/index.css";
import Input from "../../components/inputs/input";
import { productSchema } from "../../features/schema/productSchema";
import { category, CustomError, Item, UpdateItem } from "../../types/types";

// Icons
import { GiPriceTag } from "react-icons/gi";
import { IoPricetagOutline } from "react-icons/io5";
import { LiaProductHunt } from "react-icons/lia";
import { TbFileDescription } from "react-icons/tb";
import DropDown from "../../components/dropdown/selectDropdown";

// Redux
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { DeliveryByDropDown } from "../../assets/data";
import ModalButton from "../../components/button/modalButtons";
import { ImageType } from "../../components/dragDrop/dragDropImages";
import DynamicSelectDropdown from "../../components/dropdown/dynamicSelectDropdown";
import MultiImageComponent from "../../components/imageComponent/multiImageComponent";
import StatusToggle from "../../components/switch/active/In-activeSwitch";
import { FileToString } from "../../features/images/fileToString";
import { useGetAllCategoryQuery } from "../../redux/api/category";
import {
  useDeleteImageByIndexMutation,
  useUpdateProductMutation,
} from "../../redux/api/product";
import { server } from "../../redux/store";

interface newBannerProps {
  onClose: () => void;
  item: Item;
}

const UpdateProduct = ({ onClose, item }: newBannerProps) => {
  console.log(item);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [imageSrc, setImageSrc] = useState("");
  const [initialImage, setInitialImage] = useState("");
  const { data: categoryData } = useGetAllCategoryQuery();
  const [updateProduct, { isError, error, isSuccess }] =
    useUpdateProductMutation();
  const [deleteImage] = useDeleteImageByIndexMutation();
  // console.log(imageSrc);

  // general UseStates
  const [categoryDropDownData, setCategoryDropDownData] = useState([]);

  const [loadingData, setLoadingData] = useState(false);
  const [loadingDropDown, setLoadingDropDown] = useState(true);

  const initialValues: UpdateItem = {
    name: item.name,
    brandName: item.brandName,
    description: item.description,
    productImage: null,
    additionalImages: item.additionalImages,
    category: item.category.map((cat: any) => cat._id),
    deal: item.deal,
    promoCodeOnly: item.promoCodeOnly,
    available: item.available,
    upsellingItem: item.upsellingItem,
    appOnly: item.appOnly,
    deliveryBy: item.deliveryBy,
    priceType: item.priceType,
    price: item.price,
    discountType: "fixed amount",
    discountPrice: item.discountPrice,
    preparationTime: item.preparationTime,
    calories: item.calories,
    barcode: item.barcode,
    sku: item.sku,
    uom: item.uom,
    priority: item.priority,
    skuPosMappingId: item.skuPosMappingId,
    allergens: item.allergens.map((all: any) => all),
    tags: item.tags.map((tags: any) => tags),
  };

  const config2: ImagePickerConf = {
    borderRadius: "10%",
    language: "en",
    width: "30rem",
    height: "30rem",
    objectFit: "cover",
    compressInitial: null,
    // hideAddBtn:  false,
    // hideDeleteBtn:false,
    // hideDownloadBtn:false,
    // hideEditBtn:false
  };

  useEffect(() => {
    if (categoryData) {
      const category = categoryData.allCategories.map((item) => ({
        value: item._id,
        label: `${item.name}`,
        color: `hsl(${Math.random() * 100 * 4},${Math.random() * 100}%,50%)`,
      }));

      setCategoryDropDownData(category as never[]);
      setLoadingDropDown(false);
    }
  }, [categoryData]);
  useEffect(() => {
    if (isError) {
      const err = error as CustomError;
      toast.error(err.data.message);
    }
    if (isSuccess) {
      toast.success("Product Created Successfully");
      onClose();
    }
  }, [isError, isSuccess]);

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
    validationSchema: productSchema,
    validateOnChange: false,
    validateOnBlur: true,
    validateOnMount: true,
    //// By disabling validation onChange and onBlur formik will validate on submit.
    onSubmit: async (values) => {
      console.log(values);
      const updatedValues = {
        ...values,
        id: item._id,
      };
      updateProduct(updatedValues);
    },
  });

  const handleImage = (newDataUri: any) => {
    if (newDataUri) {
      setFieldValue("productImage", newDataUri);
    }
    if (newDataUri && handleChange) {
      handleChange({
        target: {
          name: "productImage",
          value: newDataUri,
        },
      } as any);
    }
  };

  useEffect(() => {
    console.log(location.state);
    console.log(item);
    const fetchData = async () => {
      try {
        if (item) {
          console.log(item);
          const encoding = await FileToString(
            `${server}/${item.productImage.url}`
          );
          setInitialImage(encoding as string);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle errors here
      } finally {
        // Once data fetching is complete, set loadingData to false
        setLoadingData(true);
      }
    };

    fetchData();
  }, [item]);

  const handleImageChange = (newImages: ImageType[]) => {
    setFieldValue("additionalImages", newImages);
  };

  console.log(values);
  console.log(errors);

  const deleteImagesByIndex = (index: number) => {
    deleteImage({
      id: item._id,
      index: index,
    });
  };

  return (
    <Fragment>
      {loadingData && !loadingDropDown && (
        <section className="newProduct">
          <Heading name={t("updateProduct")} />
          <section className="newProductContainer">
            <form onSubmit={handleSubmit}>
              <section className="productImageContainer">
                <ReactImagePickerEditor
                  config={config2}
                  imageSrcProp={initialImage}
                  imageChanged={(newDataUri: any) => {
                    handleImage(newDataUri);
                    setImageSrc(newDataUri);
                  }}
                />
                <p className="error">
                  {touched.productImage && errors.productImage
                    ? errors.productImage
                    : null}
                </p>
              </section>
              <section className="detailsSection">
                <div className="personalContainer">
                  <h3>{t("sections")}</h3>
                  <DropDown
                    options={categoryDropDownData}
                    isMulti={true}
                    name="category"
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    touched={touched?.category}
                    errors={errors?.category as any}
                    value={values.category || ""}
                    setFieldValues={setFieldValue}
                    defaultValue={categoryDropDownData
                      .filter((cat: any) =>
                        item.category.some(
                          (itemCat: category) => cat.value === itemCat._id
                        )
                      )
                      .map((filteredItem: any) => filteredItem)}
                  />
                </div>
                <section className="nameDescription">
                  <Input
                    label={t("productName")}
                    className="w-80"
                    type="text"
                    placeholder={t("enterProductName")}
                    name="name"
                    autoComplete="off"
                    maxLength="100"
                    required={false}
                    value={values.name || ""}
                    onKeyDown={null}
                    isDisabled={false}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    touched={touched?.name}
                    errors={errors?.name}
                    icon={<LiaProductHunt />}
                  />
                  <Input
                    label={t("brandName")}
                    className="w-80"
                    type="text"
                    placeholder={t("enterBrandName")}
                    name="brandName"
                    autoComplete="off"
                    maxLength="400"
                    required={false}
                    value={values.brandName || ""}
                    onKeyDown={null}
                    isDisabled={false}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    touched={touched?.brandName}
                    errors={errors?.brandName}
                    icon={<TbFileDescription />}
                  />
                </section>
                <section className="description">
                  <Input
                    label={t("description")}
                    className="w-80"
                    type="text"
                    placeholder={t("enterProductDescription")}
                    name="description"
                    autoComplete="off"
                    maxLength="400"
                    required={false}
                    value={values.description || ""}
                    onKeyDown={null}
                    isDisabled={false}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    touched={touched?.description}
                    errors={errors?.description}
                    icon={<TbFileDescription />}
                  />
                </section>
                <fieldset className="boolOptions fieldset-container">
                  <legend className="legend">{t("otherSetting")}</legend>
                  <section className="firstRow">
                    <div className="toogleStatus swich">
                      <h3>{t("deal")}</h3>
                      <StatusToggle
                        isChecked={values.deal}
                        enabledValueName="Yes"
                        disabledValueName="No"
                        handleChange={() => {
                          setFieldValue("deal", !values.deal);
                        }}
                        id="deal"
                      />
                    </div>
                    <div className="toogleStatus swich">
                      <h3>{t("avalible")}</h3>
                      <StatusToggle
                        isChecked={values.available}
                        enabledValueName="Yes"
                        disabledValueName="No"
                        handleChange={() => {
                          setFieldValue("available", !values.available);
                          if (!values.available)
                            setFieldValue("promoCodeOnly", false);
                        }}
                        id="available"
                      />
                    </div>
                  </section>
                  <section className="secondRow">
                    <div className="toogleStatus swich">
                      <h3>{t("promoCodeOnly")}</h3>
                      <StatusToggle
                        isChecked={values.promoCodeOnly}
                        enabledValueName="Yes"
                        disabledValueName="No"
                        handleChange={() => {
                          setFieldValue("promoCodeOnly", !values.promoCodeOnly);
                          if (!values.promoCodeOnly)
                            setFieldValue("available", false);
                        }}
                        id="promoCodeOnly"
                      />
                    </div>
                    <div className="toogleStatus swich">
                      <h3>{t("appOnly")}</h3>
                      <StatusToggle
                        isChecked={values.appOnly}
                        enabledValueName="Yes"
                        disabledValueName="No"
                        handleChange={() => {
                          setFieldValue("appOnly", !values.appOnly);
                        }}
                        id="appOnly"
                      />
                    </div>
                  </section>
                  <section className="thirdRow">
                    <div className="toogleStatus swich">
                      <h3>{t("upsellingItem")}</h3>
                      <StatusToggle
                        isChecked={values.upsellingItem}
                        enabledValueName="Yes"
                        disabledValueName="No"
                        handleChange={() => {
                          setFieldValue("upsellingItem", !values.upsellingItem);
                        }}
                        id="upsellingItem"
                      />
                    </div>
                  </section>
                </fieldset>
                <section className="deliveryBy">
                  <div className="personalContainer">
                    <h3>{t("deliveryBy")}</h3>
                    <DropDown
                      options={DeliveryByDropDown}
                      isMulti={false}
                      name="deliveryBy"
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      touched={touched?.deliveryBy}
                      errors={errors?.deliveryBy as any}
                      value={values.deliveryBy || ""}
                      setFieldValues={setFieldValue}
                      defaultValue={
                        DeliveryByDropDown.find(
                          (del: any) => del.value === item.deliveryBy
                        ) || null
                      }
                    />
                  </div>
                </section>
                <section className="priceContainer">
                  <fieldset className="priceTypeChoice fieldset-container">
                    <legend className="legend">{t("priceType")}</legend>
                    <div className="radioGroup">
                      <label>
                        <input
                          type="radio"
                          className="input-radio off"
                          name="priceType"
                          value="fixed"
                          checked={values.priceType === "fixed"}
                          onChange={() => setFieldValue("priceType", "fixed")}
                        />
                        {t("fixed")}
                      </label>
                      <label>
                        <input
                          type="radio"
                          className="input-radio on"
                          name="priceType"
                          value="starting from"
                          checked={values.priceType === "starting from"}
                          onChange={() =>
                            setFieldValue("priceType", "starting from")
                          }
                        />
                        {t("startingFrom")}
                      </label>
                    </div>
                  </fieldset>
                  <section className="priceRow">
                    <Input
                      label={t("price")}
                      className="w-80"
                      type="number"
                      placeholder={t("enterPrice")}
                      name="price"
                      autoComplete="off"
                      maxLength="100"
                      required={false}
                      value={values.price}
                      onKeyDown={null}
                      isDisabled={false}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      touched={touched?.price}
                      errors={errors?.price}
                      icon={<GiPriceTag />}
                    />
                  </section>
                </section>
                <section className="priority">
                  <Input
                    label={t("priority")}
                    className="w-80"
                    type="number"
                    placeholder={t("enterPriority")}
                    name="priority"
                    autoComplete="off"
                    maxLength="100"
                    required={false}
                    value={values.priority}
                    onKeyDown={null}
                    isDisabled={false}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    touched={touched?.priority}
                    errors={errors?.priority}
                    icon={<IoPricetagOutline />}
                  />
                  <Input
                    label={t("discountPrice")}
                    className="w-80"
                    type="text"
                    placeholder={t("enterDiscountPrice")}
                    name="discountPrice"
                    autoComplete="off"
                    maxLength="100"
                    required={false}
                    value={values.discountPrice}
                    onKeyDown={null}
                    isDisabled={false}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    touched={touched?.discountPrice}
                    errors={errors?.discountPrice}
                    icon={<IoPricetagOutline />}
                  />
                </section>
                <section className="timeWithCalerioes">
                  <Input
                    label={t("preparationTime")}
                    className="w-80"
                    type="number"
                    placeholder={t("enterPreparationTime")}
                    name="preparationTime"
                    autoComplete="off"
                    maxLength="100"
                    required={false}
                    value={values.preparationTime}
                    onKeyDown={null}
                    isDisabled={false}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    touched={touched?.preparationTime}
                    errors={errors?.preparationTime}
                    icon={<IoPricetagOutline />}
                  />
                  <Input
                    label={t("calories")}
                    className="w-80"
                    type="number"
                    placeholder={t("enterCalories")}
                    name="calories"
                    autoComplete="off"
                    maxLength="100"
                    required={false}
                    value={values.calories}
                    onKeyDown={null}
                    isDisabled={false}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    touched={touched?.calories}
                    errors={errors?.calories}
                    icon={<IoPricetagOutline />}
                  />
                </section>
                <section className="MapPosID">
                  <Input
                    label={t("posMappingID(Delivery)")}
                    className="w-80"
                    type="text"
                    placeholder={t("enterposMappingID")}
                    name="skuPosMappingId"
                    autoComplete="off"
                    maxLength="100"
                    required={false}
                    value={values.skuPosMappingId}
                    onKeyDown={null}
                    isDisabled={false}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    touched={touched?.skuPosMappingId}
                    errors={errors?.skuPosMappingId}
                    icon={<IoPricetagOutline />}
                  />
                  <Input
                    label={t("uom")}
                    className="w-80"
                    type="text"
                    placeholder={t("enterUOM")}
                    name="uom"
                    autoComplete="off"
                    maxLength="100"
                    required={false}
                    value={values.uom}
                    onKeyDown={null}
                    isDisabled={false}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    touched={touched?.uom}
                    errors={errors?.uom}
                    icon={<IoPricetagOutline />}
                  />
                </section>
                <section className="barcodeSKU">
                  <Input
                    label={t("barcode")}
                    className="w-80"
                    type="text"
                    placeholder={t("enterBarcode")}
                    name="barcode"
                    autoComplete="off"
                    maxLength="100"
                    required={false}
                    value={values.barcode}
                    onKeyDown={null}
                    isDisabled={false}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    touched={touched?.barcode}
                    errors={errors?.barcode}
                    icon={<IoPricetagOutline />}
                  />
                  <Input
                    label={t("sku")}
                    className="w-80"
                    type="text"
                    placeholder={t("enterSKU")}
                    name="sku"
                    autoComplete="off"
                    maxLength="100"
                    required={false}
                    value={values.sku}
                    onKeyDown={null}
                    isDisabled={false}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    touched={touched?.sku}
                    errors={errors?.sku}
                    icon={<IoPricetagOutline />}
                  />
                </section>
                {/* <section className="variationSection">
                  <div className="personalContainer">
                    <div className="new">
                      <h3>{t("allergens")}</h3>
                      <DynamicSelectDropdown
                        options={values.tags}
                        isMulti={true}
                        name="allergens"
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        touched={touched?.allergens as any}
                        errors={errors?.allergens as any}
                        value={values.allergens}
                        setFieldValues={setFieldValue}
                        defaultValue={values!.allergens!.map(
                          (allergen: string) => ({
                            label: allergen,
                            value: allergen,
                          })
                        )}
                      />
                    </div>
                  </div>
                </section> */}
                <section className="variationSection">
                  <div className="personalContainer">
                    <div className="new lastElement">
                      <h3>{t("tags")}</h3>
                      <DynamicSelectDropdown
                        options={values.tags}
                        isMulti={true}
                        name="tags"
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        touched={touched?.tags as any}
                        errors={errors?.tags as any}
                        value={values.tags}
                        setFieldValues={setFieldValue}
                        defaultValue={values!.tags!.map((tag: string) => ({
                          label: tag,
                          value: tag,
                        }))}
                      />
                    </div>
                  </div>
                </section>
                <MultiImageComponent
                  name={t("additionalImages")}
                  maxHeight={400}
                  maxWidth={400}
                  maxSize={200 * 1024}
                  initialImages={values.additionalImages as any}
                  onImageChange={handleImageChange}
                  defaultImageUrl={null}
                  errors={errors.additionalImages}
                  touched={touched.additionalImages}
                  updateImagesFunctions={deleteImagesByIndex}
                  maxImages={5}
                />
              </section>
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
        </section>
      )}
    </Fragment>
  );
};

export default UpdateProduct;
