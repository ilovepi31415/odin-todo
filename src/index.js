import "./style.css";
import dots from "./icons/dots-vertical.svg";

const ADDTASK = document.querySelector(".add-task");
const TASKCONTAINER = document.querySelector(".container");
const MYTASKS = [];
const MODAL = document.querySelector(".modal");
const FORM = document.querySelector("#form");
const RENDERER = Renderer();

ADDTASK.addEventListener("click", () => {
	MODAL.showModal();
});

function Task() {
	// intiailizes a task
	const initializeTask = (title, description, dueDate, priority) => {
		const TITLE = title;
		const DESCRIPTION = description;
		const DUEDATE = dueDate;
		const PRIORITY = priority;
		const ID = crypto.randomUUID();

		RENDERER.renderNew(TITLE, DESCRIPTION, DUEDATE, PRIORITY, ID);
	};
	// change priority

	return { initializeTask };
}

function Renderer() {
	// Write setup form to screen
	const renderNew = (title, description, dueDate, priority, ID) => {
		const TASK = document.createElement("div");
		TASK.classList.add("task");
		let priorityMessage = "";
		switch (priority) {
			case "high":
				TASK.classList.add("high");
				priorityMessage = "High Priority";
				break;
			case "medium":
				TASK.classList.add("medium");
				priorityMessage = "Medium Priority";
				break;
			case "low":
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
			// RENDERER.deleteTask(ID);
			RENDERER.editTask(ID);
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

	const getInfo = (id) => {
		const task = document.querySelector("[data-id=" + CSS.escape(id) + "]");

		const title = task.querySelector(".title").innerText;
		const description = task.querySelector(".description").innerText;
		const dueDate = task.querySelector(".due-date").innerText;
		const priorityMessage = task.querySelector(".priority").innerText;

		const priority = priorityMessage
			.slice(0, priorityMessage.indexOf(" "))
			.toLowerCase();
		console.log(priority);

		return { title, description, dueDate, priority };
	};

	const editTask = (id) => {
		const info = getInfo(id);

		MODAL.querySelector("#title").value = info.title;
		MODAL.querySelector("#description").value = info.description;
		MODAL.querySelector("#due-date").value = info.dueDate;
		MODAL.querySelector("#priority").value = info.priority;
		MODAL.showModal();
		deleteTask(id);
	};

	return { renderNew, editTask, deleteTask };
}

FORM.addEventListener("submit", (e) => {
	e.preventDefault();
	MODAL.close();

	let title = document.querySelector("#title").value;
	let description = document.querySelector("#description").value;
	let dueDate = document.querySelector("#due-date").value;
	let priority = document.querySelector("#priority").value;

	MODAL.querySelector("#title").value = "";
	MODAL.querySelector("#description").value = "";
	MODAL.querySelector("#due-date").value = "";
	MODAL.querySelector("#priority").value = "low";

	const newTask = Task();
	newTask.initializeTask(title, description, dueDate, priority);
});
