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

let options = {}

const plantquestRoomDisplay = new PlantquestRoomDisplay(options)

document.getElementById('addRooms').addEventListener('click', () => {
  plantquestRoomDisplay.addTo(map)
})

document.getElementById('removeRooms').addEventListener('click', () => {
  plantquestRoomDisplay.remove()
})
