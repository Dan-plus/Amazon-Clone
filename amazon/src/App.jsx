import React from 'react'
import Header from './Componenets/Header/Header'
import Carousel from './Componenets/Carousel/Carousel';
import Category from './Componenets/Category/Category';
import Product from './Componenets/Product/Product';


const App = () => {
  return (
    <div>
      <Header />
      <Carousel />
      <Category />
      <Product/>
    </div>
  );
}

export default App