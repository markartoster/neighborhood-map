import React, { Component } from 'react';
import { connect } from 'react-redux';
import {updateQuery} from './actions.js'

class Filter extends Component {

  render() {
    let filterResults;
    let filteredInterestingPoints;
    if (this.props.query !== '') {
      filteredInterestingPoints = this.props.updateListContent(this.props.query, this.props.interestingPoints)
    } else {
      filteredInterestingPoints = this.props.interestingPoints;
    }

    if (filteredInterestingPoints instanceof Array) {
      filterResults = (
        <ol className="filter-list">
          {filteredInterestingPoints.map((point) => (
            <li className="filter-list-item" key={point.name} onClick={this.props.clickItem}>
              <div>{point.name}</div>
            </li>
          ))}
        </ol>
      )
    }

    return (
      <div className="filter">
        <input type="text"
          placeholder="Search for Cafes..."
          className="filter-input"
          onChange={(event) => {
            this.props.updateQuery(event.target.value)
            }
          } />
        { filterResults }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {

  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateQuery: query => dispatch(updateQuery(query)),
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(Filter);
