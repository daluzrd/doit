import React, { Key } from "react";
import Category from "../../data/Category";
import CategoryCard from "../CategoryCard";
import styles from "./categoryList.module.scss";

type CategoryListType = {
  categoryList: Category[];
};

export default function CategoryList(props: CategoryListType) {
  return (
    <section className={styles.categoryList}>
      <ul>
        {props.categoryList.map((category: Category, index: number) => {
          return (
            <li key={index}>
              <CategoryCard category={category} id={index} />
            </li>
          );
        })}
      </ul>
      <button type="submit">+</button>
    </section>
  );
}
