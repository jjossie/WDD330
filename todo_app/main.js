import {TaskList} from "./todos.js"


let taskList = new TaskList();
const todoUlElement = document.getElementById("todo-item-list");
window.addEventListener('load', (event) => {
    console.log("Page Loaded. Testing LocalStorage...");
    window.localStorage.setItem("test", "This is a test string saved in localStorage");
    console.log(window.localStorage.getItem("test"));
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
    
