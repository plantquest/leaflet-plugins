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
      latlngs: [
        [3.653769, 2155.78125],
        [3.653769, 2173.007813],
        [-2.670909, 2173.007813],
        [-2.670909, 2155.78125],
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
