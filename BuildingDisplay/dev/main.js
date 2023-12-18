import './style.css'

import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

import '@plantquest/building-display/dist/building-display.css'
import { PlantquestBuildingDisplay } from '@plantquest/building-display'

// TODO bug: 'Error: Invalid tab ID: 1' from file undefined

console.log('START', PlantquestBuildingDisplay)

const map = L.map('map', {
  minZoom: 1.7,
}).setView([50.154377, 2154.375], 1.7)

L.tileLayer(
  'https://plantquest-demo01-map01.s3.eu-west-1.amazonaws.com/tiles/pqd-pq01-m01-013/{z}/{x}/{y}.png'
).addTo(map)

map.createPane('building')
let buildingPane = map.getPane('building')
buildingPane.style.zIndex = 230

// 'buildings' object outdated in favour of pqam.data.buildingMap object
// Left in for development in progress purposes
let options = {
  debug: true,
  buildings: [
    {
      id: 'buildingA',
      name: 'Building A',
      poly: [
        [70, 2045.3],
        [70, 2115.7],
        [55.3, 2115.7],
        [55.3, 2081.3],
        [46, 2081.3],
        [46, 2069.3],
        [48.4, 2069.3],
        [48.4, 2068.2],
        [53.9, 2068.2],
        [53.9, 2057.4],
        [55.5, 2057.4],
        [55.5, 2056.3],
        [61.6, 2056.3],
        [61.6, 2045.3],
      ],
    },
    {
      id: 'buildingB',
      name: 'Building B',
      poly: [
        [68.7, 2212.5],
        [68.7, 2235.2],
        [60.6, 2235.2],
        [60.6, 2255.3],
        [58.3, 2255.3],
        [58.3, 2252],
        [56.1, 2252],
        [56.1, 2208.2],
        [58.7, 2208.2],
        [58.7, 2212.5],
      ],
    },
    {
      id: 'buildingC',
      name: 'Building C',
      poly: [
        [27.2, 2125],
        [27.2, 2150.3],
        [23.8, 2150.3],
        [23.8, 2148],
        [-3.3, 2148],
        [-3.3, 2141.5],
        [5, 2141.5],
        [5, 2125],
      ],
    },
  ],
  pqam: {
    loc: {
      poly: null,
      building: null,
      chosen: {
        poly: null,
        building: { poly: null },
      },
    },
    config: {
      mapImg: [7800, 5850],
      mapMaxZoom: 2,
      mapBuildingFocusZoom: 4,
      building: {
        click: {
          active: true,
        },
        label: {
          zoom: null,
        },
        color: '#33f',
      },
    },
    data: {
      buildingMap: {
        buildingA: {
          id: 'buildingA',
          name: 'Building A',
          poly: [
            [52.7, 2086],
            [52.7, 2115.7],
            [47.4, 2115.7],
            [47.4, 2086],
          ],
        },
        buildingB: {
          id: 'buildingB',
          name: 'Building B',
          poly: [
            [60.6, 2235],
            [60.6, 2255.3],
            [58.3, 2255.3],
            [58.3, 2252],
            [56.1, 2252],
            [56.1, 2235],
          ],
        },
        buildingC: {
          id: 'buildingC',
          name: 'Building C',
          poly: [
            [3.4, 2155.6],
            [3.4, 2172.5],
            [-3.4, 2172.5],
            [-3.4, 2155.6],
          ],
        },
      },
    },
    layer: { building: null },
    map: null,
    buildingPopup: null,
    click: null,
  },
}

const plantquestBuildingDisplay = new PlantquestBuildingDisplay(options)

document.getElementById('addBuildings').addEventListener('click', () => {
  plantquestBuildingDisplay.addTo(map)
})

document.getElementById('removeBuildings').addEventListener('click', () => {
  plantquestBuildingDisplay.remove()
})

document.getElementById('resetDemoSelect').addEventListener('click', () => {
  plantquestBuildingDisplay.resetDemoSelect(map)
})
