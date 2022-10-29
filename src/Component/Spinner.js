import React, { Component } from "react";
import loading from "./loading.gif";

export default class Spinner extends Component {
  render() {
    return (
      <div className="text-center" style={{ height: "90vh" }}>
        <img src={loading} alt="loading" />
      </div>
    );
  }
}
