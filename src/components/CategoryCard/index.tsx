import React from "react";
import Category from "../../data/Category";
import styles from "./categoryCard.module.scss";

type CategoryCardType = {
  category: Category;
  id: number;
};

export default function CategoryCard(props: CategoryCardType) {
  return (
    <section className={styles.categoryCard}>
      <form>
        <input />
        <ul>{/* TaskList */}</ul>
      </form>
    </section>
  );
}
