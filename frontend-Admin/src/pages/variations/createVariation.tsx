import { FieldArray, Form, Formik } from "formik";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { FcAddDatabase } from "react-icons/fc";
import { MdDeleteOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import ModalButton from "../../components/button/modalButtons";
import Input from "../../components/inputs/input";
import Heading from "../../components/pageHeading/heading";
import StatusToggle from "../../components/switch/active/In-activeSwitch";
import { variationSchema } from "../../features/schema/variationOptionsSchema";
import { VariationInitalValues } from "../../types/types";

interface CreateVariationProps {
  onClose: () => void;
}

const CreateVariation = ({ onClose }: CreateVariationProps) => {
  const { t } = useTranslation();

  const initialValues: VariationInitalValues = {
    itemID: "210871826918218",
    variations: [
      {
        name: "",
        isRequired: false,
        variationOptions: [{ name: "", price: 0 }],
      },
    ],
  };

  return (
    <section className="newVariation">
      <Heading name={t("newSubOption")} />
      <Formik
        initialValues={initialValues}
        validationSchema={variationSchema}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values);
          setSubmitting(false);
        }}
      >
        {({
          values,
          setFieldValue,
          handleBlur,
          validateForm,
          setTouched,
          handleChange,
          touched,
          errors,
        }) => (
          <Form>
            {/* <div className="col">
              <Input
                label={t("Item ID")}
                className="w-80"
                type="text"
                placeholder={t("enterItemID")}
                name="itemID"
                autoComplete="off"
                maxLength="100"
                required={true}
                value={values.itemID}
                onKeyDown={null}
                isDisabled={false}
                handleChange={handleChange}
                handleBlur={handleBlur}
                touched={touched.itemID}
                errors={
                  typeof errors.itemID === "string" ? errors.itemID : undefined
                }
              />
            </div> */}
            <FieldArray name="variations">
              {({ insert, remove, push }) => (
                <div>
                  {values.variations.map((variation, varIndex) => (
                    <section key={varIndex}>
                      <section className="mainOptionContainer">
                        <div className="col">
                          <Input
                            label={t("subOptionName")}
                            className="w-80"
                            type="text"
                            placeholder={t("enterSubOptionName")}
                            name={`variations.${varIndex}.name`}
                            autoComplete="off"
                            maxLength="100"
                            required={true}
                            value={variation.name || ""}
                            onKeyDown={null}
                            isDisabled={false}
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            touched={touched?.variations?.[varIndex]?.name}
                            errors={
                              typeof errors?.variations?.[varIndex] ===
                                "object" && errors?.variations?.[varIndex]?.name
                                ? errors?.variations?.[
                                    varIndex
                                  ]?.name?.toString()
                                : undefined
                            }
                          />
                        </div>

                        <StatusToggle
                          isChecked={variation.isRequired}
                          enabledValueName={t("Required")}
                          disabledValueName={t("Optional")}
                          handleChange={() => {
                            setFieldValue(
                              `variations.${varIndex}.isRequired`,
                              !variation.isRequired
                            );
                          }}
                          id={`variations.${varIndex}.isRequired`}
                        />
                        <MdDeleteOutline
                          onClick={() => remove(varIndex)}
                          style={{
                            visibility:
                              values.variations.length !== 1
                                ? "visible"
                                : "hidden",
                          }}
                        />
                      </section>

                      <FieldArray
                        name={`variations.${varIndex}.variationOptions`}
                      >
                        {({ insert, remove, push }) => (
                          <section>
                            {variation.variationOptions.map(
                              (option, optIndex) => (
                                <section
                                  className="optionsContainer"
                                  key={optIndex}
                                >
                                  <Input
                                    label={t("name")}
                                    className="w-80"
                                    type="text"
                                    placeholder={t("enterName")}
                                    name={`variations.${varIndex}.variationOptions.${optIndex}.name`}
                                    autoComplete="off"
                                    maxLength="100"
                                    required={true}
                                    value={option.name || ""}
                                    onKeyDown={null}
                                    isDisabled={false}
                                    handleChange={handleChange}
                                    handleBlur={handleBlur}
                                    touched={
                                      touched?.variations?.[varIndex]
                                        ?.variationOptions?.[optIndex]?.name
                                    }
                                    errors={
                                      typeof errors?.variations?.[varIndex] ===
                                        "object" &&
                                      typeof errors?.variations?.[varIndex]
                                        ?.variationOptions?.[optIndex] ===
                                        "object" &&
                                      errors?.variations?.[varIndex]
                                        ?.variationOptions?.[optIndex]?.name
                                        ? errors?.variations?.[
                                            varIndex
                                          ]?.variationOptions?.[
                                            optIndex
                                          ]?.name?.toString()
                                        : undefined
                                    }
                                  />
                                  <Input
                                    label={t("price")}
                                    className="w-80"
                                    type="number"
                                    placeholder={t("enterPrice")}
                                    name={`variations.${varIndex}.variationOptions.${optIndex}.price`}
                                    autoComplete="off"
                                    required={true}
                                    maxLength="6"
                                    value={option.price}
                                    onKeyDown={null}
                                    isDisabled={false}
                                    handleChange={handleChange}
                                    handleBlur={handleBlur}
                                    touched={
                                      touched?.variations?.[varIndex]
                                        ?.variationOptions?.[optIndex]?.price
                                    }
                                    errors={
                                      typeof errors?.variations?.[varIndex] ===
                                        "object" &&
                                      typeof errors?.variations?.[varIndex]
                                        ?.variationOptions?.[optIndex] ===
                                        "object" &&
                                      errors?.variations?.[varIndex]
                                        ?.variationOptions?.[optIndex]?.price
                                        ? errors?.variations?.[
                                            varIndex
                                          ]?.variationOptions?.[
                                            optIndex
                                          ]?.price?.toString()
                                        : undefined
                                    }
                                  />

                                  <div className="col">
                                    <MdDeleteOutline
                                      onClick={() => remove(optIndex)}
                                      style={{
                                        visibility:
                                          variation.variationOptions.length !==
                                          1
                                            ? "visible"
                                            : "hidden",
                                      }}
                                    />
                                    <FcAddDatabase
                                      onClick={() => {
                                        validateForm().then((formErrors) => {
                                          console.log(formErrors);
                                          if (
                                            Object.keys(formErrors).length === 0
                                          ) {
                                            push({ name: "", price: 0 });
                                          } else {
                                            toast.error(
                                              "Form has errors. Please fix them before adding a new option."
                                            );
                                            // console.log(

                                            // );
                                          }
                                        });
                                      }}
                                      style={{
                                        visibility:
                                          optIndex ===
                                          variation.variationOptions.length - 1
                                            ? "visible"
                                            : "hidden",
                                      }}
                                    />
                                  </div>
                                </section>
                              )
                            )}
                          </section>
                        )}
                      </FieldArray>
                    </section>
                  ))}

                  <p
                    className=""
                    onClick={() => {
                      validateForm().then((formErrors) => {
                        if (Object.keys(formErrors).length === 0) {
                          push({
                            name: "",
                            isRequired: false,
                            variationOptions: [{ name: "", price: 0 }],
                          });
                        } else {
                          toast.error(
                            "Form has errors. Please fix them before adding a new variation."
                          );
                        }
                      });
                    }}
                  >
                    Add another option
                  </p>
                </div>
              )}
            </FieldArray>

            <div className="button-modal">
              <ModalButton
                onClick={onClose}
                type="button"
                color="white"
                hoverColor="grey"
                activeColor="darkgrey"
                textColor="black"
                backgroundColor="lightgrey"
                beforeColor="rgba(0, 0, 0, 0.3)"
                icon={<span className="icon">✖️</span>}
              >
                {t("Close")}
              </ModalButton>

              <ModalButton
                type="submit"
                color="white"
                hoverColor="rgba(46, 204, 113, 1)"
                activeColor="navy"
                textColor="white"
                backgroundColor="rgba(46, 204, 113,0.9)"
                beforeColor="rgba(0, 0, 0, 0.1)"
                icon={<span className="icon">💾</span>}
              >
                {t("Submit")}
              </ModalButton>
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default CreateVariation;
