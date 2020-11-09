let body = document.querySelector("body");
let myBlock;
let myFunctionList;
let funList = [];
const movementArray = ["right", "left", "up", "down"];
document.addEventListener("DOMContentLoaded", () => {
    console.log("ready");
    myBlock = document.createElement("div");
    myBlock.textContent = "Hello world";
    myBlock.style.width = "100px";
    myBlock.style.height = "100px";
    myBlock.style.backgroundColor = "red";
    myBlock.style.color = "white";
    myBlock.style.lineHeight = "100px";
    myBlock.style.textAlign = "center";
    myBlock.style.position = "absolute";
    myBlock.style.top = "100px";
    myBlock.style.left = "150px";
    body.appendChild(myBlock);

    myFunctionList = document.createElement("div");
    body.appendChild(myFunctionList);

});

document.addEventListener("keydown", (event) => {
    event.preventDefault;
    let keyC = event.keyCode;
    let randomMove = movementArray[Math.floor(Math.random() * movementArray.length)];
    switch (keyC) {
        case 37:
            addFun("left");
            break;
        case 39:
            addFun("right");
            break;
        case 38:
            addFun("up");
            break;
        case 40:
            addFun("down");
            break;
        case 67:
            myBlock.style.backgroundColor = randomColor();
            myBlock.style.color = randomColor();
            break;
        case 82:
            addFun(randomMove);
            break;

    }
    if (keyC === 13 || keyC === 32) {
        mover();
    }
});

function mover() {
    if (funList.length > 0) {
        let current = myBlock.getBoundingClientRect();
        console.log(current);
        let el = funList.shift();
        let item = el.textContent.replace("+", "");
        myFunctionList.removeChild(el);
        myBlock.innerHTML = `Move: ${item}`;
        if (item === "left") {
            myBlock.style.left = `${current.left - current.width}px`;
        } else if (item === "right") {
            myBlock.style.left = `${current.left + current.width}px`;
        } else if (item === "up") {
            myBlock.style.top = `${current.top - current.height}px`;
        } else if (item === "down") {
            myBlock.style.top = `${current.top + current.height}px`;
        }
        setTimeout(mover, 300);
    } else {
        myBlock.innerHTML = "Set Path";
        return;
    }
}

function addFun(val) {
    let span = document.createElement("span");
    span.textContent = `+${val}`;
    span.style.padding = `10px`;
    span.style.border = `1px solid #ddd`;
    span.addEventListener("mouseover", function () {
        this.style.backgroundColor = "red";
        this.style.color = "white";
    });
    span.addEventListener("mouseout", function () {
        this.style.backgroundColor = "white";
        this.style.color = "black";
    });
    span.addEventListener("click", function () {
        let currentIndex = funList.indexOf(this);
        let currentRemovel = funList.splice(currentIndex, 1);
        console.log(currentRemovel);
        myFunctionList.removeChild(this);
    });
    myFunctionList.appendChild(span);
    funList.push(span);
    console.log(funList);

}

function randomColor() {
    let randomHexColor = `#${Math.random().toString(16).substr(-6)}`;
    console.log(randomHexColor);
    return randomHexColor;
}

function goLeft() {
    let temp = myBlock.offsetLeft;
    temp = temp - 50;
    myBlock.style.left = `${temp}px`
}

function goRight() {
    let temp = myBlock.offsetLeft;
    temp = temp + 50;
    myBlock.style.left = `${temp}px`
}

function goUp() {
    let temp = myBlock.offsetTop;
    temp = temp - 50;
    myBlock.style.top = `${temp}px`
}

function goDown() {
    let temp = myBlock.offsetTop;
    temp = temp + 50;
    myBlock.style.top = `${temp}px`
}