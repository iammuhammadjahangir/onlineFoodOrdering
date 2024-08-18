import { Fragment } from "react/jsx-runtime";
import Container from "../../components/mainContainer/container";
import Heading from "../../components/pageHeading/heading";
import Button from "../../components/button/button";
import { MdAdd } from "react-icons/md";
import { variationOptionSchema } from "../../features/schema/variationOptionsSchema";
import { useFormik } from "formik";
import Input from "../../components/inputs/input";

// icons
import { MdDriveFileRenameOutline } from "react-icons/md";
import { MdOutlinePriceChange } from "react-icons/md";
import { useCreateVariationOptionsMutation } from "../../redux/api/variationOptions";
import { useDispatch } from "react-redux";
import { CustomError } from "../../types/types";
import toast from "react-hot-toast";
import Loader from "../../components/loader/loader";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const CreateVariationOption = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [registerVariationOption, { isLoading, isError, error, isSuccess }] =
    useCreateVariationOptionsMutation();
  const initialValues = {
    name: "",
    price: 0,
  };
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
      initialValues,
      validationSchema: variationOptionSchema,
      validateOnChange: true,
      validateOnBlur: true,
      //// By disabling validation onChange and onBlur formik will validate on submit.
      onSubmit: async (values) => {
        await dispatch(registerVariationOption(values) as any);
      },
    });

  return (
    <Fragment>
      <Container>
        <section className="createVariationContainer">
          <Heading name={t("createVariationOption")} />
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
                  isDisabled={false}
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
                text={t("addItem")}
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

export default CreateVariationOption;
