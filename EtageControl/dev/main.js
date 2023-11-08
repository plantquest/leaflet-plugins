import './style.css'

import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

import '@plantquest/etage-control/dist/etage-control.css'
import { PlantquestEtageControl } from '@plantquest/etage-control'


const map = L.map('map').setView([51.505, -0.09], 13)

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map)

// In progress:
// Just some mock-up options for buildings and floors, testing it visually.
const etageControlOptions = {
  position: 'topright',
  buildings: [
    { name: 'Building A', center: [51.505, -0.09], zoom: 18 },
    { name: 'Building B', center: [51.510, -0.11], zoom: 18 },
    // ... more buildings
  ],
  floors: [
    { name: 'Floor 1', data: 'Data for Floor 1' },
    { name: 'Floor 2', data: 'Data for Floor 2' },
    // ... more floors
  ]
};


const plantquestEtageControl = new PlantquestEtageControl(etageControlOptions)

plantquestEtageControl.addTo(map)

