import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from "../../../axios";
import Post from '../../../components/Post/Post';
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
    this.setState({ selectedId: id });
  };

  render () {
    let posts = (
      <p className={{ textAlign: "center" }}>Something went wrong...</p>
    );
    if (!this.state.error) {
      posts = this.state.posts.map((post, index) => {
        return (
          <Link
            to={`/posts/${post.id}`}
            key={post.id}
          >
            <Post
              title={post.title}
              author={post.author}
              clicked={() => this.postSelectedHandler(post.id)}
            />
          </Link>
        );
      });
    }
    
    return (
      <section className="Posts">
        {posts}
      </section>
    );
  }
}

export default withRouter(Posts);