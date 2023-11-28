import './style.css'

import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

import '@plantquest/etage-control/dist/etage-control.css'
import { PlantquestEtageControl } from '@plantquest/etage-control'
import { Gubu } from 'gubu'

const map = L.map('plantquest-assetmap-map', {
  crs: L.CRS.Simple,
  scrollWheelZoom: false,
  doubleClickZoom: false,
  attributionControl: false,
  editable: true,
})

L.tileLayer('https://plantquest-demo01-map01.s3.eu-west-1.amazonaws.com/tiles/pqd-pq01-m01-013').addTo(map)

//TODO: use GUBU to validate the options
//TESTING GUBU
const PlantquestEtageControlOptionsShape = Gubu({
  position: String,
  buildings: [
    { id: String, name: String, center: [Number, Number], zoom: Number }
  ],
  levels: [
    {
      id: String,
      name: String,
      building_id: String,
      center: [Number, Number],
      zoom: Number
    }
  ]
})

// Just some mock-up options for buildings and LEVELS, testing it visually.
//USING GUBU
const etageControlOptions = PlantquestEtageControlOptionsShape({
  position: 'topright',
  debug: false,
  buildings: [
    { id: 'buildingA', name: 'Building A', center: [51.505, -0.09], zoom: 20 },
    {
      id: 'buildingB',
      name: 'Building B',
      center: [51.5051, -0.088],
      zoom: 20
    },
    { id: 'buildingC', name: 'Building C', center: [51.5054, -0.092], zoom: 20 }
  ],
  levels: [
    {
      id: 'floor1',
      name: 'Floor 1',
      building_id: 'buildingA',
      center: [51.505, -0.09],
      zoom: 20
    },
    {
      id: 'floor2',
      name: 'Floor 2',
      building_id: 'buildingA',
      center: [51.505, -0.09],
      zoom: 20
    },
    {
      id: 'floor1',
      name: 'Floor 1',
      building_id: 'buildingB',
      center: [51.5051, -0.088],
      zoom: 20
    },
    {
      id: 'floor2',
      name: 'Floor 2',
      building_id: 'buildingB',
      center: [51.5051, -0.088],
      zoom: 20
    },
    {
      id: 'floor3',
      name: 'Floor 3',
      building_id: 'buildingB',
      center: [51.5051, -0.088],
      zoom: 20
    },
    {
      id: 'basement',
      name: 'Basement',
      building_id: 'buildingB',
      center: [51.5051, -0.088],
      zoom: 20
    },
    {
      id: 'floor1',
      name: 'Floor 1',
      building_id: 'buildingC',
      center: [51.5054, -0.092],
      zoom: 20
    },
    {
      id: 'floor2',
      name: 'Roof',
      building_id: 'buildingC',
      center: [51.5054, -0.092],
      zoom: 20
    }
  ]
})

const plantquestEtageControl = new PlantquestEtageControl(etageControlOptions)

plantquestEtageControl.addTo(map)

// request: TOGGLE CONTROL VISIBILITY
const toggleButton = document.getElementById('toggle-control')
let isControlVisible = true // initial state

toggleButton.addEventListener('click', () => {
  if (isControlVisible) {
    plantquestEtageControl.hide()
  } else {
    plantquestEtageControl.show()
  }
  isControlVisible = !isControlVisible
})
