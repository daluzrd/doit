import React, { useEffect, useState } from "react";
import CategoryList from "./components/CategoryList";
import Form from "./components/Form";
import CategoryServices from "./services/categoryServices";
import TaskServices from "./services/taskServices";
import styles from "./styles/app.module.scss";

function App() {
  const categoryServices = new CategoryServices();
  const taskServices = new TaskServices();

  const [categoryList, setCategoryList] = useState(
    categoryServices.getCategoryList()
  );
  const [taskList, setTaskList] = useState(taskServices.getTaskList());
  const [formWasSubmitted, setFormWasSubmitted] = useState(false);

  const handleAddCategory = (): void => {
    setCategoryList(categoryServices.addCategory());
  };

  const handleChangeCategoryTitle = (id: number, title: string): void => {
    setCategoryList(categoryServices.updateCategory(id, title));
  };

  const handleDeleteCategory = (id: number): void => {
    setCategoryList(categoryServices.deleteCategory(id));

    taskList
      .filter((task) => task.idCategoria === id)
      .forEach((task) => handleDeleteTask(task.id));

    setTaskList(taskServices.getTaskList());
  };

  const handleDeleteTask = (id: number): void => {
    setTaskList(taskServices.deleteTask(id));
  };

  useEffect(() => {
    if (formWasSubmitted) {
      setTaskList(taskServices.getTaskList);
      setFormWasSubmitted(false);
    }
  }, [formWasSubmitted]); //eslint-disable-line

  return (
    <div className={styles.app}>
      <section className={styles.form}>
        <Form
          categoryList={categoryList}
          setFormWasSubmitted={setFormWasSubmitted}
        />
      </section>
      <section className={styles.categoryList}>
        <CategoryList
          categoryList={categoryList}
          handleAddCategory={handleAddCategory}
          handleDeleteCategory={handleDeleteCategory}
          handleDeleteTask={handleDeleteTask}
          handleChangeCategoryTitle={handleChangeCategoryTitle}
          taskList={taskList}
        />
      </section>
    </div>
  );
}

export default App;
