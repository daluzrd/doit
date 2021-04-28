import React, { DragEvent, useEffect, useRef } from "react";
import { ReactComponent as Add } from "../../assets/icons/add_black.svg";
import Category from "../../models/Category";
import CategoryCard from "../CategoryCard";
import Task from "../../models/Task";
import styles from "./categoryList.module.scss";

type CategoryListProps = {
  categoryList: Category[];
  handleAddCategory: () => void;
  handleDeleteTask: (id: number) => void;
  handleDeleteCategory: (id: number) => void;
  handleChangeCategoryTitle: (
    id: number,
    title: string,
    isNew: boolean
  ) => void;
  taskList: Task[];
  handleDragTaskList: {
    handleDragStart: (event: Event, taskCard: Element) => void;
    handleDragEnd: (taskCard: Element) => void;
  };
  handleDropCategoryList: {
    handleDragOver: (event: Event, categoryCard: Element) => void;
    handleDragLeave: (categoryCard: Element) => void;
    handleDrop: (event: Event, categoryCard: Element) => void;
  };
};

export default function CategoryList(props: CategoryListProps) {
  const categoryListRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (categoryListRef.current)
      for (let categoryCard of categoryListRef.current.children) {
        categoryCard.addEventListener("dragover", (event) => {
          props.handleDropCategoryList.handleDragOver(event, categoryCard);
        });
        categoryCard.addEventListener("dragleave", () => {
          props.handleDropCategoryList.handleDragLeave(categoryCard);
        });
        categoryCard.addEventListener("drop", (event) => {
          props.handleDropCategoryList.handleDrop(event, categoryCard);
        });
      }
  }, []);

  return (
    <section className={styles.categoryList}>
      <ul ref={categoryListRef}>
        {props.categoryList.map((category) => {
          return (
            <CategoryCard
              key={`category${category.id}`}
              category={category}
              handleChangeCategoryTitle={props.handleChangeCategoryTitle}
              handleDragTaskList={props.handleDragTaskList}
              handleDeleteCategory={props.handleDeleteCategory}
              handleDeleteTask={props.handleDeleteTask}
              handleAddCategory={props.handleAddCategory}
              taskList={props.taskList}
            />
          );
        })}
      </ul>
      <button
        type="button"
        title="Nova categoria"
        onClick={(event): void => {
          event.preventDefault();
          props.handleAddCategory();
        }}
      >
        <Add />
      </button>
    </section>
  );
}
