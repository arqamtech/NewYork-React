import React, { Component } from 'react';
import './App.css';

const API = 'https://api.nytimes.com/svc/topstories/v2/home.json?api-key=3UiqpoK1IbAXFeEGbJsfwRoc6zilXJhp';
const DEFAULT_QUERY = '';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      isLoading: false,
      error: null,
    };
  }
  componentDidMount() {
    fetch(API + DEFAULT_QUERY)
      .then(response => response.json())
      .then(data =>
        // console.log(data.results),
        this.setState({ posts: data.results, isLoading: false })

      );
  }

  render() {
    const { posts, isLoading } = this.state;
    if (isLoading) {
      return <p>Loading ...</p>;
    }
    return (
      <div className="topDiv" >
        {posts.map(post =>
          <div key={post.title}>
            <a href={post.short_url} target="_blank" rel="noopener noreferrer">
              <h4>
                {post.title}
              </h4>
            </a>
            <h5>{post.abstract}</h5>
            <p>{post.created_date}</p>
            <p>{post.updated_date}</p>
            <p>{post.published_date}</p>
          </div>
        )}
      </div>
    );
  }
}

export default App;
