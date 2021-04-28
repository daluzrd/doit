import React, { useEffect, useRef } from "react";
import Task from "../../models/Task";
import TaskCard from "../TaskCard";
import styles from "./taskList.module.scss";

type TaskListProps = {
  handleDragTaskList: {
    handleDragStart: (event: Event, taskCard: Element) => void;
    handleDragEnd: (taskCard: Element) => void;
  };
  handleDeleteTask: (id: number) => void;
  idCategory: number;
  taskList: Task[];
};

export default function TaskList(props: TaskListProps) {
  const taskListRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (taskListRef.current)
      for (let taskCard of taskListRef.current.children) {
        taskCard.addEventListener("dragstart", (event) => {
          props.handleDragTaskList.handleDragStart(event, taskCard);
        });
        taskCard.addEventListener("dragend", () => {
          props.handleDragTaskList.handleDragEnd(taskCard);
        });
      }
  }, [props.taskList]);

  return (
    <ul className={styles.taskList} ref={taskListRef}>
      {props.taskList
        .filter((task) => task.idCategoria === props.idCategory)
        .map((task) => {
          return (
            <TaskCard
              key={`task${task.id}`}
              task={task}
              handleDeleteTask={props.handleDeleteTask}
            />
          );
        })}
    </ul>
  );
}
