const initialState = {
  cafes: [],
  query: '',
  showingInfoWindow: false,
  activeMarker: {},
  selectedPlace: {}
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_QUERY":
      return Object.assign({}, state, {
        query: action.query
    })
    case "ON_MARKER_CLICK":
      return Object.assign({}, state, {
        showingInfoWindow: action.showingInfoWindow,
        activeMarker: action.activeMarker,
        selectedPlace: action.selectedPlace
    })
    default:
      return state
  }
}

export default rootReducer;
