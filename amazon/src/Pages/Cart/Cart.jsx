import React, { useContext } from "react";
import classes from "./cart.module.css";
import LayOut from "../../Componenets/LayOut/LayOut";
import { DataContext } from "../../Componenets/DataProvider/DataProvider";
import Productcard from "../../Componenets/Product/Productcard";
import CurrencyFormat from "../../Componenets/CurrencyFormat/CurrencyFormat";
import { Link } from "react-router-dom";
import { Type } from "../../Utility/action.type";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";



const Cart = () => {
  const [{ cart, user }, dispatch] = useContext(DataContext);
  const total = cart.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);

  const increment = (item) => {
    dispatch({ type: Type.ADD_TO_CART, item });
  };
  const decrement = (id) => {
    dispatch({ type: Type.REMOVE_FROM_CART, id });
  };
  return (
    <LayOut>
      <section className={classes.container}>
        <div className={classes.cart_container}>
          <h2>Hello</h2>
          <h3>Your Cart</h3>
          <hr />
          {cart.length == 0 ? (
            <p>Your Cart is Empty</p>
          ) : (
            cart.map((item) => {
              return (
                <section className={classes.cart_product}>
                  <Productcard
                    product={item}
                    key={item.id}
                    flex={true}
                    renderDesc={true}
                    renderAdd={false}
                  />
                  <div className={classes.btn_container}>
                    <button
                      className={classes.btn}
                      onClick={() => increment(item)}
                    >
                      <IoIosArrowUp size={25} />
                    </button>
                    <span>{item.amount} </span>
                    <button
                      className={classes.btn}
                      onClick={() => decrement(item.id)}
                    >
                      <IoIosArrowDown size={25} />
                    </button>
                  </div>
                </section>
              );
            })
          )}
        </div>
        <div>
          {cart.length !== 0 && (
            <div className={classes.subtotal}>
              <p>Subtotal ({cart?.length} items) </p>
              <CurrencyFormat amount={total} />
              <span>
                <input type="checkbox" />
                <small>This order contains a gift</small>
              </span>
              <Link to="/payment">Proceed to checkout</Link>
            </div>
          )}
        </div>
      </section>
    </LayOut>
  );
};

export default Cart;
