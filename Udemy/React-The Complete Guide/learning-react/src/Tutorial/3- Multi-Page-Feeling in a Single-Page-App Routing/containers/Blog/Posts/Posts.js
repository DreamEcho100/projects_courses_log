import React, { Component } from 'react';
import { Route, /*Link, */withRouter } from 'react-router-dom';
import axios from "../../../axios";
import Post from '../../../components/Post/Post';
import FullPost from '../FullPost/FullPost';
import "./style.css";

class Posts extends Component {
  state = {
    posts: [],
    selectedId: null,
    error: false,
  };

  componentDidMount() {
    axios
      .get("/posts")
      .then((response) => {
        const posts = response.data.slice(0, 4);
        const updatePosts = posts.map((post) => {
          return {
            ...post,
            author: "Mazen",
          };
        });
        this.setState({ posts: updatePosts });
        // console.log(response);
      })
      .catch((error) => {
        // console.error(error);
        this.setState({ error: true });
      });
  }

  postSelectedHandler = (id) => {
    // this.setState({ selectedId: `/posts/${id}` });
    this.props.history.push({pathname: `/posts/${id}`});
  };

  render () {
    let posts = (
      <p className={{ textAlign: "center" }}>Something went wrong...</p>
    );
    if (!this.state.error) {
      posts = this.state.posts.map((post, index) => {
        return (
          // <Link
          //   to={`/posts/${post.id}`}
          // >
            <Post
              key={post.id}
              title={post.title}
              author={post.author}
              clicked={() => this.postSelectedHandler(post.id)}
            />
          // </Link>
        );
      });
    }
    
    return (
      <div>
        <section className="Posts">
          {posts}
        </section>
        <Route path={ `${ this.props.match.url }/:id` } exact component={ FullPost } />
      </div>
    );
  }
}

export default withRouter(Posts);