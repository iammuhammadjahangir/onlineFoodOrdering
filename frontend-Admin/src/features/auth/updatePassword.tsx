import { useFormik } from "formik";
import { Fragment, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Input from "../../components/inputs/input";
import { updatePassword } from "../../redux/reducers/userReducer";
import { RootState } from "../../redux/store";
import { updatePasswordSchema } from "../schema/signInSchema";

// Icons
import { MdKey } from "react-icons/md";
import { RiLockPasswordFill, RiLockPasswordLine } from "react-icons/ri";

const UpdatePassword = () => {
  const { isAuthenticated, error, loading } = useSelector(
    (state: RootState) => state.userReducer
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (isSubmitted) {
      if (!loading && isAuthenticated && !error) {
        toast.success("Password updated successfully");
        navigate("/dashboard");
      }
      if (error) {
        toast.error(error);
      }
      setIsSubmitted(false);
    }
  }, [isAuthenticated, error, isSubmitted]);

  const initialValues = {
    oldPassword: "",
    password: "",
    confirmPassword: "",
  };
  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues,
      validationSchema: updatePasswordSchema,
      validateOnChange: true,
      validateOnBlur: false,
      onSubmit: async (values) => {
        await dispatch(updatePassword(values) as unknown as any);
        setIsSubmitted(true);
      },
    });
  return (
    <Fragment>
      {isAuthenticated && (
        <div className="outerLoginContainer">
          <div className="loginContainer">
            <form onSubmit={handleSubmit}>
              <div className="crediantialsContainer">
                <h1>Update Password</h1>
                <Input
                  label="Old Password"
                  className=""
                  type="password"
                  placeholder="Enter your Old Password"
                  name="oldPassword"
                  autoComplete="off"
                  maxLength="20"
                  required={false}
                  value={values.oldPassword}
                  onKeyDown={null}
                  isDisabled={false}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  touched={touched?.oldPassword}
                  errors={errors?.oldPassword}
                  icon={<MdKey />}
                />
                <Input
                  label="New Password"
                  className=""
                  type="text"
                  placeholder="Enter your new Password"
                  name="password"
                  autoComplete="off"
                  maxLength="20"
                  required={false}
                  value={values.password}
                  onKeyDown={null}
                  isDisabled={false}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  touched={touched?.password}
                  errors={errors?.password}
                  icon={<RiLockPasswordLine />}
                />
                <Input
                  label="Confirm Password"
                  className=""
                  type="text"
                  placeholder="Reenter your password"
                  name="confirmPassword"
                  autoComplete="off"
                  maxLength="20"
                  required={false}
                  value={values.confirmPassword}
                  onKeyDown={null}
                  isDisabled={false}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  touched={touched?.confirmPassword}
                  errors={errors?.confirmPassword}
                  icon={<RiLockPasswordFill />}
                />
                <button type="submit" className="submitButton">
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default UpdatePassword;
