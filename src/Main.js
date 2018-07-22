import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

class Main extends Component {

  state = {
    interestingPoints: [
      {name: "Cafe Strych", lat: 54.523280, lng: 18.543844},
      {name: "Coffee Time", lat: 54.521288, lng: 18.532659},
      {name: "TŁOK", lat: 54.516639, lng: 18.541942},
      {name: "Starbucks", lat: 54.517589, lng: 18.541521},
      {name: "Cyganeria", lat: 54.519417, lng: 18.535728},
      {name: "Lavenda Cafe & Galeria", lat: 54.521259, lng: 18.540606}
    ],
    startingPosition: { lat: 54.5193926,lng: 18.5353235, zoom: 14.95}
  }

  componentDidMount() {

  }

  render() {
    const style = {
      width: '100%',
      height: '100%'
    }
    {this.state.interestingPoints.forEach((cafe) => {
    console.log(cafe.name + " " + cafe.lng + " " + cafe.lat );
    })}
    return (
     <Map google={this.props.google}
          zoom={this.state.startingPosition.zoom}
          initialCenter={{
            lat: this.state.startingPosition.lat,
            lng: this.state.startingPosition.lng
          }}
          style={style}
          >
       {this.state.interestingPoints.map((cafe) => (
         <Marker onClick={this.onMarkerClick}
                 key={cafe.name}
                 name={cafe.name}
                 title={cafe.name}
                 position={{lat: cafe.lat, lng: cafe.lng}}
              />
       ))}
     </Map>
   );
 }
}

export default GoogleApiWrapper({
 apiKey: ("AIzaSyCJTF1H_9xKdjSbmBkFz96KPCRRPaJfgQ0")
})(Main)
