import React from "react";
import { useTranslation } from "react-i18next";

interface WeekDaysPickerProps {
  weekdays: { name: string; checked: boolean }[];
  onWeekdayChange: (weekday: string) => void;
  enabled: boolean;
  toggleEnabled: () => void;
  touched: any;
  errors: any;
  title?: string;
}

const WeekDaysPicker: React.FC<WeekDaysPickerProps> = ({
  weekdays,
  onWeekdayChange,
  enabled,
  toggleEnabled,
  touched,
  errors,
  title,
}) => {
  const { t } = useTranslation();
  return (
    <fieldset className="weekdaysFieldset">
      <legend>{title || t("avalibleDays")}</legend>
      <div className="checkboxContainer">
        <table>
          <tbody>
            <tr>
              {weekdays.map((weekday, i) => (
                <td key={i}>
                  <div>
                    <input
                      type="checkbox"
                      id={`weekday-${i}`}
                      checked={weekday.checked}
                      disabled={i === 7 ? false : !enabled}
                      value={weekday.name}
                      onChange={() => onWeekdayChange(weekday.name)}
                    />
                    <label
                      htmlFor={`weekday-${i}`}
                      className={i === 7 ? "special" : ""}
                    >
                      <span>{weekday.name}</span>
                    </label>
                  </div>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      <p className="error">{touched && errors ? errors : null}</p>
      {/* <button onClick={toggleEnabled}>{enabled ? "Disable" : "Enable"}</button> */}
    </fieldset>
  );
};

export default WeekDaysPicker;
