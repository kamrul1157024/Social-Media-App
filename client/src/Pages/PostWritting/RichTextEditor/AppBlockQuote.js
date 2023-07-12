import React, { Component } from "react";
import "./AppBlockQuote.css";

export class AppBlockQuote extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="block-quote">{this.props.children}</div>
      </div>
    );
  }
}

export default AppBlockQuote;
