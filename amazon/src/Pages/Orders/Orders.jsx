import React, { useContext, useEffect, useState } from "react";
import classes from "./orders.module.css";
import LayOut from "../../Componenets/LayOut/LayOut";
import { db } from "../../Utility/firebase";
import { DataContext } from "../../Componenets/DataProvider/DataProvider";
import Productcard from "../../Componenets/Product/Productcard";

const Orders = () => {
  const [{ user }, dispatch] = useContext(DataContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user.uid)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot((snapshot) => {
          // console.log(snapshot);

          setOrders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        });
    } else {
      setOrders([]);
    }
  }, []);

  return (
    <LayOut>
      <section className={classes.container}>
        <div className={classes.orders_container}>
          <h2>Your Orders</h2>

          {orders?.length === 0 && <p>You have no orders</p>}
          {/* order items */}
          <div>
            {orders?.map((eachOrder, i) => {
              return (
                <div key={i}>
                  <hr />
                  <p>Order ID: {eachOrder?.id}</p>
                  {eachOrder?.data.cart.map((order) => {
                    return (
                      <Productcard flex={true} key={order.id} product={order} />
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </LayOut>
  );
};

export default Orders;
