import { lazy, Suspense, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import WebFont from "webfontloader";
import ProtedtedRoute from "./routes/protectedRoute";
import { routesConfigrationType } from "./routes/routesConfigration";

// Login Routes
const Login = lazy(() => import("./features/auth/login"));
const ForgetPassword = lazy(() => import("./features/auth/forgetPassword"));
const NewPassword = lazy(() => import("./features/auth/newPassword"));

// Import Languages
import English from "./locale/english.json";
import Urdu from "./locale/urdu.json";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { useSelector } from "react-redux";
import Header from "./components/header/header";
import Loader from "./components/loader/loader";
import { RootState } from "./redux/store";
import { routesConfigration } from "./routes/routesConfigration";

// Locales Default Setting
i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: English,
    },
    ur: {
      translation: Urdu,
    },
  },
  lng: "en",
  fallbackLng: "en",

  interpolation: {
    escapeValue: false,
  },
});

const App = () => {
  const { isAuthenticated, user, loading, error } = useSelector(
    (state: RootState) => state.userReducer
  );

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
  }, []);

  return (
    <Router>
      {user && <Header />}
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Navigate to={"/login"} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgetPassword" element={<ForgetPassword />} />
          <Route path="/password/reset/:token" element={<NewPassword />} />

          <Route
            element={
              <ProtedtedRoute
                allowedRoles={[
                  "superAdmin",
                  "Administrator",
                  "Admin",
                  "Salesman",
                ]}
                isAuthenticated={isAuthenticated}
                role={user ? user.role.name : ""}
                loading={loading}
                error={error}
              />
            }
          >
            {routesConfigration.map(
              ({ path, component }: routesConfigrationType, index: number) => (
                <Route key={index} path={path} element={component} />
              )
            )}
          </Route>
        </Routes>
      </Suspense>
      <Toaster position="bottom-center" />
    </Router>
  );
};

export default App;
