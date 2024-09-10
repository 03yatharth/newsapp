import PropTypes from "prop-types";
import NewsItems from "./NewsItems";
import InfiniteScroll from "react-infinite-scroll-component";
import { useState,useEffect } from "react";

export default function News(props) {
  const [articles, setArticles] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  document.title = `${props.category} - News App`;

  const updateDate=async()=> {
    props.setProgress(10)
    setLoading(true)
    let url = `https://newsapi.org/v2/top-headlines?&category=${props.category}&apikey=f1fa273c8032465a8576279a06f2fae9&pagesize=9&page=${page}`;
    https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=
    props.setProgress(30)
    let data = await fetch(url);
    props.setProgress(70)
    let parsedData = await data.json();
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setPage(page+1)
    setLoading(false)
    props.setProgress(100)
  }

  const fetchMoreData = async () => {
  setPage(page+1)
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=${
      props.category
    }&apikey=f1fa273c8032465a8576279a06f2fae9&pagesize=9&page=${
      page
    }`;
    setLoading(true)
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
    setLoading(false)
  };
  
  useEffect(()=>{
    updateDate()
  },[]);
    return (
      <>
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={
            <div className="container my-2 d-flex justify-content-center">
              {loading && (
                <div className="spinner-border text-dark "></div>
              )}
            </div>
          }
        >
          <div className="container" style={{marginTop:"10vh"}}>
            <div className="row">
              {articles.map((element) => {
                return (
                  <div className="col-md-4 " key={element.url}>
                    <NewsItems
                      title={element.title}
                      imgUrl={element.urlToImage}
                      desc={element.description}
                      newsUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
      </>
    );
}
News.defaultProps = {
  category: "genral",
};
News.propTypes = {
  category: PropTypes.string,
};



// import React, { Component } from "react";
// import PropTypes from 'prop-types';
// import NewsItems from "./NewsItems";

// export default class News extends Component {
//   static defaultProps = {
//     category:"genral"
//   }
//   static propTypes = {
//     category:PropTypes.string
//   }

//     articles = []
//   constructor(props) {
//     super(props);
//     this.state = {
//       articles: this.articles,
//     };
//     document.title=`${this.props.category} - News App`
//   }
//   async updateDate(){
//     let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apikey=f1fa273c8032465a8576279a06f2fae9&pagesize=9&page=${this.state.page-1}`;
//     this.setState({loading:true})
//     let data = await fetch(url)
//     let parsedData = await data.json()
//     this.setState({articles:parsedData.articles , totalResults:parsedData.totalResults,page:this.state.page-1,
//       loading:false})
//     // console.log(this.state.page)
//   }

//   onPrevClick= async ()=>{
//     let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apikey=f1fa273c8032465a8576279a06f2fae9&pagesize=9&page=${this.state.page-1}`;
//     this.setState({loading:true})
//     let data = await fetch(url)
//     let parsedData = await data.json()
//     this.setState({articles:parsedData.articles , totalResults:parsedData.totalResults,page:this.state.page-1,
//       loading:false})
//     console.log(this.state.page)
//   }
//   onNextClick= async ()=>{
//     if(this.state.page<(Math.ceil(this.state.totalResults/9))){
//       let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apikey=f1fa273c8032465a8576279a06f2fae9&pagesize=9&page=${this.state.page+1}`;
//       this.setState({loading:true})
//       let data = await fetch(url)
//       let parsedData = await data.json()
//       this.setState({articles:parsedData.articles , totalResults:parsedData.totalResults, page:this.state.page+1,
//         loading:false
//       })
//     }
//    else{

//    }
//     console.log(this.state.page)
//   }
//   async componentDidMount(){
//     let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apikey=f1fa273c8032465a8576279a06f2fae9&pagesize=9`;
//     this.setState({loading:true})
//     let data = await fetch(url)
//     let parsedData = await data.json()
//     this.setState({articles:parsedData.articles , totalResults:parsedData.totalResults,page:1,loading:false})
//   }
//   render() {
//     return (
//       <>
//       <div className="container my-2 d-flex justify-content-center">
//       {this.state.loading && <div className="spinner-border text-dark "></div>}

//       </div>

//         <div className="row">
//             {!this.state.loading && this.state.articles.map((element) => {

//                 return <div className="col-md-4" key = {element.url}>
//                     <NewsItems
//                         title= {element.title}
//                         imgUrl={element.urlToImage}
//                         desc={element.description}
//                         newsUrl={element.url}
//                         author={element.author}
//                         date={element.publishedAt}
//                     />
//                 </div>
//             })}
//                     <div className="container d-flex justify-content-between">
//                     <button type="button" disabled={this.state.page<=1} className="btn btn-primary my-3 " onClick={this.onPrevClick}>Previous</button>
//                     <button type="button" disabled={this.state.page>=(Math.ceil(this.state.totalResults/9))} className="btn btn-primary my-3" onClick={this.onNextClick}>Next</button>
//                     </div>
//         </div>
//       </>
//     );
//   }
// }
