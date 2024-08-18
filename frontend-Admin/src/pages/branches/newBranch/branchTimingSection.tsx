import moment from "moment";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Fragment } from "react/jsx-runtime";
import SingleDatePicker from "../../../components/dropdown/singleDatePicker";
import WeekDaysPicker from "../../../components/dropdown/weekDaysPicker";
import { MultipleColorsComponentProps } from "../../../types/types";

const BranchTimingSection = ({
  errors,
  setFieldValue,
  touched,
  values,
}: MultipleColorsComponentProps) => {
  const { t } = useTranslation();
  const [enabled, setEnabled] = useState(true);
  // Initialize weekdays with default selection based on item.status
  const [weekdays, setWeekdays] = useState(
    moment.weekdaysShort(true).map((weekday) => ({
      name: weekday,
      checked: values.branchTiming.days.includes(weekday), // Set to true if the day is in item.status
    }))
  );
  console.log(values);

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

    setFieldValue("branchTiming.days", selectedWeekdays);
  };

  const toggleEnabled = () => {
    setEnabled(!enabled);
  };

  const handleFirstHalfTimeChange = (dates: [Date, Date] | null) => {
    if (dates) {
      setFieldValue("branchTiming.firstHalfOpenTime", dates[0]);
      setFieldValue("branchTiming.firstHalfCloseTime", dates[1]);
    }
  };
  const handleSecondHalfTimeChange = (dates: [Date, Date] | null) => {
    if (dates) {
      setFieldValue("branchTiming.secondHalfOpenTime", dates[0]);
      setFieldValue("branchTiming.secondHalfCloseTime", dates[1]);
    }
  };

  return (
    <Fragment>
      <section className="branchTimingContainer">
        <WeekDaysPicker
          weekdays={weekdays}
          onWeekdayChange={handleWeekdayChange}
          enabled={enabled}
          toggleEnabled={toggleEnabled}
          touched={touched?.status}
          errors={errors?.status}
          title={t("branchDays")}
        />
        <fieldset className="fieldset-container">
          <legend className="legend">{t("branchTimings")}</legend>
          <div className="fieldset-content">
            <section className="timingsContainer">
              <SingleDatePicker
                name={t("firstHalfTiming")}
                placeholder={t("selectTimeRange")}
                format="HH:mm"
                isPredefinedRanges={false}
                startDate={values.branchTiming.firstHalfOpenTime as any}
                endDate={values.branchTiming.firstHalfCloseTime as any}
                onChange={handleFirstHalfTimeChange}
                error={errors?.branchTiming?.firstHalfOpenTime}
                touched={touched?.branchTiming?.firstHalfOpenTime}
                // icon={<LuCalendarClock />}
              />
              <SingleDatePicker
                name={t("secondHalfTiming")}
                placeholder={t("selectTimeRange")}
                format="HH:mm"
                isPredefinedRanges={false}
                startDate={values.branchTiming.secondHalfOpenTime as any}
                endDate={values.branchTiming.secondHalfCloseTime as any}
                onChange={handleSecondHalfTimeChange}
                error={errors?.branchTiming?.secondHalfOpenTime}
                touched={touched?.branchTiming?.secondHalfOpenTime}
                // icon={<LuCalendarClock />}
              />
            </section>
          </div>
        </fieldset>
      </section>
    </Fragment>
  );
};

export default BranchTimingSection;
