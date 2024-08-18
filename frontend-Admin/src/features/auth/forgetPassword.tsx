import { useFormik } from "formik";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdEmail } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Fragment } from "react/jsx-runtime";
import Input from "../../components/inputs/input";
import { forgetPassword } from "../../redux/reducers/userReducer";
import { RootState } from "../../redux/store";
import { emailVerificationSchema } from "../schema/signInSchema";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const { loading, error, message } = useSelector(
    (state: RootState) => state.forgetPasswordReducer
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [disableButton, setDisableButton] = useState<boolean>(false);

  const initialValues = {
    email: "",
  };

  useEffect(() => {
    if (!loading && message) {
      toast.success(message);
      setDisableButton(true);
      navigate("/login");
    } else {
      if (error) {
        toast.error(error);
      }
    }
  }, [message, error]);
  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues,
      validationSchema: emailVerificationSchema,
      validateOnChange: true,
      validateOnBlur: false,
      onSubmit: async (values) => {
        await dispatch(forgetPassword(values.email) as unknown as any);
      },
    });
  return (
    <Fragment>
      <div className="outerLoginContainer">
        <div className="loginContainer">
          <form onSubmit={handleSubmit}>
            <div className="crediantialsContainer">
              <h1>Sign In</h1>
              <Input
                label="Email"
                className=""
                type="email"
                placeholder="Enter your email"
                name="email"
                autoComplete="off"
                maxLength="40"
                required={false}
                value={values.email}
                onKeyDown={null}
                isDisabled={false}
                handleChange={handleChange}
                handleBlur={handleBlur}
                touched={touched?.email}
                errors={errors?.email}
                icon={<MdEmail />}
              />
              <button
                type="submit"
                className="submitButton"
                disabled={disableButton}
              >
                Send Email
              </button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default ForgetPassword;
