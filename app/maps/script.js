
navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
  enableHighAccuracy: true
})

function successLocation(position) {
  setupMap([position.coords.longitude, position.coords.latitude])
}

function errorLocation() {
  setupMap([-2.24, 53.48])
}

function setupMap(center) {
  const map = new maplibregl.Map({
    container: "map",
    style: "maplibre://styles/maplibre/streets-v11",
    center: center,
    zoom: 15
  })

  const nav = new maplibregl.NavigationControl()
  map.addControl(nav)

  var directions = new maplibreDirections({
    accessToken: maplibregl.accessToken
  })

  map.addControl(directions, "top-left")
}