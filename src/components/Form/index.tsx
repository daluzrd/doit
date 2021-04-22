import React, { useEffect, useState } from "react";
import Category from "../../data/Category";
import Task from "../../data/Task";
import style from "./form.module.scss";

type formProps = {
	categoryList: Category[];
	handleFormSubmit: (task: Task, id: number) => void;
};

export default function Form(props: formProps) {
	const categoryList = props.categoryList;

	const [category, setCategory] = useState(0);
	const [title, setTitle] = useState("");
	const [isSubmitted, setIsSubmitted] = useState(false);

	function _handleChangeCategory(value: number) {
		setCategory(value);
	}

	function _handleChangeTitle(value: string): void {
		setTitle(value);
	}

	function _handleSubmit(): void {
		setIsSubmitted(true);
	}

	useEffect(() => {
		if (isSubmitted && categoryList.length > 0) {
			debugger;
			props.handleFormSubmit(new Task(title), category);
			setIsSubmitted(false);
		}
	}, [isSubmitted]); //eslint-disable-line

	return (
		<form
			className={style.form}
			onSubmit={(event) => {
				event.preventDefault();
				event.stopPropagation();
				_handleSubmit();
			}}
		>
			<label htmlFor="categories">Categorias</label>
			<select
				name="categories"
				onChange={(event) => {
					event.preventDefault();
					_handleChangeCategory(event.target.selectedIndex);
				}}
			>
				{categoryList.map((category: Category, index: number) => {
					return (
						<option key={index} value={index}>
							{category.title}
						</option>
					);
				})}
			</select>

			<label htmlFor="title">Tarefa</label>
			<textarea
				name="title"
				value={title}
				rows={5}
				onChange={(event) => {
					event.preventDefault();
					_handleChangeTitle(event.target.value);
				}}
			></textarea>

			<button type="submit">Cadastrar</button>
		</form>
	);
}
