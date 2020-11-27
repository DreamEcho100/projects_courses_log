import React, { Component } from "react";
import Posts from "./Posts/Posts"
import { Route } from "react-router-dom";

import "./Blog.css";

class Blog extends Component {

  render() {

    return (
      <div className="Blog">
        <header>
          <nav>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/new-post">New Post</a></li>
              <li><a href="/posts">Posts</a></li>
            </ul>
          </nav>
        </header>
        <Route path="/" exact render={() => <h1>Home</h1>} />
        <Route path="/posts" exact render={() => <Posts />} />
        
      </div>
    );
  }
}
/* 
        <section>
          <FullPost id={this.state.selectedId} />
        </section>
        <section>
          <NewPost />
        </section>
*/
export default Blog;
