import React, { useState } from "react";
import Category from "../../models/Category";
import TaskServices from "../../services/taskServices";
import style from "./form.module.scss";

type FormProps = {
	categoryList: Category[];
	setFormWasSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Form(props: FormProps) {
	const categoryList = props.categoryList.filter(
		(category) => category.title !== ""
	);
	const taskServices = new TaskServices();

	const [idCategory, setIdCategory] = useState(1);
	const [task, setTask] = useState("");

	const _handleSubmit = (): void => {
		if (categoryList.length > 0) {
			if (task !== "") {
				taskServices.addTask(task, idCategory);
				props.setFormWasSubmitted(true);
				setTask("");
			} else document.querySelector(".form > textarea")?.classList.add("Error");
		} else console.log("Selecione uma categoria");
	};

	const _handleChangeIdCategoria = (value: number): void => {
		setIdCategory(value);
	};

	const _handleChangeTitle = (value: string): void => {
		setTask(value);
	};

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
					_handleChangeIdCategoria(Number(event.target.value));
				}}
			>
				{categoryList.map((category) => {
					return (
						<option key={`category${category.id}`} value={category.id}>
							{category.title}
						</option>
					);
				})}
			</select>

			<label htmlFor="title">Tarefa</label>
			<textarea
				name="title"
				value={task}
				rows={5}
				onChange={(event) => {
					event.preventDefault();
					_handleChangeTitle(event.target.value);
				}}
				onKeyUp={(event) => {
					event.preventDefault();
					if (event.ctrlKey && event.key === "Enter") _handleSubmit();
				}}
			></textarea>

			<button type="submit">Cadastrar</button>
		</form>
	);
}
