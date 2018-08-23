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

export function onMarkerClick(cafe, marker, e) {
  return {
    type: "ON_MARKER_CLICK",
    activeMarker: marker,
    showingInfoWindow: true,
    selectedPlace: {name: cafe.name, address: marker.address, category: marker.category}
  }
}

export function filterCafes(cafesFiltered, cafesRaw) {
  return {
    type: "FILTER_CAFES",
    cafesFiltered,
    cafesRaw
  }
}

export function addMarkerRefs(markerRefs) {
  console.log(markerRefs);
  return {
    type: "ADD_MARKERREFS",
    markerRefs
  }
}

export function onFsError() {
  return {
    type: "ON_FS_ERROR",
    FsError: true
  }
}

export function onGmError() {
  return {
    type: "ON_GM_ERROR",
    GmError: true
  }
}
