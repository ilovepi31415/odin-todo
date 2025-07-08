import "./style.css";
import dots from "./icons/dots-vertical.svg";

const ADDTASK = document.querySelector(".add-task");
const TASKCONTAINER = document.querySelector(".container");
const RENDERER = Renderer();

ADDTASK.addEventListener("click", () => {
	const newTask = Task();
	newTask.initializeTask();
});

function Task() {
	// intiailizes a task
	const initializeTask = () => {
		let title = "Title";
		let description = "Description";
		let dueDate = "01/01/2025";
		let priority = "High Priority";

		RENDERER.renderNew(title, description, dueDate, priority);
	};
	// change priority
	// delete task

	return { initializeTask };
}

function Renderer() {
	// Write setup form to screen
	const renderNew = (title, description, dueDate, priority) => {
		const TASK = document.createElement("div");
		TASK.classList.add("task");
		TASK.classList.add("high");

		const TITLE = document.createElement("div");
		TITLE.classList.add("title");
		TITLE.innerText = title;

		const DESCRIPTION = document.createElement("div");
		DESCRIPTION.classList.add("description");
		DESCRIPTION.innerText = description;

		const DUEDATE = document.createElement("div");
		DUEDATE.classList.add("due-date");
		DUEDATE.innerText = dueDate;

		const PRIORITY = document.createElement("div");
		PRIORITY.classList.add("priority");
		PRIORITY.innerText = priority;

		const SETTINGS = document.createElement("div");
		const DOTIMAGE = document.createElement("img");
		SETTINGS.classList.add("settings");
		DOTIMAGE.src = dots;

		TASK.appendChild(TITLE);
		TASK.appendChild(DESCRIPTION);
		TASK.appendChild(DUEDATE);
		TASK.appendChild(PRIORITY);
		TASK.appendChild(SETTINGS);
		SETTINGS.appendChild(DOTIMAGE);
		TASKCONTAINER.appendChild(TASK);
	};
	// Write tasks to screen

	return { renderNew };
}
