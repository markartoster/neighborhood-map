import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

class Main extends Component {

  render() {
    const style = {
      width: '100%',
      height: '100%'
    }
    return (
     <Map google={this.props.google}
          zoom={14}
          initialCenter={{
            lat: 40.854885,
            lng: -88.081807
          }}
          style={style}>

       <Marker onClick={this.onMarkerClick}
               name={'Current location'} />

       <InfoWindow onClose={this.onInfoWindowClose}>
           <div>
             <h1>Ok</h1>
           </div>
       </InfoWindow>
     </Map>
   );
 }
}

export default GoogleApiWrapper({
 apiKey: ("AIzaSyCJTF1H_9xKdjSbmBkFz96KPCRRPaJfgQ0")
})(Main)
