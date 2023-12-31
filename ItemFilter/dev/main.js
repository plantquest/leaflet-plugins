import './style.css'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { PlantquestItemFilter } from '@plantquest/item-filter'

// Create the map
const map = L.map('plantquest-assetmap-map', {
  crs: L.CRS.Simple,
  scrollWheelZoom: false,
  doubleClickZoom: false,
  attributionControl: false,
  editable: true,
})

// Default tile layer
let currentTileLayer = L.tileLayer('https://plantquest-demo01-map01.s3.eu-west-1.amazonaws.com/tiles/pqd-pq01-m01-013').addTo(map)

// Function to update the tile layer
function updateTileLayer() {
  const layerSelect = document.getElementById('layers')
  const plantSelect = document.getElementById('plant')
  
  let baseUrl = 'https://plantquest-demo01-map01.s3.eu-west-1.amazonaws.com/tiles/'
  if (layerSelect.value === 'demo02') {
    baseUrl = 'https://plantquest-demo02-map01.s3.eu-west-1.amazonaws.com/tiles/'
  }

  let layer = 'pqd-pq01-m01-013'
  if (plantSelect.value === 'pq02') {
    layer = 'pqd-pq02-m01-013'
  }

  const newTileLayerUrl = baseUrl + layer

  // Remove the old layer and add the new one
  map.removeLayer(currentTileLayer)
  currentTileLayer = L.tileLayer(newTileLayerUrl).addTo(map)
}

// Add event listeners to the select inputs
document.getElementById('layers').addEventListener('change', updateTileLayer)
document.getElementById('plant').addEventListener('change', updateTileLayer)

// Add the custom control
const plantquestItemFilter = new PlantquestItemFilter()
plantquestItemFilter.addTo(map)
