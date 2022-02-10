export default class Task {
    constructor(name) {
        this.name = name;
        this.completed = false;
    }
    complete() {
        this.completed = true;
    }
    incomplete() {
        this.completed = false;
    }

    render() {
        let taskHTML = document.createElement("li");
        taskHTML.classList.add("todo-item");
        taskHTML.classList.add("box");
        taskHTML.innerHTML = `
            <input type="checkbox" class="todo-check"${this.completed ? "checked" : ""}>
            <span class="todo-name">${this.name}</span>
            <button class="todo-delete">X</button>
        `;
        
        return taskHTML;
    }
}

export class TaskList {
    constructor(){
        this.tasks = [];
    }
    addTask(name){
        let task = new Task(name);
        this.tasks.push(task);
    }
    renderTaskList(){
        let taskListHTML = document.createElement("ul");
        taskListHTML.id = "todo-item-list";
        this.tasks.forEach((task) => { 
            taskListHTML.appendChild(task.render())
        })
        return taskListHTML;
    }
}