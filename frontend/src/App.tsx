import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import WebFont from "webfontloader";
import { Toaster } from "react-hot-toast";
import Loader from "./components/loader/loader";
import ProtectedRoute from "./routes/protectedRoute";
import WhatsappIcon from "./assets/WhatsApp_icon.png";
import {
  routesConfigration,
  routesConfigrationType,
} from "./routes/routesConfigration";
import Login from "./features/auth/login";
import { auth } from "./authentication/firebase";
import { useDispatch, useSelector } from "react-redux";
import { CustomerReducerInitialState } from "./types/reducerType";
import { getCustomer } from "./redux/api/customerApi";
import {
  customerExist,
  customerNotExist,
} from "./redux/reducers/customerReducer";

//Dynamic Import Using lazy
const Header = lazy(() => import("./components/header"));
const Home = lazy(() => import("./pages/home"));
const ProductCard = lazy(() => import("./pages/product/productCard"));
const Search = lazy(() => import("./pages/search/search"));
const AddAddress = lazy(() => import("./pages/user/address/newAddress"));

// Socket IO
import socketIOClient from "socket.io-client";
import { ENDPOINT } from "./redux/axiosInstance";

// checkOut
const CheckOutOrder = lazy(() => import("./pages/checkout/checkoutPage"));

function App() {
  const dispatch = useDispatch();
  const { customer } = useSelector(
    (state: { customerReducer: CustomerReducerInitialState }) =>
      state.customerReducer
  );

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    // getLocation();
  }, []);

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.emit("visitorConnected");

    return () => {
      socket.disconnect();
    };
  }, []);

  // useEffect(() => {

  //   console.log(deviceType);
  //   // detectDeviceType();
  //   // 'Mobile' or 'Desktop'
  // }, []);

  // const getLocation = async () => {
  //   // to get Location
  //   // navigator.geolocation.getCurrentPosition(Location);
  //   navigator.geolocation.getCurrentPosition(Location);
  //   async function Location(position) {
  //     console.log("Latitude is :", position.coords.latitude);
  //     console.log("Longitude is :", position.coords.longitude);

  //     const latitude = position.coords.latitude;
  //     const longitude = position.coords.longitude;
  //     const apiKey = "020981fd03364d2e8fa6404316eafb4c";

  //     const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${position.coords.latitude}%2C${position.coords.longitude}&key=020981fd03364d2e8fa6404316eafb4c`;

  //     await fetch(apiUrl)
  //       .then((response) => response.json())
  //       .then((data) => {
  //         console.log(data);

  //         const city = data.results[0].components.city;
  //         const state = data.results[0].components.state;
  //         const country = data.results[0].components.country;

  //         console.log(city, ", ", state, ", ", country);
  //       });
  //   }
  // };

  // to sign out the user from firebase
  useEffect(() => {
    const checkUser = async () => {
      const { onAuthStateChanged } = await import("firebase/auth");
      onAuthStateChanged(auth, async (customer) => {
        if (customer) {
          const data = await getCustomer(customer.uid);
          dispatch(customerExist(data.customer));
          // setload(false);
        } else {
          dispatch(customerNotExist());
          // setload(false);
        }
      });
    };

    checkUser();
    // signOut(auth).then(() => console.log("sign out"));
  }, []);

  return (
    <Router>
      <Header customer={customer} />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search/:id" element={<ProductCard />} />
          <Route path="/search" element={<Search />} />
          <Route path="/checkout" element={<CheckOutOrder />} />

          <Route
            path="/login"
            element={
              <ProtectedRoute isAuthenticated={customer ? false : true}>
                <Login />
              </ProtectedRoute>
            }
          />
          <Route
            path="/addressBook/newAddress"
            element={
              <AddAddress
                isNewAddressModel={false}
                closeNewAddress={() => {}}
              />
            }
          />

          <Route
            element={
              <ProtectedRoute isAuthenticated={customer ? true : false} />
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
      <a
        href="https://wa.me/+923340960666"
        className="whatsapp_float"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={WhatsappIcon} alt="Contact" />
      </a>
    </Router>
  );
}

export default App;
