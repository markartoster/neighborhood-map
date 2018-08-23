import React, { Component } from 'react';
import Main from './Main.js'
import Filter from './Filter.js'
import { connect } from 'react-redux';
import './App.css';
import { initCafes, filterCafes, onFsError } from './actions.js'
import $ from "jquery";

class App extends React.PureComponent {

  componentDidMount() {
    this.initCafes();
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
            <li key={cafe.name} lat={cafe.lat} lng={cafe.lng} aria-label={cafe.name} className="filter-list-item" tabIndex={0} role="button" aria-pressed="false"
              onClick={(event) => {
                this.props.markerRefs.forEach((marker) => {
                  if(marker){
                    if(cafe.name === marker.props.title) {
                      marker.props.onClick({name: marker.props.name}, marker.marker)
                    }
                  }
                })
              }}

              onKeyPress={(event) => {
                if(event.key === 'Enter'){
                  this.props.markerRefs.forEach((marker) => {
                    if(marker){
                      if(cafe.name === marker.props.title) {
                        marker.props.onClick({name: marker.props.name}, marker.marker)
                      }
                    }
                  })
                }
              }}>
              {cafe.name}
            </li>
          ))}
        </ol>
      )
    }
    return cafesFiltered
  }

  initCafes = () => {
    let clientID = 'REY4XZ5WQ1CNVSH52G2UJ3DYUVOW5A5PVHADYUGGIV5TLDWE'
    let clientSecret = 'LMR253UHYAPDUFJ0NV0TRFRHEQ2AEZG4A30BPCCQAWYIQDND'
    const appInstance = this

    let url = `https://api.foursquare.com/v2/venues/explore?client_id=${clientID}&client_secret=${clientSecret}&v=20180323&near=Gdynia&limit=10&query=coffee`
    $.ajax({
      url: url,
      dataType: 'json',
      xhrFields: {
        withCredentials: false
      },
      success: function(data) {
        const cafes = data.response.groups[0].items.map((cafe, index) => {
          return {name: cafe.venue.name, lat: cafe.venue.location.lat, lng: cafe.venue.location.lng, id: cafe.venue.id, category: cafe.venue.categories[0].name, address: cafe.venue.location.address}
        })

        appInstance.props.initCafes(cafes);
        appInstance.props.filterCafes(appInstance.localCafesFiltered(appInstance.props.query), appInstance.localCafesRaw(appInstance.props.query));
      },
      error: () => {
        this.props.onFsError();
      }
    })
  }

  render() {
    return (
      <div className="app">
        <Filter
          localCafesRaw={this.localCafesRaw}
          localCafesFiltered={this.localCafesFiltered}
        />
        <Main
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCJTF1H_9xKdjSbmBkFz96KPCRRPaJfgQ0&v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cafes: state.cafes,
    query: state.query,
    cafesFiltered: state.cafesFiltered,
    markerRefs: state.markerRefs
  }
}

const mapDispatchToProps = dispatch => {
  return {
    initCafes: cafes => dispatch(initCafes(cafes)),
    filterCafes: (cafesFiltered, cafesRaw) => dispatch(filterCafes(cafesFiltered, cafesRaw)),
    onFsError: () => dispatch(onFsError())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
