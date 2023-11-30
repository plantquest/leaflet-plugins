let Leaflet = require('../../verify/leaflet.js')
let { PlantquestGeofenceDisplay } = require('../dist/geofence-display.umd.cjs')

describe('GeofenceDisplay', () => {
  const options = {
    debug: false,
    geofences: [
      {
        id: 'coffeewerk',
        title: 'Coffewerk+Press',
        latlngs: [
          [53.271455, -9.054129],
          [53.271237, -9.054666],
          [53.271096, -9.054494],
          [53.270852, -9.054365],
          [53.271404, -9.053936],
        ],
        colour: 'purple',
      },
      {
        id: 'plamas',
        title: 'Plámás',
        latlngs: [
          [53.270467, -9.058356],
          [53.270197, -9.058871],
          [53.270095, -9.058142],
          [53.270172, -9.057584],
        ],
        colour: 'purple',
      },
    ],
  }

  test('leaflet-happy', () => {
    expect(Leaflet).toBeDefined()
  })

  test('leaflet-map-happy', () => {
    let map1 = L.map(document.createElement('div'))
    expect(map1).toBeDefined()
  })

  test('leaflet-map-prep', () => {
    let map2 = L.map(document.createElement('div'))
    map2.setView([53.27, -9.055], 16)

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map2)

    map2.createPane('geofence')
    let geofencePane1 = map2.getPane('geofence')
    geofencePane1.style.zIndex = 230

    map2.createPane('geofenceLabel')
    let geofenceLabelPane1 = map2.getPane('geofenceLabel')
    geofenceLabelPane1.style.zIndex = 235

    expect(map2._panes.geofence).toBeDefined()
    expect(map2._panes.geofenceLabel).toBeDefined()
  })

  test('geofence-display-happy', () => {
    expect(PlantquestGeofenceDisplay).toBeDefined()
  })

  test('geofence-display-create', () => {
    let plantquestGeofenceDisplay1 = new PlantquestGeofenceDisplay(options)
    expect(plantquestGeofenceDisplay1._state).toBeDefined()
  })

  test('geofence-display-add-geofences', () => {
    let map3 = L.map(document.createElement('div'))
    map3.setView([53.27, -9.055], 16)

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map3)

    map3.createPane('geofence')
    let geofencePane2 = map3.getPane('geofence')
    geofencePane2.style.zIndex = 230

    map3.createPane('geofenceLabel')
    let geofenceLabelPane2 = map3.getPane('geofenceLabel')
    geofenceLabelPane2.style.zIndex = 235

    let plantquestGeofenceDisplay2 = new PlantquestGeofenceDisplay(options)
    expect(plantquestGeofenceDisplay2._map).toBeUndefined()
    plantquestGeofenceDisplay2.addTo(map3)
    expect(plantquestGeofenceDisplay2._map).toBeDefined()
  })

  test('geofence-display-remove-geofences', () => {
    let map4 = L.map(document.createElement('div'))
    map4.setView([53.27, -9.055], 16)

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map4)

    map4.createPane('geofence')
    let geofencePane3 = map4.getPane('geofence')
    geofencePane3.style.zIndex = 230

    map4.createPane('geofenceLabel')
    let geofenceLabelPane3 = map4.getPane('geofenceLabel')
    geofenceLabelPane3.style.zIndex = 235

    let plantquestGeofenceDisplay3 = new PlantquestGeofenceDisplay(options)
    plantquestGeofenceDisplay3.addTo(map4)
    expect(plantquestGeofenceDisplay3._map).toBeDefined()
    plantquestGeofenceDisplay3.remove()
    expect(plantquestGeofenceDisplay3._map).toEqual(null)
  })
})
