import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateQuery, filterCafes } from './actions.js'

class Filter extends Component {

  componentDidMount() {
    this.props.filterCafes(this.props.localCafesFiltered(this.props.query), this.props.localCafesRaw(this.props.query))
  }

  render() {

    return (
      <div className="filter">
        <input type="text"
          placeholder="Search for Cafes..."
          className="filter-input"
          onChange={(event) => {
            this.props.updateQuery(event.target.value);
            this.props.filterCafes(this.props.localCafesFiltered(event.target.value), this.props.localCafesRaw(event.target.value))
            }
          } />
        {(this.props.FsError === false) ? this.props.cafesFiltered : (<h6 className="error-msg">Couldn't get response to query. Please try refreshing site</h6>)}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cafes: state.cafes,
    query: state.query,
    cafesFiltered: state.cafesFiltered,
    FsError: state.FsError
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateQuery: query => dispatch(updateQuery(query)),
    filterCafes: (cafesFiltered, cafesRaw) => dispatch(filterCafes(cafesFiltered, cafesRaw))
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(Filter);
