import { useFormik } from "formik";
import { Fragment, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import {
  MdAdd,
  MdDriveFileRenameOutline,
  MdOutlinePriceChange,
} from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import { isRequiredArray } from "../../assets/data";
import Button from "../../components/button/button";
import DropDown from "../../components/dropdown/selectDropdown";
import Input from "../../components/inputs/input";
import Loader from "../../components/loader/loader";
import Container from "../../components/mainContainer/container";
import Heading from "../../components/pageHeading/heading";
import { variationSchema } from "../../features/schema/variationOptionsSchema";
import { useUpdateVariationMutation } from "../../redux/api/variation";
import { useGetAllVariationOptionsQuery } from "../../redux/api/variationOptions";
import { CustomError, Variation } from "../../types/types";

interface newBannerProps {
  onClose: () => void;
  item: Variation;
}
const UpdateVariation = ({ onClose, item }: newBannerProps) => {
  console.log(item);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const location = useLocation();
  const [updateVariation, { isLoading, isError, error, isSuccess }] =
    useUpdateVariationMutation();
  const { data } = useGetAllVariationOptionsQuery();
  const [variationDropDownData, setVariationDropDownData] = useState([]);
  const [variationDropDownDefaultValue, setVariationDropDownDefaultValue] =
    useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);

  const initialValues = {
    name: location.state.variation.name,
    description: location.state.variation.description,
    isRequired: location.state.variation.isRequired === true ? true : false,
    variationOptions: [],
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
    validationSchema: variationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values) => {
      // console.log(values);
      // console.log(location.state.variation._id);
      const updatedValues = {
        ...values,
        id: location.state.variation._id,
      };
      updateVariation(updatedValues);
    },
  });
  useEffect(() => {
    if (isError) {
      const err = error as CustomError;
      toast.error(err.data.message);
    }
    if (isSuccess) {
      toast.success("Variation Updated Successfully");
      navigate("/variation");
    }
  }, [isError, isSuccess]);

  useEffect(() => {
    if (data && location.state) {
      const variationOptions = data.allCategories.map((item) => ({
        value: item._id,
        label: `${item.name} (${item.price})`,
        color: `hsl(${Math.random() * 100 * 4},${Math.random() * 100}%,50%)`,
      }));

      const filteredDropDownItems = variationOptions.filter(
        (dropDownItem: any) =>
          location.state.variation.variationOptions.some(
            (variationItem: any) => dropDownItem.value === variationItem._id
          )
      );

      const defaultValue =
        filteredDropDownItems.length > 0 ? filteredDropDownItems : [];
      const filteredObjectId = filteredDropDownItems.map((item) => item.value);

      // this line for setting  variation Option id for formik
      setFieldValue("variationOptions", filteredObjectId);

      // this for setting in dropdown
      setVariationDropDownData(variationOptions as never);
      setVariationDropDownDefaultValue(defaultValue as any);
      setIsDataLoaded(true);
    }
  }, [data, location.state]);

  return (
    <Fragment>
      {isDataLoaded && (
        <Container>
          <section className="createNewVariationContainer">
            <Heading name={t("updateVariation")} />
            <div className="variationformContainer">
              <form onSubmit={handleSubmit}>
                <div className="inputFields">
                  <Input
                    label={t("variationName")}
                    className=""
                    type={"text"}
                    placeholder={t("enterVariationName")}
                    name="name"
                    autoComplete="off"
                    maxLength="50"
                    required={false}
                    value={values.name}
                    onKeyDown={null}
                    isDisabled={true}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    touched={touched?.name}
                    errors={errors?.name}
                    icon={<MdDriveFileRenameOutline />}
                  />
                  <Input
                    label={t("variationDescription")}
                    className=""
                    type={"text"}
                    placeholder={t("enterVariationDescription")}
                    name="description"
                    autoComplete="off"
                    maxLength="50"
                    required={false}
                    value={values.description}
                    onKeyDown={null}
                    isDisabled={false}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    touched={touched?.description}
                    errors={errors?.description}
                    icon={<MdOutlinePriceChange />}
                  />
                  <div className="personalContainer">
                    <h3>Is Required</h3>
                    <DropDown
                      options={isRequiredArray}
                      isMulti={false}
                      name="isRequired"
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      touched={touched?.isRequired as never}
                      errors={errors?.isRequired as never}
                      value={values.isRequired || ""}
                      setFieldValues={setFieldValue}
                      defaultValue={
                        isRequiredArray.find(
                          (isRequired) =>
                            isRequired.value ===
                            location.state.variation.isRequired
                        ) || null
                      }
                    />
                  </div>
                  <div className="personalContainer">
                    <h3>Variation Options</h3>
                    <DropDown
                      options={variationDropDownData}
                      isMulti={true}
                      name="variationOptions"
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      touched={touched?.variationOptions as never}
                      errors={errors?.variationOptions as never}
                      value={values.variationOptions || ""}
                      setFieldValues={setFieldValue}
                      defaultValue={variationDropDownDefaultValue as any}
                    />
                  </div>
                </div>
                <Button
                  className="filled"
                  text={t("updateItem")}
                  type="submit"
                  icon={isLoading ? <Loader /> : <MdAdd />}
                />
              </form>
            </div>
          </section>
        </Container>
      )}
    </Fragment>
  );
};

export default UpdateVariation;
