// [...froggeyGameSection.querySelectorAll(".wrapper canvas")]
// Array.prototype.slice.call(froggeyGameSection.querySelectorAll(".wrapper canvas"))

//'source-over | copy | destination-in | destination-out | destination-over | lighter | source-atop | source-in | source-out | xor';
// ctx.globalCompositeOperation = "lighter";

const froggeyGameSection = document.getElementById("froggey-game");
const canvases = Array.from(froggeyGameSection.querySelectorAll(".wrapper canvas"));
const ctxs = canvases.map(ctx => ctx.getContext("2d"));
ctxs.forEach(ctx => {
    ctx.imageSmoothingEnabled = false;
    ctx.width = 600;
    ctx.height = 600;
});

/*window.addEventListener("resize", () => {
    
});*/