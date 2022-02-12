import {Task, TaskList} from "./todos.js"


let taskList = new TaskList();
const todoUlElement = document.getElementById("todo-item-list");
window.addEventListener('load', (event) => {
    taskList.renderTaskList(todoUlElement);
    taskList.registerCallbacks();
});

