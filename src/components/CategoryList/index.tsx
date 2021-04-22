import { title } from "node:process";
import React, { Key } from "react";
import Category from "../../data/Category";
import Task from "../../data/Task";
import CategoryCard from "../CategoryCard";
import styles from "./categoryList.module.scss";

type CategoryListType = {
	categoryList: Category[];
	handleNewCategory: () => void;
	handleCategoryCardSubmit: (id: number, newCategory: Category) => void;
	handleCategoryCardDelete: (id: number) => void;
};

export default function CategoryList(props: CategoryListType) {
	const categoryList = props.categoryList;

	const _handleNewCategory = (): void => {
		props.handleNewCategory();
	};

	return (
		<section className={styles.categoryList}>
			<ul>
				{categoryList.map((category: Category, index: number) => {
					return (
						<CategoryCard
							title={category.title}
							taskList={category.taskList}
							key={`${category.id}${category.title}`}
							id={index}
							handleCategoryCardDelete={props.handleCategoryCardDelete}
							handleCategoryCardSubmit={props.handleCategoryCardSubmit}
						/>
					);
				})}
			</ul>
			<button
				type="button"
				onClick={(event): void => {
					event.preventDefault();
					_handleNewCategory();
				}}
			>
				+
			</button>
		</section>
	);
}
