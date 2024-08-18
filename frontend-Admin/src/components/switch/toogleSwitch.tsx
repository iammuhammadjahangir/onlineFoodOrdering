interface ToogleSwitchProps {
  isChecked: boolean;
  handleChange: () => void;
}
const ToogleSwitch = ({ handleChange, isChecked }: ToogleSwitchProps) => {
  // console.log(isChecked);
  return (
    <label className="switch">
      <span className="switch__wrapper">
        <input
          className="switch__input"
          type="checkbox"
          onChange={handleChange}
          checked={isChecked}
          role="switch"
        />
        <span className="switch__handle">
          <span className="switch__handle-top"></span>
          <span className="switch__handle-side"></span>
          <span className="switch__handle-bottom"></span>
          <span className="switch__handle-bottom"></span>
          <span className="switch__handle-bottom">
            <span className="switch__keyhole"></span>
          </span>
        </span>
      </span>
      <span className="switch__label">Power</span>
    </label>
  );
};

export default ToogleSwitch;
