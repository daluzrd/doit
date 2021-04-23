export default class task {
  id!: number;
  task!: string;
  idCategoria!: number;

  constructor(id: number, task: string, idCategoria: number) {
    this.id = id;
    this.task = task;
    this.idCategoria = idCategoria;
  }
}
