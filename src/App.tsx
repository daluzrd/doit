import React, { useEffect, useState } from "react";
import CategoryList from "./components/CategoryList";
import Form from "./components/Form";
import CategoryServices from "./services/categoryServices";
import TaskServices from "./services/taskServices";
import styles from "./styles/app.module.scss";

function App() {
	const categoryServices = new CategoryServices();
	const taskServices = new TaskServices();

	const [categoryList, setCategoryList] = useState(
		categoryServices.getCategoryList()
	);
	const [taskList, setTaskList] = useState(taskServices.getTaskList());
	const [formWasSubmitted, setFormWasSubmitted] = useState(false);

	const handleAddCategory = (): void => {
		setCategoryList(categoryServices.addCategory());
	};

	const handleChangeCategoryTitle = (
		id: number,
		title: string,
		isNew: boolean
	): void => {
		setCategoryList(categoryServices.updateCategory(id, title, isNew));
	};

	const handleDeleteCategory = (id: number): void => {
		setCategoryList(categoryServices.deleteCategory(id));

		taskList
			.filter((task) => task.idCategoria === id)
			.forEach((task) => handleDeleteTask(task.id));

		setTaskList(taskServices.getTaskList());
	};

	const handleDeleteTask = (id: number): void => {
		setTaskList(taskServices.deleteTask(id));
	};

	useEffect(() => {
		if (formWasSubmitted) {
			setTaskList(taskServices.getTaskList);
			setFormWasSubmitted(false);
		}
	}, [formWasSubmitted]); //eslint-disable-line

	useEffect(() => {
		dragAndDropTask();
	});

	const dragAndDropTask = () => {
		const taskCards: NodeListOf<HTMLElement> = document.querySelectorAll(
			".taskCard"
		);
		const categoryCards: NodeListOf<HTMLElement> = document.querySelectorAll(
			".categoryCard"
		);
		const services = new TaskServices();

		const handleDragStart = (event: DragEvent, taskCard: HTMLElement) => {
			taskCard.classList.add("isDragging");

			const taskId = taskCard.getAttribute("data-id");

			if (event.dataTransfer && taskId) {
				event.dataTransfer.setData("text/plain", taskId.replace("task", ""));
			}
		};

		const handleDragEnd = (taskCard: HTMLElement) => {
			taskCard.classList.remove("isDragging");
			taskCard.style.display = "grid";
		};

		const handleDragOver = (event: Event, categoryCard: HTMLElement) => {
			const taskCard: HTMLElement | null = document.querySelector(
				".isDragging"
			);

			if (taskCard) {
				categoryCard.style.background = "var(--purple-600)";
				taskCard.style.display = "none";
			}

			event.preventDefault();
		};

		const handleDrop = (event: DragEvent, categoryCard: HTMLElement) => {
			let taskId: string;
			let categoryId: string | null;

			if (event.dataTransfer) {
				taskId = event.dataTransfer.getData("text/plain");

				categoryId = categoryCard.getAttribute("data-id");
				if (taskId && categoryId)
					setTaskList(
						services.alterCategoryId(
							Number(taskId),
							Number(categoryId.replace("category", ""))
						)
					);
				categoryCard.style.background = "var(--gray-100)";
			}
		};

		const handleDragLeave = (categoryCard: HTMLElement) => {
			categoryCard.style.background = "var(--gray-100)";
		};

		taskCards.forEach((taskCard) => {
			taskCard.addEventListener("dragstart", (event) => {
				handleDragStart(event, taskCard);
			});
			taskCard.addEventListener("dragend", () => {
				handleDragEnd(taskCard);
			});
		});

		categoryCards.forEach((categoryCard) => {
			categoryCard.addEventListener("dragenter", (event) => {
				event.preventDefault();
			});
			categoryCard.addEventListener("dragover", (event) => {
				handleDragOver(event, categoryCard);
			});
			categoryCard.addEventListener("dragleave", () => {
				handleDragLeave(categoryCard);
			});
			categoryCard.addEventListener("drop", (event) => {
				handleDrop(event, categoryCard);
			});
		});
	};

	return (
		<div className={styles.app}>
			<section id={"form"} className={styles.form}>
				<Form
					categoryList={categoryList}
					setFormWasSubmitted={setFormWasSubmitted}
				/>
			</section>
			<section className={styles.categoryList}>
				<CategoryList
					categoryList={categoryList}
					handleAddCategory={handleAddCategory}
					handleDeleteCategory={handleDeleteCategory}
					handleDeleteTask={handleDeleteTask}
					handleChangeCategoryTitle={handleChangeCategoryTitle}
					taskList={taskList}
				/>
			</section>
			<button className={"backtrackingButton"}>
				<a href="#form">{"<"}</a>
			</button>
		</div>
	);
}

export default App;
