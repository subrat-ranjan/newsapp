import React, { Component } from "react";
import NewsItems from "./NewsItems";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
// import data from "../newsdata.json"

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 5,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props) {
    // for using constructor you must define super() class other wise it will pass a error
    super(props);
    console.log("hello iam a constructure");
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0
    };
    document.title = `${this.capitalizeFirstLetter(this.props.category)}- News-Master App`;
  }



  async updateNews() {


    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=db49aa8002b1432097bbf4248dc03ded&page=${this.state.page}&pageSize=${this.props.pageSize}`;

    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();

    // let parsedData = data

    // console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });




  }

  // componentDidMount
  // it is a life cycle method ,it runs after render ..

  async componentDidMount() {
    // console.log("update");
    // const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=db49aa8002b1432097bbf4248dc03ded&page=${this.state.page}&pageSize=${this.props.pageSize}`;

    // this.setState({ loading: true });
    // let data = await fetch(url);
    // let parsedData = await data.json();

    // // let parsedData = data

    // // console.log(parsedData);
    // this.setState({
    //   articles: parsedData.articles,
    //   totalResults: parsedData.totalResults,
    //   loading: false,
    // });
    this.updateNews();

  }

  // handlePreviousClick = async () => {
  //   console.log("clicked");

  //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country
  //     }&category=${this.props.category
  //     }&apikey=db49aa8002b1432097bbf4248dc03ded&page=${this.state.page - 1
  //     }&pageSize=${this.props.pageSize}`;
  //   this.setState({ loading: true });
  //   let data = await fetch(url);
  //   let parsedData = await data.json();
  //   console.log(parsedData);

  //   this.setState({
  //     page: this.state.page - 1,
  //     articles: parsedData.articles,
  //     loading: false,
  //   });
  // };
  // handleNextClick = async () => {
  //   console.log("clicked");

  //   if (
  //     !(
  //       this.state.page + 1 >
  //       Math.ceil(this.state.totalResults / this.props.pageSize)
  //     )
  //   ) {
  //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country
  //       }&category=${this.props.category
  //       }&apikey=db49aa8002b1432097bbf4248dc03ded&page=${this.state.page + 1
  //       }&pageSize=${this.props.pageSize}`;
  //     this.setState({ loading: true });
  //     let data = await fetch(url);
  //     let parsedData = await data.json();

  //     // let parsedData = data

  //     // console.log(parsedData);
  //     this.setState({
  //       page: this.state.page + 1,
  //       articles: parsedData.articles,
  //       loading: false,
  //     });
  //   }
  // };

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 },
      async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=db49aa8002b1432097bbf4248dc03ded&page=${this.state.page}&pageSize=${this.props.pageSize}`;

        // this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json();

        // let parsedData = data

        // console.log(parsedData);
        this.setState({
          articles: this.state.articles.concat(parsedData.articles),
          totalResults: parsedData.totalResults,
          loading: false,
        });
      }
    )








  }


  render() {
    return (

      <div className="bg">

        {/* // <div className=" py-3 news_bg"> */}
        <h1 className="text-center" style={{ margin: "35px 0px", marginTop: "90px" }}>
          News Master - Top Headlines from {this.capitalizeFirstLetter(this.props.category)} For you.
          {/* {" "} */}
        </h1>
        {this.state.loading && <Spinner />}



        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >

          <div className=" py-3 news_bg">

            <div className="row justify-content-between">

              {
                this.state.articles.map((element) => {
                  return (
                    <div
                      className="col-md-3 mx-0 mb-5 mx-md-4" key={element.url}>
                      <NewsItems
                        title={element.title ? element.title.slice(0, 45) : ""}
                        description={
                          element.description
                            ? element.description.slice(0, 88)
                            : ""
                        }
                        imageUrl={element.urlToImage}
                        newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}
                      />
                    </div>
                  );
                })}
            </div>
          </div>

        </InfiniteScroll>


        {/* <div className="conatiner d-flex justify-content-between">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-info" onClick={this.handlePreviousClick}> &larr; Previous
          </button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-info" onClick={this.handleNextClick}> Next &rarr;</button>
        </div> */}

      </div>

    );
  }
}

export default News;
