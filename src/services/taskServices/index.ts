import Task from "../../models/Task";

export default class taskServices {
  _count!: number;
  constructor() {
    this._count = this.getTaskList().length;
  }

  addTask(title: string, idCategoria: number): void {
    let localStorageTaskList: Task[] = this.getTaskList();
    let task: Task;

    task = new Task(this._getLastIndex() + 1, title, idCategoria);

    localStorageTaskList.push(task);
    this._saveTaskList(localStorageTaskList);

    this._count++;
  }

  deleteTask(id: number): Task[] {
    let localStorageTaskList: Task[] = this.getTaskList();
    localStorageTaskList = localStorageTaskList.filter((task) => {
      return task.id !== id;
    });

    this._saveTaskList(localStorageTaskList);

    this._count--;

    return localStorageTaskList;
  }

  getCategoriesTaskList(idCategoria: number): Task[] {
    return this.getTaskList().filter((task) => {
      return task.idCategoria === idCategoria;
    });
  }

  getTaskList(): Task[] {
    let localStorageTaskList: string | null = localStorage.getItem(
      "doit.taskList"
    );
    if (localStorageTaskList === null) return [];
    return JSON.parse(localStorageTaskList);
  }

  getCount(): number {
    return this._count;
  }

  _getLastIndex(): number {
    if (this._count > 0) {
      let localStorageTaskList: Task[] = this.getTaskList();
      return localStorageTaskList[localStorageTaskList.length - 1].id;
    }
    return 0;
  }

  _saveTaskList(taskList: Task[]): void {
    localStorage.setItem("doit.taskList", JSON.stringify(taskList));
  }
}
