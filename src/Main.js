import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import { connect } from 'react-redux';
import { onMarkerClick, addMarkerRefs, onGmError } from './actions.js'

class Main extends Component {

  componentDidMount() {
    this.props.addMarkerRefs(this.markerRefs);
    window.gm_authFailure = () => {
      this.props.onGmError();
    }
  }

  constructor(props) {
    super(props);
    this.markerRefs = [];
  }

  render() {
    const style = {
      width: '100%',
      height: '100%',
      position: 'relative'
    }

    return (
      <div role="Application">
      { this.props.GmError === false ? (
       <Map google={this.props.google}
            zoom={this.props.startingPosition.zoom}
            className={'map'}
            initialCenter={{
              lat: this.props.startingPosition.lat,
              lng: this.props.startingPosition.lng
            }}
            style={style}
            >
         {this.props.cafesRaw.map((cafe, index) => (
           <Marker onClick={this.props.onMarkerClick}
                   key={cafe.name}
                   name={cafe.name}
                   title={cafe.name}
                   address={cafe.address}
                   category={cafe.category}
                   ref={(ref) => this.markerRefs[index] = ref}
                   position={{lat: cafe.lat, lng: cafe.lng}}
                />
         ))}
         <InfoWindow
           marker={this.props.activeMarker}
           visible={this.props.showingInfoWindow}>
             <div className="info-window">
               <div className="info-window--text">{this.props.selectedPlace.name}</div>
               <div className="info-window--text--extra">{`Address: ${this.props.selectedPlace.address}`}</div>
               <div className="info-window--text--extra">{`Category: ${this.props.selectedPlace.category}`}</div>
             </div>
         </InfoWindow>
       </Map> ) : (<h6 className="msg--error">Couldn't get response from Google API. Please try refreshing site</h6>)}
      </div>
   );
 }
}

const mapStateToProps = state => {
  return {
    startingPosition: state.startingPosition,
    showingInfoWindow: state.showingInfoWindow,
    activeMarker: state.activeMarker,
    selectedPlace: state.selectedPlace,
    cafesRaw: state.cafesRaw,
    GmError: state.GmError
    }
  }

const mapDispatchToProps = dispatch => {
  return {
    onMarkerClick: (cafe, marker, e) => dispatch(onMarkerClick(cafe, marker, e)),
    addMarkerRefs: markerRefs => dispatch(addMarkerRefs(markerRefs)),
    onGmError: () => dispatch(onGmError())
  }
}
const MyWrapper = GoogleApiWrapper({
 apiKey: ("AIzaSyCJTF1H_9xKdjSbmBkFz96KPCRRPaJfgQ0")
})(Main)
export default connect(mapStateToProps, mapDispatchToProps)(MyWrapper)
