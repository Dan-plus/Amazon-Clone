import React, { useContext, useState } from "react";
import classes from "./payment.module.css";
import LayOut from "../../Componenets/LayOut/LayOut";
import { DataContext } from "../../Componenets/DataProvider/DataProvider";
import Productcard from "../../Componenets/Product/Productcard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../Componenets/CurrencyFormat/CurrencyFormat";
import { axiosInstance } from "../../Api/axios";
import { ClipLoader } from "react-spinners";
import { db } from "../../Utility/firebase";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const [{ user, cart }, dispatch] = useContext(DataContext);
  console.log(user);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const totalItems = cart.reduce((amount, item) => amount + item.amount, 0);
  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const total = cart.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);

  const handleChange = (e) => {
    e?.error?.message ? setCardError(e.error.message) : setCardError(null);
  };
  const handlePayment = async (e) => {
    e.preventDefault();
    try {
      setProcessing(true);
      // 1 backend function ---> contact to client
      const response = await axiosInstance({
        method: "post",
        url: `/payment/create?total=${total * 100}`,
      });
      // console.log(response.data);
      const clientSecret = response.data.clientSecret;

      // 2. payment --->client intent
      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: elements.getElement(CardElement) },
      });
      // console.log(paymentIntent);

      // 3. after payment  confirmation ---> db  firestore
      await db
        .collection("users")
        .doc(user?.uid)
        .collection("orders")
        .doc(paymentIntent.id)
        .set({
          cart: cart,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });

      // 4. clear cart
      dispatch({ type: "EMPTY_CART" });

      setProcessing(false);
      navigate("/orders", { state: { msg: "you have placed new order" } });
    } catch (error) {
      console.log(error);
      setProcessing(false);
    }
  };

  return (
    <LayOut>
      {/* header */}
      <div className={classes.payment_header}>
        Checkout ({totalItems}) items
      </div>
      {/* payment method */}
      <section className={classes.payment}>
        {/* address */}
        <div className={classes.flex}>
          <h3>Shipping Address</h3>
          <div>
            <p>Name: {user?.email}</p>
            <p>Address: 123, abc street, xyz city</p>
            <p>Phone: 1234567890</p>
          </div>
        </div>
        <hr />
        {/* product */}
        <div className={classes.flex}>
          <h3>Review items and shipping address</h3>
          <div>
            {cart?.map((item) => (
              <Productcard key={item.id} product={item} flex={true} />
            ))}
          </div>
        </div>
        <hr />
        {/* card form */}
        <div className={classes.flex}>
          <h3>Payment methods</h3>
          <div className={classes.payment_container}>
            <form
              action=""
              className={classes.payment_details}
              onSubmit={handlePayment}
            >
              {cardError && (
                <div className={classes.card_error}>{cardError}</div>
              )}
              <CardElement onChange={handleChange} />
              <br />
              <div className={classes.payment_price}>
                <span style={{ display: "flex", gap: "10px" }}>
                  <p>Total Price |</p>{" "}
                  <p>
                    {" "}
                    <CurrencyFormat amount={total} />
                  </p>
                </span>
              </div>
              <button type="submit">
                {processing ? (
                  <div className={classes.loading}>
                    <ClipLoader color="white" size={20} />
                    <p>Please wait...</p>
                  </div>
                ) : (
                  "Pay Now"
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
    </LayOut>
  );
};

export default Payment;
