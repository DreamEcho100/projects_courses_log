#!/usr/bin/env node
console.log("Hello World!");
console.log("I was executed");

const debounce = require("lodash.debounce");
const chokidar = require("chokidar");

const start = debounce(() => {
  console.log("Starting user program.");
}, 100);

chokidar
  .watch(".")
  .on("add", () => start())
  .on("change", () => console.log("File Changed"))
  .on("unlink", () => console.log("File Unlink"));
