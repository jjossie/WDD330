import {TaskList} from "./todos.js"

// let itemOne = new Task("frick witches")
// let itemTwo = new Task("get money")

// document.getElementById("todo-item-list").appendChild(itemOne.render())
// document.getElementById("todo-item-list").appendChild(itemTwo.render())

function display(list){
    let parent = document.getElementById("todo-list");
    let footer = document.getElementById("todo-list-footer");
    parent.insertBefore(list.renderTaskList(), footer);
}

let list = new TaskList();
list.addTask("pull up")
list.addTask("drank")
list.addTask("headshot")
list.addTask("drank")
list.addTask("stand up")
list.addTask("drank")
list.addTask("sit down")
list.addTask("drank")
list.addTask("wake up")
list.addTask("drank")
list.addTask("pass out")
list.addTask("faded")
list.addTask("drank")
list.addTask("faded")
list.addTask("drank")

list.saveToStorage();

list.loadFromStorage();

display(list);

list.deleteTask(12);

display(list);

list.deleteTask(4);

display(list);


// class ToDoList {
//     constructor(){
//         this.name = ""
//     }
// }