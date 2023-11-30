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
});

L.tileLayer('https://plantquest-demo01-map01.s3.eu-west-1.amazonaws.com/tiles/pqd-pq01-m01-013/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

const assetsOptions = [
    // Mock assets data
    { id: 'asset1', name: 'Asset 1', xco: 51.505, yco: -0.09, atype: 'Equipment' },
    { id: 'asset2', name: 'Asset 2', xco: 51.506, yco: -0.091, atype: 'Room/Area' }
];

const assetDisplay = new PlantquestAssetDisplay({ assetsOptions });
assetDisplay.addTo(map);