import React from "react";
import Task from "../../models/Task";
import TaskCard from "../TaskCard";
import styles from "./taskList.module.scss";

type TaskListProps = {
  handleDeleteTask: (id: number) => void;
  idCategory: number;
  taskList: Task[];
};

export default function TaskList(props: TaskListProps) {
  return (
    <ul className={styles.taskList}>
      {props.taskList
        .filter((task) => task.idCategoria === props.idCategory)
        .map((task) => {
          return (
            <TaskCard task={task} handleDeleteTask={props.handleDeleteTask} />
          );
        })}
    </ul>
  );
}
