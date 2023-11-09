import './style.css'

import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

import '@plantquest/geofence-display/dist/geofence-display.css'
import { PlantquestGeofenceDisplay } from '@plantquest/geofence-display'

console.log('START', PlantquestGeofenceDisplay)

const map = L.map('map').setView([51.505, -0.09], 13)

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map)

const plantquestGeofenceDisplay = new PlantquestGeofenceDisplay({
  geo1: {
    title: 'geofence ahoy!',
    latlngs: [
      [37, -109.05],
      [41, -109.03],
      [41, -102.05],
      [37, -102.04],
    ],
    colour: 'blue',
  },
})

plantquestGeofenceDisplay.addTo(map)
