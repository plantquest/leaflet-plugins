import './style.css'

import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

import '@plantquest/etage-control/dist/etage-control.css'
import { PlantquestEtageControl } from '@plantquest/etage-control'
import { Gubu } from 'gubu'

const map = L.map('map', {
  crs: L.CRS.Simple,
  scrollWheelZoom: false,
  doubleClickZoom: false,
  attributionControl: false,
  editable: true,
})

const tileLayer = L.tileLayer('https://plantquest-demo01-map01.s3.eu-west-1.amazonaws.com/tiles/pqd-pq01-m01-013/{z}/{x}/{y}.png');
tileLayer.addTo(map);

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
  ],
  tileLayer: Object,
})

// Just some mock-up options for buildings and LEVELS, testing it visually.
//USING GUBU
const etageControlOptions = PlantquestEtageControlOptionsShape({
  position: 'topright',
  // debug: false,
  buildings: [
    { id: 'buildingA', name: '112-AP1', center: [-75, 120], zoom: 3 },
    {
      id: 'buildingB',
      name: '118-AP1',
      center: [-120, 65],
      zoom: 3
    },
    // { id: 'buildingC', name: 'Building C', center: [51.5054, -0.092], zoom: 20 }
  ],
  levels: [
    {
      id: 'floor1',
      name: 'First Floor',
      building_id: 'buildingA',
      center: [-75, 120],
      zoom: 3
    },
    {
      id: 'floor2',
      name: 'Second Floor',
      building_id: 'buildingA',
      center: [-75, 120],
      zoom: 3
    },
    {
      id: 'floor1',
      name: 'First Floor',
      building_id: 'buildingB',
      center: [-120, 65],
      zoom: 3
    },
    {
      id: 'floor2',
      name: 'Second Floor',
      building_id: 'buildingB',
      center: [-120, 65],
      zoom: 3
    },
    // {
    //   id: 'floor3',
    //   name: 'Floor 3',
    //   building_id: 'buildingB',
    //   center: [51.5051, -0.088],
    //   zoom: 0
    // },
    // {
    //   id: 'basement',
    //   name: 'Basement',
    //   building_id: 'buildingB',
    //   center: [51.5051, -0.088],
    //   zoom: 0
    // },
    // {
    //   id: 'floor1',
    //   name: 'Floor 1',
    //   building_id: 'buildingC',
    //   center: [51.5054, -0.092],
    //   zoom: 0
    // },
    // {
    //   id: 'floor2',
    //   name: 'Roof',
    //   building_id: 'buildingC',
    //   center: [51.5054, -0.092],
    //   zoom: 0
    // }
  ],
  tileLayer: tileLayer,
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
