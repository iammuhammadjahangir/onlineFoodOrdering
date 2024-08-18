import { useFormik } from "formik";
import parse from "html-react-parser";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoMdAdd } from "react-icons/io";
import { IoAddCircleOutline, IoBagCheckOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { TbShoppingBagDiscount } from "react-icons/tb";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Breadcrumb from "../../components/breadcrumb/breadcrumb";
import Button from "../../components/button/button";
import Input from "../../components/inputs/input";
import Loader from "../../components/loader/loader";
import CustomModal from "../../components/custom/model/customModel";
import { updateCartQuantity } from "../cart/updateCartQuantity";
import { detectDeviceType, extractFirstTag } from "../../features/utils";
import {
  customerApi,
  useCheckOutCustomerMutation,
  useUpdateCustomerMutation,
} from "../../redux/api/customerApi";
import { usePlaceOrderMutation } from "../../redux/api/orderApi";
import { server } from "../../redux/store";
import valtioStore from "../../redux/valtioStore";
import orderSchema, {
  nonExistingCustomerOrderSchema,
} from "../../schema/checkoutSchema";
import { ItemsTypeCart, OrderType } from "../../types/apiTypes";
import { CustomerReducerInitialState } from "../../types/reducerType";
import { Address } from "../../types/types";
import { AddressCart } from "../user/address/addressbook";
import NewAddress from "../user/address/newAddress";
import AddressModel from "./addressModelNonExistingCustomer";
// import { Purchase } from "../../tracking/facebook";
import SkeletonLoader from "../../components/loader/skeletonLoader";
import PhoneNumber from "../../components/dropdown/phoneNumber";

const CheckoutPage = () => {
  // console.log("Enntered");
  const navigate = useNavigate();
  const location = useLocation();
  // console.log(location);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for managing modal visibility
  const [addressPageName, setAddressPageName] = useState("");
  const [isSelectAddress, setIsSelectAddress] = useState(true);
  const [forceRender, setForceRender] = useState(false); // State to force re-render
  const [isLoadingManual, setIsLoadingManual] = useState(false);

  // For Non existing Customer
  const [checkOutCustomer] = useCheckOutCustomerMutation();
  const [updateCustomer] = useUpdateCustomerMutation();
  const [
    isNonExistingCustomerAddressModelOpen,
    setIsNonExistingCustomerAddressModelOpen,
  ] = useState(false);

  const openNonExistingCustomerModel = () => {
    setIsNonExistingCustomerAddressModelOpen(true);
  };
  const closeNonExistingCustomerModel = () => {
    setIsNonExistingCustomerAddressModelOpen(false);
  };
  const [nonExistingCustomerAddressType, setNonExistingCustomerAddressType] =
    useState("");

  //getting inital customer Data
  const { customer } = useSelector(
    (state: { customerReducer: CustomerReducerInitialState }) =>
      state.customerReducer
  );

  const [placeOrder, { isLoading }] = usePlaceOrderMutation();

  // useEffect(() => {
  //   if (JSON.parse(localStorage.getItem("cart") || "[]").length === 0) {
  //     console.log("triggered");
  //     toast.error("Your cart is empty");
  //     navigate("/");
  //   }
  // }, []);

  // useEffect(() => {
  //   if (isError) {
  //     const err = error as CustomError;
  //     toast.error(err.data.message);
  //   }
  // }, [isError]);

  // useEffect(() => {
  //   if (data) {
  //     // console.log(data);
  //     localStorage.removeItem("cart");
  //     toast.success("Order Placed");
  //     valtioStore.cartCount = updateCartQuantity();
  //     // console.log("triggered");
  //     navigate("/");
  //   }
  // }, [isSucc]);

  // console.log(data);

  const openModal = () => setIsModalOpen(true); // Function to open the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setIsSelectAddress(true);
  }; // Function to close the modal

  // const closeNewAddress = () => {
  //   setIsSelectAddress(true);
  // };

  // if (customer === null) {
  //   toast.error("please login to checkout");
  // }

  // console.log(location.state.customerShippingFee);

  console.log(customer?._id);
  //   formik Initial States
  const localStorageInitialState: OrderType = {
    customerId: customer?._id || "",
    instruction: "",
    deviceType: detectDeviceType(),
    phoneNo: localStorage.getItem("phoneNoCheckout") || "",
    name: localStorage.getItem("nameCheckout") || "",
    email: localStorage.getItem("emailCheckout") || "",
    deliveryAddress: customer?.address?.[0] ?? null,
    shippingFee: import.meta.env.VITE_DELIVERY_CHARGES,
    // JSON.parse(localStorage.getItem("cart") || "[]").reduce(
    //   (acc: any, item: any) => acc + item.customerShippingFee,
    //   0
    // ) ||
    //  ,
    couponDiscountCode: "",
    paymentMethod: import.meta.env.VITE_PAYMENT_METHOD,
    subTotal: JSON.parse(localStorage.getItem("cart") || "[]").reduce(
      (acc: any, item: any) => acc + item.finalPrice,
      0
    ),
    discountPrice: JSON.parse(localStorage.getItem("cart") || "[]").reduce(
      (acc: any, item: any) =>
        acc + (item.finalPrice - item.offerPrice) * item.quantity,
      0
    ),
    grandTotalPrice:
      Number(
        JSON.parse(localStorage.getItem("cart") || "[]").reduce(
          (acc: any, item: any) => acc + item.finalPrice,
          0
        )
      ) +
      Number(
        JSON.parse(localStorage.getItem("cart") || "[]").reduce(
          (acc: any, item: any) => acc + item.customerShippingFee,
          0
        ) || import.meta.env.VITE_DELIVERY_CHARGES
      ),
    items: JSON.parse(localStorage.getItem("cart") || "[]"),
  };

  // Buy Now Button Inital State
  const buyNowInitialState: OrderType = {
    customerId: customer?._id || "",
    instruction: "",
    deviceType: detectDeviceType(),
    phoneNo: localStorage.getItem("phoneNoCheckout") || "",
    name: localStorage.getItem("nameCheckout") || "",
    email: localStorage.getItem("emailCheckout") || "",
    deliveryAddress: customer?.address?.[0] ?? null,
    shippingFee: import.meta.env.VITE_DELIVERY_CHARGES,
    couponDiscountCode: "",
    paymentMethod: import.meta.env.VITE_PAYMENT_METHOD,
    subTotal:
      location.state !== null
        ? Array.isArray(location.state)
          ? location.state
          : [location.state].reduce(
              (acc: any, item: any) => acc + item.finalPrice,
              0
            )
        : 0,
    discountPrice:
      location.state !== null
        ? Array.isArray(location.state)
          ? location.state
          : [location.state].reduce(
              (acc: any, item: any) =>
                acc + (item.finalPrice - item.offerPrice) * item.quantity,
              0
            )
        : 0,
    grandTotalPrice: Number(
      location.state !== null
        ? (Array.isArray(location.state)
            ? location.state
            : [location.state].reduce(
                (acc: any, item: any) => acc + item.finalPrice,
                0
              )) +
            Number(
              location?.state?.customerShippingFee ||
                import.meta.env.VITE_DELIVERY_CHARGES
            )
        : 0
    ),
    items:
      location.state !== null
        ? Array.isArray(location.state)
          ? location.state
          : [location.state]
        : [],
  };

  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    touched,
    setFieldValue,
  } = useFormik({
    initialValues:
      location.state !== null ? buyNowInitialState : localStorageInitialState,
    validationSchema:
      customer === null ? nonExistingCustomerOrderSchema : orderSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values) => {
      if (customer === null) {
        console.log("entered");
        console.log(values);
        localStorage.setItem("nameCheckout", values.name);
        localStorage.setItem("emailCheckout", values.email);
        localStorage.setItem("phoneNoCheckout", values.phoneNo);

        function generateRandomIds(size: number): string {
          const characters =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
          let id = "";
          for (let i = 0; i < size; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            id += characters.charAt(randomIndex);
          }
          return id;
        }

        // Creating Customer Record
        const res: any = await checkOutCustomer({
          name: values.name,
          email: values.email,
          phoneNo: values.phoneNo,
          _id: generateRandomIds(28),
          address: [values.deliveryAddress!],
        });
        console.log(res);

        // Condition when customer is created
        if (res.data.success === true || res.data.success === "true") {
          const updatedData = {
            ...values,
            customerId: res.data.data._id,
          };
          // console.log(updatedData);
          await placeOrder(updatedData);
          // Purchase(values.grandTotalPrice);
        } else {
          toast.error("Something went wrong");
        }

        // Placing Order
      } else {
        console.log(customer.phoneNo);
        console.log(typeof customer.phoneNo);
        console.log(values.phoneNo);
        console.log(typeof values.phoneNo);
        console.log(String(customer.phoneNo) !== String(values.phoneNo));
        if (String(customer.phoneNo) !== String(values.phoneNo)) {
          console.log("different phone No");
          // Creating Customer Record
          const res: any = await updateCustomer({
            id: customer._id,
            phoneNo: values.phoneNo,
          });
          console.log(res);
        }

        await placeOrder(values);
        // Purchase(values.grandTotalPrice);
      }

      localStorage.removeItem("cart");
      toast.success("Order Placed");
      valtioStore.cartCount = updateCartQuantity();
      // console.log("triggered");
      navigate("/");
    },
  });

  console.log(values);
  console.log(errors);

  useEffect(() => {
    setIsLoadingManual(true);
  }, []);
  const handleAddressChange = (adressName: string) => {
    // custom swal alert template
    // console.log("saksj");
    setAddressPageName(adressName);
    openModal();
  };

  const handleAddressChangeClick = (address: Address) => {
    // console.log("Hello");
    // console.log(addressPageName);
    // console.log(address);
    if (addressPageName === "deliveryAddress") {
      setFieldValue("deliveryAddress", address);
      // console.log("delivert");
    }
    if (addressPageName === "billingAddress") {
      setFieldValue("billingAddress", address);
      // console.log("billing");
    }
    closeModal();
  };

  // console.log(values);

  const handleVisitingUserAddressChange = (addressType: string) => {
    // console.log(addressType);
    setNonExistingCustomerAddressType(addressType);
    openNonExistingCustomerModel();
  };

  // Function to delete address from localStorage and force re-render
  const handleDeleteAddress = (addressName: string) => {
    localStorage.removeItem(addressName);
    setFieldValue(addressName, null);
    setForceRender(!forceRender); // Toggle state to force re-render
  };

  // setting Address for non existing Customer
  useEffect(() => {
    if (customer === null) {
      if (localStorage.getItem("deliveryAddress")) {
        setFieldValue(
          "deliveryAddress",
          JSON.parse(localStorage.getItem("deliveryAddress") || "")
        );
      }
      if (localStorage.getItem("billingAddress")) {
        setFieldValue(
          "billingAddress",
          JSON.parse(localStorage.getItem("billingAddress") || "")
        );
      }
    }
  }, [forceRender]);

  // const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = e.target.value === "same";
  //   setSameAddress(value);
  //   if (value) {
  //     setFieldValue("billingAddress", values.deliveryAddress);
  //     // setDeliveryAddress(billingAddress);
  //   } else {
  //     setFieldValue("billingAddress", null);
  //   }
  // };

  // console.log(localStorage.getItem("deliveryAddress"));
  // console.log(customer);
  return (
    <>
      {isLoadingManual ? (
        <form className="checkoutContainer" onSubmit={handleSubmit}>
          <aside className="left">
            <section className="innerLeftCartContainer">
              <Breadcrumb />
              <section className="userDetails">
                {customer ? (
                  <>
                    <h4>Account</h4>
                    <p>{customer?.email}</p>
                    <div className="seperatePhone">
                      <label>Ph Number</label>
                      <PhoneNumber
                        completePhoneNumber={values.phoneNo || ""}
                        errors={errors.phoneNo}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        maxLength="13"
                        name="phoneNo"
                        touched={touched?.phoneNo}
                        setFieldValues={setFieldValue}
                        defaultValue={values ? values.phoneNo : ""}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <Input
                      label="Full Name"
                      className="w-80"
                      type="text"
                      placeholder="Enter Full Name"
                      name="name"
                      autoComplete="off"
                      maxLength="40"
                      required={false}
                      value={values.name}
                      onKeyDown={null}
                      isDisabled={false}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      touched={touched?.name}
                      errors={errors?.name}
                    />
                    <Input
                      label="Email Address"
                      className="w-100"
                      type="email"
                      placeholder="Enter Email Address"
                      name="email"
                      autoComplete="off"
                      maxLength="40"
                      required={false}
                      value={values.email}
                      onKeyDown={null}
                      isDisabled={false}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      touched={touched?.email}
                      errors={errors?.email}
                    />
                    <div className="seperatePhone">
                      <label>Ph Number</label>
                      <PhoneNumber
                        completePhoneNumber={values.phoneNo || ""}
                        errors={errors.phoneNo}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        maxLength="13"
                        name="phoneNo"
                        touched={touched?.phoneNo}
                        setFieldValues={setFieldValue}
                        defaultValue={values ? values.phoneNo : ""}
                      />
                    </div>
                  </>
                )}
              </section>
              <section className="deliveryContainer">
                <div className="addContainer">
                  <h2>Delivery</h2>
                  {!values.deliveryAddress && (
                    <>
                      {customer?._id ? (
                        // open this button when we have customer so that he can choose from his old addresses
                        <Button
                          className="outlined"
                          text="add"
                          type="button"
                          handleClick={() =>
                            handleAddressChange("deliveryAddress")
                          }
                          icon={<IoMdAdd />}
                        />
                      ) : (
                        // open this when there is no customer
                        <>
                          {!localStorage.getItem("deliveryAddress") && (
                            <Button
                              className="outlined"
                              text="Add Address"
                              type="button"
                              handleClick={() =>
                                handleVisitingUserAddressChange(
                                  "deliveryAddress"
                                )
                              }
                              icon={<IoMdAdd />}
                            />
                          )}
                        </>
                      )}
                    </>
                  )}
                </div>
                <AddressCartCheckout
                  address={
                    customer === null
                      ? localStorage.getItem("deliveryAddress")
                        ? JSON.parse(
                            localStorage.getItem("deliveryAddress") || ""
                          )
                        : null
                      : values.deliveryAddress
                  }
                  handleAddressChange={handleAddressChange}
                  adressContainerName="deliveryAddress"
                  isCustomerExist={customer === null ? false : true}
                  handleDeleteAddress={() =>
                    handleDeleteAddress("deliveryAddress")
                  }
                />
                <p className="error">
                  {touched.deliveryAddress && errors.deliveryAddress
                    ? errors.deliveryAddress
                    : null}
                </p>
              </section>

              <section className="shipping">
                <h2>Shipping Fee</h2>
                <div className="ShippingFeeContainer">
                  <Input
                    label=""
                    className="w-10"
                    type="text"
                    placeholder="Shipping Fee"
                    name="shippingFee"
                    autoComplete="off"
                    maxLength="40"
                    required={true}
                    value={`Rs. ${values.shippingFee}`}
                    onKeyDown={null}
                    isDisabled={true}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    touched={touched.shippingFee}
                    errors={errors.shippingFee}
                  />
                </div>
              </section>
              <section className="payments">
                <h2>Payment</h2>
                <p>All transactions are secure and encrypted.</p>
                <div className="paymentMethod">
                  <Input
                    label=""
                    className="w-10"
                    type="text"
                    placeholder="Payment Method"
                    name="paymentMethod"
                    autoComplete="off"
                    maxLength="40"
                    required={true}
                    value={values.paymentMethod}
                    onKeyDown={null}
                    isDisabled={true}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    touched={touched.paymentMethod}
                    errors={errors.paymentMethod}
                  />
                </div>
              </section>
              <section className="shipping">
                <h2>Instruction (Optional)</h2>
                <div className="ShippingFeeContainer">
                  <Input
                    label=""
                    className="w-10"
                    type="text"
                    placeholder="Instuctions"
                    name="instruction"
                    autoComplete="off"
                    maxLength="40"
                    required={false}
                    value={`${values.instruction}`}
                    onKeyDown={null}
                    isDisabled={false}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    touched={touched.instruction}
                    errors={errors.instruction}
                  />
                </div>
              </section>

              {/* <section className="sameAddressContainer">
                <section className="container">
                  <input
                    type="radio"
                    id="sameAddress"
                    name="addressType"
                    value="same"
                    checked={sameAddress}
                    onChange={handleRadioChange}
                  />
                  <label htmlFor="sameAddress">Same as shipping address</label>
                </section>
                <section className="container">
                  <input
                    type="radio"
                    id="differentAddress"
                    name="addressType"
                    value="different"
                    checked={!sameAddress}
                    onChange={handleRadioChange}
                  />
                  <label htmlFor="differentAddress">
                    Use a different billing address
                  </label>
                </section>
              </section> */}
            </section>
          </aside>
          <aside className="right">
            <section className="innerRightCartContainer">
              {values.items.map((item: ItemsTypeCart, index: number) => (
                <ItemContainer item={item} key={index} />
              ))}

              <div className="couponContainer">
                <Input
                  label=""
                  className="w-10"
                  type="text"
                  placeholder="Enter Promo Code"
                  name="reciverName"
                  autoComplete="off"
                  maxLength="40"
                  required={false}
                  value={""}
                  onKeyDown={null}
                  isDisabled={false}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  touched={touched.couponDiscountCode}
                  errors={errors.couponDiscountCode}
                />
                <button className="discountApplyButton">Apply</button>
              </div>
              <div className="totalAmounts">
                <div className="nestedAmount">
                  <h3>Subtotal</h3>
                  <p>Rs.{values.subTotal}</p>
                </div>
                <div className="nestedAmount">
                  <h3>Delivery Fee</h3>
                  <p>Rs.{values.shippingFee}</p>
                </div>
                <div className="nestedAmount">
                  <h2>Total</h2>
                  <h4>
                    <span className="pkr">PKR</span>
                    Rs.
                    <span>{values.grandTotalPrice}</span>
                  </h4>
                </div>
                <div className="totalSavings">
                  <TbShoppingBagDiscount />
                  <h3>Total Savings</h3>
                  <p>Rs.{values.discountPrice}</p>
                </div>
              </div>
              {isLoading ? (
                <Loader />
              ) : (
                <Button
                  className="filled"
                  text="Place Order"
                  type="submit"
                  icon={<IoBagCheckOutline />}
                />
              )}
            </section>
          </aside>
          {/* CustomModal component embedded in the CheckoutPage component */}
          <CustomModal isOpen={isModalOpen} onClose={closeModal}>
            {/* Render the Addressbook component inside the modal */}
            {isSelectAddress && (
              <Button
                text="add address"
                className="outlined"
                type="button"
                handleClick={() => setIsSelectAddress(false)}
                icon={<IoAddCircleOutline />}
              />
            )}
            {isSelectAddress ? (
              <div className="addressDetailContainer">
                {customer?.address?.map((address, index) => (
                  <AddressCart
                    key={index}
                    address={address}
                    isCheckoutPage={true}
                    handleClick={handleAddressChangeClick}
                  />
                ))}
              </div>
            ) : (
              <NewAddress
                isNewAddressModel={true}
                closeNewAddress={closeNonExistingCustomerModel}
              />
            )}
          </CustomModal>

          {/* Custom model for non existing Customer */}
          <CustomModal
            isOpen={isNonExistingCustomerAddressModelOpen}
            onClose={closeNonExistingCustomerModel}
          >
            <AddressModel
              addressType={nonExistingCustomerAddressType}
              onClose={closeNonExistingCustomerModel}
              forceRender={forceRender}
              setForceRender={setForceRender}
            />
          </CustomModal>
        </form>
      ) : (
        <SkeletonLoader length={30} />
      )}
    </>
  );
};

