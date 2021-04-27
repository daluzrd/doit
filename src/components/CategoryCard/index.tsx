import React, { useEffect, useState } from "react";
import Category from "../../models/Category";
import { ReactComponent as Delete } from "../../assets/icons/delete_black.svg";
import Task from "../../models/Task";
import TaskList from "../TaskList";
import styles from "./categoryCard.module.scss";

type CategoryCardProps = {
	category: Category;
	taskList: Task[];
	handleAddCategory: () => void;
	handleChangeCategoryTitle: (
		id: number,
		title: string,
		isNew: boolean
	) => void;
	handleDeleteCategory: (id: number) => void;
	handleDeleteTask: (id: number) => void;
};

export default function CategoryCard(props: CategoryCardProps) {
	const id = props.category.id;
	const [title, setTitle] = useState(props.category.title);
	let isNew = props.category.isNew;

	const _handleChangeTitle = (value: string): void => setTitle(value);

	const _handleDeleteCategory = () => props.handleDeleteCategory(id);

	const _handleInputBlurOrSubmit = (): void => {
		if (title === "") {
			if (isNew) _handleDeleteCategory();
			else setTitle(props.category.title);
			return;
		} else {
			changeTitle();
		}
	};

	const changeTitle = (): void => {
		if (isNew) {
			isNew = false;
			props.handleAddCategory();
		}
		props.handleChangeCategoryTitle(id, title, isNew);
	};

	useEffect(() => {
		let element: NodeListOf<HTMLInputElement> = document.querySelectorAll(
			".categoryTitle"
		);
		if (element.length > 0 && element[element.length - 1].value === "") {
			element[element.length - 1].focus();
		}
	}, []);

	return (
		<li
			className={styles.categoryCard + " categoryCard"}
			data-id={`category${id}`}
		>
			<button
				type="button"
				onClick={(event) => {
					event.preventDefault();
					_handleDeleteCategory();
				}}
			>
				<Delete />
			</button>
			<form
				onSubmit={(event) => {
					event.preventDefault();
					event.stopPropagation();
					if (title !== "") _handleInputBlurOrSubmit();
				}}
			>
				<input
					className="categoryTitle"
					value={title}
					onChange={(event) => {
						event.preventDefault();
						_handleChangeTitle(event.target.value);
					}}
					onBlur={(event) => {
						event.preventDefault();
						_handleInputBlurOrSubmit();
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
