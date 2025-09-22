import React, { useEffect, useState } from "react";
import classes from "./productdetail.module.css";
import LayOut from "../../Componenets/LayOut/LayOut";
import { useParams } from "react-router-dom";
import axios from "axios";
import { productUrl } from "../../Api/endPoints";
import Productcard from "../../Componenets/Product/Productcard";

function ProductDeatail() {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  // console.log(productId);

  useEffect(() => {
    //  setIsLoading(true);
    axios
      .get(`${productUrl}/products/${productId}`)
      .then((res) => {
        // console.log(res.data)

        setProduct(res.data);
        // setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  return (
    <LayOut>
      <Productcard product={product} />
    </LayOut>
  );
}

export default ProductDeatail;
