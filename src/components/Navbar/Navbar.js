/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import "./Navbar.css";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      value: ""
    };
  }

  componentDidMount() {
    // Populate JSON data from a local file using AJAX call once the component mounts
    import("../../data/test.json").then(
      result => {
        this.setState({
          isLoaded: true,
          items: result.default
        });
      },
      // Catch errors if any
      error => {
        console.log("error== ", error);
        this.setState({
          isLoaded: true,
          error
        });
      }
    );
  }

  // Display the content once a menu is clicked and hide when its clicked again
  handleClick = e => {
    if (e.content === this.state.value) {
      this.setState({ value: "" });
      return;
    } else {
      if (e.content) this.setState({ value: e.content });
    }
  };

  // Populate children elements within the navigation bar
  populateChildren = children => {
    return (
      <ul className="sub-menu">
        {children.map(child =>
          child.child ? (
            <li key={child.key}>
              <a href="#" onClick={() => this.handleClick(child)}>
                {child.label}
                <span className="drop-icon child">▾</span>
                <label
                  title="Toggle Drop-down"
                  className="drop-icon"
                  htmlFor={child.key}
                >
                  ▾
                </label>
              </a>
              <input type="checkbox" id={child.key} />
              {this.populateChildren(child.child)}
            </li>
          ) : (
            <li key={child.key}>
              <a href="#" onClick={() => this.handleClick(child)}>
                {child.label}
              </a>
            </li>
          )
        )}
      </ul>
    );
  };

  // Populate the navigation elements once the AJAX call got them from the lifecycle method
  populateParents = () => {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <ul className="main-menu clearfix">
          {items.map(item =>
            item.child ? (
              <li key={item.key}>
                <a href="#">
                  {item.label}
                  <span className="drop-icon">▾</span>
                  <label
                    title="Toggle Drop-down"
                    className="drop-icon"
                    htmlFor={item.key}
                  >
                    ▾
                  </label>
                </a>
                <input type="checkbox" id={item.key} />
                {this.populateChildren(item.child)}
              </li>
            ) : (
              <a href="#">{item.label}</a>
            )
          )}
        </ul>
      );
    }
  };

  // Render the Navbar with all elements dependant on the data from JSON
  render() {
    return (
      <div>
        <nav id="menu">
          <label htmlFor="tm" id="toggle-menu">
            Navigation <span className="drop-icon">▾</span>
          </label>
          <input type="checkbox" id="tm" />
          {this.populateParents()}
        </nav>
        {this.state.value ? <div id="box">{this.state.value}</div> : ""}
      </div>
    );
  }
}

export default Navbar;