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
  position: 'topright',
  asset: {
    atypes: ['Emergency Exit', 'De-Fibrilator', 'Muster Point'],
  },
  room: {
    attr: {
      data8: 'Meeting Room',
      data9: 'Plant Room',
      data10: 'ATEX Area',
      data11: 'Noise >80db',
      data12: 'Production Area',
      data13: 'PPE Required',
    },
  },
  toggleGroup: (kind, value) => {
    console.log('toggleGroup', kind, value)
  },
})

plantquestGeofenceDisplay.addTo(map)
