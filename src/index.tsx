import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import dragAndDropTask from "./assets/utils/dragAndDropTask";
import "./styles/reset.css";
import "./styles/global.scss";
import "./styles/dragAndDrop.css";

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById("root")
);
new dragAndDropTask().addEvents();
