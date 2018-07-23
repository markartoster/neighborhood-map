import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

class Main extends Component {

  props = {

  }

  componentDidMount() {

  }

  render() {
    const style = {
      width: '70%',
      height: '100%',
      display: 'inline-block'
    }
    {this.props.interestingPoints.forEach((cafe) => {
    console.log(cafe.name + " " + cafe.lng + " " + cafe.lat );
    })}
    return (
       <Map google={this.props.google}
            zoom={this.props.startingPosition.zoom}
            initialCenter={{
              lat: this.props.startingPosition.lat,
              lng: this.props.startingPosition.lng
            }}
            style={style}
            >
         {this.props.interestingPoints.map((cafe) => (
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
