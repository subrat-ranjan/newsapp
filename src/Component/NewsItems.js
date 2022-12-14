import React, { Component } from "react";

export class NewsItems extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, date, source } = this.props;
    return (
      <div className="my-3">

        <div className="shadow card news_card">


          <div style={{
            display: "flex",
            justifyContent: "flex-end",
            position: "absolute",
            right: "0"


          }}>


            <span className=" badge rounded-pill bg-danger" style={{ left: '90%', zIndex: '1' }}> {source}</span>
          </div>
          <img
            src={
              !imageUrl
                ? "https://media.gettyimages.com/vectors/abstract-globe-background-vector-id1311148884?s=612x612"
                : imageUrl
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{title}..</h5>
            <p className="card-text">{description}..</p>
            <p className="card-text">< small className="text-muted">By: {!author ? "Unknown" : author} on: {new Date(date).toGMTString()}</small></p>
            <a
              rel="noreferrer"
              href={newsUrl}
              target="_blank"
              className="btn btn-sm btn-primary"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItems;
