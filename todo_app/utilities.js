
/**
 * Callback function for deleting a task from the GUI
 */
TASK_LIST_KEY = "tasks";
task_list = [];

 function deleteTask(e) {
    // Delete it from localStorage first
    window.localStorage.removeItem(this.id);
    // Then try to remove the HTML 
    // const taskHTML = document.getElementById(`${this.id}-task`);
    const taskHTML = e.currentTarget.parentElement;
    console.log(taskHTML)
    if (taskHTML == null)
        return;
    taskHTML.remove();
}

function removeFromLocalStorage(task, list_of_tasks){
    task_list = task_list.filter((item) => {
        item.id != task.id
    });

}

function saveToLocalStorage(list_of_tasks){
    window.localStorage.setItem(TASK_LIST_KEY, list_of_tasks);
}

function loadFromLocalStorage(){
    return window.localStorage.getItem(TASK_LIST_KEY);
}