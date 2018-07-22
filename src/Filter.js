import React, { Component } from 'react';

class Filter extends Component {

  render() {
    return (
      <div className="search">
        <input type="text" placeholder="Search for Cafes..." className="search-input" />
      </div>
    );
  }
}

export default Filter;
