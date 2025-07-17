import "./style.css";
import dots from "./icons/dots-vertical.svg";
import plus from "./icons/plus.svg";

const ADDPROJECT = document.querySelector(".add-task");
const BTNPOSITIVE = document.querySelector("#btn-positive");
const BTNNEGATIVE = document.querySelector("#btn-negative");
const PROJECTCONTAINER = document.querySelector(".project-container");
const TASKMODAL = document.querySelector("#modal-task");
const TASKFORM = document.querySelector("#form-task");
const PROJECTMODAL = document.querySelector("#modal-project");
const PROJECTFORM = document.querySelector("#form-project");
const RENDERER = Renderer();
let selectedID;

ADDPROJECT.addEventListener("click", () => {
	PROJECTMODAL.showModal();
});

function Project() {
	const initializeProject = (name) => {
		const ID = crypto.randomUUID();
		RENDERER.renderProject(name, ID);
	};

	return { initializeProject };
}

function Task() {
	// intiailizes a task
	const initializeTask = (title, description, dueDate, priority) => {
		const ID = crypto.randomUUID();
		const selectedProject = document
			.querySelector("[data-id=" + CSS.escape(selectedID) + "]")
			.querySelector(".container");

		RENDERER.renderTask(
			selectedProject,
			title,
			description,
			dueDate,
			priority,
			ID
		);
	};

	return { initializeTask };
}

function Renderer() {
	// Write setup form to screen
	const renderTask = (container, title, description, dueDate, priority, ID) => {
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
			RENDERER.setButton(BTNPOSITIVE, "Save");
			RENDERER.setButton(BTNNEGATIVE, "Delete");
			RENDERER.editTask(ID);
		});

		TASK.appendChild(TITLE);
		TASK.appendChild(DESCRIPTION);
		TASK.appendChild(DUEDATE);
		TASK.appendChild(PRIORITY);
		TASK.appendChild(SETTINGS);
		SETTINGS.appendChild(DOTIMAGE);
		container.insertBefore(TASK, container.querySelector(".con"));
	};
	// Write tasks to screen

	const deleteTask = (id) => {
		const badTask = document.querySelector("[data-id=" + CSS.escape(id) + "]");
		PROJECTCONTAINER.removeChild(badTask);
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

		TASKMODAL.querySelector("#task-title").value = info.title;
		TASKMODAL.querySelector("#description").value = info.description;
		TASKMODAL.querySelector("#due-date").value = info.dueDate;
		TASKMODAL.querySelector("#priority").value = info.priority;
		TASKMODAL.showModal();
		deleteTask(id);
	};

	const setButton = (btn, message) => {
		btn.innerText = message;
	};

	const renderProject = (name, ID) => {
		const PROJECT = document.createElement("div");
		PROJECT.classList.add("project");
		PROJECT.dataset.id = ID;

		const TITLE = document.createElement("div");
		TITLE.classList.add("title");
		TITLE.innerText = name;

		const CONTAINER = document.createElement("div");
		CONTAINER.classList.add("container");

		const ADD = document.createElement("div");
		ADD.classList.add("task-button");
		const ADDIMG = document.createElement("img");
		ADDIMG.classList.add("addimg");
		ADDIMG.src = plus;
		ADDIMG.addEventListener("click", () => {
			RENDERER.setButton(BTNPOSITIVE, "Create");
			RENDERER.setButton(BTNNEGATIVE, "Cancel");
			selectedID = ID;
			TASKMODAL.showModal();
		});

		PROJECT.appendChild(TITLE);
		PROJECT.appendChild(CONTAINER);
		ADD.appendChild(ADDIMG);
		PROJECT.appendChild(ADD);
		PROJECTCONTAINER.appendChild(PROJECT);
	};

	const resetTaskModal = () => {
		TASKMODAL.querySelector("#task-title").value = "";
		TASKMODAL.querySelector("#description").value = "";
		TASKMODAL.querySelector("#due-date").value = "";
		TASKMODAL.querySelector("#priority").value = "low";
	};

	const resetProjectModal = () => {
		PROJECTMODAL.querySelector("#project-title").value = "";
	};

	return {
		renderTask,
		editTask,
		deleteTask,
		setButton,
		renderProject,
		resetTaskModal,
		resetProjectModal,
	};
}

TASKFORM.addEventListener("submit", (e) => {
	e.preventDefault();
	TASKMODAL.close();

	let title = TASKFORM.querySelector("#task-title").value;
	let description = TASKFORM.querySelector("#description").value;
	let dueDate = TASKFORM.querySelector("#due-date").value;
	let priority = TASKFORM.querySelector("#priority").value;

	RENDERER.resetTaskModal();

	const newTask = Task();
	newTask.initializeTask(title, description, dueDate, priority);
});

PROJECTFORM.addEventListener("submit", (e) => {
	e.preventDefault();
	PROJECTMODAL.close();

	let title = PROJECTFORM.querySelector("#project-title").value;

	RENDERER.resetProjectModal();

	const newProject = Project();
	newProject.initializeProject(title);
});

BTNNEGATIVE.addEventListener("click", () => {
	TASKMODAL.close();
	RENDERER.resetTaskModal();
});
