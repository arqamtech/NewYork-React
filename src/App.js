import React, { Component } from 'react';
import './App.css';
const axios = require('axios')

const API = 'https://api.nytimes.com/svc/topstories/v2/home.json?api-key=3UiqpoK1IbAXFeEGbJsfwRoc6zilXJhp';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      allposts: [],
      posts: [],
      sections: [],
    };
    this.onChange = this.onChange.bind(this)

  }
  async componentDidMount() {
    let res = await axios.get(API)
    if (res) {
      this.setState({ posts: res.data.results, allposts: res.data.results, sections: res.data.results })
    }
  }

  onChange(e) {
    let myArr = [];
    let myposts = null;
    myposts = this.state.allposts;
    for (let obj of myposts) {

      if (obj.section === e.target.value) {
        myArr.push(obj);
      }

    }
    this.setState({
      posts: myArr
    })

  }



  render() {
    var { allposts, posts, sections } = this.state;

    let sortedSections = [...new Map(sections.map(o => [o.section, o])).values()];

    return (


      <div className="topDiv" >

        <div className="form-group">
          <label htmlFor="sectn">Select Section :</label>
          <select onChange={(e) => this.onChange(e)}>
            {
              sortedSections.map((s, i) => {
                return (<option key={i} value={s.section}>{s.section}</option>)
              })
            }
          </select>
        </div>
        {posts.map(post =>
          <div key={post.title}>
            <a href={post.short_url} target="_blank" rel="noopener noreferrer">
              <h4>
                {post.title}
              </h4>
            </a>
            <h5>{post.section}</h5>
            <p>{post.abstract}</p>
            {post.des_facet.map(des =>
              <p key={des}>{des}</p>
            )}



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
