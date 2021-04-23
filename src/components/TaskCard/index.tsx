import React from "react";
import Task from "../../models/Task";
import styles from "./taskCard.module.scss";

type TaskCardProps = {
  handleDeleteTask: (id: number) => void;
  task: Task;
};

export default function TaskCard(props: TaskCardProps) {
  const task: Task = props.task;

  const _handleDeleteTask = (): void => {
    props.handleDeleteTask(task.id);
  };

  return (
    <li className={styles.taskCard}>
      <button
        onClick={(event) => {
          event.preventDefault();
          _handleDeleteTask();
        }}
      >
        X
      </button>
      <p>{task.task}</p>
    </li>
  );
}
