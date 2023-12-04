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
}).setView([0, 0], 4); // Set default view and zoom level

L.tileLayer('https://plantquest-demo01-map01.s3.eu-west-1.amazonaws.com/tiles/pqd-pq01-m01-013/{z}/{x}/{y}.png', {
  maxZoom: 19,
  minZoom: 2,
}).addTo(map);

const assets = Array.from({ length: 20 }, () => ({
  id: `room-${Math.random().toString(36).substr(2, 9)}`,
  x: Math.random() * 300 - 150, // Make sure these coordinates are within your map's view
  y: Math.random() * 300 - 150,
  value: Math.floor(Math.random() * 5) + 1,
}));

console.log("Generated Assets:", assets); 

const assetDisplay = new PlantquestAssetDisplay({ assets });
assetDisplay.addTo(map);

// Set map bounds if needed
const bounds = [[-200, -200], [200, 200]];
map.fitBounds(bounds);