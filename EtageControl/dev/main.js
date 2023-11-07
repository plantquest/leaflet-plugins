import './style.css'

import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

import '@plantquest/etage-control/dist/etage-control.css'
import { PlantquestEtageControl } from '@plantquest/etage-control'

console.log('START', PlantquestEtageControl)


const map = L.map('map').setView([51.505, -0.09], 13)

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map)


const plantquestEtageControl = new PlantquestEtageControl({
  position: 'topright',
  asset: {
    atypes: [
      'Emergency Exit',
      'De-Fibrilator',
      'Muster Point',
    ]
  },
  room: {
    attr: {
      data8:  'Meeting Room',
      data9:  'Plant Room',   				
      data10: 'ATEX Area',
      data11: 'Noise >80db',
      data12: 'Production Area',
      data13: 'PPE Required',
    }
  },
  toggleGroup: (kind, value)=>{
    console.log('toggleGroup', kind, value)
  }
})

plantquestEtageControl.addTo(map)

