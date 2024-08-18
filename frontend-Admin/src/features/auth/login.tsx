import { useFormik } from "formik";
import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/inputs/input";
import { signInSchema } from "../schema/signInSchema";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/reducers/userReducer";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { RootState } from "../../redux/store";
import Loader from "../../components/loader/loader";
import toast from "react-hot-toast";

const Login = () => {
  const { isAuthenticated, loading, error } = useSelector(
    (state: RootState) => state.userReducer
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
    username: "",
    password: "",
  };
  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues,
      validationSchema: signInSchema,
      validateOnChange: true,
      validateOnBlur: true,
      //// By disabling validation onChange and onBlur formik will validate on submit.
      onSubmit: async (values) => {
        // console.log(action);
        // console.log("🚀 ~ file: App.jsx ~ line 17 ~ App ~ values", values);
        await dispatch(loginUser(values) as unknown as any);
        //// to get rid of all the values after submitting the form
        // navigate("/dashboard");
        // action.resetForm();
      },
    });

  // if (error) {
  //   alert(error);
  // }

  const loginCard = (
    <div className="outerLoginContainer">
      <div className="loginContainer">
        <form onSubmit={handleSubmit}>
          <div className="crediantialsContainer">
            <h1>Sign In</h1>
            <Input
              label="Email"
              className=""
              type="text"
              placeholder="Enter your Username"
              name="username"
              autoComplete="off"
              maxLength="40"
              required={false}
              value={values.username}
              onKeyDown={null}
              isDisabled={false}
              handleChange={handleChange}
              handleBlur={handleBlur}
              touched={touched?.username}
              errors={errors?.username}
              icon={<FaUser />}
            />
            <Input
              label="Password"
              className=""
              type={isPasswordVisible ? "text" : "password"}
              placeholder="Enter your Password"
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
            <button className="submitButton" type="submit">
              Login
            </button>
            <p onClick={() => navigate("/forgetPassword")}>
              forget your Password?
            </p>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <Fragment>
      {!loading ? <>{!isAuthenticated && loginCard}</> : <Loader />}
    </Fragment>
  );
};

export default Login;
