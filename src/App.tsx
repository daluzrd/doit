import React, { useState } from "react";
import CategoryList from "./components/CategoryList";
import Form from "./components/Form";
import Category from "./data/Category";
import styles from "./styles/app.module.scss";

function App() {
  const category = new Category("To do", []);
  const [categoryList, setCategoryList] = useState([category]);

  return (
    <div className={styles.app}>
      <section className={styles.form}>
        <Form />
      </section>
      <section className={styles.categoryList}>
        <CategoryList categoryList={categoryList} />
      </section>
    </div>
  );
}

export default App;
