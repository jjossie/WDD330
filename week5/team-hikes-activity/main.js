import Hikes from "./hike.js";

let hikeList = new Hikes("hikes");
console.log(hikeList);

// hikeList.showOneHike("Teton Canyon");
hikeList.showHikeList();
hikeList.addHikeListener();