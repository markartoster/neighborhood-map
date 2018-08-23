import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateQuery, filterCafes } from './actions.js'

class Filter extends Component {

  componentDidMount() {
    this.props.filterCafes(this.localCafesFiltered(this.props.query), this.localCafesRaw(this.props.query))
  }

  localCafesRaw = (query) => {
    let cafesRaw = this.props.cafes.filter(
      (cafe) => {
        return cafe.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
      }
    );
    return cafesRaw
  }

  localCafesFiltered = (query) => {
    let cafesFiltered = this.props.cafes.filter(
      (cafe) => {
        return cafe.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
      }
    );

    if(this.props.cafes instanceof Array) {
      cafesFiltered = (
        <ol className="filter-list">
          {cafesFiltered.map((cafe) => (
            <li key={cafe.name} lat={cafe.lat} lng={cafe.lng} aria-label={cafe.name} className="filter-list-item" tabIndex={0} role="button" aria-pressed="false">
              {cafe.name}
            </li>
          ))}
        </ol>
      )
    }
    return cafesFiltered
  }

  render() {

    // if (filteredInterestingPoints instanceof Array) {
    //   filterResults = (
    //     <ol className="filter-list">
    //       {filteredInterestingPoints.map((point) => (
    //         <li className="filter-list-item" key={point.name} onClick={this.props.clickItem}>
    //           <div>{point.name}</div>
    //         </li>
    //       ))}
    //     </ol>
    //   )
    // }

    return (
      <div className="filter">
        <input type="text"
          placeholder="Search for Cafes..."
          className="filter-input"
          onChange={(event) => {
            this.props.updateQuery(event.target.value);
            this.props.filterCafes(this.localCafesFiltered(event.target.value), this.localCafesRaw(event.target.value))
            }
          } />
        { this.props.cafesFiltered }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cafes: state.cafes,
    query: state.query,
    cafesFiltered: state.cafesFiltered
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateQuery: query => dispatch(updateQuery(query)),
    filterCafes: (cafesFiltered, cafesRaw) => dispatch(filterCafes(cafesFiltered, cafesRaw))
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(Filter);
