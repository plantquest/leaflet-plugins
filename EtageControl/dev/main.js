import './style.css'

import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

import '@plantquest/etage-control/dist/etage-control.css'
import { PlantquestEtageControl } from '@plantquest/etage-control'

const map = L.map('map').setView([51.505, -0.09], 20)

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map)

// In progress:
// Just some mock-up options for buildings and LEVELS, testing it visually.
const etageControlOptions = {
  position: 'topright',
  buildings: [
    { id: 'buildingA', name: 'Building A', center: [51.505, -0.09], zoom: 20 },
    { id: 'buildingB', name: 'Building B', center: [51.5051, -0.088], zoom: 20 },
    { id: 'buildingC', name: 'Building C', center: [51.5054, -0.092], zoom: 20 },
  ],
  levels: [
    { id: 'floor1', name: 'Floor 1', buildingId: 'buildingA' },
    { id: 'floor2', name: 'Floor 2', buildingId: 'buildingA' },
    { id: 'floor1', name: 'Floor 1', buildingId: 'buildingB' },
    { id: 'floor2', name: 'Floor 2', buildingId: 'buildingB' },
    { id: 'floor3', name: 'Floor 3', buildingId: 'buildingB' },
    { id: 'basement', name: 'Basement', buildingId: 'buildingB' },
    { id: 'floor1', name: 'Floor 1', buildingId: 'buildingC' },
    { id: 'floor2', name: 'Floor 2', buildingId: 'buildingC' },
  ]
};

const plantquestEtageControl = new PlantquestEtageControl(etageControlOptions)

plantquestEtageControl.addTo(map)
