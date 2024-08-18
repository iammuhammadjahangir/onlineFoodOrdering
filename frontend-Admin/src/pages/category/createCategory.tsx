import { useFormik } from "formik";
import moment from "moment";
import { Fragment, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { MdDriveFileRenameOutline, MdOutlinePriceChange } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import ModalButton from "../../components/button/modalButtons";
import { ImageType } from "../../components/dragDrop/dragDropImages";
import ImageComponent from "../../components/imageComponent/imageComponent";
import SingleDatePicker from "../../components/dropdown/singleDatePicker";
import WeekDaysPicker from "../../components/dropdown/weekDaysPicker";
import Input from "../../components/inputs/input";
import Heading from "../../components/pageHeading/heading";
import { categorySchema } from "../../features/schema/categorySchema";
import { useCreateCategoryMutation } from "../../redux/api/category";
import { CustomError } from "../../types/types";

interface newBannerProps {
  onClose: () => void;
}
const CreateCategory = ({ onClose }: newBannerProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [enabled, setEnabled] = useState(true);
  const [weekdays, setWeekdays] = useState(
    moment.weekdaysShort(true).map((weekday, i) => ({
      name: weekday,
      checked: false,
    }))
  );
  const [registerCategory, { isError, error, isSuccess }] =
    useCreateCategoryMutation();
  const initialValues = {
    name: "",
    description: "",
    avalibleFrom: null,
    avalibleTo: null,
    priority: 1,
    image: null,
    status: [],
  };

  useEffect(() => {
    if (isError) {
      const err = error as CustomError;
      toast.error(err.data.message);
    }
    if (isSuccess) {
      toast.success("Category Created Successfully");
      navigate("/category");
    }
  }, [isError, isSuccess]);

  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    errors,
    touched,
  } = useFormik({
    initialValues,
    validationSchema: categorySchema,
    validateOnChange: true,
    validateOnBlur: true,
    //// By disabling validation onChange and onBlur formik will validate on submit.
    onSubmit: async (values) => {
      // console.log(values);

      //Avalible From
      const HoursAvalibleFrom = new Date(values.avalibleFrom!).getHours();
      const MinutesAvalibleFrom = new Date(values.avalibleFrom!).getMinutes();
      console.log(`${HoursAvalibleFrom}:${MinutesAvalibleFrom}`);

      // Avalible to
      const HoursAvalibleTo = new Date(values.avalibleTo!).getHours();
      const MinutesAvalibleTo = new Date(values.avalibleTo!).getMinutes();
      console.log(`${HoursAvalibleTo}:${MinutesAvalibleTo}`);
      registerCategory({
        name: values.name,
        description: values.description,
        availableFrom: `${HoursAvalibleFrom}:${MinutesAvalibleFrom}`,
        availableTo: `${HoursAvalibleTo}:${MinutesAvalibleTo}`,
        priority: values.priority,
        image: values.image!,
        status: values.status,
      }).then(() => {
        onClose();
      });
    },
  });

  const handleTimeChange = (dates: [Date, Date] | null) => {
    if (dates) {
      setFieldValue("avalibleFrom", dates[0]);
      setFieldValue("avalibleTo", dates[1]);
    }
  };

  const handleImageChange = (image: ImageType | null) => {
    setFieldValue("image", image);
  };

  const handleWeekdayChange = (weekdayName: string) => {
    const updatedWeekdays = weekdays.map((weekday) =>
      weekday.name === weekdayName
        ? { ...weekday, checked: !weekday.checked }
        : weekday
    );
    setWeekdays(updatedWeekdays);

    const selectedWeekdays = updatedWeekdays
      .filter((weekday) => weekday.checked)
      .map((weekday) => weekday.name);

    setFieldValue("status", selectedWeekdays);
  };

  const toggleEnabled = () => {
    setEnabled(!enabled);
  };

  console.log(values);
  console.log(errors);
  return (
    <Fragment>
      <section className="createCategoryContainer">
        <Heading name={t("createCategory")} />
        <div className="categoryFormContainer">
          <form onSubmit={handleSubmit}>
            <div className="inputFields">
              <div className="firstColumn">
                <Input
                  label={t("categoryName")}
                  className="left"
                  type={"text"}
                  placeholder={t("enterCategoryName")}
                  name="name"
                  autoComplete="off"
                  maxLength="100"
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
                  label={t("priority")}
                  className="right"
                  type={"text"}
                  placeholder={t("enterPriority")}
                  name="priority"
                  autoComplete="off"
                  maxLength="500"
                  required={false}
                  value={values.priority}
                  onKeyDown={null}
                  isDisabled={false}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  touched={touched?.priority}
                  errors={errors?.priority}
                  icon={<MdDriveFileRenameOutline />}
                />
              </div>
              <Input
                label={t("categoryDescription")}
                className=""
                type={"text"}
                placeholder={t("enterCategoryDescription")}
                name="description"
                autoComplete="off"
                maxLength="40"
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
            </div>
            <SingleDatePicker
              name={t("categoryAvalibleDuration")}
              placeholder={t("selectTimeRange")}
              format="HH:mm"
              isPredefinedRanges={false}
              startDate={values.avalibleFrom}
              endDate={values.avalibleTo}
              onChange={handleTimeChange}
              error={errors.avalibleTo}
              touched={touched.avalibleFrom}
              // icon={<LuCalendarClock />}
            />
            <WeekDaysPicker
              weekdays={weekdays}
              onWeekdayChange={handleWeekdayChange}
              enabled={enabled}
              toggleEnabled={toggleEnabled}
              touched={touched?.status}
              errors={errors?.status}
            />
            <ImageComponent
              name={t("image")}
              maxHeight={400}
              maxWidth={400}
              maxSize={200 * 1024}
              initialImage={values.image as any}
              onImageChange={handleImageChange}
              defaultImageUrl={null}
              touched={touched?.image}
              errors={errors?.image}
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
            {/* <Button
              className="filled"
              text={t("addItem")}
              type="submit"
              icon={isLoading ? <Loader /> : <MdAdd />}
            /> */}
          </form>
        </div>
      </section>
    </Fragment>
  );
};

export default CreateCategory;
