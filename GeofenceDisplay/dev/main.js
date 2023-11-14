import './style.css'

import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

import '@plantquest/geofence-display/dist/geofence-display.css'
import { PlantquestGeofenceDisplay } from '@plantquest/geofence-display'

console.log('START', PlantquestGeofenceDisplay)

const map = L.map('map').setView([53.27, -9.055], 16)

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map)

const plantquestGeofenceDisplay = new PlantquestGeofenceDisplay({
  debug: true,
  geofences: [
    {
      id: 'coffeewerk',
      title: 'Coffewerk+Press',
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
