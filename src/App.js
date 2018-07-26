import React, { Component } from 'react';
import Main from './Main.js'
import Filter from './Filter.js'
import './App.css';

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

  updateQuery = (query) => {
    this.setState({ query: query })
  }

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
          onMarkerClick={this.onMarkerClick}
          selectedPlace={this.state.selectedPlace}
          activeMarker={this.state.activeMarker}
          showingInfoWindow={this.state.showingInfoWindow}
        />
      </div>
    );
  }
}

export default App;
