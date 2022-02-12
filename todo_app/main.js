import {TaskList} from "./todos.js"


let taskList = new TaskList();
const todoUlElement = document.getElementById("todo-item-list");
window.addEventListener('load', (event) => {
    taskList.renderTaskList(todoUlElement, 'all');
    taskList.registerCallbacks();

    const allTasksButton = document.getElementById("all");
    const activeTasksButton = document.getElementById("active");
    const completedTasksButton = document.getElementById("completed");
    
    allTasksButton.addEventListener('click', () => {
        taskList.renderTaskList(todoUlElement, 'all');
    });
    activeTasksButton.addEventListener('click', () => {
        taskList.renderTaskList(todoUlElement, 'active');
    });
    completedTasksButton.addEventListener('click', () => {
        taskList.renderTaskList(todoUlElement, 'completed');
    });
});
    
