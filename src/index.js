import "./style.css";
import dots from "./icons/dots-vertical.svg";

const ADDTASK = document.querySelector(".add-task");
const TASKCONTAINER = document.querySelector(".container");
const MYTASKS = [];
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
		let priority = Math.floor(Math.random() * 3) + 1;
		const ID = crypto.randomUUID();
		MYTASKS.push(ID);

		RENDERER.renderNew(title, description, dueDate, priority, ID);
	};
	// change priority
	// delete task

	return { initializeTask };
}

function Renderer() {
	// Write setup form to screen
	const renderNew = (title, description, dueDate, priority, ID) => {
		const TASK = document.createElement("div");
		TASK.classList.add("task");
		let priorityMessage = "";
		switch (priority) {
			case 1:
				TASK.classList.add("high");
				priorityMessage = "High Priority";
				break;
			case 2:
				TASK.classList.add("medium");
				priorityMessage = "Medium Priority";
				break;
			case 3:
				TASK.classList.add("low");
				priorityMessage = "Low Priority";
				break;
		}

		TASK.dataset.id = ID;

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
		PRIORITY.innerText = priorityMessage;

		const SETTINGS = document.createElement("div");
		const DOTIMAGE = document.createElement("img");
		SETTINGS.classList.add("settings");
		DOTIMAGE.src = dots;

		DOTIMAGE.addEventListener("click", () => {
			RENDERER.deleteTask(ID);
		});

		TASK.appendChild(TITLE);
		TASK.appendChild(DESCRIPTION);
		TASK.appendChild(DUEDATE);
		TASK.appendChild(PRIORITY);
		TASK.appendChild(SETTINGS);
		SETTINGS.appendChild(DOTIMAGE);
		TASKCONTAINER.appendChild(TASK);
	};
	// Write tasks to screen

	const deleteTask = (id) => {
		const badTask = document.querySelector("[data-id=" + CSS.escape(id) + "]");
		TASKCONTAINER.removeChild(badTask);
	};

	return { renderNew, deleteTask };
}
