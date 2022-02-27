drawPattern();

function drawPattern() {
    let canvas = document.getElementById("myCanvas");
    let context = canvas.getContext("2d");
    context.strokeStyle = "red";

    let img = new Image();
    img.src = "blue_grass_reduced.png";
    img.onload = () => {
        context.fillStyle = context.createPattern(img, "repeat");
        context.fillRect(0, 0, 1000, 1000);
        context.strokeRect(0, 0, 1000, 1000);
    }

}
