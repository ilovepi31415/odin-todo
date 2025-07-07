import "./style.css";
import dots from "./icons/dots-vertical.svg";

const ADDTASK = document.querySelector(".add-task");
const TASKCONTAINER = document.querySelector(".container");

ADDTASK.addEventListener("click", () => {
	const newTask = Task();
	newTask.initializeTask();
});

function Task() {
	// intiailizes a task
	const initializeTask = () => {
		console.log("click");
		const task = document.createElement("div");
		task.classList.add("task");

		const title = document.createElement("div");
		title.classList.add("title");
		title.innerText = "Title";

		const description = document.createElement("div");
		description.classList.add("description");
		description.innerText = "Description";

		const dueDate = document.createElement("div");
		dueDate.classList.add("due-date");
		dueDate.innerText = "01/01/2025";

		const priority = document.createElement("div");
		priority.classList.add("priority");
		priority.innerText = "High Priority";

		const settings = document.createElement("div");
		const dotImage = document.createElement("img");
		settings.classList.add("settings");
		dotImage.src = dots;

		task.appendChild(title);
		task.appendChild(description);
		task.appendChild(dueDate);
		task.appendChild(priority);
		task.appendChild(settings);
		settings.appendChild(dotImage);
		TASKCONTAINER.appendChild(task);
	};
	// change priority
	// delete task

	return { initializeTask };
}

function Renderer() {
	// Write setup form to screen
	// Write tasks to screen
}
