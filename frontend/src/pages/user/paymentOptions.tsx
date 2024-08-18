import Breadcrumb from "../../components/breadcrumb/breadcrumb";
import Heading from "../../components/pageHeading/heading";
import UserSideBar from "../../components/sidebar/userSidebar";

const PaymentOptions = () => {
  return (
    <div className="userContainer">
      <UserSideBar />
      <main>
        <Breadcrumb />
        <Heading name="Payment Options" />

        <section className="payments">
          <input type="checkbox" name="Cash On Delivery" id="COD" checked />
          <label htmlFor="">Cash On Delivery</label>
        </section>
      </main>
    </div>
  );
};

export default PaymentOptions;
