import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import { connect } from 'react-redux';
import { onMarkerClick } from './actions.js'

class Main extends Component {

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
            onClick={this.props.onMapClicked}
            zoom={this.props.startingPosition.zoom}
            className={'map'}
            initialCenter={{
              lat: this.props.startingPosition.lat,
              lng: this.props.startingPosition.lng
            }}
            style={style}
            >
         {this.props.cafesRaw.map((cafe) => (
           <Marker onClick={this.props.onMarkerClick}
                   key={cafe.name}
                   name={cafe.name}
                   title={cafe.name}
                   position={{lat: cafe.lat, lng: cafe.lng}}
                />
         ))}
         <InfoWindow
           marker={this.props.activeMarker}
           visible={this.props.showingInfoWindow}>
             <div className="info-window">
               <div className="info-window--text">{this.props.selectedPlace.name}</div>
             </div>
         </InfoWindow>
       </Map>
   );
 }
}

const mapStateToProps = state => {
  return {
    showingInfoWindow: state.showingInfoWindow,
    activeMarker: state.activeMarker,
    selectedPlace: state.selectedPlace,
    cafesRaw: state.cafesRaw
    }
  }

const mapDispatchToProps = dispatch => {
  return {
    onMarkerClick: (place, marker, e) => dispatch(onMarkerClick(place, marker, e)),
  }
}
const MyWrapper = GoogleApiWrapper({
 apiKey: ("AIzaSyCJTF1H_9xKdjSbmBkFz96KPCRRPaJfgQ0")
})(Main)
export default connect(mapStateToProps, mapDispatchToProps)(MyWrapper)
