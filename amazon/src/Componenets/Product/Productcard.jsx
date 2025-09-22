import React, { useContext } from 'react'
import Rating from '@mui/material/Rating'
import CurrencyFormat from '../CurrencyFormat/CurrencyFormat'
import classes from './product.module.css'
import { Link } from "react-router-dom";




const Productcard = ({product}) => {
      const {image, title, id, rating, price,} = product;
      // console.log(product);
      
      return (
        <div className={`${classes.card_container}`}>
          <Link to={`/products/${id}`}>
            <img src={image} alt="" className={classes.img_container} />
          </Link>
          <div>
            <h3>{title}</h3>
            <div className={classes.rating}>
              {/* Rating */}
              <Rating value={rating?.rate} precision={0.1} />
              {/* count */}
              <small>{rating?.count} </small>
            </div>
            <div>
              {/* pricing */}
              <CurrencyFormat amount={price} />
            </div>
            <button className={classes.button}>add to cart</button>
          </div>
        </div>
      );
}

export default Productcard