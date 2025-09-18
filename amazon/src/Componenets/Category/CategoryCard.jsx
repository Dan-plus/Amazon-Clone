import React from 'react'
import classes from './category.module.css'
// import { Link } from "react-router-dom";

const CategoryCard = ({data}) => {
  return (
    <div className={classes.category}>
      <a href="">
        <span>
          <h2>{data.title}</h2>
        </span>
        <img src={data.imageLink} alt="" />
        <p>Shop Now</p>
      </a>
    </div>
  );
}

export default CategoryCard