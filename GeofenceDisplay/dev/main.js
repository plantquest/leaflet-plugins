import './style.css'

import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

import '@plantquest/geofence-display/dist/geofence-display.css'
import { PlantquestGeofenceDisplay } from '@plantquest/geofence-display'
// import '../src/rastercoords'

console.log('START', PlantquestGeofenceDisplay)
// console.log('START')

// const map = L.map('map').setView([53.27, -9.055], 16)
// L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//   maxZoom: 19,
//   attribution:
//     '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
// }).addTo(map)

const map = L.map('map', {
  // crs: L.CRS.Simple,
  // scrollWheelZoom: false,
  // doubleClickZoom: false,
  // attributionControl: false,
  // editable: true,
  minZoom: 1.7,
}).setView([50.154377, 2154.375], 1.7)

L.tileLayer(
  'https://plantquest-demo01-map01.s3.eu-west-1.amazonaws.com/tiles/pqd-pq01-m01-013/{z}/{x}/{y}.png'
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
      id: 'buildingA',
      title: 'Building A',
      pane: 'geofence',
      latlngs: [
        [53.138881, 2086.226563],
        [53.138881, 2116],
        [47.135928, 2116],
        [47.135928, 2086.226563],
      ],
      colour: 'blue',
    },
    {
      id: 'buildingB',
      title: 'Building B',
      pane: 'geofence',
      latlngs: [
        [60.309538, 2234.9375],
        [60.309538, 2255.273438],
        [58.52124, 2255.273438],
        [58.52124, 2252.109375],
        [56.248232, 2252.109375],
        [56.248232, 2234.9375],
      ],
      colour: 'blue',
    },
    {
      id: 'buildingC',
      title: 'Building C',
      pane: 'geofence',
      latlngs: [
        [3.653769, 2155.78125],
        [3.653769, 2173.007813],
        [-2.670909, 2173.007813],
        [-2.670909, 2155.78125],
      ],
      colour: 'blue',
    },
  ],
})

document.getElementById('addGeofences').addEventListener('click', () => {
  plantquestGeofenceDisplay.addTo(map)
})

document.getElementById('removeGeofences').addEventListener('click', () => {
  plantquestGeofenceDisplay.remove()
})
