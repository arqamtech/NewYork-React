import React, { Component } from 'react';
import Moment from 'moment';


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
    this.filter = this.filter.bind(this)
    this.sort = this.sort.bind(this)

  }
  async componentDidMount() {
    let res = await axios.get(API)
    if (res) {
      this.setState({ posts: res.data.results, allposts: res.data.results, sections: res.data.results })
    }
  }

  filter(e) {
    let myArr = [];
    let myposts = null;
    myposts = this.state.allposts;
    if (e.target.value === "all") {
      myArr = this.state.allposts;
    } else {
      for (let obj of myposts) {
        if (obj.section === e.target.value) {
          myArr.push(obj);
        }
      }

    }
    this.setState({
      posts: myArr
    })

  }
  sort(e) {

    let myposts = null;
    myposts = this.state.posts;


    let choice = e.target.value;
    switch (choice) {
      case "default":
        myposts = this.state.posts;
        break;
      case "createdDate":
        myposts.sort(function (a, b) {
          return new Date(b.created_date) - new Date(a.created_date);
        });

        break;
      case "publishedDate":
        myposts.sort(function (a, b) {
          return new Date(b.published_date) - new Date(a.published_date);
        });
        break;
      case "updatedDate":
        myposts.sort(function (a, b) {
          return new Date(b.updated_date) - new Date(a.updated_date);
        });
        break;
      default:
        myposts = this.state.posts;
        break;
    }




    myposts.reverse();

    this.setState({
      posts: myposts
    })

  }



  render() {
    var { allposts, posts, sections } = this.state;

    let sortedSections = [...new Map(sections.map(o => [o.section, o])).values()];



    return (
      <div className="topDiv" >
        <div className="row justify-content-center">
          <div className="col-10 col-md-6  col-sm-10 col-xl-4">



            <div className="form-group row justify-content-center">
              <label htmlFor="sectn">Filter by :</label>
              <select className="form-control" id="sectn" onChange={(e) => this.filter(e)}>
                <option key="all" value="all">All</option>
                {
                  sortedSections.map((s, i) => {
                    return (<option key={i} value={s.section}>{s.section}</option>)
                  })
                }
              </select>
            </div>

            <div className="form-group row justify-content-center">
              <label htmlFor="sectn">Sort by :</label>

              <select className="form-control" id="sectn" onChange={(e) => this.sort(e)}>
                <option key="default" value="default">Default</option>
                <option key="createdDate" value="createdDate">Created Date</option>
                <option key="publishedDate" value="publishedDate">Published Date</option>
                <option key="updatedDate" value="updatedDate">Updated Date</option>
              </select>
            </div>


            {posts.map(post =>





              <div className="card m-3" key={post.title}>
                <div className="card-body">

                  {post.multimedia.map((s, i) => {
                    if (post.multimedia.indexOf(s) === 3) {
                      return <img className="w-100" src={s.url} />

                    };
                  })
                  }





                  <h5 className="card-title mt-2">
                    {post.title}
                  </h5>


                  <div className="w-25" >
                    <p >Section : <span className="font-weight-bold" >{post.section}</span> </p>
                  </div>


                  <h6 className="card-subtitle mb-2 text-muted">{post.abstract}</h6>

                  {post.des_facet.map(des =>
                    <p key={des} className="desc" >{des}</p>
                  )}






                  < p > Created : {Moment(post.created_date).format('MMMM Do YYYY, h:mm:ss a')}</p>
                  <p> Published :  {Moment(post.published_date).format('MMMM Do YYYY, h:mm:ss a')}</p>
                  <p>Updated : {Moment(post.updated_date).format('MMMM Do YYYY, h:mm:ss a')}</p>
                </div>

                <div className="card-body"  >
                  <a href={post.short_url} rel="noopener noreferrer" target="_blank" >
                    <button type="button" className="btn btn-primary float-right">Read More</button>
                  </a>

                </div>


              </div>
            )}

          </div>
        </div>

      </div>
    );
  }
}

export default App;
