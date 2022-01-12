const links = [
    {
        label: "Week 1 Notes",
        url: "week1/index.html"
    }
]

function populateLinks(){
    var linkList = document.getElementById("linkList");
    links.forEach(link => {
        linkList.innerHTML += "<li class='portfolioLink'>" + link.label + "</li>";
    });
}

populateLinks();