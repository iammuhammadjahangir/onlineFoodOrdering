import { useFormik } from "formik";
import { Fragment, useEffect, useState } from "react";
import Input from "../../components/inputs/input";
import { newPasswordSchema } from "../schema/signInSchema";
import { useDispatch, useSelector } from "react-redux";
import { ResetUserPassword } from "../../redux/reducers/userReducer";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../../redux/store";
import toast from "react-hot-toast";

// Icons
import { RiLockPasswordLine } from "react-icons/ri";
import { RiLockPasswordFill } from "react-icons/ri";

const NewPassword = () => {
  const { isAuthenticated, loading, error } = useSelector(
    (state: RootState) => state.userReducer
  );
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  useEffect(() => {
    if (!loading && isAuthenticated && !error) {
      navigate("/dashboard");
    }
    if (error) {
      toast.error(error);
    }
  }, [isAuthenticated, error]);

  const initialValues = {
    password: "",
    confirmPassword: "",
    token: params.token!,
  };
  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues,
      validationSchema: newPasswordSchema,
      validateOnChange: true,
      validateOnBlur: false,
      //// By disabling validation onChange and onBlur formik will validate on submit.
      onSubmit: async (values) => {
        await dispatch(ResetUserPassword(values) as unknown as any);
      },
    });
  return (
    <Fragment>
      <div className="outerLoginContainer">
        <div className="loginContainer">
          <form onSubmit={handleSubmit}>
            <div className="crediantialsContainer">
              <h1>Reset Password</h1>
              <Input
                label="New Password"
                className=""
                type={isPasswordVisible ? "text" : "password"}
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
                type={isPasswordVisible ? "text" : "password"}
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
              <div className="showPasswordContainer">
                <input
                  type="checkbox"
                  name="showPassword"
                  checked={isPasswordVisible}
                  onChange={() => setIsPasswordVisible(!isPasswordVisible)}
                />
                <label htmlFor="showPassword">Show Password</label>
                <br />
              </div>
              <button type="submit" className="submitButton">
                Update Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default NewPassword;
