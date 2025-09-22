import React from "react";
import LayOut from "../../Componenets/LayOut/LayOut";
import Carousel from "../../Componenets/Carousel/Carousel";

import Product from "../../Componenets/Product/Product";
import Category from "../../Componenets/Category/Category";

const Landing = () => {
  return (
    <LayOut>
      <Carousel />
      <Category />
      <Product />
    </LayOut>
  );
};

export default Landing;
