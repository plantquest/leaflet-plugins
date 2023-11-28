import './style.css'

import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

import '@plantquest/utility/dist/utility.css'
import { PlantquestUtility } from '@plantquest/utility'

console.log('START', PlantquestUtility)

const map = L.map('map').setView([53.27, -9.055], 16)

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map)

const plantquestUtility = new PlantquestUtility()

document.getElementById('addUtilities').addEventListener('click', () => {
  plantquestUtility.addTo(map)
})

document.getElementById('removeUtilities').addEventListener('click', () => {
  plantquestUtility.remove()
})
