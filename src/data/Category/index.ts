import Task from "../Task";

export default class Category {
	id!: number;
	title!: string;
	taskList!: Task[];

	constructor(id: number = 0, title: string = "", taskList: Task[] = []) {
		this.id = id;
		this.title = title;
		this.taskList = taskList;
	}

	getCategoryList(): Category[] {
		let localStorageCategoryList: string | null = localStorage.getItem(
			"doit.categoryList"
		);
		if (localStorageCategoryList === null) return [];
		return JSON.parse(localStorageCategoryList);
	}

	saveCategoryList(categoryList: Category[]): void {
		localStorage.setItem("doit.categoryList", JSON.stringify(categoryList));
	}
}
