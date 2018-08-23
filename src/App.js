import React, { Component } from 'react';
import Main from './Main.js'
import Filter from './Filter.js'
import { connect } from 'react-redux';
import './App.css';
import { initCafes, filterCafes } from './actions.js'
import $ from "jquery";

class App extends React.PureComponent {

  state = {
    isMarkerShown: true,
    query: '',
    interestingPoints: [
      {name: "Cafe Strych", lat: 54.523280, lng: 18.543844},
      {name: "Coffee Time", lat: 54.521288, lng: 18.532659},
      {name: "TŁOK", lat: 54.516639, lng: 18.541942},
      {name: "Starbucks", lat: 54.517589, lng: 18.541521},
      {name: "Cyganeria", lat: 54.519417, lng: 18.535728},
      {name: "Lavenda Cafe & Galeria", lat: 54.521259, lng: 18.540606}
    ],
    startingPosition: { lat: 54.5193926,lng: 18.5353235, zoom: 14.95},
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {}
  }

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
            <li key={cafe.name} lat={cafe.lat} lng={cafe.lng} aria-label={cafe.name} className="filter-list-item" tabIndex={0} role="button" aria-pressed="false">
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
          return {name: cafe.venue.name, lat: cafe.venue.location.lat, lng: cafe.venue.location.lng, id: cafe.venue.id, categories: cafe.venue.categories[0].name, address: cafe.venue.location.address}
        })

        appInstance.props.initCafes(cafes);
        appInstance.props.filterCafes(appInstance.localCafesFiltered(appInstance.props.query), appInstance.localCafesRaw(appInstance.props.query));
      },
      error: () => {
        //some error handling later
      }
    })
  }

  clickItem = (event) => {
    console.log("test");
  }

  onMarkerClick = (place, marker, e) => {
    this.setState({
      selectedPlace: place,
      activeMarker: marker,
      showingInfoWindow: true
    })
  }

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };

  updateListContent = (query, interestingPoints) => {
    let filteredInterestingPoints = interestingPoints.filter((point) => {
      if(point.name.toLowerCase()[0] === query.toLowerCase()[0])
        return point
    })

    return filteredInterestingPoints;
  }

  render() {
    return (
      <div className="app">
        <Filter
          interestingPoints={this.state.interestingPoints}
          startingPosition={this.state.startingPosition}
          updateQuery={this.updateQuery}
          query={this.state.query}
          updateListContent={this.updateListContent}
          clickItem={this.clickItem}
        />
        <Main
          isMarkerShown = {this.state.isMarkerShown}
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCJTF1H_9xKdjSbmBkFz96KPCRRPaJfgQ0&v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          interestingPoints={this.state.interestingPoints}
          startingPosition={this.state.startingPosition}
          updateQuery={this.updateQuery}
          query={this.state.query}
          updateListContent={this.updateListContent}
          onMapClicked={this.onMapClicked}
        />
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
    initCafes: cafes => dispatch(initCafes(cafes)),
    filterCafes: (cafesFiltered, cafesRaw) => dispatch(filterCafes(cafesFiltered, cafesRaw))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
