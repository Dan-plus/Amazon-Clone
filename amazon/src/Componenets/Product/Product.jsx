import React, { useState, useEffect } from "react";
import axios from "axios";
import Productcard from "./Productcard";
import classes from "./product.module.css";

const Product = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        // console.log(res);
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <section className={classes.products_container}>
      {products?.map((singleProduct) => {
        return <Productcard product={singleProduct} key={singleProduct.id} />;
      })}
    </section>
  );
};

export default Product;
