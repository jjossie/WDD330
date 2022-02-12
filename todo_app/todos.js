const TASK_LIST_KEY = "tasks";
const ADD_BUTTON_ID = "add-todo__button";
const ADD_TEXT_ID = "add-todo__text";

export class Task {
    static nextId = 0;
    constructor(name) {
        this.id = ++Task.nextId;
        this.name = name;
        this.completed = false;
        this.htmlId = `${this.id}-task`;
        this.deleteButtonId = `${this.id}-delete`;
        this.checkBoxId = `${this.id}-check`;
    }
    static loadFromObject(simpleObject) {
        // TODO null checking here
        if (simpleObject === null) {
            return;
        }
        var newTask = new Task();
        newTask.id = simpleObject.id;
        newTask.name = simpleObject.name;
        newTask.completed = simpleObject.completed;
        return newTask;
    }
    unrender() {
        // Delete this task's HTML element
        const taskHTML = this.getHTML();
        if (taskHTML == null)
            return;
        taskHTML.remove();
    }
    render() {
        let taskHTML = document.createElement("li");
        taskHTML.id = this.htmlId;
        taskHTML.classList.add("todo-item");
        taskHTML.classList.add("box");
        if (this.completed){
            taskHTML.classList.add("todo-completed");
        }
        taskHTML.innerHTML = `
            <input type="checkbox" id="${this.checkBoxId}" class="todo-check"${this.completed ? "checked" : ""}>
            (${this.id})<span class="todo-name">${this.name}</span>
            <button id="${this.deleteButtonId}" class="todo-delete">X</button>
        `;
        return taskHTML;
    }
    getHTML(){
        return document.getElementById(this.htmlId);
    }
}

export class TaskList {
    constructor() {
        this.tasks = [];
        this.taskIds = [];
    }
    /**
     * Creates a Task object, adds it to this taskList, and saves it.
     * @param {string} name 
     */
    addTask(name) {
        let task = new Task(name);
        this.tasks.push(task);
        this.#saveToStorage();
    }

    deleteTask(task) {
        // Remove from the display
        task.unrender();
        // Remove from storage
        this.tasks = this.tasks.filter((item) => {
            return item.id != task.id;
        });
        this.#saveToStorage();
    }
    #saveToStorage() {
        window.localStorage.setItem(TASK_LIST_KEY, JSON.stringify(this.tasks));
    }
    #loadFromStorage() {
        let taskObjectArray = JSON.parse(window.localStorage.getItem(TASK_LIST_KEY));
        this.tasks = taskObjectArray.map((simpleObject) =>{
            return Task.loadFromObject(simpleObject);
        });
    }
    getNumberTasksLeft(){
        return this.tasks.reduce((acc, task) =>{
            return acc + (!task.completed) ? 1 : 0;
        }, 0);
    }
    renderTaskList(parentElement, filter) {
        parentElement.innerHTML = "";
        this.#loadFromStorage();
        this.tasks
        .filter((task) => {
            if (filter == 'all')
                return true;
            else if (filter == 'active')
                return !task.completed;
            else if (filter == 'completed')
                return task.completed;
            else
                return true;
        })
        .forEach((task) => {
            parentElement.appendChild(task.render());
        });
    }
    registerCallbacks() {
        this.tasks.forEach((task) => {
            let deleteButton = document.getElementById(task.deleteButtonId);
            console.log(task.deleteButtonId);
            console.log(deleteButton);
            deleteButton.addEventListener('click', () => {
                this.deleteTask(task);
            });
            let checkbox = document.getElementById(task.checkBoxId);
            checkbox.addEventListener('change', () =>{
                task.completed = !task.completed;
                let html = document.getElementById(task.htmlId);
                html.classList.toggle("todo-completed");
                this.#saveToStorage();
            });
        });
        document.getElementById(ADD_BUTTON_ID).addEventListener('click', () =>{
            let taskName = document.getElementById(ADD_TEXT_ID).value;
            this.addTask(taskName);
        });
    }
}