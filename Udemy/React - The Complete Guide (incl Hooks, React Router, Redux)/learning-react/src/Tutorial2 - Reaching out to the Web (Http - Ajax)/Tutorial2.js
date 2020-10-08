import React, { Component } from "react";
import axios from "axios";

import Blog from "./containers/Blog/Blog";

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";
axios.defaults.headers.common["Authorization"] = "AUTH TOKEN";
axios.defaults.headers.post["Content-Type"] = "application/json";

axios.interceptors.request.use(
  (request) => {
    console.log("request", request);
    // You Can Edit Request Here
    return request;
  },
  (error) => {
    console.error(error);
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    console.log("response", response);
    // You Can Edit Response Here
    return response;
  },
  (error) => {
    console.error(error);
    return Promise.reject(error);
  }
);

/*
// Removing Interceptors

// You learned how to add an interceptor, getting rid of one is also easy. Simply store the reference to the interceptor in a variable and call eject  with that reference as an argument, to remove it (more info: https://github.com/axios/axios#interceptors):
var myInterceptor = axios.interceptors.request.use(function () { ... });
axios.interceptors.request.eject(myInterceptor);
*/

class App extends Component {
  render() {
    return (
      <div className="App">
        <Blog />
      </div>
    );
  }
}

export default App;
