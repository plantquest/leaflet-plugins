import './style.css'

import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

import '@plantquest/room-display/dist/room-display.css'
import { PlantquestRoomDisplay } from '@plantquest/room-display'

// TODO bug: 'Error: Invalid tab ID: 1' from file undefined

console.log('START', PlantquestRoomDisplay)

const map = L.map('map', {
  minZoom: 1.7,
}).setView([50.154377, 2154.375], 1.7)

L.tileLayer(
  'https://plantquest-demo01-map01.s3.eu-west-1.amazonaws.com/tiles/pqd-pq01-m01-013/{z}/{x}/{y}.png'
).addTo(map)

map.createPane('room')
let roomPane = map.getPane('room')
roomPane.style.zIndex = 230

let options = {
  debug: true,
  rooms: [
    {
      id: 'roomA',
      name: 'Room A',
      poly: [
        [52.7, 2086],
        [52.7, 2115.7],
        [47.4, 2115.7],
        [47.4, 2086],
      ],
    },
    {
      id: 'roomB',
      name: 'Room B',
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
      id: 'roomC',
      name: 'Room C',
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
      room: null,
      chosen: {
        poly: null,
        room: null,
      },
    },
    config: {
      mapImg: [7800, 5850],
      mapMaxZoom: 2,
      mapRoomFocusZoom: 5,
      room: {
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
      roomMap: {
        roomA: {
          // id: 'roomA',
          name: 'Room A',
          poly: [
            [52.7, 2086],
            [52.7, 2115.7],
            [47.4, 2115.7],
            [47.4, 2086],
          ],
        },
        roomB: {
          // id: 'roomB',
          name: 'Room B',
          poly: [
            [60.6, 2235],
            [60.6, 2255.3],
            [58.3, 2255.3],
            [58.3, 2252],
            [56.1, 2252],
            [56.1, 2235],
          ],
        },
        roomC: {
          // id: 'roomC',
          name: 'Room C',
          poly: [
            [3.4, 2155.6],
            [3.4, 2172.5],
            [-3.4, 2172.5],
            [-3.4, 2155.6],
          ],
        },
      },
    },
    layer: { room: null },
    map: null,
    roomPopup: null,
    click: null,
  },
}

const plantquestRoomDisplay = new PlantquestRoomDisplay(options)

document.getElementById('addRooms').addEventListener('click', () => {
  plantquestRoomDisplay.addTo(map)
})

document.getElementById('removeRooms').addEventListener('click', () => {
  plantquestRoomDisplay.remove()
})

document.getElementById('resetDemoSelect').addEventListener('click', () => {
  plantquestRoomDisplay.resetDemoSelect(map)
})
