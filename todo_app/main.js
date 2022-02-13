import {TaskList} from "./todos.js"


let taskList = new TaskList();
const todoUlElement = document.getElementById("todo-item-list");
window.addEventListener('load', (event) => {
    refresh("all");
    
    const allTasksButton = document.getElementById("all");
    const activeTasksButton = document.getElementById("active");
    const completedTasksButton = document.getElementById("completed");
    
    allTasksButton.addEventListener('click', () => {
        refresh("all");
    });
    activeTasksButton.addEventListener('click', () => {
        refresh("active");
    });
    completedTasksButton.addEventListener('click', () => {
        refresh("completed")
    });
});

function refresh(filter){
    taskList.renderTaskList(todoUlElement, filter);
    taskList.registerCallbacks(filter);
}
    
