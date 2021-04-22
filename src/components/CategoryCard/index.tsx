import React, { useEffect, useState } from "react";
import Category from "../../data/Category";
import Task from "../../data/Task";
import TaskList from "../TaskList";
import styles from "./categoryCard.module.scss";

type PropsCategoryCardType = {
	title: string;
	taskList: Task[];
	id: number;
	handleCategoryCardDelete: (id: number) => void;
	handleCategoryCardSubmit: (id: number, newCategory: Category) => void;
};

export default function CategoryCard(props: PropsCategoryCardType) {
	const id = props.id;
	const [title, setTitle] = useState(props.title);
	const taskList = props.taskList;

	const _handleCategoryCardDelete = (): void => {
		props.handleCategoryCardDelete(id);
	};

	const _handleCategoryChangeTitle = (value: string) => {
		setTitle(value);
	};

	const _handleCategoryCardSubmit = (): void => {
		props.handleCategoryCardSubmit(id, new Category(id, title, taskList));
	};

	return (
		<li key={id} className={styles.categoryCard}>
			<button
				type="button"
				onClick={(event) => {
					event.preventDefault();
					_handleCategoryCardDelete();
				}}
			>
				X
			</button>
			<form
				onSubmit={(event) => {
					event.preventDefault();
					event.stopPropagation();
					_handleCategoryCardSubmit();
				}}
			>
				<input
					value={title}
					onChange={(event) => {
						event.preventDefault();
						_handleCategoryChangeTitle(event.target.value);
					}}
					onBlur={(event) => {
						event.preventDefault();
						_handleCategoryCardSubmit();
					}}
				/>
			</form>
			<TaskList taskList={taskList} />
		</li>
	);
}
