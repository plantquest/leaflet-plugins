import './style.css'

import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

import '@plantquest/item-filter/dist/item-filter.css'
import { PlantquestItemFilter } from '@plantquest/item-filter'

const map = L.map('plantquest-assetmap-map', {
  crs: L.CRS.Simple,
  scrollWheelZoom: false,
  doubleClickZoom: false,
  attributionControl: false,
  editable: true,
})

L.tileLayer('https://plantquest-demo01-map01.s3.eu-west-1.amazonaws.com/tiles/pqd-pq01-m01-013').addTo(map)

const plantquestItemFilter = new PlantquestItemFilter()

plantquestItemFilter.addTo(map)