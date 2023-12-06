import './style.css'

import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

import '@plantquest/geofence-display/dist/geofence-display.css'
import { PlantquestGeofenceDisplay } from '@plantquest/geofence-display'

console.log('START', PlantquestGeofenceDisplay)

const map = L.map('map', {
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
      latlngs: [
        [52.7, 2086],
        [52.7, 2115.7],
        [47.4, 2115.7],
        [47.4, 2086],
      ],
      colour: 'blue',
    },
    {
      id: 'buildingB',
      title: 'Building B',
      latlngs: [
        [60.6, 2235],
        [60.6, 2255.3],
        [58.3, 2255.3],
        [58.3, 2252],
        [56.1, 2252],
        [56.1, 2235],
      ],
      colour: 'blue',
    },
    {
      id: 'buildingC',
      title: 'Building C',
      latlngs: [
        [3.4, 2155.6],
        [3.4, 2172.5],
        [-3.4, 2172.5],
        [-3.4, 2155.6],
      ],
      colour: 'blue',
    },
  ],
  pqam: { config: { geofence: { click: { active: true }, color: '#f3f' } } },
})

document.getElementById('addGeofences').addEventListener('click', () => {
  plantquestGeofenceDisplay.addTo(map)
})

document.getElementById('removeGeofences').addEventListener('click', () => {
  plantquestGeofenceDisplay.remove()
})
