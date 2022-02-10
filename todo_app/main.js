class Task {
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
        let item = document.createElement("li");
        item.classList.add("todo-item");
        item.classList.add("box");
        item.innerHTML = `
            <input type="checkbox" class="todo-check"${this.completed ? "checked" : ""}>
            <span class="todo-name">${this.name}</span>
            <button class="todo-delete">X</button>
        `;
        
        return item;
    }
}

let itemOne = new Task("frick witches")
let itemTwo = new Task("get money")

document.getElementById("todo-item-list").appendChild(itemOne.render())
document.getElementById("todo-item-list").appendChild(itemTwo.render())


// class ToDoList {
//     constructor(){
//         this.name = ""
//     }
// }