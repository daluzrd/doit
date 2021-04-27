import TaskServices from "../../services/taskServices";

export default class dragAndDropTask {
	taskCards!: NodeListOf<HTMLElement>;
	categoryCards!: NodeListOf<HTMLElement>;
	services!: TaskServices;

	constructor() {
		this.taskCards = document.querySelectorAll(".taskCard");
		this.categoryCards = document.querySelectorAll(".categoryCard");

		this.services = new TaskServices();
	}

	handleDragStart(event: DragEvent, taskCard: HTMLElement) {
		taskCard.classList.add("isDragging");

		const taskId = taskCard.getAttribute("data-id");

		if (event.dataTransfer && taskId) {
			event.dataTransfer.setData("text/plain", taskId.replace("task", ""));
		}
	}

	handleDragEnd(event: Event, taskCard: HTMLElement) {
		taskCard.classList.remove("isDragging");
	}

	handleDragOver(event: Event, categoryCard: HTMLElement) {
		const taskCard: HTMLElement | null = document.querySelector(".isDragging");

		if (taskCard) {
			categoryCard.style.background = "red";
			taskCard.style.display = "none";
		}

		event.preventDefault();
	}

	handleDrop(event: DragEvent, categoryCard: HTMLElement) {
		let taskId: string;
		let categoryId: string | null;

		if (event.dataTransfer) {
			taskId = event.dataTransfer.getData("text/plain");

			categoryId = categoryCard.getAttribute("data-id");
			if (taskId && categoryId)
				this.services.alterCategoryId(
					Number(taskId),
					Number(categoryId.replace("category", ""))
				);
		}
	}

	addEvents() {
		this.taskCards.forEach((taskCard) => {
			taskCard.addEventListener("dragstart", (event) => {
				this.handleDragStart(event, taskCard);
			});
			taskCard.addEventListener("dragend", (event) => {
				this.handleDragEnd(event, taskCard);
			});
		});

		this.categoryCards.forEach((categoryCard) => {
			categoryCard.addEventListener("dragenter", (event) => {
				event.preventDefault();
			});
			categoryCard.addEventListener("dragover", (event) => {
				this.handleDragOver(event, categoryCard);
			});
			categoryCard.addEventListener("drop", (event) => {
				this.handleDrop(event, categoryCard);
			});
		});
	}
}
