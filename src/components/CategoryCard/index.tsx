import React, { useState } from "react";
import Category from "../../models/Category";
import Task from "../../models/Task";
import TaskList from "../TaskList";
import styles from "./categoryCard.module.scss";

type CategoryCardProps = {
  category: Category;
  taskList: Task[];
  handleChangeCategoryTitle: (id: number, title: string) => void;
  handleDeleteCategory: (id: number) => void;
  handleDeleteTask: (id: number) => void;
};

export default function CategoryCard(props: CategoryCardProps) {
  const id = props.category.id;
  const [title, setTitle] = useState(props.category.title);

  const _handleChangeTitle = (value: string) => {
    setTitle(value);
  };

  const _handleDeleteCategory = () => props.handleDeleteCategory(id);

  const changeTitle = (): void => {
    props.handleChangeCategoryTitle(id, title);
  };

  return (
    <li className={styles.categoryCard}>
      <button
        type="button"
        onClick={(event) => {
          event.preventDefault();
          _handleDeleteCategory();
        }}
      >
        X
      </button>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          event.stopPropagation();
          changeTitle();
        }}
      >
        <input
          value={title}
          onChange={(event) => {
            event.preventDefault();
            _handleChangeTitle(event.target.value);
          }}
          onBlur={(event) => {
            event.preventDefault();
            changeTitle();
          }}
        />
      </form>
      <TaskList
        idCategory={props.category.id}
        taskList={props.taskList}
        handleDeleteTask={props.handleDeleteTask}
      />
    </li>
  );
}
