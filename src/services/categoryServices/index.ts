import Category from "../../models/Category";

export default class categoryServices {
  _count!: number;
  constructor() {
    this._count = this.getCategoryList().length;
  }

  addCategory(): Category[] {
    const localStorageCategoryList: Category[] = this.getCategoryList();
    const title = "";

    let category: Category = new Category(this._getLastIndex() + 1, title);

    localStorageCategoryList.push(category);
    this._saveCategoryList(localStorageCategoryList);

    this._count++;

    return localStorageCategoryList;
  }

  deleteCategory(id: number): Category[] {
    let localStorageCategoryList: Category[] = this.getCategoryList();
    localStorageCategoryList = localStorageCategoryList.filter((category) => {
      return category.id !== id;
    });

    this._saveCategoryList(localStorageCategoryList);

    this._count--;

    return localStorageCategoryList;
  }

  getCategoryList(): Category[] {
    let localStorageCategoryList: string | null = localStorage.getItem(
      "doit.categoryList"
    );
    if (localStorageCategoryList === null) return [];
    return JSON.parse(localStorageCategoryList);
  }

  getCount(): number {
    return this._count;
  }

  _getLastIndex(): number {
    if (this._count > 0) {
      const localStorageCategoryList: Category[] = this.getCategoryList();
      return localStorageCategoryList[localStorageCategoryList.length - 1].id;
    }
    return 0;
  }

  _saveCategoryList(categoryList: Category[]): void {
    localStorage.setItem("doit.categoryList", JSON.stringify(categoryList));
  }

  updateCategory(id: number, title: string): Category[] {
    const localStorageCategoryList: Category[] = this.getCategoryList();
    for (let category in localStorageCategoryList) {
      if (localStorageCategoryList[category].id === id) {
        localStorageCategoryList[category].title = title;

        this._saveCategoryList(localStorageCategoryList);
        return localStorageCategoryList;
      }
    }
    throw new Error("Categoria não encontrada!");
  }
}
