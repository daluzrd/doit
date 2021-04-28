import React, { useEffect, useState } from "react";
import CategoryList from "./components/CategoryList";
import Form from "./components/Form";
import Task from "./models/Task";
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

  const handleChangeCategoryTitle = (
    id: number,
    title: string,
    isNew: boolean
  ): void => {
    setCategoryList(categoryServices.updateCategory(id, title, isNew));
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

  const handleDragStart = (event: Event, taskCard: Element) => {
    taskCard.classList.add("isDragging");
    (taskCard as HTMLElement).style.opacity = "0";
    const dragEvent = event as DragEvent;
    const dataTask = taskCard.getAttribute("data-id");

    if (dataTask) {
      const taskId = dataTask.split(" ")[1];
      const task = dataTask.split(" ")[2];

      if (dragEvent.dataTransfer && taskId) {
        dragEvent.dataTransfer.setData(
          "text/plain",
          taskId.replace("task", "") + " " + task
        );
      }
    }
  };

  const handleDragEnd = (taskCard: Element) => {
    taskCard.classList.remove("isDragging");
    (taskCard as HTMLElement).style.background = "var(--gray-100)";
  };

  const handleDragOver = (event: Event, categoryCard: Element) => {
    const taskCardElement = document.querySelector(".isDragging");

    if (taskCardElement) {
      const dataTaskCard = taskCardElement.getAttribute("data-id");
      const dataCategoryCard = categoryCard.getAttribute("data-id");

      if (dataTaskCard && dataCategoryCard) {
        const taskCategoryId = Number(
          dataTaskCard.split(" ")[0].replace("category", "")
        );
        const taskId = Number(dataTaskCard.split(" ")[1].replace("task", ""));
        const task = dataTaskCard.split(" ")[2];
        const categoryId = dataCategoryCard.replace("category", "");

        if (taskId && taskCategoryId !== Number(categoryId) && categoryId) {
          setTaskList([
            ...taskList,
            new Task(
              Number(taskId),
              task,
              Number(categoryId.replace("category", ""))
            ),
          ]);
        }
      }
    }

    event.preventDefault();
  };

  const handleDrop = (event: Event, categoryCard: Element) => {
    let taskId: string;
    let categoryId: string | null;
    // let task: string;
    const dragEvent = event as DragEvent;

    if (dragEvent.dataTransfer) {
      taskId = dragEvent.dataTransfer.getData("text/plain").split(" ")[0];
      //   task = dragEvent.dataTransfer.getData("text/plain").split(" ")[1];
      categoryId = categoryCard.getAttribute("data-id");

      if (taskId && categoryId) {
        setTaskList(
          taskServices.alterCategoryId(
            Number(taskId),
            Number(categoryId.replace("category", ""))
          )
        );
      }
    }
  };

  const handleDragLeave = (categoryCard: Element) => {
    // const taskCardElement = document.querySelector(".isDragging");
    // if (taskCardElement) {
    //   const dataTaskCard = taskCardElement.getAttribute("data-id");
    //   const dataCategoryCard = categoryCard.getAttribute("data-id");
    //   if (dataTaskCard && dataCategoryCard) {
    //     const taskCategoryId = Number(
    //       dataTaskCard.split(" ")[0].replace("category", "")
    //     );
    //     const taskId = Number(dataTaskCard.split(" ")[1].replace("task", ""));
    //     // const task = dataTaskCard.split(" ")[2];
    //     const categoryId = dataCategoryCard.replace("category", "");
    //     if (taskId && taskCategoryId !== Number(categoryId) && categoryId) {
    //       setTaskList(taskList.filter((task) => task.id !== taskId));
    //     }
    //   }
    // }
  };

  return (
    <div className={styles.app}>
      <section id={"form"} className={styles.form}>
        <Form
          categoryList={categoryList}
          setFormWasSubmitted={setFormWasSubmitted}
        />
      </section>
      <section className={styles.categoryList}>
        <CategoryList
          categoryList={categoryList}
          handleAddCategory={handleAddCategory}
          handleChangeCategoryTitle={handleChangeCategoryTitle}
          handleDeleteCategory={handleDeleteCategory}
          handleDeleteTask={handleDeleteTask}
          taskList={taskList}
          handleDropCategoryList={{
            handleDragOver,
            handleDragLeave,
            handleDrop,
          }}
          handleDragTaskList={{
            handleDragStart,
            handleDragEnd,
          }}
        />
      </section>
      <button className={"backtrackingButton"}>
        <a href="#form">{"<"}</a>
      </button>
    </div>
  );
}

export default App;
