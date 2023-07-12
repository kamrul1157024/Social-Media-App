import Prism from "prismjs";
import React, { Component } from "react";
import "./AppSyntaxHighLighter.css";

export class AppSyntaxHighLighter extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // You can call the Prism.js API here
    // Use setTimeout to push onto callback queue so it runs after the DOM is updated
    setTimeout(() => Prism.highlightAll(), 0);
  }

  render() {
    return (
      <div className="code">
        <code>{this.props.children}</code>
      </div>
    );
  }
}

export default AppSyntaxHighLighter;
