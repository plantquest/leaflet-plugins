import './style.css'

import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

import '@plantquest/asset-display/dist/asset-display.css'
import { PlantquestAssetDisplay } from '@plantquest/asset-display'

const map = L.map('map', {
  crs: L.CRS.Simple,
  scrollWheelZoom: false,
  doubleClickZoom: false,
  attributionControl: false,
  editable: true,
}).setView([-120, 85], 2); // Set default view and zoom level

L.tileLayer('https://plantquest-demo01-map01.s3.eu-west-1.amazonaws.com/tiles/pqd-pq01-m01-013/{z}/{x}/{y}.png', {
  maxZoom: 19,
  minZoom: 2,
}).addTo(map);

const assets = [
  { id: 'asset1', x: 105, y: -52, value: 1 },
  { id: 'asset2', x: 105, y: -49, value: 2 },
  { id: 'asset3', x: 90, y: -60, value: 1 },
  { id: 'asset4', x: 90, y: -63, value: 10},
  { id: 'asset5', x: 95, y: -70, value: 1 },
  { id: 'asset6', x: 95, y: -73, value: 2 },
  { id: 'asset7', x: 115, y: -66, value: 15 },
  { id: 'asset8', x: 115, y: -80, value: 20 },
  { id: 'asset9', x: 85, y: -80, value: 1 },
  { id: 'asset10', x: 85, y: -77, value: 2 },
  { id: 'asset11', x: 78, y: -80, value: 1 },
  { id: 'asset12', x: 78, y: -77, value: 18 },
  { id: 'asset13', x: 70, y: -80, value: 2 },
  { id: 'asset14', x: 80, y: -50, value: 2 },
  { id: 'asset10', x: 85, y: -100, value: 22 },
  { id: 'asset11', x: 78, y: -90, value: 1 },
  { id: 'asset12', x: 71, y: -103, value: 2 },
  { id: 'asset13', x: 70, y: -85, value: 12 },
  { id: 'asset14', x: 80, y: -90, value: 20 },
  { id: 'asset11', x: 78, y: -120, value: 1 },
  { id: 'asset12', x: 70, y: -110, value: 2 },
  { id: 'asset13', x: 70, y: -120, value: 12 },
  { id: 'asset14', x: 80, y: -115, value: 20 },
  // ... add more assets with specific coordinates and values
  { id: 'asset15', x: 150, y: -50, value: 3 },
  { id: 'asset15', x: 150, y: -70, value: 1 },
  { id: 'asset15', x: 170, y: -68, value: 3 },
  { id: 'asset15', x: 170, y: -72, value: 1 },
  { id: 'asset15', x: 140, y: -50, value: 2 },
  { id: 'asset11', x: 110, y: -110, value: 1 },
  { id: 'asset12', x: 110, y: -115, value: 2 },
  { id: 'asset11', x: 130, y: -100, value: 1 },
  { id: 'asset12', x: 130, y: -95, value: 2 },
  { id: 'asset11', x: 138, y: -100, value: 1 },
  { id: 'asset12', x: 138, y: -95, value: 2 },
];

const assetDisplay = new PlantquestAssetDisplay({ assets });
assetDisplay.addTo(map);

let clustersVisible = true;

// Function to toggle clusters
function toggleClusters() {
  if (clustersVisible) {
    assetDisplay.hideClusters(); // Hide clusters
  } else {
    assetDisplay.showClusters(); // Show clusters
  }
  clustersVisible = !clustersVisible;
}

// Toggle button logic
const toggleButton = document.getElementById('toggleClusters');
toggleButton.addEventListener('click', toggleClusters);