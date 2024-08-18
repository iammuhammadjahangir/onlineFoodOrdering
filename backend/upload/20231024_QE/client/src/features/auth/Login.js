import { useRef, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./logIn.css";
import swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "./authSlice";
import { useLoginMutation } from "./authApiSlice";
import { login, loginUser } from "../../actions/userAction";
import usePersist from "../../hooks/usePersist";
import loginImg from "../../../src/images/login.png";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
const Login = () => {
  const userRef = useRef();
  const errRef = useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [unauthorized, setUnauthorized] = useState(false);
  const [persist, setPersist] = usePersist();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, user, isAuthenticated } = useSelector((state) => state.user);

  // useEffect(() => {
  //   userRef.current.focus();
  // }, []);

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  const handleForgotPassword = async (e) => {
    navigate("/passwordForgot");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let loadingAlert = null;
    try {
      console.log("chie");
      loadingAlert = swal.fire({
        // icon: "info",
        // html: '<div class="custom-loader"></div><p>Loading...</p>',
        // title: "Loading",
        text: "Logging in...",
        showCancelButton: false,
        customClass: {
          popup: "custom-swal-popup", // This is the custom class you're adding
        },
        allowOutsideClick: false, // Prevent dismissing the popup by clicking outside
        showConfirmButton: false, // Hide the OK button
        willOpen: () => {
          swal.showLoading();
        },
        didClose: () => {
          swal.hideLoading();
        },
      });
      dispatch(loginUser(username, password));
      const data = await login(username, password);
      console.log(data);
      if (data?.success) {
        let isAdministrator = data?.user?.roles.roleName === "Administrator";
        let isSuperAdmin = data?.user?.roles?.roleName === "superAdmin";
        let isAdmin = data?.user?.roles?.roleName === "Admin";
        let isSalesman = data?.user?.roles?.roleName === "Salesman";
        let username = data?.user?.username;
        let status = data?.user?.active;
        let address = data?.user?.shopNo?.storageAddress;
        let shopNo = data?.user?.shopNo?.shopCode;
        let godownNo = data?.godowns;
        let posId = data?.user?.posId;
        let phoneNo = data?.user?.shopNo?.storagePhoneNo;
        localStorage.setItem(
          "roles",
          JSON.stringify(data?.user?.roles.roleName)
        );
        localStorage.setItem(
          "userRoleId",
          JSON.stringify(data?.user?.roles._id)
        );
        localStorage.setItem(
          "isAdministrator",
          JSON?.stringify(isAdministrator)
        );
        localStorage.setItem("isSuperAdmin", JSON?.stringify(isSuperAdmin));
        localStorage.setItem("isAdmin", JSON?.stringify(isAdmin));
        localStorage.setItem("isSalesman", JSON?.stringify(isSalesman));
        localStorage.setItem("username", JSON?.stringify(username));
        localStorage.setItem("status", JSON?.stringify(status));
        localStorage.setItem("shopId", JSON?.stringify(shopNo));
        localStorage.setItem("godownId", JSON?.stringify(godownNo));
        localStorage.setItem("posId", JSON.stringify(posId));
        localStorage.setItem("address", JSON?.stringify(address));
        localStorage.setItem("phoneNo", JSON?.stringify(phoneNo));
        localStorage.setItem("theme-color", "theme-blue");
        if (loadingAlert) {
          loadingAlert.close();
          navigate("/dashboard");
        }
      }

      if (data == "Invalid Email & password") {
        setUnauthorized(true);
        if (loadingAlert) {
          loadingAlert.close();
        }
      }

      console.log(data);
      // dispatch(login(username, password))
      setUsername("");
      setPassword("");
      // navigate("/");
    } catch (err) {
      if (!err.status) {
        setErrMsg("No Server Response");
      } else if (err.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg(err.data?.message);
      }
      if (loadingAlert) {
        loadingAlert.close();
      }
      errRef.current.focus();
    }
  };

  const handleUserInput = (e) => {
    setUnauthorized(false);
    setUsername(e.target.value);
  };

  const handlePwdInput = (e) => setPassword(e.target.value);
  const handleToggle = () => setPersist((prev) => !prev);

  const errClass = errMsg ? "errmsg" : "offscreen";
  const content = (
    <div className="LoginSignUpContainer">
      <div className="LoginSignUpBox">
        <div>
          <div className="LoginSignUp-Toggle">
            <p>LOGIN</p>
          </div>
        </div>
        <form className="loginForm" ref={userRef} onSubmit={handleSubmit}>
          <div className="loginEmail">
            <MailOutlineIcon />
            <input
              type="username"
              placeholder="Enter UserName"
              ref={userRef}
              value={username}
              onChange={handleUserInput}
              autoComplete="off"
              required
            />
          </div>
          {unauthorized && "Invalid Username & password"}
          <div className="loginPassword">
            <LockOpenIcon />
            <input
              type="password"
              placeholder="Password"
              id="password"
              onChange={handlePwdInput}
              value={password}
              required
            />
          </div>
          <Link to="/passwordForgot">Forget Password? </Link>
          <input
            type="submit"
            name="Login"
            value="Login"
            className="loginBtn"
            id=""
          />
        </form>
      </div>
    </div>
  );

  return !JSON.parse(localStorage.getItem("username"))
    ? content
    : (() => {
        localStorage.clear();
        window.location.reload();
      })();
};
export default Login;
