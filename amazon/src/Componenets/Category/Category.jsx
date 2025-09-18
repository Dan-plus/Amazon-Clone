import React from "react";
import { CategoryInfos } from "./CategoryFullInfos";
import CategoryCard from "./CategoryCard";
import classes from "./category.module.css";

const Category = () => {
  return (
    <section className={classes.category_container}>
      {CategoryInfos.map((infos) => (
        <CategoryCard data={infos} />
      ))}
    </section>
  );
};

export default Category;
