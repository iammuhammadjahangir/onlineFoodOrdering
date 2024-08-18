import { useFormik } from "formik";
import { MdAdd } from "react-icons/md";
import { Fragment } from "react/jsx-runtime";
import Button from "../../components/button/button";
import Input from "../../components/inputs/input";
import Container from "../../components/mainContainer/container";
import Heading from "../../components/pageHeading/heading";
import { variationOptionSchema } from "../../features/schema/variationOptionsSchema";

// icons
import { useEffect } from "react";
import toast from "react-hot-toast";
import { MdDriveFileRenameOutline, MdOutlinePriceChange } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../../components/loader/loader";
import { useUpdateVariationOptionsMutation } from "../../redux/api/variationOptions";
import { CustomError } from "../../types/types";
import { useTranslation } from "react-i18next";

const UpdateVariationOption = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const [updateVariationOption, { isLoading, isError, error, isSuccess }] =
    useUpdateVariationOptionsMutation();
  useEffect(() => {
    if (isError) {
      const err = error as CustomError;
      toast.error(err.data.message);
    }
    if (isSuccess) {
      toast.success("Variation Option Created Successfully");
      navigate("/variationOption");
    }
  }, [isError, isSuccess]);

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues: {
        name: location.state.variationOption.name || "",
        price: location.state.variationOption.price || 0,
      },
      validationSchema: variationOptionSchema,
      validateOnChange: true,
      validateOnBlur: true,
      enableReinitialize: true,
      onSubmit: async (values) => {
        await dispatch(
          updateVariationOption({
            id: location.state.variationOption._id,
            name: values.name,
            price: values.price,
          }) as any
        );
      },
    });
  return (
    <Fragment>
      <Container>
        <section className="createVariationContainer">
          <Heading name={t("updateVariationOption")} />
          <div className="formContainer">
            <form onSubmit={handleSubmit}>
              <div className="inputFields">
                <Input
                  label={t("optionName")}
                  className=""
                  type={"text"}
                  placeholder={t("enterVariationOptionName")}
                  name="name"
                  autoComplete="off"
                  maxLength="20"
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
                  label={t("optionPrice")}
                  className=""
                  type={"text"}
                  placeholder={t("enterVariationOptionPrice")}
                  name="price"
                  autoComplete="off"
                  maxLength="5"
                  required={false}
                  value={values.price}
                  onKeyDown={null}
                  isDisabled={false}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  touched={touched?.price}
                  errors={errors?.price}
                  icon={<MdOutlinePriceChange />}
                />
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
    </Fragment>
  );
};

export default UpdateVariationOption;
