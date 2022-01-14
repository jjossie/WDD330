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
    }
]

function populateLinks(){
    let linkList = document.getElementById("linkList");
    links.forEach(link => {
        // linkList.innerHTML += "<li class='portfolioLink'>" + link.label + "</li>";
        linkList.innerHTML += `<li class='portfolioLink'><a href='${link.url}'>${link.label}</a></li>`;
    });
}

populateLinks();