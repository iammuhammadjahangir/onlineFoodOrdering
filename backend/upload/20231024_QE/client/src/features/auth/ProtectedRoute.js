import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Redirect, Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import swal from "sweetalert2";
import { refreshTokken } from "../../actions/userAction";
import { useTranslation, initReactI18next } from "react-i18next";
let isCalled = "false";
const ProtectedRoute = ({ component: Component, allowedRoles, ...rest }) => {
  const navigate = useNavigate();
  const { isAuthenticated, loading, user } = useSelector((state) => state.user);
  const userrr = localStorage.getItem("roles");
  const { t, i18n } = useTranslation();
  const userRoles = user?.user?.roles?.roleName;

  const isAuthorized = isAuthenticated && allowedRoles?.includes(userRoles);

  useEffect(() => {
    isCalled = "false";
  }, []);

  // useEffect(() => {
  //   console.log(isCalled);
  //   if (isCalled === "false" && !isAuthenticated) {
  //     console.log("hfie");
  //     isCalled = "true";
  //     getToken();
  //   }
  // }, [isAuthenticated]);
  // const getToken = async () => {
  //   const token = await refreshTokken();
  //   console.log(token);
  //   console.log("hcih");
  //   if (token.data === "Please login to acces this resource") {
  //     console.log("clai");

  //     navigate("/login");
  //   }
  //   console.log(token);
  // };

  return (
    <Fragment>
      {
        !loading && (
          <>
            {!isAuthenticated
              ? () => {
                  navigate("/login");
                }
              : isAuthorized && (
                  <>
                    <Routes>
                      <Route
                        {...rest}
                        render={(props) => {
                          return <Component {...props} />;
                        }}
                      />
                    </Routes>
                  </>
                )}
          </>
        )

        // !loading && (
        //     <>
        //         {
        //             !isAuthenticated ? (<>{navigate('/login')}</>) : !isAuthorized ? (<>
        //             </>) : (<>
        //             <Routes>
        //                 <Route
        //                     {...rest}
        //                     render={(props)=>{
        //                     return <Component {...props}/>}}
        //                 />
        //             </Routes>
        //             </>)
        //         }
        //     </>

        // )
      }
    </Fragment>
  );
};

export default ProtectedRoute;
