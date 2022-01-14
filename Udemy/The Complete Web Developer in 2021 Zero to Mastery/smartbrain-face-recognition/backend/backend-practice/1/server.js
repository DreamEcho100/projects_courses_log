/*
const http = require("http");
// in package.json add "type": "module", import http from "http";

const server = http.createServer((request, response) => {

  // console.log("I hear you thanks for calling :)");

  // console.log("headers", request.headers);
  // console.log("method", request.method);
  // console.log("url", request.url);
  // response.setHeader("Content-Type", "text/html");
  // response.end("<h1>Hello World!</h1>");

  const user = {
    name: "John",
    hobby: "Skating"
  }
  response.setHeader("Content-Type", "application/json");
  response.end(JSON.stringify(user));
});

server.listen(3000);
*/
const express = require('express');

const app = express();

/*
    app.use(bodyparser.urlencoded({extended: false}));
    app.use(bodyparser.json());

If you are using Express 4.16+ you can now replace that with:

    app.use(express.urlencoded({extended: false}));
    app.use(express.json());
*/
let temp = "Not tested";
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use((request, response, next) => {
  console.log("I hear you from the medlware, thanks for calling :)");
  next();
});

app.get("/", (request, response) => {

  // console.log(request.query);
  // http://..../?name=lee&&age=27
  // { name: 'lee', age: '27' }

  // console.log(request.headers);
  // -> postman -> headers -> key "ro" & value value "ot"
  // {
  //   ro: 'ot',
  //   'content-type': 'application/json',
  //   'user-agent': 'PostmanRuntime/7.26.8',
  //   accept: '*/*',
  //   'postman-token': '',
  //   host: 'localhost:3000',
  //   'accept-encoding': 'gzip, deflate, br',
  //   connection: 'keep-alive',
  //   'content-length': '90'
  // }

  // console.log(request.body);

  response.send("<h1>Getting Root</h1>");
});

app.get("/:id&:text", (request, response) => {
  // console.log(request.params);
  // -> postman -> http://..../1234&etc...
  // { id: '1234', etc: 'etc...' }

  response.send("<h1>Getting :id&:text</h1>");
  // response.status(404).send("<h1>Not Found!</h1>");
});

app.get("/profile", (request, response) => {
  console.log(temp);
  response.send("<h1>Getting Profile</h1>");
});

app.post("/profile", (request, response) => {
  console.log(request.body);
  temp = `${request.body.temp}`;
  const user = {
    name: "John",
    hobby: "Skating", 
    temp: `${request.body.temp}`
  }

  response.send(user);
});

app.listen(3000);
