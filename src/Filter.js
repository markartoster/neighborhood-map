import React, { Component } from 'react';

class Filter extends Component {

  render() {
    let filterResults;
    console.log(this.props.interestingPoints);
    if (this.props.interestingPoints instanceof Array) {
      filterResults = (
        <ol className="filter-list">
          {this.props.interestingPoints.map((point) => (
            <li className="filter-list-item" key={point.name}>
              <div>{point.name}</div>
            </li>
          ))}
        </ol>
      )
    }

    return (
      <div className="filter">
        <input type="text" placeholder="Search for Cafes..." className="filter-input" />
        { filterResults }
      </div>
    );
  }
}

export default Filter;
