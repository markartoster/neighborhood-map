const initialState = {
  cafes: [], //all cafes from request
  cafesRaw: [], //just objects
  cafesFiltered: [], //jsx elements
  query: '',
  showingInfoWindow: false,
  activeMarker: {},
  selectedPlace: {}
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "INIT_CAFES":
      return Object.assign({}, state, {
        cafes: action.cafes
    })
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
    case "FILTER_CAFES":
      return Object.assign({}, state, {
        cafesFiltered: action.cafesFiltered,
        cafesRaw: action.cafesRaw
   })
    default:
      return state
  }
}

export default rootReducer;
