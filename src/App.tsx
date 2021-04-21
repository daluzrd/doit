import React from "react";
import Form from "./components/Form";
import styles from "./styles/app.module.scss";

function App() {
  return (
    <div className={styles.app}>
      <section className={styles.form}>
        <Form />
      </section>
      <section className={styles.categoryList}></section>
    </div>
  );
}

export default App;
