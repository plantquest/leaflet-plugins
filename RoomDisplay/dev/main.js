import './style.css'

import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

import '@plantquest/room-display/dist/room-display.css'
import { PlantquestRoomDisplay } from '@plantquest/room-display'

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
      title: 'Room A',
      pane: 'room',
      room_poly: [
        [53.138881, 2086.226563],
        [53.138881, 2116],
        [47.135928, 2116],
        [47.135928, 2086.226563],
      ],
    },
    {
      id: 'roomB',
      title: 'Room B',
      pane: 'room',
      room_poly: [
        [60.309538, 2234.9375],
        [60.309538, 2255.273438],
        [58.52124, 2255.273438],
        [58.52124, 2252.109375],
        [56.248232, 2252.109375],
        [56.248232, 2234.9375],
      ],
    },
    {
      id: 'roomC',
      title: 'Room C',
      pane: 'room',
      room_poly: [
        [3.653769, 2155.78125],
        [3.653769, 2173.007813],
        [-2.670909, 2173.007813],
        [-2.670909, 2155.78125],
      ],
    },
  ],
}

const plantquestRoomDisplay = new PlantquestRoomDisplay(options)

document.getElementById('addRooms').addEventListener('click', () => {
  plantquestRoomDisplay.addTo(map)
})

document.getElementById('removeRooms').addEventListener('click', () => {
  plantquestRoomDisplay.remove()
})
