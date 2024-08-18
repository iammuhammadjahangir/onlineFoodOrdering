import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { FaRegAddressCard } from "react-icons/fa";
import { pakistan } from "../../assets/pakistanData";
import Button from "../../components/button/button";
import DropDown from "../../components/dropdown/selectDropdown";
import Input from "../../components/inputs/input";
import Heading from "../../components/pageHeading/heading";
import { addressSchemaNonExistingCustomer } from "../../schema/userSchema";
import { Address, dropdownType } from "../../types/types";

interface AddressTypeProps {
  addressType: string;
  onClose: () => void;
  forceRender: boolean;
  setForceRender: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddressModel = ({
  addressType,
  onClose,
  forceRender,
  setForceRender,
}: AddressTypeProps) => {
  console.log(addressType);

  // Genral UseStates for setting and filtering dropdown Values
  const [cities, setCities] = useState<dropdownType[]>([]);
  const [areas, setAreas] = useState<dropdownType[]>([]);

  useEffect(() => {
    const selectedProvinceData = pakistan["pakistan" as keyof typeof pakistan];
    if (selectedProvinceData && Array.isArray(selectedProvinceData)) {
      const citiesData = selectedProvinceData.map(
        (cityObj) => Object.keys(cityObj)[0]
      );
      console.log(citiesData);
      setCities(
        citiesData.map((cities) => ({
          label: cities,
          value: cities,
          color: `hsl(${Math.random() * 100 * 4},${Math.random() * 100}%,50%)`, // Fix syntax error here
        }))
      );
    }
  }, []);

  //   formik Initial States
  const initialValues: Address = {
    addressDetail: "",
    city: "",
    area: "",
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
    validationSchema: addressSchemaNonExistingCustomer,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values) => {
      localStorage.setItem(addressType, JSON.stringify(values));
      onClose();
      setForceRender(!forceRender);
    },
  });

  //   use Effect for filter area after changing in cities
  useEffect(() => {
    if (values.city) {
      const selectedProvinceData =
        pakistan["pakistan" as keyof typeof pakistan];
      const selectedCityData: any = selectedProvinceData?.find((cityObj) =>
        cityObj.hasOwnProperty(values.city)
      );
      if (selectedCityData) {
        const areasData = selectedCityData[values.city];
        const areasOptions = areasData.map((area: string) => ({
          label: area,
          value: area,
          color: `hsl(${Math.random() * 100 * 4},${Math.random() * 100}%,50%)`,
        }));
        setAreas(areasOptions);
      }
    } else {
      setAreas([]);
    }
  }, [values.city]);
  return (
    <div className="userContainer">
      <main className="newAddressContainer">
        <Heading name="Add new Address" />
        <section className="newAddressContainerSection">
          <form onSubmit={handleSubmit}>
            <div className="rowContainer">
              <Input
                label="Address"
                className="w-80"
                type="text"
                placeholder="House no. / building / street / area"
                name="addressDetail"
                autoComplete="off"
                maxLength="100"
                required={false}
                value={values.addressDetail}
                onKeyDown={null}
                isDisabled={false}
                handleChange={handleChange}
                handleBlur={handleBlur}
                touched={touched?.addressDetail}
                errors={errors?.addressDetail}
              />
            </div>

            <div className="rowContainer">
              <div className="City">
                <h2>City</h2>
                <DropDown
                  options={cities}
                  isMulti={false}
                  name="city"
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  touched={touched?.city}
                  errors={errors?.city}
                  value={values.city}
                  setFieldValues={setFieldValue}
                  defaultValue={""}
                />
              </div>
              <div className="leftContainer">
                <div className="Area">
                  <h2>Area</h2>
                  <DropDown
                    options={areas}
                    isMulti={false}
                    name="area"
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    touched={touched?.area}
                    errors={errors?.area}
                    value={values.area}
                    setFieldValues={setFieldValue}
                    defaultValue={""}
                  />
                </div>
              </div>
            </div>

            <div className="actionButton">
              <Button
                className="filled"
                text="save"
                type="submit"
                icon={<FaRegAddressCard />}
              />
            </div>
          </form>
        </section>
      </main>
    </div>
  );
};

export default AddressModel;
