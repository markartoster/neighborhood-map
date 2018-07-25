import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

class Main extends Component {

  props = {

  }

  componentDidMount() {

  }

  render() {
    const style = {
      width: '100%',
      height: '100%',
      position: 'relative'
    }

    let filterResults;
    let filteredInterestingPoints
    if (this.props.query !== '') {
      filteredInterestingPoints = this.props.updateListContent(this.props.query, this.props.interestingPoints)
    } else {
      filteredInterestingPoints = this.props.interestingPoints;
    }

    return (
       <Map google={this.props.google}
            zoom={this.props.startingPosition.zoom}
            className={'map'}
            initialCenter={{
              lat: this.props.startingPosition.lat,
              lng: this.props.startingPosition.lng
            }}
            style={style}
            >
         {filteredInterestingPoints.map((cafe) => (
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