interface itemProps {
  item: ItemsTypeCart;
}
const ItemContainer = ({ item }: itemProps) => {
  return (
    <section className="checkoutItemCart">
      <section className="checkoutCartImage">
        <img src={`${server}/${item.productImage.url}`} alt="" />
        <span
          className={`${
            Number(item.quantity) > 99 ? "borderLess" : "roundBorder"
          }`}
        >
          {item.quantity}
        </span>
      </section>
      <div className="detailsItem">
        <section className="checkoutCartDetails">
          <h2>{item.name}</h2>
          {item?.variationRequired?.map((required, index) => (
            <div key={index}>
              <h5>{required.variationName}</h5>
              <p>1 X {required.name}</p>
            </div>
          ))}
          {item?.variationOptions?.map((option, index) => (
            <div key={index}>
              <h5>{option.varName}</h5>
              {option.variation.map((opt) => (
                <p>1 X {opt.name}</p>
              ))}
            </div>
          ))}
          <p>{parse(extractFirstTag(item.description))}</p>
          {/* <span>
            {" "}
            <CiShoppingTag />
            {item.variations.name +
              "(" +
              item.variations.colors.details.name +
              ")"}
          </span> */}
        </section>
        <section className="checkoutCartPrices">
          {/* {item.comparePrice.toString() === "0" ? ( */}
          <span className="cartPrice">Rs.{item.finalPrice}</span>
          {/* // ) : ( */}
          {/* //   <div>
          //     <span className="cartActualPrice">Rs.{item.comparePrice}</span>
          //     <span className="cartNewPrice">
          //       Rs.
          //       {item.salePrice}
          //     </span>
          //   </div>
          // )} */}
        </section>
      </div>
    </section>
  );
};

interface AddressProps {
  address: Address | null;
  handleAddressChange: (adressName: string) => void;
  adressContainerName: string;
  isCustomerExist?: boolean;
  handleDeleteAddress: () => void;
}

const AddressCartCheckout = ({
  address,
  handleAddressChange,
  adressContainerName,
  isCustomerExist = true,
  handleDeleteAddress,
}: AddressProps) => {
  // console.log(address);
  // console.log(isCustomerExist);
  return (
    <>
      {address && (
        <div className="AddressCartCheckout">
          <section className="nameContainerCheckout">
            <h3>Address</h3>
            {isCustomerExist ? (
              <button
                type="button"
                onClick={() => {
                  handleAddressChange(adressContainerName);
                }}
              >
                EDIT
              </button>
            ) : (
              <MdDelete
                style={{ cursor: "pointer" }}
                onClick={handleDeleteAddress}
              />
            )}
          </section>
          {/* <p>{address.phoneNo}</p> */}
          <div className="addressContainerCheckout">
            <p>
              {address.city} - {address.area}
              <br /> {address.addressDetail}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default CheckoutPage;
