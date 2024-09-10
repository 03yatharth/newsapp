import React, { Component } from "react";
export default function NewsItems(props) {
  
    return (
      <>
        <div className="container">
          <div className="card my-3 ">
            <img
              src={props.imgUrl}
              className="card-img-top"
              alt="..."
              style={{ height: "30vh" }}
            />
            <div className="card-body">
              <h5 className="card-title">{props.title}</h5>
              <p className="card-text">{props.desc}</p>
              <p className="card-text">
                <small className="text-body-secondary">
                  By {props.author} on {new Date(props.date).toUTCString()}
                </small>
              </p>
              <a href={props.newsUrl} target="_blank" className="btn btn-primary">
                read more
              </a>
            </div>
          </div>
        </div>
      </>
    );
}
