const TASK_LIST_KEY = "tasks";
const ADD_BUTTON_ID = "add-todo__button";
const ADD_TEXT_ID = "add-todo__text";

export class Task {
    constructor(name) {
        this.id = Date.now() * Math.floor(Math.random() * 100);
        this.name = name;
        this.completed = false;
        this.htmlId = `${this.id}-task`;
        this.deleteButtonId = `${this.id}-delete`;
        this.checkBoxId = `${this.id}-check`;
        console.log("Task created with id " + this.id)
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
        if (this.completed) {
            taskHTML.classList.add("todo-completed");
        }
        taskHTML.innerHTML = `
            <input type="checkbox" id="${this.checkBoxId}" class="todo-check"${this.completed ? "checked" : ""}>
            <span class="todo-name">${this.name}</span>
            <button id="${this.deleteButtonId}" class="todo-delete">X</button>
        `;
        return taskHTML;
    }
    getHTML() {
        return document.getElementById(this.htmlId);
    }
}

export class TaskList {
    // static nextId = 0;

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
        if (taskObjectArray != null) {
            this.tasks = taskObjectArray.map((simpleObject) => {
                return Task.loadFromObject(simpleObject);
            });
        }
    }

    getNumberTasksLeft() {
        return this.tasks.reduce((acc, task) => {
            return acc + ((!task.completed) ? 1 : 0);
        }, 0);
    }

    getFilteredTasks(filter) {
        return this.tasks
            .filter((task) => {
                if (filter == 'all')
                    return true;
                else if (filter == 'active')
                    return !task.completed;
                else if (filter == 'completed')
                    return task.completed;
                else
                    return true;
            });
    }

    renderTaskList(parentElement, filter) {
        parentElement.innerHTML = "";
        this.#loadFromStorage();
        this.getFilteredTasks(filter)
            .forEach((task) => {
                parentElement.appendChild(task.render());
            });
    }

    registerCallbacks(filter) {
        this.getFilteredTasks(filter)
            .forEach((task) => {
                let deleteButton = document.getElementById(task.deleteButtonId);
                deleteButton.addEventListener('click', () => {
                    this.deleteTask(task);
                    this.refreshRemainingTaskCount();
                });
                let checkbox = document.getElementById(task.checkBoxId);
                checkbox.addEventListener('change', () => {
                    task.completed = !task.completed;
                    let html = document.getElementById(task.htmlId);
                    html.classList.toggle("todo-completed");
                    this.#saveToStorage();
                    this.refreshRemainingTaskCount();
                });
            });
        document.getElementById(ADD_BUTTON_ID).addEventListener('click', () => {
            let taskName = document.getElementById(ADD_TEXT_ID).value;
            this.addTask(taskName);
            this.refreshRemainingTaskCount();
        });
    }

    refreshRemainingTaskCount() {
        const remaining = this.getNumberTasksLeft();
        if (remaining == 0){
            document.getElementById("all-done").style = "display: block";
        } else {
            document.getElementsByClassName("todo-list-footer__desc")[0].innerHTML = `${remaining} tasks left`;
            document.getElementById("all-done").style = "display: none";
        }
    }
}