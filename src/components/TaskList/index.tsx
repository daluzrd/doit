import { Key } from "node:readline";
import React from "react";
import Task from "../../data/Task";
import TaskCard from "../TaskCard";
import styles from "./taskList.module.scss";

type PropsTaskListType = {
	taskList: Task[];
};

export default function TaskList(props: PropsTaskListType) {
	const taskList = props.taskList;

	return (
		<ul className={styles.taskList}>
			{taskList.map((task: Task, index: number) => {
				return <TaskCard task={task} key={index} />;
			})}
		</ul>
	);
}
