export function initCafes(cafes) {
  console.log(cafes);
  return {
    type: "INIT_CAFES",
    cafes
  }
}

export function updateQuery(query) {
  return {
    type: "UPDATE_QUERY",
    query
  }
}

export function onMarkerClick(place, marker, e) {
  return {
    type: "ON_MARKER_CLICK",
    activeMarker: marker,
    showingInfoWindow: true,
    selectedPlace: {name: place.name, title: marker.title}
  }
}

export function filterCafes(cafesFiltered, cafesRaw) {
  return {
    type: "FILTER_CAFES",
    cafesFiltered,
    cafesRaw
  }
}
