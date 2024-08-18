import { FieldArray, Form, Formik } from "formik";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { FcAddDatabase } from "react-icons/fc";
import { MdDeleteOutline } from "react-icons/md";
import ModalButton from "../../../components/button/modalButtons";
import Input from "../../../components/inputs/input";
import Heading from "../../../components/pageHeading/heading";
import StatusToggle from "../../../components/switch/active/In-activeSwitch";
import { variationSchema } from "../../../features/schema/variationOptionsSchema";
import {
  useCreateSubOptionMutation,
  useGetSearchedSubOptionQuery,
} from "../../../redux/api/subOptionAPI";
import { CustomError, subOptionInitalValues } from "../../../types/types";

interface subOptionProps {
  onClose: () => void;
  itemID: string;
}

const SubOption = ({ itemID, onClose }: subOptionProps) => {
  const { t } = useTranslation();
  const { data: NewData } = useGetSearchedSubOptionQuery({
    id: "",
    branchID: "",
    itemID: itemID,
  });
  const [createSubOption, { isLoading, isError, error }] =
    useCreateSubOptionMutation();

  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }

  const initialValues: subOptionInitalValues = {
    itemID: itemID,
    subOption: [
      {
        name: "",
        isRequired: false,
        items: [{ name: "", price: 0 }],
      },
    ],
  };
  console.log(itemID);
  return (
    <section className="newSubOption">
      <Heading name={t("subOption")} />
      <Formik
        initialValues={initialValues}
        validationSchema={variationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          console.log(values);
          try {
            // Map through the subOption array and return an array of promises
            const promises = values.subOption.map((subOption) =>
              createSubOption({
                itemID: values.itemID,
                name: subOption.name,
                isRequired: subOption.isRequired,
                items: subOption.items,
              })
            );

            // Use Promise.all to handle all the promises concurrently
            const results = await Promise.all(promises);

            // Check results and show appropriate messages
            results.forEach((res: any) => {
              if (res.data.success) {
                toast.success(res.data.message);
              } else {
                toast.error(res.data.message);
              }
            });

            onClose(); // Close the modal if successful
          } catch (err) {
            toast.error("An error occurred while submitting the form.");
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({
          values,
          setFieldValue,
          handleBlur,
          validateForm,
          handleChange,
          touched,
          errors,
        }) => (
          <Form>
            <FieldArray name="subOption">
              {({ remove, push }) => (
                <div>
                  {values.subOption.map((variation, varIndex) => (
                    <section key={varIndex}>
                      <section className="mainOptionContainer">
                        <div className="col">
                          <Input
                            label={t("subOptionName")}
                            className="w-80"
                            type="text"
                            placeholder={t("enterSubOptionName")}
                            name={`subOption.${varIndex}.name`}
                            autoComplete="off"
                            maxLength="100"
                            required={true}
                            value={variation.name || ""}
                            onKeyDown={null}
                            isDisabled={false}
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            touched={touched?.subOption?.[varIndex]?.name}
                            errors={
                              typeof errors?.subOption?.[varIndex] ===
                                "object" && errors?.subOption?.[varIndex]?.name
                                ? errors?.subOption?.[
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
                              `subOption.${varIndex}.isRequired`,
                              !variation.isRequired
                            );
                          }}
                          id={`subOption.${varIndex}.isRequired`}
                        />
                        <MdDeleteOutline
                          onClick={() => remove(varIndex)}
                          style={{
                            visibility:
                              values.subOption.length !== 1
                                ? "visible"
                                : "hidden",
                          }}
                        />
                      </section>

                      <FieldArray name={`subOption.${varIndex}.items`}>
                        {({ remove, push }) => (
                          <section>
                            {variation.items.map((option, optIndex) => (
                              <section
                                className="optionsContainer"
                                key={optIndex}
                              >
                                <Input
                                  label={t("name")}
                                  className="w-80"
                                  type="text"
                                  placeholder={t("enterName")}
                                  name={`subOption.${varIndex}.items.${optIndex}.name`}
                                  autoComplete="off"
                                  maxLength="100"
                                  required={true}
                                  value={option.name || ""}
                                  onKeyDown={null}
                                  isDisabled={false}
                                  handleChange={handleChange}
                                  handleBlur={handleBlur}
                                  touched={
                                    touched?.subOption?.[varIndex]?.items?.[
                                      optIndex
                                    ]?.name
                                  }
                                  errors={
                                    typeof errors?.subOption?.[varIndex] ===
                                      "object" &&
                                    typeof errors?.subOption?.[varIndex]
                                      ?.items?.[optIndex] === "object" &&
                                    errors?.subOption?.[varIndex]?.items?.[
                                      optIndex
                                    ]?.name
                                      ? errors?.subOption?.[varIndex]?.items?.[
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
                                  name={`subOption.${varIndex}.items.${optIndex}.price`}
                                  autoComplete="off"
                                  required={true}
                                  maxLength="6"
                                  value={option.price}
                                  onKeyDown={null}
                                  isDisabled={false}
                                  handleChange={handleChange}
                                  handleBlur={handleBlur}
                                  touched={
                                    touched?.subOption?.[varIndex]?.items?.[
                                      optIndex
                                    ]?.price
                                  }
                                  errors={
                                    typeof errors?.subOption?.[varIndex] ===
                                      "object" &&
                                    typeof errors?.subOption?.[varIndex]
                                      ?.items?.[optIndex] === "object" &&
                                    errors?.subOption?.[varIndex]?.items?.[
                                      optIndex
                                    ]?.price
                                      ? errors?.subOption?.[varIndex]?.items?.[
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
                                        variation.items.length !== 1
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
                                        optIndex === variation.items.length - 1
                                          ? "visible"
                                          : "hidden",
                                    }}
                                  />
                                </div>
                              </section>
                            ))}
                          </section>
                        )}
                      </FieldArray>
                    </section>
                  ))}

                  <p
                    className="newOptionMessage"
                    onClick={() => {
                      validateForm().then((formErrors) => {
                        if (Object.keys(formErrors).length === 0) {
                          push({
                            name: "",
                            isRequired: false,
                            items: [{ name: "", price: 0 }],
                          });
                        } else {
                          toast.error(
                            "Form has errors. Please fix them before adding a new variation."
                          );
                        }
                      });
                    }}
                  >
                    <img
                      width="20"
                      height="20"
                      src="https://img.icons8.com/ios/20/add-property.png"
                      alt="add-property"
                    />
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

export default SubOption;
