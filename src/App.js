import React, { Component } from 'react';
import './App.css';
const axios = require('axios')

const API = 'https://api.nytimes.com/svc/topstories/v2/home.json?api-key=3UiqpoK1IbAXFeEGbJsfwRoc6zilXJhp';
const DEFAULT_QUERY = '';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      error: null,
    };
    this.GetSection = this.GetSection.bind(this)
    this.onChange = this.onChange.bind(this)
  }
  async componentWillMount() {
    let res = await axios.get(API)
    console.log(res.data.results)
    if (res) {
      this.setState({ posts: res.data.results })
    }

    // fetch(API + DEFAULT_QUERY)
    //   .then(response => response.json())
    //   .then(data =>
    //     // console.log(data.results)
    //     this.setState({ posts: data.results, isLoading: false })

    //   );
  }

  GetSection() {
    let p = this.state.posts

  }
  onChange(e) {
    let myArr = []
    console.log(e.target.value, "akjdshadhkjks")
    let myposts = this.state.posts
    for (let obj of myposts) {

      if (obj.section == e.target.value) {
        myArr.push(obj);
      }

    }
    console.log(myArr,"myArrmyArrmyArrmyArrmyArrmyArr")
    this.setState({
      posts: myArr
    })

  }

  render() {
    const { posts } = this.state;
    console.log(posts)
    return (
      <div className="topDiv" >
        <select onChange={(e) => this.onChange(e)}>
          {
            posts.map((section, i) => {
              return (<option key={i} value={section.section}>{section.section}</option>)
            })
          }
        </select>



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
