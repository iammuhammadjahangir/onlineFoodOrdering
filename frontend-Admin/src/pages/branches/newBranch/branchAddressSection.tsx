import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { CiShop } from "react-icons/ci";
import { FaCity } from "react-icons/fa";
import { FaSignsPost } from "react-icons/fa6";
import { SiGooglestreetview } from "react-icons/si";
import {
  TbBuildingEstate,
  TbChartAreaFilled,
  TbWorld,
  TbWorldLatitude,
  TbWorldLongitude,
} from "react-icons/tb";
import { Fragment } from "react/jsx-runtime";
import Input from "../../../components/inputs/input";
import { MultipleColorsComponentProps } from "../../../types/types";

const BranchAddressSection = ({
  errors,
  handleBlur,
  handleChange,
  setFieldValue,
  touched,
  values,
}: MultipleColorsComponentProps) => {
  const { t } = useTranslation();

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = async () => {
    navigator.geolocation.getCurrentPosition(Location);
    async function Location(position: any) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const apiKey = "9b28e731dfdf447d96ec696aabe86c45";

      const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}%2C${longitude}&key=${apiKey}`;

      await fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          // const city = data.results[0].components.city;
          const state = data.results[0].components.state;
          const country = data.results[0].components.country;

          setFieldValue("branchAddress.latitude", latitude);
          setFieldValue("branchAddress.longitude", longitude);
          // setFieldValue("branchAddress.city", city);
          setFieldValue("branchAddress.state", state);
          setFieldValue("branchAddress.country", country);
        });
    }
  };

  return (
    <Fragment>
      <section className="branchAddressContainer">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d53187.10085632431!2d73.00510519999999!3d33.574317!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1723213090693!5m2!1sen!2s"
          //   width="600"
          //   height="450"
          style={{ border: "0", width: "100%", height: "400px" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>
      <section className="detailsSection">
        <Input
          label={t("latitude")}
          className=""
          type={"text"}
          placeholder={t("enterLatitude")}
          name="branchAddress.latitude"
          autoComplete="off"
          maxLength="10"
          required={false}
          value={values.branchAddress.latitude}
          onKeyDown={null}
          isDisabled={false}
          handleChange={handleChange}
          handleBlur={handleBlur}
          touched={touched?.branchAddress?.latitude as any}
          errors={errors?.branchAddress?.latitude as any}
          icon={<TbWorldLatitude />}
        />
        <Input
          label={t("longitude")}
          className=""
          type={"text"}
          placeholder={t("enterLongitude")}
          name="branchAddress.longitude"
          autoComplete="off"
          maxLength="10"
          required={false}
          value={values.branchAddress.longitude}
          onKeyDown={null}
          isDisabled={false}
          handleChange={handleChange}
          handleBlur={handleBlur}
          touched={touched?.branchAddress?.longitude}
          errors={errors?.branchAddress?.longitude}
          icon={<TbWorldLongitude />}
        />
        <Input
          label={t("HouseShopNo")}
          className=""
          type={"text"}
          placeholder={t("enterHouseShopNo")}
          name="branchAddress.houseNo"
          autoComplete="off"
          maxLength="15"
          required={false}
          value={values.branchAddress.houseNo}
          onKeyDown={null}
          isDisabled={false}
          handleChange={handleChange}
          handleBlur={handleBlur}
          touched={touched?.branchAddress?.houseNo || ""}
          errors={errors?.branchAddress?.houseNo || ""}
          icon={<CiShop />}
        />
        <Input
          label={t("streetNo")}
          className=""
          type={"text"}
          placeholder={t("enterStreetNo")}
          name="branchAddress.street"
          autoComplete="off"
          maxLength="15"
          required={false}
          value={values.branchAddress.street}
          onKeyDown={null}
          isDisabled={false}
          handleChange={handleChange}
          handleBlur={handleBlur}
          touched={touched?.branchAddress?.street}
          errors={errors?.branchAddress?.street}
          icon={<SiGooglestreetview />}
        />
        <Input
          label={t("area")}
          className=""
          type={"text"}
          placeholder={t("enterArea")}
          name="branchAddress.area"
          autoComplete="off"
          maxLength="15"
          required={false}
          value={values.branchAddress.area}
          onKeyDown={null}
          isDisabled={false}
          handleChange={handleChange}
          handleBlur={handleBlur}
          touched={touched?.branchAddress?.area}
          errors={errors?.branchAddress?.area}
          icon={<TbChartAreaFilled />}
        />
        <Input
          label={t("country")}
          className=""
          type={"text"}
          placeholder={t("enterCountry")}
          name="branchAddress.country"
          autoComplete="off"
          maxLength="20"
          required={false}
          value={values.branchAddress.country}
          onKeyDown={null}
          isDisabled={false}
          handleChange={handleChange}
          handleBlur={handleBlur}
          touched={touched?.branchAddress?.country}
          errors={errors?.branchAddress?.country}
          icon={<TbWorld />}
        />
        <Input
          label={t("state")}
          className=""
          type={"text"}
          placeholder={t("enterState")}
          name="branchAddress.state"
          autoComplete="off"
          maxLength="15"
          required={false}
          value={values.branchAddress.state}
          onKeyDown={null}
          isDisabled={false}
          handleChange={handleChange}
          handleBlur={handleBlur}
          touched={touched?.branchAddress?.state}
          errors={errors?.branchAddress?.state}
          icon={<TbBuildingEstate />}
        />
        <Input
          label={t("city")}
          className=""
          type={"text"}
          placeholder={t("enterCity")}
          name="branchAddress.city"
          autoComplete="off"
          maxLength="15"
          required={false}
          value={values.branchAddress.city}
          onKeyDown={null}
          isDisabled={false}
          handleChange={handleChange}
          handleBlur={handleBlur}
          touched={touched?.branchAddress?.city}
          errors={errors?.branchAddress?.city}
          icon={<FaCity />}
        />
        <Input
          label={t("zipCode")}
          className=""
          type={"number"}
          placeholder={t("enterZipCode")}
          name="branchAddress.postalCode"
          autoComplete="off"
          maxLength="8"
          required={false}
          value={values.branchAddress.postalCode}
          onKeyDown={null}
          isDisabled={false}
          handleChange={handleChange}
          handleBlur={handleBlur}
          touched={touched?.branchAddress?.postalCode}
          errors={errors?.branchAddress?.postalCode}
          icon={<FaSignsPost />}
        />
      </section>
    </Fragment>
  );
};

export default BranchAddressSection;
