import Container from "../../components/mainContainer/container";
import Heading from "../../components/pageHeading/heading";

// Importing Icons
import { FaCircle } from "react-icons/fa";
import { PiShieldWarningFill } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button/button";
import Loader from "../../components/loader/loader";
import Tooltip from "../../components/tooltip/tooltip";
import { updateLocalUser } from "../../redux/reducers/userReducer";
import { RootState, server } from "../../redux/store";
import { NewUserData } from "../../types/apiTypes";
import { useEffect, useState } from "react";
import { getPermissionsForRole } from "../../redux/api/assignTasks";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user, loading, error } = useSelector(
    (state: RootState) => state.userReducer
  );
  const [canViewProfile, setCanViewProfile] = useState<boolean>(false);

  useEffect(() => {
    const getPermission = async () => {
      const permissionForView = await getPermissionsForRole("View Profile");
      console.log(permissionForView);
      setCanViewProfile(permissionForView);
    };

    getPermission();
  }, []);

  function calculateAge(dateOfBirth: string) {
    const dob = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--;
    }

    return age;
  }

  const handleUpdateProfile = () => {
    console.log(user);
    const userDataToUpdated: NewUserData = {
      id: user!._id,
      name: user!.name,
      email: user!.email,
      photo: user!.avatar,
      // password: user!.password,
      gender: user!.gender,
      role: user!.role._id,
      active: user!.active,
      shopNo: user!.shopNo._id,
      printer: user!.printer,
      tableRows: user!.tableRows.toString(),
      posId: user!.posId,
      phoneNo: user!.phoneNo,
      whatsappNo: user!.whatsappNo,
      dob: user!.dob,
      pageAddress: "Update My Profile",
    };
    console.log(userDataToUpdated);
    dispatch(updateLocalUser(userDataToUpdated));
    navigate("/manageUserProfile");
  };

  return (
    <Container>
      {isAuthenticated && user && !loading && !error && canViewProfile ? (
        <section className="profileContainer">
          <Heading name="User Profile" />
          <section className="prodileInnerContainer">
            <aside className="leftProfile">
              <div className="personalDetails">
                <section className="imageContainer">
                  <img
                    src={`${server}/${user?.avatar.url}`}
                    alt={`${user?.name}`}
                  />
                  <span className="badge">
                    {user?.active ? (
                      <Tooltip text="Active" position="right" length="small">
                        <FaCircle fill="#39FF14" />
                      </Tooltip>
                    ) : (
                      <Tooltip text="Disabled" position="right" length="small">
                        <PiShieldWarningFill
                          fill="#D0342C"
                          style={{ transform: "scale(2)" }}
                        />
                      </Tooltip>
                    )}
                  </span>
                </section>
                <section className="designation">
                  <h3>{user?.name + "(" + user?.gender + ")"}</h3>
                  <h2>{user?.email}</h2>
                  <p>{user?.role?.name}</p>
                </section>
                <section className="extraInfo">
                  <div className="details">
                    <h3>Age</h3>
                    <div className="extraInfoShadow">
                      <h2>
                        {user &&
                          user.dob &&
                          calculateAge(user.dob) + " Years Old"}
                      </h2>
                    </div>
                  </div>
                  <div className="details">
                    <h3>Phone Number</h3>
                    <div className="extraInfoShadow">
                      <h2>{user?.phoneNo}</h2>
                    </div>
                  </div>
                  <div className="details">
                    <h3>Whatsapp Number</h3>
                    <div className="extraInfoShadow">
                      <h2>{user?.whatsappNo}</h2>
                    </div>
                  </div>
                </section>
              </div>
            </aside>
            <aside className="rightProfile">
              <div className="rightDetails">
                <div className="details">
                  <h3>Associated With</h3>
                  <div className="shop">
                    <h2>
                      {"(" + user?.shopNo?.shopCode + ")"}{" "}
                      <span>{user?.shopNo?.shopAddress}</span>
                    </h2>
                  </div>
                  <div className="shop">
                    <h2>
                      {"(" + user?.shopNo?.wareHouseId?.wareHouseCode + ")"}{" "}
                      <span>{user?.shopNo?.wareHouseId?.wareHouseAddress}</span>
                    </h2>
                  </div>
                </div>
                <div className="details">
                  <h3>Current Printer </h3>
                  <div className="printer">
                    <h2>{user?.printer}</h2>
                  </div>
                </div>
                <div className="details">
                  <h3>Table Rows</h3>
                  <div className="tableRows">
                    <h2>{user?.tableRows}</h2>
                  </div>
                </div>
                <div className="details">
                  <h3>Joined On</h3>
                  <div className="join">
                    <h2>
                      {user &&
                        user.createdAt &&
                        new Date(user.createdAt).toLocaleDateString()}
                    </h2>
                  </div>
                </div>
              </div>
              <div className="actionButton">
                <Button
                  className="outlined"
                  handleClick={() => {
                    navigate("/update");
                  }}
                  text="Change Password"
                  type="button"
                />
                <Button
                  className="filled"
                  handleClick={handleUpdateProfile}
                  text="Update Profile"
                  type="button"
                />
              </div>
            </aside>
          </section>
        </section>
      ) : (
        <Loader />
      )}
    </Container>
  );
};

export default Profile;
