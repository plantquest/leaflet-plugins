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
        [52.7, 2086],
        [52.7, 2115.7],
        [47.4, 2115.7],
        [47.4, 2086],
      ],
    },
    {
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
    {
      id: 'buildingC',
      name: 'Building C',
      poly: [
        [3.4, 2155.6],
        [3.4, 2172.5],
        [-3.4, 2172.5],
        [-3.4, 2155.6],
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
