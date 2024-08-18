import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/button/button";
import Heading from "../../../components/pageHeading/heading";
import UserSideBar from "../../../components/sidebar/userSidebar";
import { CustomerReducerInitialState } from "../../../types/reducerType";
import { server } from "../../../redux/store";
import Breadcrumb from "../../../components/breadcrumb/breadcrumb";

const Profile = () => {
  const navigate = useNavigate();
  const { customer } = useSelector(
    (state: { customerReducer: CustomerReducerInitialState }) =>
      state.customerReducer
  );
  return (
    <div className="userContainer">
      <UserSideBar />
      <main>
        <Breadcrumb />
        <Heading name="My Profile" />
        <section className="profileSection">
          <div className="leftSide">
            <img
              src={
                customer?.avatar && customer?.avatar.startsWith("http")
                  ? customer?.avatar
                  : `${server}/${customer?.avatar}`
              }
              alt={customer?.name}
            />
          </div>
          <div className="rightSide">
            <div className="exisitngDetails">
              <div className="section">
                <ProfileDetail
                  text="Name"
                  placeHolder="Please add your name"
                  type="text"
                  value={customer?.name ?? ""}
                />
                <ProfileDetail
                  text="Email Address"
                  placeHolder="Please add your Email Address"
                  type="email"
                  value={customer?.email ?? ""}
                />
              </div>
              <div className="section">
                <ProfileDetail
                  text="Date of Birth"
                  placeHolder="Please add your Date of Birth"
                  type="text"
                  value={
                    customer?.dob ? new Date(customer?.dob).toDateString() : ""
                  }
                />
                <ProfileDetail
                  text="Gender"
                  placeHolder="Please add your gender"
                  type="text"
                  value={customer?.gender ? customer?.gender : ""}
                />
              </div>
            </div>
            <Button
              className="filled"
              text="Edit Profile"
              type="button"
              handleClick={() => navigate("/editProfile")}
            />
          </div>
        </section>
      </main>
    </div>
  );
};

interface ProfileDetailProps {
  text: string;
  value: any;
  placeHolder: string;
  type: string;
}

const ProfileDetail = ({
  value,
  placeHolder,
  type,
  text,
}: ProfileDetailProps) => (
  <div className="profileInputContainer">
    <h2>{text}</h2>
    <input
      type={type}
      value={value}
      readOnly
      disabled
      placeholder={placeHolder}
    />
  </div>
);

export default Profile;
