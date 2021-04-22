import { Key } from "node:readline";
import * as React from "react";
import Task from "../../data/Task";
import styles from "./taskCard.module.scss";

type PropsTaskCardType = {
	task: Task;
	key: number;
};

export default function TaskCard(props: PropsTaskCardType) {
	const task = props.task.task;

	return (
		<li className={styles.taskCard}>
			<button>X</button>

			<p>{task}</p>
		</li>
	);
}
