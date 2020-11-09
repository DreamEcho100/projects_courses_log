const btn = document.querySelector("button");
const output = document.querySelector(".output");
//output.setAttribute("style", "width: 200px; height: 100px; color: whitesmoke; text-align: center;");
output.style.cssText = "width: 200px; height: 100px; color: whitesmoke; text-align: center;";

btn.addEventListener("click", showOutput);

function showOutput() {
    const date = new Date();
    let current = date.getHours();
    let message;
    if (current > 17) {
        message = "It's evening.";
        output.style.backgroundColor = "black";
    } else if (current > 12) {
        message = "It's afternoon.";
        output.style.backgroundColor = "blue";
    } else if (current > 0) {
        message = "It's morning.";
        output.style.backgroundColor = "orange";
    } else {
        message = "Something is wrong.";
        output.style.backgroundColor = "red";
    }
    output.innerHTML = `<h1>${message}</h1>`;
}