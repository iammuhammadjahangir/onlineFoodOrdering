import { Textarea } from "flowbite-react";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { IoTimerOutline } from "react-icons/io5";
import { MdAccessTime, MdEmail } from "react-icons/md";
import PhoneNumber from "../../../components/dropdown/phoneNumber";
import Input from "../../../components/inputs/input";
import StatusToggle from "../../../components/switch/active/In-activeSwitch";
import { MultipleColorsComponentProps } from "../../../types/types";

// Extend the existing type to include defaultNumber
interface BranchSettingSectionProps extends MultipleColorsComponentProps {
  defaultNumber: string | null;
}

const BranchSettingSection = ({
  errors,
  handleBlur,
  handleChange,
  setFieldValue,
  touched,
  values,
  defaultNumber,
}: BranchSettingSectionProps) => {
  const { t } = useTranslation();

  const handleASAPToggle = () => {
    const newAsapOnlyValue = !values.branchSettings.asapOnly;
    setFieldValue("branchSettings.asapOnly", newAsapOnlyValue);
    if (newAsapOnlyValue) {
      setFieldValue("branchSettings.preOrderOnly", false);
      setFieldValue("branchSettings.sameDayPreOrder", false);
      setFieldValue("branchSettings.minPreOrderTime", ""); // Default or empty
      setFieldValue("branchSettings.maxPreOrderTime", ""); // Default or empty
    }
  };

  const handlePreOrderToggle = () => {
    const newPreOrderOnlyValue = !values.branchSettings.preOrderOnly;
    setFieldValue("branchSettings.preOrderOnly", newPreOrderOnlyValue);
    if (newPreOrderOnlyValue) {
      setFieldValue("branchSettings.asapOnly", false);
      // Optionally reset ASAP related fields to default
    }
  };

  return (
    <Fragment>
      <section className="branchSettingComponent">
        <section className="description">
          <div className="labeAndInputDiv">
            <label>{t("description")}</label>
          </div>
          <Textarea
            id="comment"
            placeholder={t("branchDescription")}
            required
            name="branchDescription"
            value={values.branchDescription}
            onChange={handleChange}
            onBlur={handleBlur}
            rows={2}
          />
          <p className="error">
            {touched.branchDescription && errors.branchDescription
              ? errors.branchDescription
              : null}
          </p>
        </section>

        {/* Delivery Setting Fieldset */}
        <fieldset className="fieldset-container">
          <legend className="legend">{t("deliverySetting")}</legend>
          <div className="fieldset-content">
            <section className="mainFlexContainer">
              <section className="options">
                {values.branchSettings.preOrderOnly === false && (
                  <div className="toogleStatus swich">
                    <h3>{t("ASAPOnly")}</h3>
                    <StatusToggle
                      isChecked={values.branchSettings.asapOnly}
                      enabledValueName="Yes"
                      disabledValueName="No"
                      handleChange={handleASAPToggle}
                      id="branchSettings.asapOnly"
                    />
                  </div>
                )}
                {values.branchSettings.asapOnly === false && (
                  <div className="toogleStatus swich">
                    <h3>{t("PreOrderOnly")}</h3>
                    <StatusToggle
                      isChecked={values.branchSettings.preOrderOnly}
                      enabledValueName="Yes"
                      disabledValueName="No"
                      handleChange={handlePreOrderToggle}
                      id="branchSettings.preOrderOnly"
                    />
                  </div>
                )}
                {values.branchSettings.asapOnly === false && (
                  <div className="toogleStatus swich">
                    <h3>{t("sameDayPreOrder")}</h3>
                    <StatusToggle
                      isChecked={values.branchSettings.sameDayPreOrder}
                      enabledValueName="Yes"
                      disabledValueName="No"
                      handleChange={() => {
                        setFieldValue(
                          "branchSettings.sameDayPreOrder",
                          !values.branchSettings.sameDayPreOrder
                        );
                      }}
                      id="branchSettings.sameDayPreOrder"
                    />
                  </div>
                )}
              </section>
              {values.branchSettings.asapOnly === false && (
                <section className="preOrderDurationTimer">
                  <Input
                    label={t("minPreOrderTime")}
                    className=""
                    type={"text"}
                    placeholder={t("enterMinPreOrderTime")}
                    name="branchSettings.minPreOrderTime"
                    autoComplete="off"
                    maxLength="15"
                    required={false}
                    value={Number(values.branchSettings.minPreOrderTime)}
                    onKeyDown={null}
                    isDisabled={false}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    touched={touched?.branchSettings?.minPreOrderTime}
                    errors={errors?.branchSettings?.minPreOrderTime}
                    icon={<MdAccessTime />}
                  />
                  <Input
                    label={t("maxPreOrderTime")}
                    className=""
                    type={"text"}
                    placeholder={t("enterMaxPreOrderTime")}
                    name="branchSettings.maxPreOrderTime"
                    autoComplete="off"
                    maxLength="15"
                    required={false}
                    value={Number(values.branchSettings.maxPreOrderTime)}
                    onKeyDown={null}
                    isDisabled={false}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    touched={touched?.branchSettings?.maxPreOrderTime}
                    errors={errors?.branchSettings?.maxPreOrderTime}
                    icon={<IoTimerOutline />}
                  />
                </section>
              )}
            </section>
          </div>
        </fieldset>

        {/* Other Setting Fieldset */}
        <fieldset className="fieldset-container">
          <legend className="legend">{t("otherSetting")}</legend>
          <div className="fieldset-content">
            <section className="otherSettingContainer">
              <div className="toogleStatus swich">
                <h3>{t("swsDeliveryModule")}</h3>
                <StatusToggle
                  isChecked={
                    values.branchSettings.otherSettings.swsDeliveryModule
                  }
                  enabledValueName="Yes"
                  disabledValueName="No"
                  handleChange={() => {
                    setFieldValue(
                      "branchSettings.otherSettings.swsDeliveryModule",
                      !values.branchSettings.otherSettings.swsDeliveryModule
                    );
                  }}
                  id="branchSettings.otherSettings.swsDeliveryModule"
                />
              </div>
              <Input
                label={t("taxPercentage")}
                className=""
                type={"text"}
                placeholder={t("entertaxPercentage")}
                name="branchSettings.otherSettings.taxPercentage"
                autoComplete="off"
                maxLength="15"
                required={false}
                value={Number(
                  values.branchSettings.otherSettings.taxPercentage
                )}
                onKeyDown={null}
                isDisabled={false}
                handleChange={handleChange}
                handleBlur={handleBlur}
                touched={touched?.branchSettings?.otherSettings?.taxPercentage}
                errors={errors?.branchSettings?.otherSettings?.taxPercentage}
                icon={<IoTimerOutline />}
              />
            </section>
          </div>
        </fieldset>

        {/* Custom Support Information Fieldset */}
        <fieldset className="fieldset-container">
          <legend className="legend">{t("customSupportInfo")}</legend>
          <div className="fieldset-content">
            <div className="supportInfoContainer">
              <Input
                label={t("contactEmail")}
                className=""
                type={"email"}
                placeholder={t("enterContactEmail")}
                name="customerSupport.contactEmail"
                autoComplete="off"
                maxLength="50"
                required={false}
                value={values.customerSupport.contactEmail || ""}
                onKeyDown={null}
                isDisabled={false}
                handleChange={handleChange}
                handleBlur={handleBlur}
                touched={touched?.customerSupport?.contactEmail}
                errors={errors?.customerSupport?.contactEmail}
                icon={<MdEmail />}
              />
              <div className="seperatePhone">
                <h3>{t("phNumber")}</h3>
                <PhoneNumber
                  completePhoneNumber={
                    values.customerSupport.contactNumber || ""
                  }
                  errors={errors?.customerSupport?.contactNumber}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  maxLength="13"
                  name="customerSupport.contactNumber"
                  touched={touched?.customerSupport?.contactNumber}
                  setFieldValues={setFieldValue}
                  defaultValue={defaultNumber ? defaultNumber : null}
                />
              </div>
            </div>
          </div>
        </fieldset>
      </section>
    </Fragment>
  );
};

export default BranchSettingSection;
