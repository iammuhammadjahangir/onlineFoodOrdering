import React from "react";

interface StatusProps {
  isChecked: boolean;
  handleChange: () => void;
  id: string;
  enabledValueName?: string;
  disabledValueName?: string;
}

const StatusToggle = ({
  isChecked,
  handleChange,
  id,
  enabledValueName = "Active",
  disabledValueName = "In-Active",
}: StatusProps) => {
  return (
    <span className="btn-switch">
      <input
        type="radio"
        id={`yes-${id}`}
        checked={isChecked}
        className="btn-switch__radio btn-switch__radio_yes"
        onChange={handleChange}
        aria-checked={isChecked}
        aria-labelledby={`label-yes-${id}`}
      />
      <input
        type="radio"
        id={`no-${id}`}
        checked={!isChecked}
        className="btn-switch__radio btn-switch__radio_no"
        onChange={handleChange}
        aria-checked={!isChecked}
        aria-labelledby={`label-no-${id}`}
      />
      <label
        htmlFor={`yes-${id}`}
        className="btn-switch__label btn-switch__label_yes"
        id={`label-yes-${id}`}
      >
        <span className="btn-switch__txt">{enabledValueName}</span>
      </label>
      <label
        htmlFor={`no-${id}`}
        className="btn-switch__label btn-switch__label_no"
        id={`label-no-${id}`}
      >
        <span className="btn-switch__txt">{disabledValueName}</span>
      </label>
    </span>
  );
};

export default StatusToggle;
