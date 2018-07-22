import React, { Component } from 'react';
import Main from './Main.js'
import Filter from './Filter.js'
import './App.css';

class App extends React.PureComponent {

  state = {
    isMarkerShown: true
  }

  render() {
    return (
      <div>
        <Filter />
        <Main
          isMarkerShown = {this.state.isMarkerShown}
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCJTF1H_9xKdjSbmBkFz96KPCRRPaJfgQ0&v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />

      </div>
    );
  }
}

export default App;
