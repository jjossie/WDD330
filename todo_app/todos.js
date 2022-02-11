export class Task {
    static nextId = 0;
    constructor(name) {
        this.id = ++Task.nextId;
        this.name = name;
        this.completed = false;
        this.save();
    }
    static loadFromObject(simpleObject) {
        // TODO null checking here
        if (simpleObject === null){
            return;
        }
        var newTask = new Task();
        newTask.id = simpleObject.id;
        newTask.name = simpleObject.name;
        newTask.completed = simpleObject.completed;
        return newTask;
    }
    complete() {
        this.completed = true;
        this.save();
    }
    incomplete() {
        this.completed = false;
        this.save();
    }
    save() {
        let storage = window.localStorage;
        storage.setItem(this.id, JSON.stringify(this));
    }
    delete(e) {
        console.log(`deleting ${this.id}-task`);
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
    render() {
        let taskHTML = document.createElement("li");
        taskHTML.id = `${this.id}-task`;
        taskHTML.classList.add("todo-item");
        taskHTML.classList.add("box");
        taskHTML.innerHTML = `
            <input type="checkbox" id="${this.id}-check" class="todo-check"${this.completed ? "checked" : ""}>
            (${this.id})<span class="todo-name">${this.name}</span>
            <button id="${this.id}-delete" class="todo-delete">X</button>
        `;
        return taskHTML;
    }
    /**
     * Adds event listeners for all appropriate actions for this object.
     */
    registerCallbacks() {
        let deleteButton = document.getElementById(`${this.id}-delete`);
        deleteButton.addEventListener('click', this.delete);
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
        task.save();
    }
    /**
     * Finds a task with a given ID and removes it both from this 
     * TaskList and from localStorage.
     * @param {*} id the ID of the task to be removed
     */
    deleteTask(id) {
        let task = this.tasks.find((task) => {
            console.log(`looking for ${id} - task id: ${task.id}`);
            return task.id === id;
        });
        if (task == null){
            return;
        }
        task.delete();
        // JavaScript doesn't include a function to remove a specific item from a pushed array, apparently, so:
        let taskIndex = this.tasks.indexOf(task);
        this.tasks.splice(taskIndex, 1);
        // Remove this ID from the list of IDs so we don't try to load it again
        let idIndex = this.taskIds.indexOf(id);
        this.taskIds.splice(idIndex, 1);
    }
    saveToStorage() {
        let storage = window.localStorage;
        this.tasks.forEach((task) => {
            task.save();
            this.taskIds.push(task.id);
        });
        storage.setItem("taskIds", JSON.stringify(this.taskIds));
    }
    loadFromStorage() {
        let storage = window.localStorage;
        let item = storage.getItem("taskIds");
        console.log(item);
        this.taskIds = JSON.parse(item);
        this.tasks = [];
        this.taskIds.forEach((id) => {
            const storageItem = storage.getItem(id);
            console.log(`storageItem: ${storageItem}`);
            const newObject = JSON.parse(storageItem);
            console.log(newObject);
            // TODO null checking here
            if (newObject !== null){
                const newTask = Task.loadFromObject(newObject);
                this.tasks.push(newTask);
            }
        });
        // console.log(`\n\n    Loaded tasks:    ${this.tasks}`);
    }
    renderTaskList() {
        let taskListHTML = document.createElement("ul");
        taskListHTML.id = "todo-item-list";
        this.tasks.forEach((task) => {
            // TODO null checking here
            taskListHTML.appendChild(task.render())
        })
        return taskListHTML;
    }
    registerCallbacks() {
        this.tasks.forEach((task) =>{
            task.registerCallbacks();
        });
    }
}