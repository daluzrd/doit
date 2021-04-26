import React from "react";
import Category from "../../models/Category";
import CategoryCard from "../CategoryCard";
import Task from "../../models/Task";
import styles from "./categoryList.module.scss";
import AddIcon from "@material-ui/icons/Add";

type CategoryListProps = {
	categoryList: Category[];
	handleAddCategory: () => void;
	handleDeleteTask: (id: number) => void;
	handleDeleteCategory: (id: number) => void;
	handleChangeCategoryTitle: (
		id: number,
		title: string,
		isNew: boolean
	) => void;
	taskList: Task[];
};

export default function CategoryList(props: CategoryListProps) {
	return (
		<section className={styles.categoryList}>
			<ul>
				{props.categoryList.map((category) => {
					return (
						<CategoryCard
							key={`category${category.id}`}
							category={category}
							handleChangeCategoryTitle={props.handleChangeCategoryTitle}
							handleDeleteCategory={props.handleDeleteCategory}
							handleDeleteTask={props.handleDeleteTask}
							handleAddCategory={props.handleAddCategory}
							taskList={props.taskList}
						/>
					);
				})}
			</ul>
			<button
				type="button"
				title="Nova categoria"
				onClick={(event): void => {
					event.preventDefault();
					props.handleAddCategory();
				}}
			>
				+
			</button>
		</section>
	);
}
