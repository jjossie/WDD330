const links = [
    {
        label: "Week 1 Notes",
        url: "week1/index.html"
    },
    {
        label: "Week 1 Code Exercises",
        url: "week1/exercises.js"
    },
    {
        label: "Week 2 Reading & Exercises",
        url: "week2/exercises.html"
    }, 
    {
        label: "Week 2 Team Activity",
        url: "week2/teamactivity.html"
    },
    {
        label: "Week 3 Reading",
        url: "week3/notes.html"
    },
    {
        label: "Week 4 Exercises",
        url: "week4/exercises.html"
    },
    {
        label: "Week 5 Exercises",
        url: "week5/exercises.html"
    },
    {
        label: "To-Do List App",
        url: "todo_app/index.html"
    },
    {
        label: "Week 7 Exercises",
        url: "week7/index.html"
    },
    {
        label: "Week 8 Exercises",
        url: "week8/exercises/index.html"
    },
    {
        label: "Week 9 Notes",
        url: "week9/exercises.html"
    },
    {
        label: "Week 10 Notes",
        url: "week10/exercises.html"
    }, 
    {
        label: "Final Project / Challenge Two (HangApp)",
        url: "hang_app/presentation.html"
    }
]

function populateLinks(){
    let linkList = document.getElementById("linkList");
    links.forEach(link => {
        linkList.innerHTML += `<li class='portfolioLink'><a href='${link.url}'>${link.label}</a></li>`;
    });
}

populateLinks();