const canvas = document.getElementById('canvas1');
const context = canvas.getContext('2d');
context.imageSmoothingEnabled = false;

canvas.width = innerWidth;
canvas.height = innerHeight;