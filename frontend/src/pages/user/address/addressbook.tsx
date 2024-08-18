import { IoAdd } from "react-icons/io5";
import Button from "../../../components/button/button";
import Heading from "../../../components/pageHeading/heading";
import UserSideBar from "../../../components/sidebar/userSidebar";
import { Address } from "../../../types/types";
import { useSelector } from "react-redux";
import { CustomerReducerInitialState } from "../../../types/reducerType";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../../../components/breadcrumb/breadcrumb";

const Addressbook = () => {
  const navigate = useNavigate();

  // importing Customer Data
  const { customer } = useSelector(
    (state: { customerReducer: CustomerReducerInitialState }) =>
      state.customerReducer
  );

  return (
    <div className="userContainer">
      <UserSideBar />
      <main className="addressContainer">
        <Breadcrumb />
        <div className="headingContainer">
          <Heading name="Address Book" />
          <Button
            className="outlined"
            text="add Address"
            type="button"
            handleClick={() => navigate("/addressBook/newAddress")}
            icon={<IoAdd />}
          />
        </div>
        <div className="addressDetailContainer">
          {customer?.address?.map((address, index) => (
            <AddressCart key={index} address={address} />
          ))}
        </div>
      </main>
    </div>
  );
};

interface AddressProps {
  address: Address;
  isCheckoutPage?: boolean;
  handleClick?: (address: Address) => void;
}

export const AddressCart = ({
  address,
  isCheckoutPage = false,
  handleClick = () => {},
}: AddressProps) => {
  const navigate = useNavigate();
  return (
    <div className="AddressCart" onClick={() => handleClick(address)}>
      <section className="nameContainer">
        <h3>Address</h3>
        {!isCheckoutPage && (
          <button
            onClick={() => {
              navigate("/addressBook/editAddress", { state: address });
            }}
          >
            EDIT
          </button>
        )}
      </section>
      {/* <p>{address.phoneNo}</p> */}
      <div className="addressContainerNested">
        <p>
          {address.city} - {address.area} <br /> {address.addressDetail}
        </p>
      </div>
      {/* <div className="addressType">
        <p className={`${address.addressType === "Home" ? "green" : "red"}`}>
          {address.addressType}
        </p>
        {address.homeDefault && <p>Default Home Address</p>}
        {address.billingDefault && <p>Default Billing Address</p>}
      </div> */}
    </div>
  );
};

export default Addressbook;
