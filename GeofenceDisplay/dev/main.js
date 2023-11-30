import './style.css'

import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

import '@plantquest/geofence-display/dist/geofence-display.css'
import { PlantquestGeofenceDisplay } from '@plantquest/geofence-display'

console.log('START', PlantquestGeofenceDisplay)

// const map = L.map('map').setView([53.27, -9.055], 16)

//

const map = L.map('plantquest-assetmap-map', {
  crs: L.CRS.Simple,
  scrollWheelZoom: false,
  doubleClickZoom: false,
  attributionControl: false,
  // minZoom: self.config.mapMinZoom,
  // maxZoom: self.config.mapMaxZoom,
  editable: true,
})

// rc = self.rc = new L.RasterCoords(self.map, self.config.mapImg)
// self.map.setMaxBounds(self.rc.getMaxBounds())

// self.leaflet.maptile = self.createTile(mapIndex+1)
// self.leaflet.maptile.addTo(self.map)

// self.createTile = function(mapIndex) {
// let tileLyr =
//   L.tileLayer('https://plantquest-demo01-map01.s3.eu-west-1.amazonaws.com/tiles/pqd-pq01-m01-013', {
//     bounds: self.rc.getMaxBounds(),
//     minZoom: self.config.mapMinZoom,
//     maxZoom: self.config.mapMaxZoom,
//   })
// return tileLyr
// },

//

// L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//   maxZoom: 19,
//   attribution:
//     '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
// }).addTo(map)

L.tileLayer(
  'https://plantquest-demo01-map01.s3.eu-west-1.amazonaws.com/tiles/pqd-pq01-m01-013'
).addTo(map)

map.createPane('geofence')
let geofencePane = map.getPane('geofence')
geofencePane.style.zIndex = 230

map.createPane('geofenceLabel')
let geofenceLabelPane = map.getPane('geofenceLabel')
geofenceLabelPane.style.zIndex = 235

const plantquestGeofenceDisplay = new PlantquestGeofenceDisplay({
  debug: true,
  geofences: [
    {
      id: 'coffeewerk',
      title: 'Coffewerk+Press',
      pane: 'geofence',
      latlngs: [
        [53.271455, -9.054129],
        [53.271237, -9.054666],
        [53.271096, -9.054494],
        [53.270852, -9.054365],
        [53.271404, -9.053936],
      ],
      colour: 'purple',
    },
    {
      id: 'plamas',
      title: 'Plámás',
      pane: 'geofence',
      latlngs: [
        [53.270467, -9.058356],
        [53.270197, -9.058871],
        [53.270095, -9.058142],
        [53.270172, -9.057584],
      ],
      colour: 'purple',
    },
  ],
})

document.getElementById('addGeofences').addEventListener('click', () => {
  plantquestGeofenceDisplay.addTo(map)
})

document.getElementById('removeGeofences').addEventListener('click', () => {
  plantquestGeofenceDisplay.remove()
})
