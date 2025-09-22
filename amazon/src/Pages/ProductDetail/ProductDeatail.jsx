import React, { useEffect, useState } from "react";
import classes from "./productdetail.module.css";
import LayOut from "../../Componenets/LayOut/LayOut";
import { useParams } from "react-router-dom";
import axios from "axios";
import { productUrl } from "../../Api/endPoints";
import Productcard from "../../Componenets/Product/Productcard";
import Loader from "../../Componenets/Loader/Loader";

function ProductDeatail() {
  const { productId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState({});
  // console.log(productId);

  useEffect(() => {
     setIsLoading(true);
    axios
      .get(`${productUrl}/products/${productId}`)
      .then((res) => {
        // console.log(res.data)

        setProduct(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  return (
    <LayOut>
   {isLoading? (<Loader />):(<Productcard  product={product} />)}
    </LayOut>
  );
}

export default ProductDeatail;
