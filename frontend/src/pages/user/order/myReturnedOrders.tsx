import Breadcrumb from "../../../components/breadcrumb/breadcrumb";
import Heading from "../../../components/pageHeading/heading";
import UserSideBar from "../../../components/sidebar/userSidebar";

const MyReturnedOrders = () => {
  return (
    <div className="userContainer">
      <UserSideBar />
      <main>
        <Breadcrumb />
        <Heading name="Return Order" />
        <section className="commingSoon">Coming Soon</section>
      </main>
    </div>
  );
};

export default MyReturnedOrders;
