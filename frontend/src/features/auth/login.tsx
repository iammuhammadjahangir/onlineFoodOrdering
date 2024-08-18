import { Fragment } from "react";
import { auth } from "../../authentication/firebase";

import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";
import shoppingLogin from "../../assets/login/shoppingLogin.jpg";
import { getCustomer, useLoginMutation } from "../../redux/api/customerApi";
import {
  customerExist,
  customerNotExist,
} from "../../redux/reducers/customerReducer";
import { MessageResponse } from "../../types/apiTypes";
import LazyloadImage from "../../components/lazyLoadImages/lazyloadImage";

const Login = () => {
  const dispatch = useDispatch();
  const [login] = useLoginMutation();
  const loginHandler = async () => {
    const { GoogleAuthProvider, signInWithPopup, signOut } = await import(
      "firebase/auth"
    );
    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);
      // console.log(user);
      const res = await login({
        name: user.displayName!,
        email: user.email!,
        avatar: user.photoURL!,
        _id: user.uid,
      });
      if ("data" in res) {
        const data = await getCustomer(user.uid);
        dispatch(customerExist(data.customer));
        toast.success(res.data.message);
      } else {
        dispatch(customerNotExist());
        const error = res.error as FetchBaseQueryError;
        const message = (error.data as MessageResponse).message;
        toast.error(message);
      }
      // console.log(user);
    } catch (error) {
      signOut(auth);
      toast.error("Sign In Failed");
    }
  };
  return (
    <Fragment>
      <section className="login">
        <section className="loginDetails">
          <section className="loginDetailsHeader">
            <h1>Online Shopping Mania</h1>
            <p>
              Welcome to Online Shopping Mania. Please login to continue
              shopping with us.
            </p>
          </section>
          <section className="loginDetailsForm">
            <form>
              <div className="formGroup">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" />
              </div>
              <div className="formGroup">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" />
              </div>
              <button type="submit">Login</button>
            </form>
          </section>

          <div className="googleLogin">
            <button onClick={loginHandler}>
              <FcGoogle /> <span>Sign in with Google</span>
            </button>
          </div>
        </section>
        <section className="svgDetail">
          {/* <img src={shoppingLogin} alt="" /> */}
          <LazyloadImage
            blurhash="LLL::WxtKUNItnj@V=bcTLWUr:n-"
            url={shoppingLogin}
            alt="Online Shopping Mania Login"
          />
        </section>
      </section>
    </Fragment>
  );
};

export default Login;
