import React, { useEffect, useState } from "react";
import CategoryList from "./components/CategoryList";
import Form from "./components/Form";
import Category from "./data/Category";
import Task from "./data/Task";
import styles from "./styles/app.module.scss";

function App() {
	const category = new Category();
	const [categoryList, setCategoryList] = useState(category.getCategoryList());

	const handleFormSubmit = (task: Task, id: number): void => {
		const newCategoryList = categoryList.slice();
		newCategoryList[id].taskList.push(task);

		category.saveCategoryList(newCategoryList);
		setCategoryList(category.getCategoryList);
	};

	const handleNewCategory = (): void => {
		let id;

		if (categoryList.length > 0)
			id = categoryList[categoryList.length - 1].id + 1;
		else id = 1;

		const newCategory = new Category(id);
		setCategoryList([...categoryList, newCategory]);
	};

	const handleCategoryCardDelete = (id: number): void => {
		setCategoryList(
			categoryList.filter((category, index) => {
				return index !== id;
			})
		);
	};

	const handleCategoryCardSubmit = (
		id: number,
		newCategory: Category
	): void => {
		const newCategoryList = categoryList.slice();
		newCategoryList.splice(id, 1, newCategory);

		setCategoryList(newCategoryList);
		category.saveCategoryList(newCategoryList);
	};

	useEffect(() => {
		console.log(categoryList);

		category.saveCategoryList(categoryList);
	}, [categoryList]); //eslint-disable-line

	return (
		<div className={styles.app}>
			<section className={styles.form}>
				<Form categoryList={categoryList} handleFormSubmit={handleFormSubmit} />
			</section>
			<section className={styles.categoryList}>
				<CategoryList
					categoryList={categoryList}
					handleNewCategory={handleNewCategory}
					handleCategoryCardDelete={handleCategoryCardDelete}
					handleCategoryCardSubmit={handleCategoryCardSubmit}
				/>
			</section>
		</div>
	);
}

export default App;
