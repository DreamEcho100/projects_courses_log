import React, { Component, Suspense } from "react";
import { Route, NavLink, Switch, withRouter, Redirect } from "react-router-dom";

import "./Blog.css";
import Posts from "./Posts/Posts"
// import FullPost from "./FullPost/FullPost";
// import NewPost from "./NewPost/NewPost";

// import asyncComponent from "../../hoc/asyncComponent";
// const AsyncNewPost = asyncComponent(() => {
//   return import("./NewPost/NewPost");
// });

const NewPost = React.lazy(() =>  import("./NewPost/NewPost"));
const AsyncNewPost = (() =>
  <Suspense fallback={<div style={{ textAlign: "center", fontSize: "3rem" }}>Loading...</div>}>
    <NewPost />
  </Suspense>
);

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
                to="/posts"
                activeClassName="my-active"
                activeStyle={{
                  color: "#FA923F",
                  textDecoration: "underline"
                }}
              >Posts</NavLink></li>
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
        <Switch>
          <Route path="/new-post" exact component={ AsyncNewPost } />
          <Route path="/posts" component={ Posts } />
          <Redirect from="/" to="/posts" />
          {/* <Route path="/" component={ Posts } /> */}
          {/* <Route render={ () => <h1>Not Found 404</h1> } /> */}
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