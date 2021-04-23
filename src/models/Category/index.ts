export default class category {
	id!: number;
	title!: string;
	isNew!: boolean;

	constructor(id: number, title: string) {
		this.id = id;
		this.title = title;
		this.isNew = true;
	}
}
