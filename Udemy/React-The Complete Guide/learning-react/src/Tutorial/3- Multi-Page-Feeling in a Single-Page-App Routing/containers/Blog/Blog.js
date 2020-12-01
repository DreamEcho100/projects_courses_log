import React, { Component } from "react";
import { Route, NavLink, Switch, withRouter } from "react-router-dom";

import "./Blog.css";
import Posts from "./Posts/Posts"
import NewPost from "./NewPost/NewPost";
import FullPost from "./FullPost/FullPost";

class Blog extends Component {

  render() {
    // console.log(this.props);
    return (
      <div className="Blog">
        <header>
          <nav>
            <ul>
              <li><NavLink 
                exact
                to="/"
                activeClassName="my-active"
                activeStyle={{
                  color: "#FA923F",
                  textDecoration: "underline"
                }}
              >Home</NavLink></li>
              <li><NavLink 
                exact
                activeClassName="selected"
                to={{
                  pathname: '/new-post',
                  hash: "#",
                  search: "?"
                }}
              >New Post</NavLink></li>
            </ul>
          </nav>
        </header>
        {/*<Route path="/" exact render={() => <h1>Home</h1>} />
        <Route path="/posts" exact render={() => <Posts />} />*/}
        <Route path="/" exact component={ Posts } />
        <Switch>
          <Route path="/new-post" exact component={ NewPost } />
          <Route path="/posts/:id" exact component={ FullPost } />
        </Switch>
        
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
export default withRouter(Blog);